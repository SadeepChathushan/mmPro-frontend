import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Typography,
  Upload,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  IdcardOutlined,
  PhoneOutlined,
  SolutionOutlined,
  UploadOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import authService from "../../services/authService";

const { Title } = Typography;
const { Dragger } = Upload;

const MiningEngineerRegister = () => {
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nicFrontFile, setNicFrontFile] = useState([]);
  const [nicBackFile, setNicBackFile] = useState([]);
  const [workIdFile, setWorkIdFile] = useState([]);

  const handleSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("login", values.username);
    formData.append("first_name", values.firstName);
    formData.append("last_name", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("nic_number", values.nic);
    formData.append("mobile_number", values.mobile);
    formData.append("designation", values.designation);
    formData.append("user_Type", "miningEngineer");

    if (nicFrontFile.length > 0) {
      formData.append("nic_front", nicFrontFile[0]);
    }
    if (nicBackFile.length > 0) {
      formData.append("nic_back", nicBackFile[0]);
    }
    if (workIdFile.length > 0) {
      formData.append("work_id", workIdFile[0]);
    }

    try {
      const result = await authService.registerUser(
        formData,
        "mining_engineer"
      );

      if (result) {
        message.success("Mining Engineer account created successfully!");
        form.resetFields();
        setNicFrontFile([]);
        setNicBackFile([]);
        setWorkIdFile([]);
      }
    } catch (error) {
      console.error("Account Creation Error:", error);

      if (error?.error?.errors?.length > 0) {
        error.error.errors.forEach((err) => message.error(err));
      } else {
        message.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const createUploadProps = (fileList, setFileList) => ({
    listType: "picture",
    maxCount: 1,
    onRemove: () => setFileList([]),
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
    accept: "image/*,.pdf",
  });

  return (
    <div style={{ padding: "24px" }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Card
            title={
              <Title level={3} style={{ textAlign: "center" }}>
                Create New Account
              </Title>
            }
            bordered={false}
            style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ maxWidth: 800, margin: "0 auto" }}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      { required: true, message: "Enter your first name" },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      { required: true, message: "Enter your last name" },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Enter username" }]}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Enter email" },
                      { type: "email", message: "Invalid email" },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="NIC Number"
                    name="nic"
                    rules={[{ required: true, message: "Enter NIC number" }]}
                  >
                    <Input prefix={<IdcardOutlined />} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Mobile Number"
                    name="mobile"
                    rules={[
                      { required: true, message: "Enter mobile number" },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit mobile number",
                      },
                    ]}
                  >
                    <Input prefix={<PhoneOutlined />} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Designation"
                name="designation"
                rules={[{ required: true, message: "Enter designation" }]}
              >
                <Input prefix={<SolutionOutlined />} />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Enter password" },
                      { min: 8, message: "At least 8 characters" },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: "Confirm your password" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          return !value || getFieldValue("password") === value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Passwords do not match")
                              );
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                </Col>
              </Row>

              <Title level={5}>Upload Required Documents</Title>
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="NIC Front Side"
                    name="nicFront"
                    rules={[{ required: true, message: "Upload NIC front" }]}
                  >
                    <Upload
                      {...createUploadProps(nicFrontFile, setNicFrontFile)}
                    >
                      <Button icon={<FileImageOutlined />} block>
                        Upload NIC Front
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="NIC Back Side"
                    name="nicBack"
                    rules={[{ required: true, message: "Upload NIC back" }]}
                  >
                    <Upload {...createUploadProps(nicBackFile, setNicBackFile)}>
                      <Button icon={<FileImageOutlined />} block>
                        Upload NIC Back
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Work ID"
                    name="workId"
                    rules={[{ required: true, message: "Upload Work ID" }]}
                  >
                    <Upload {...createUploadProps(workIdFile, setWorkIdFile)}>
                      <Button icon={<FileImageOutlined />} block>
                        Upload Work ID
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  size="large"
                >
                  Create Account
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MiningEngineerRegister;
