import React from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { UploadOutlined } from '@ant-design/icons';

const NewLicenseForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values: ", values);
  };

  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  
  const handleCancel = () => {
    form.resetFields();
  };


  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        background: "#f0f2f5",
        borderRadius: "10px",
      }}
    >
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: "16px", paddingLeft: 0, color: "#000000" }}
        href="/gsmb/dashboard"
      ></Button>

      <h2 style={{ textAlign: "center", fontWeight: "bold", color: "#1a1a1a" }}>
        Register New  License Owner
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ gap: "16px" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Owner Name"
              name="ownerName"
              rules={[{ required: true, message: "Please input the owner name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Mobile Number"
              name="mobile"
              rules={[{ required: true, message: "Please input the mobile number!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Vehicle Number"
              name="vehicleNumber"
              rules={[{ required: true, message: "Please input the vehicle number!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Capacity (Cubes)"
              name="capacity"
              rules={[{ required: true, message: "Please input the capacity!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Lorry Book"
              name="lorryBook"
              rules={[{ required: true, message: "Please upload the lorry book image!" }]}
            >
              <Upload
                name="lorryBook"
                showUploadList={false}
                action="/upload.do"
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />}>Upload Lorry Book</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Lorry"
              name="lorry"
              rules={[{ required: true, message: "Please upload the lorry image!" }]}
            >
              <Upload
                name="lorry"
                showUploadList={false}
                action="/upload.do"
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />}>Upload Lorry Image</Button>
              </Upload>
            </Form.Item>
          </Col>
         <Col xs={24}>
           <Form.Item>
             <div style={{ display: 'flex', gap: '10px' }}>
               <Button
                 type="primary"
                 htmlType="submit"
                 style={{
                   backgroundColor: "#950C33",
                   borderColor: "#950C33",
                   width: "48%", // Adjust width to fit both buttons
                 }}
               >
                 Create License
               </Button>
         
               <Button
                 type="default"
                 onClick={handleCancel}
                 style={{
                   width: "48%", // Adjust width to fit both buttons
                   borderColor: "#950C33",
                 }}
               >
                 Cancel
               </Button>
             </div>
           </Form.Item>
         </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewLicenseForm;
