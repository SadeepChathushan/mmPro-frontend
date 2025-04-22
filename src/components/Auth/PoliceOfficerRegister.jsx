import React, { useState } from "react";
import { Card, Form, Input, Button, message, Row, Col, Typography, Upload } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, IdcardOutlined, PhoneOutlined, SolutionOutlined, UploadOutlined, FileImageOutlined } from "@ant-design/icons";
import authService from "../../services/authService";

const { Title } = Typography;
const { Dragger } = Upload;

const PoliceOfficerRegister = () => {
    const [form] = Form.useForm();
    const [selectedRole, setSelectedRole] = useState(null);
    const [loading, setLoading] = useState(false);
    const [nicFrontFile, setNicFrontFile] = useState([]);
    const [nicBackFile, setNicBackFile] = useState([]);
    const [workIdFile, setWorkIdFile] = useState([]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        designation: values.designation,
        nic: values.nic,
        mobile: values.mobile,
        documents: {
            nicFront: nicFrontFile[0],
            nicBack: nicBackFile[0],
            workId: workIdFile[0]
          }
      };

      // Call the registration service
      const result = await authService.registerUser(payload);

      if (result) {
        message.success("Account created successfully!");
        form.resetFields();
      }
    } catch (error) {
      console.error("Account Creation Error:", error);
      message.error(
        error.message || "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const createUploadProps = (fileList, setFileList, label) => ({
    listType: "picture",
    maxCount: 1,
    onRemove: () => setFileList([]),
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
    accept: "image/*,.pdf",
    style: { width: '100%' }
  });


  return (
    <div style={{ padding: "24px" }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Card
            title={
              <Title level={3} style={{ textAlign: "center", marginBottom: 0 }}>
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
                    rules={[{ required: true, message: "Please enter your First name" }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter your First name"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: "Please enter your Last name" }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Enter your Last name" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter your email" />
              </Form.Item>


              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="NIC Number"
                    name="nic"
                    rules={[
                      { required: true, message: "Please input your nic!" },
                      { pattern: /^[0-9]{9}[vVxX]?$/, message: "Please enter a valid NIC Number!" },
                    ]}
                  >
                    <Input
                      prefix={<IdcardOutlined />}
                      placeholder="Enter your NIC Number"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Mobile Number"
                    name="mobile"
                    rules={[
                      { required: true, message: "Please input your Mobile Number!" },
                      { pattern: /^[0-9]{10}$/, message: "Please enter a valid 10-digit Mobile Number!" },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Enter your Mobile Number"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Designation"
                name="designation"
                rules={[
                  { required: true, message: "Please input your Designation!" },
                ]}
              >
                <Input
                  prefix={<SolutionOutlined />}
                  placeholder="Enter your Designation"
                />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please input your password!" },
                      { min: 8, message: "Password must be at least 8 characters" },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Create a password"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: "Please confirm your password!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error("Passwords do not match!"));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Confirm password"
                    />
                  </Form.Item>
                </Col>
              </Row>

{/* Document Upload Section */}
<Title level={5} style={{ marginBottom: 16 }}>Upload Required Documents</Title>
              
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="NIC Front Side"
                    name="nicFront"
                    rules={[{ required: true, message: "Please upload NIC front side!" }]}
                  >
                    <Upload {...createUploadProps(nicFrontFile, setNicFrontFile, "NIC Front")}>
                      <Button 
                        icon={<FileImageOutlined />} 
                        block
                        size="large"
                      >
                        Upload NIC Front
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="NIC Back Side"
                    name="nicBack"
                    rules={[{ required: true, message: "Please upload NIC back side!" }]}
                  >
                    <Upload {...createUploadProps(nicBackFile, setNicBackFile, "NIC Back")}>
                      <Button 
                        icon={<FileImageOutlined />} 
                        block
                        size="large"
                      >
                        Upload NIC Back
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Work ID"
                    name="workId"
                    rules={[{ required: true, message: "Please upload your Work ID!" }]}
                  >
                    <Upload {...createUploadProps(workIdFile, setWorkIdFile, "Work ID")}>
                      <Button 
                        icon={<FileImageOutlined />} 
                        block
                        size="large"
                      >
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
                  style={{ marginTop: 16 }}
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

export default PoliceOfficerRegister;