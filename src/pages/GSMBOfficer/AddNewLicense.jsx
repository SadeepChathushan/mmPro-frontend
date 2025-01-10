import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";

const NewLicenseForm = () => {
  const [form] = Form.useForm();

  // Handle form submission and post data
  const onFinish = async (values) => {
    try {
      const payload = {
        issue: {
          project: { id: 18 },
          tracker: { id: 5 },
          subject: "New License",
          custom_fields: [
            { id: 8, name: "License Number", value: values.licenseNumber },
            { id: 2, name: "Owner Name", value: values.ownerName },
            { id: 3, name: "Mobile Number", value: values.mobile },
            { id: 5, name: "Capacity", value: values.capacity },
            { id: 9, name: "Start Date", value: values.validityStart.format("YYYY-MM-DD") },
            { id: 10, name: "End Date", value: values.endDate.format("YYYY-MM-DD") },
            { id: 11, name: "Location", value: values.location },
          ],
        },
      };

      const username = "@achinthamihiran"; // Replace with actual username
      const password = "Ab2#*De#"; // Replace with actual password

      // Post the data to the API
      const response = await axios.post(
        "/api/projects/new-license/issues.json",
        payload, // Use payload here instead of postData
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username,
            password,
          },
        }
      );

      console.log("Data posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  // Handle form cancel
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
              rules={[{ required: true, message: "Please input the license number!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
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
              label="Validity Start"
              name="validityStart"
              rules={[{ required: true, message: "Please select the start date!" }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Valid Until"
              name="endDate"
              rules={[{ required: true, message: "Please select the end date!" }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
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
              label="Mobile"
              name="mobile"
              rules={[{ required: true, message: "Please input the mobile number!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "Please input the location!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#950C33",
                    borderColor: "#950C33",
                    width: "48%",
                  }}
                >
                  Create License
                </Button>

                <Button
                  type="default"
                  onClick={handleCancel}
                  style={{
                    width: "48%",
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
