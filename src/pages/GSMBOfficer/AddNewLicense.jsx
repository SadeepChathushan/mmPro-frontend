import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLanguage } from "../../contexts/LanguageContext";

const NewLicenseForm = () => {
  const { language } = useLanguage();
  const [form] = Form.useForm();

  // Handle form submission and post data
  const onFinish = async (values) => {
    try {
      const payload = {
        issue: {
          project: { id: 18 },
          tracker: { id: 5 },
          subject: language === "en" ? "New License" : "නව බලපත්‍රය",
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
        {language === "en" ? "New License" : "නව බලපත්‍රය"}
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
              label={language === "en" ? "License Number" : "බලපත්‍රය අංකය"}
              name="licenseNumber"
              rules={[{ required: true, message: language === "en" ? "Please input the license number!" : "කරුණාකර අවසරපත්‍ර අංකය ඇතුළත් කරන්න!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Owner Name" : "අයිතිකරුගේ නම"}
              name="ownerName"
              rules={[{ required: true, message: language === "en" ? "Please input the owner name!" : "කරුණාකර අයිතිකරුගේ නම ඇතුළත් කරන්න!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Validity Start" : "වලංගුතාව ආරම්භක දිනය"}
              name="validityStart"
              rules={[{ required: true, message: language === "en" ? "Please select the start date!" : "කරුණාකර ආරම්භක දිනය තෝරන්න!" }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Valid Until" : "අවලංගු වන දිනය"}
              name="endDate"
              rules={[{ required: true, message: language === "en" ? "Please select the end date!" : "කරුණාකර අවසාන දිනය තෝරන්න!" }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Capacity (Cubes)" : "කියුබ්ස් ගණන"}
              name="capacity"
              rules={[{ required: true, message: language === "en" ? "Please input the capacity!" : "කරුණාකර කියුබ්ස් ගණන ඇතුළත් කරන්න!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Mobile" : "ජංගම දුරකථන අංකය"}
              name="mobile"
              rules={[{ required: true, message: language === "en" ? "Please input the mobile number!" : "කරුණාකර ජංගම අංකය ඇතුළත් කරන්න!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label={language === "en" ? "Location" : "ස්ථානය"}
              name="location"
              rules={[{ required: true, message: language === "en" ? "Please input the location!" : "කරුණාකර ස්ථානය ඇතුළත් කරන්න!" }]}
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
                  {language === "en" ? "Create License" : "බලපත්‍රය සාදන්න"}
                </Button>

                <Button
                  type="default"
                  onClick={handleCancel}
                  style={{
                    width: "48%",
                    borderColor: "#950C33",
                  }}
                >
                  {language === "en" ? "Cancel" : "අවලංගු කරන්න"}
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