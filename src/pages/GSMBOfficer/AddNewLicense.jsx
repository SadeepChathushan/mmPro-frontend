import React from "react";
import { Form, Input, Button, DatePicker, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const NewLicenseForm = () => {
  const [form] = Form.useForm();


  const handleCancel = () => {
    form.resetFields();
  };


  const onFinish = (values) => {
    console.log("Form values: ", values);
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
    <Button type="link" icon={<ArrowLeftOutlined />} style={{ marginBottom: "16px", paddingLeft: 0 ,color:"#000000"  }} href="/gsmb/dashboard" >  </Button> 

      <h2 style={{ textAlign: "center", fontWeight: "bold", color: "#1a1a1a" }}>
        New License
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
              label="License Number"
              name="licenseNumber"
              rules={[
                { required: true, message: "Please input the license number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Owner Name"
              name="ownerName"
              rules={[
                { required: true, message: "Please input the owner name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label=" Validity Start"
              name="validityStart"
              rules={[
                { required: true, message: "Please select the start date!" },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Valid Until"
              name="endDate"
              rules={[
                { required: true, message: "Please select the end date!" },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Capacity (Cubes)"
              name="capacity"
              rules={[
                { required: true, message: "Please input the capacity!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[
                { required: true, message: "Please input the mobile number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                { required: true, message: "Please input the location!" },
              ]}
            >
              <Input />
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
