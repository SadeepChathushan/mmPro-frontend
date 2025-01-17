import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Form, Input, DatePicker, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";

const ViewLicenseDetails = () => {
  const { licenseId } = useParams(); // Get the license ID from the URL
  const [licenseData, setLicenseData] = useState(null); // State for license data
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  // Handle form submission and update data
  const onFinish = async (values) => {
    try {
      const payload = {
        issue: {
          custom_fields: [
            { id: 8, name: "License Number", value: values.licenseNumber },
            { id: 2, name: "Owner Name", value: values.ownerName },
            { id: 3, name: "Mobile Number", value: values.mobile },
            { id: 5, name: "Capacity", value: values.capacity },
            { id: 9, name: "Start Date", value: values.issueDate.format("YYYY-MM-DD") },
            { id: 10, name: "End Date", value: values.expiryDate.format("YYYY-MM-DD") },
            { id: 11, name: "Location", value: values.location },
          ],
        },
      };

      const username = "@achinthamihiran";
      const password = "Ab2#*De#";

      const response = await axios.put(
        `/api/issues/${licenseId}.json`,
        payload,
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

      console.log("Data updated successfully:", response.data);
      alert("License details updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update license details. Please try again.");
    }
  };

  // Fetch license data from the API
  useEffect(() => {
    const fetchLicenseData = async () => {
      try {
        const username = "@achinthamihiran";
        const password = "Ab2#*De#";

        const response = await axios.get(
          `/api/issues/${licenseId}.json`,
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

        const issue = response.data.issue;
        const transformedData = {
          licenseNumber: issue.custom_fields.find((field) => field.name === "License Number")?.value || "",
          ownerName: issue.custom_fields.find((field) => field.name === "Owner Name")?.value || "",
          location: issue.custom_fields.find((field) => field.name === "Location")?.value || "",
          capacity: issue.custom_fields.find((field) => field.name === "Capacity")?.value || "",
          issueDate: dayjs(issue.custom_fields.find((field) => field.name === "Start Date")?.value),
          expiryDate: dayjs(issue.custom_fields.find((field) => field.name === "End Date")?.value),
          mobile: issue.custom_fields.find((field) => field.name === "Mobile Number")?.value || "",
        };

        setLicenseData(transformedData);
        setLoading(false);
        form.setFieldsValue(transformedData); // Set initial values in the form
      } catch (error) {
        console.error("Error fetching license data:", error);
        setLoading(false);
      }
    };

    fetchLicenseData();
  }, [licenseId, form]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!licenseData) {
    return <div>No data available</div>;
  }

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
      >
        Back
      </Button>
      <Card
        title={<h3 style={{ margin: 0 }}>Edit License Details</h3>}
        style={{ borderRadius: "10px" }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="License Number"
                name="licenseNumber"
                rules={[{ required: true, message: "Please input the license number!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Owner Name"
                name="ownerName"
                rules={[{ required: true, message: "Please input the owner name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "Please input the location!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Mobile"
                name="mobile"
                rules={[{ required: true, message: "Please input the mobile number!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Capacity (Cubes)"
                name="capacity"
                rules={[{ required: true, message: "Please input the capacity!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Issue Date"
                name="issueDate"
                rules={[{ required: true, message: "Please select the issue date!" }]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[{ required: true, message: "Please select the expiry date!" }]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col xs={12}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#950C33",
                  borderColor: "#950C33",
                  width: "100%",
                }}
              >
                Update
              </Button>
            </Col>
            <Col xs={12}>
              <Button
                type="default"
                onClick={handleCancel}
                style={{ width: "100%", borderColor: "#950C33" }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default ViewLicenseDetails;
