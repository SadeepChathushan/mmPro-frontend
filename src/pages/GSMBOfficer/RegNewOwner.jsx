import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message, ConfigProvider } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import uploadMediaToSupabase from "../../utils/imageUpload";
import { useLanguage } from "../../contexts/LanguageContext";
import officerService from "../../services/officerService";
import "../../styles/GSMBofficer/gsmbofficer.css"; // Import the same CSS file used by the first component

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
          email: values.email,

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
  
      message.success(
        language === "en"
          ? "Mining License Owner registered successfully!"
          : language === "si"
          ? "පතල් බලපත්‍ර හිමිකරු සාර්ථකව ලියාපදිංචි කරන ලදී!"
          : "சுரங்க அனுமதி உரிமையாளர் வெற்றிகரமாக பதிவு செய்யப்பட்டது!"
      );
  
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
      message.error(
        language === "en"
          ? "Failed to complete process. Please try again."
          : language === "si"
          ? "ක්‍රියාවලිය සම්පූර්ණ කිරීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න."
          : "செயல்முறை முடிக்க தோல்வியுற்றது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
      );
    }
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <div className="license-form-container">
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: "10px", paddingLeft: 0, color: "#000000" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#EFE29C";
          e.currentTarget.style.borderColor = "#EFE29C";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ffffff";
          e.currentTarget.style.borderColor = "#ffffff";
        }}
        href="/gsmb/dashboard"
      >
        {language === "en" ? "Back" : language === "si" ? "ආපසු" : "மீண்டும்"}
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
          : language === "si"
          ? "නව බලපත්‍ර අයිතිකරු ලියාපදිංචි කරන්න"
          : "புதிய அனுமதி உரிமையாளரை பதிவு செய்"}
      </h2>
      
      <ConfigProvider 
        theme={{ 
          token: {
            fontSize: 18,
            colorText: "black",
            colorPrimary: "#950C33",
            colorTextPlaceholder: "rgba(0, 0, 0, 0.45)",
            colorTextDisabled: "rgba(0, 0, 0, 0.65)",
          },
          components: { 
            Input: { 
              colorText: "black",
              colorTextDisabled: "rgba(0, 0, 0, 0.65)",
              colorTextPlaceholder: "rgba(0, 0, 0, 0.45)",
            },
            Form: {
              colorTextLabel: "black",
            }
          } 
        }}
      >
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={onFinish}
          className="black-text-form"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "First Name" : language === "si" ? "අයිතිකරුගේ මුල් නම" : "உரிமையாளர் முதற்கொண்டு பெயர்"}
                name="firstname"
                rules={[
                  {
                    required: true,
                    message:
                      language === "en"
                        ? "Please input the first name!"
                        : language === "si"
                        ? "අයිතිකරුගේ මුල් නම ඇතුළත් කරන්න!"
                        : "உரிமையாளர் முதற்கொண்டு பெயரை உள்ளிடவும்!",
                  },
                ]}
              >
                <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Last Name" : language === "si" ? "අයිතිකරුගේ අවසන් නම" : "உரிமையாளர் கடைசி பெயர்"}
                name="lastname"
                rules={[
                  {
                    required: true,
                    message:
                      language === "en"
                        ? "Please input the last name!"
                        : language === "si"
                        ? "අයිතිකරුගේ අවසන් නම ඇතුළත් කරන්න!"
                        : "உரிமையாளர் கடைசி பெயரை உள்ளிடவும்!",
                  },
                ]}
              >
                <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Email Address" : language === "si" ? "විද්‍යුත් තැපෑල" : "மின்னஞ்சல் முகவரி"}
                name="email"
                rules={[
                  {
                    required: true,
                    message:
                      language === "en"
                        ? "Please input the Email!"
                        : language === "si"
                        ? "විද්‍යුත් තැපෑල ඇතුළත් කරන්න!"
                        : "மின்னஞ்சலை உள்ளிடவும்!",
                  },
                ]}
              >
                <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Mobile Number" : language === "si" ? "ජංගම දුරකථන අංකය" : "மொபைல் எண்"}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message:
                      language === "en"
                        ? "Please input the mobile number!"
                        : language === "si"
                        ? "ජංගම දුරකථන අංකය ඇතුළත් කරන්න!"
                        : "மொபைல் எண்ணை உள்ளிடவும்!",
                  },
                ]}
              >
                <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
              </Form.Item>
            </Col>
           
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Address" : language === "si" ? "ලිපිනය" : "முகவரி"}
                name="address"
                rules={[
                  {
                    required: true,
                    message:
                      language === "en"
                        ? "Please input the address!"
                        : language === "si"
                        ? "ලිපිනය ඇතුළත් කරන්න!"
                        : "முகவரியை உள்ளிடவும்!",
                  },
                ]}
              >
                <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "NIC" : language === "si" ? "ජාතික හැඳුනුම්පත" : "தேசிய அடையாளம்"}
                name="NIC"
                rules={[
                  {
                    required: true,
                    message:
                      language === "en"
                        ? "Please input the NIC Number!"
                        : language === "si"
                        ? "ජාතික හැඳුනුම්පත ඇතුළත් කරන්න!"
                        : "தேசிய அடையாள எண்ணை உள்ளிடவும்!",
                  },
                ]}
              >
                <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
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
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      flex: "1 1 48%",
                      maxWidth: "300px",
                      backgroundColor: "#950C33",
                      borderColor: "#950C33",
                      height: "40px",
                    }}
                  >
                    {language === "en"
                      ? "Create"
                      : language === "si"
                      ? "සාදන්න"
                      : "உருவாக்க"}
                  </Button>
                  <Button
                    type="default"
                    onClick={handleCancel}
                    style={{
                      flex: "1 1 48%",
                      maxWidth: "300px",
                      backgroundColor: "#FFFFFF",
                      borderColor: "#950C33",
                      height: "40px",
                      color: "black",
                    }}
                  >
                    {language === "en" ? "Cancel" : language === "si" ? "අවලංගු කරන්න" : "ரத்து செய்"}
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default NewLicenseForm;