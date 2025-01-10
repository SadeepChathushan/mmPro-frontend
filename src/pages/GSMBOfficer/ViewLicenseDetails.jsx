import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Input, DatePicker, Button, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const ViewLicenseDetails = () => {
  const { id } = useParams(); // Retrieve the id from the URL
  const history = useHistory(); // For navigation
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null); // To hold fetched license data

  useEffect(() => {
    const fetchLicenseDetails = async () => {
      setLoading(true);
      try {
        const username = "@achinthamihiran"; // Replace with actual username
        const password = "Ab2#*De#"; // Replace with actual password

        const response = await axios.get(
          `/api/issues/${id}.json`, // Fetch details for the specific id
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
        const licenseData = {
          licenseNumber: issue.custom_fields.find((field) => field.name === "License Number")?.value || "N/A",
          ownerName: issue.custom_fields.find((field) => field.name === "Owner Name")?.value || "N/A",
          location: issue.custom_fields.find((field) => field.name === "Location")?.value || "N/A",
          capacity: issue.custom_fields.find((field) => field.name === "Capacity")?.value || "N/A",
          issueDate: issue.start_date ? dayjs(issue.start_date) : null,
          expiryDate: issue.due_date ? dayjs(issue.due_date) : null,
          mobile: issue.custom_fields.find((field) => field.name === "Mobile")?.value || "N/A",
        };

        setInitialData(licenseData);
        form.setFieldsValue(licenseData); // Populate form with fetched data
      } catch (error) {
        console.error("Error fetching license details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLicenseDetails();
    }
  }, [id, form]);

  const handleUpdate = (values) => {
    console.log("Updated values: ", values);
    // Perform the update API call here
  };

  const handleCancel = () => {
    form.resetFields();
  };

  if (loading || !initialData) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

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
        onClick={() => history.push("/gsmb/dashboard")}
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
          onFinish={handleUpdate}
          initialValues={initialData} // Directly passing the fetched data
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
