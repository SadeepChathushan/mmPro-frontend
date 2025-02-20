import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import uploadMediaToSupabase from "../../utils/imageUpload";
import { useLanguage } from "../../contexts/LanguageContext";
import officerService from "../../services/officerService";


const NewLicenseForm = () => {
  const { language } = useLanguage();
  const [form] = Form.useForm();


  const onFinish = async (values) => {
    try {
      const userPayload = {
        user: {
          login: values.firstname, // Ensure this is unique
          firstname: values.firstname,
          lastname: values.lastname,
          mail: values.mail,

          custom_fields: [
            { id: 21, name: "Mobile Number", value: values.phoneNumber },
            { id: 22, name: "Address", value: values.address },
            { id: 20, name: "NIC", value: values.NIC },
          ],
        },
      };

  
      const newUser = await officerService.registerUser(userPayload);
      if (!newUser || !newUser.id) {
        throw new Error("User registration failed.");
      }
  
      console.log("User registered successfully:", newUser);
  
      // Assign user to GSMB project with ML Owner role
      const projectId = 31; // GSMB Project ID
      const mlOwnerRoleId = 10; // Ensure this is correct
  
      const membership = await officerService.assignUserToProject(
        newUser.id,
        projectId,
        mlOwnerRoleId
      );
  
      if (!membership) {
        throw new Error("Failed to assign user to project.");
      }
  
      console.log("User assigned to GSMB project successfully:", membership);
      message.success(
        language === "en"
          ? "Mining License Owner registered successfully!"
          : "පතල් බලපත්‍ර හිමිකරු සාර්ථකව ලියාපදිංචි කරන ලදී!"
      );
  

      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
      message.error(
        language === "en"
          ? "Failed to complete process. Please try again."
          : "ක්‍රියාවලිය සම්පූර්ණ කිරීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න."
      );
    }
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <div>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: "10px", paddingLeft: 0, color: "#000000" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#EFE29C"; // Hover color
          e.currentTarget.style.borderColor = "#EFE29C"; // Hover border
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ffffff"; // Default color
          e.currentTarget.style.borderColor = "#ffffff"; // Default border
        }}
        href="/gsmb/dashboard"
      >
        {language === "en" ? "Back" : "ආපසු"}
      </Button>

      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#1a1a1a",
          fontSize: "32px",
        }}
      >
        {language === "en"
          ? "Register New License Owner"
          : "නව බලපත්‍ර අයිතිකරු ලියාපදිංචි කරන්න"}
      </h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              style={{ fontSize: "32px" }}

              label={language === "en" ? "First Name" : "අයිතිකරුගේ මුල් නම"}
              name="firstname"

              rules={[
                {
                  required: true,
                  message:
                    language === "en"

                      ? "Please input the first name!"
                      : "අයිතිකරුගේ මුල් නම ඇතුළත් කරන්න!",

                },
              ]}
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>


          <Col xs={24} sm={24} md={12}>
            <Form.Item

              style={{ fontSize: "32px" }}
              label={language === "en" ? "Last Name" : "අයිතිකරුගේ අවසන් නම"}
              name="lastname"

              rules={[
                {
                  required: true,
                  message:
                    language === "en"

                      ? "Please input the last name!"
                      : "අයිතිකරුගේ අවසන් නම ඇතුළත් කරන්න!",

                },
              ]}
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item

              label={language === "en" ? "Email Address" : "විද්‍යුත් තැපෑල"}
              name="mail"

              rules={[
                {
                  required: true,
                  message:
                    language === "en"

                      ? "Please input the Email!"
                      : "විද්‍යුත් තැපෑල ඇතුළත් කරන්න!",

                },
              ]}
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item

              label={language === "en" ? "Mobile Number" : "ජංගම දුරකථන අංකය"}
              name="phoneNumber"

              rules={[
                {
                  required: true,
                  message:
                    language === "en"

                      ? "Please input the mobile number!"
                      : "ජංගම දුරකථන අංකය ඇතුළත් කරන්න!",

                },
              ]}
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>
         
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Address" : "ලිපිනය"}
              name="address"
              rules={[
                {
                  required: true,
                  message:
                    language === "en"
                      ? "Please input the address!"
                      : "ලිපිනය ඇතුළත් කරන්න!",
                },
              ]}
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "NIC" : "ජාතික හැඳුනුම්පත"}
              name="NIC"

              rules={[
                {
                  required: true,
                  message:
                    language === "en"

                      ? "Please input the NIC Number!"
                      : "ජාතික හැඳුනුම්පත ඇතුළත් කරන්න!",
                },
              ]}
            >
              <Input style={{ fontSize: "24px" }} />

            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item>
              <div
                style={{
                  marginLeft: "10px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "50px",
                  alignItems: "center",

                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    flex: "1 1 48%",
                    maxWidth: "300px",
                    // width: "48%",
                    backgroundColor: "#950C33",
                    borderColor: "#950C33",
                    height: "40px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFE143"; // Hover color
                    e.currentTarget.style.borderColor = "#FFE143"; // Hover border
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#950C33"; // Default color
                    e.currentTarget.style.borderColor = "#950C33"; // Default border
                  }}
                >

                  {language == "en"
                    ? "Create Mining License Owner"
                    : "පතල් බලපත්‍ර හිමිකරු සාදන්න"}

                </Button>
                <Button
                  type="default"
                  onClick={handleCancel}
                  style={{
                    flex: "1 1 48%",
                    maxWidth: "300px",
                    // width: "48%",
                    borderColor: "#950C33",
                    backgroundColor: "#FFFFFF",
                    height: "40px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#950C33"; // Hover color
                    e.currentTarget.style.borderColor = "#950C33"; // Hover border
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF"; // Default color
                    e.currentTarget.style.borderColor = "#950C33"; // Default border
                  }}
                >
                  {language == "en" ? "Cancel" : "අවලංගු කරන්න"}
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
