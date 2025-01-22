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

      // Retrieve API Key from localStorage
      const apiKey = localStorage.getItem("API_Key");

      console.log("API Key from localStorage:", apiKey);

      if (!apiKey) {
        console.error("API Key not found in localStorage");
        return;
      }

      // Post the data to the API
      const response = await axios.post( "/api/projects/new-license/issues.json",{
          headers: {
            "Content-Type": "application/json",
            "X-Redmine-API-Key": apiKey, // Pass the API Key in the header
          },
      });

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
      // style={{
      //   maxWidth: "800px",
      //   margin: "0 auto",
      //   padding: "20px",
      //   background: "#f0f2f5",
      //   borderRadius: "10px",
      // }}
    >
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

      <h2 style={{ textAlign: "center", fontWeight: "bold", color: "#1a1a1a" ,fontSize:"32px" }}>
        {language === "en" ? "New License" : "නව බලපත්‍රය"}
      </h2>
      <Form
      
        form={form}
        layout="vertical"
        onFinish={onFinish}
        // style={{ gap: "16px" }}
      >
        <Row gutter={[16, 16]} >
          <Col xs={24} sm={24} md={12} >
            <Form.Item
              
              label={language === "en" ? "License Number" : "බලපත්‍රය අංකය"}
              name="licenseNumber"
              rules={[{ required: true, message: language === "en" ? "Please input the license number!" : "කරුණාකර අවසරපත්‍ර අංකය ඇතුළත් කරන්න!" }]}
            >
              <Input  style={{fontSize:"24px"}}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Owner Name" : "අයිතිකරුගේ නම"}
              name="ownerName"
              rules={[{ required: true, message: language === "en" ? "Please input the owner name!" : "කරුණාකර අයිතිකරුගේ නම ඇතුළත් කරන්න!" }]}
            >
              <Input style={{fontSize:"24px"}}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
            
              label={language === "en" ? "Validity Start" : "වලංගුතාව ආරම්භක දිනය"}
              name="validityStart"
              rules={[{ required: true, message: language === "en" ? "Please select the start date!" : "කරුණාකර ආරම්භක දිනය තෝරන්න!" }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" , fontSize:"24px" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Valid Until" : "අවලංගු වන දිනය"}
              name="endDate"
              rules={[{ required: true, message: language === "en" ? "Please select the end date!" : "කරුණාකර අවසාන දිනය තෝරන්න!" }]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" ,fontSize:"24px"}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Capacity (Cubes)" : "කියුබ්ස් ගණන"}
              name="capacity"
              rules={[{ required: true, message: language === "en" ? "Please input the capacity!" : "කරුණාකර කියුබ්ස් ගණන ඇතුළත් කරන්න!" }]}
            >
              <Input style={{fontSize:"24px"}}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Mobile" : "ජංගම දුරකථන අංකය"}
              name="mobile"
              rules={[{ required: true, message: language === "en" ? "Please input the mobile number!" : "කරුණාකර ජංගම අංකය ඇතුළත් කරන්න!" }]}
            >
              <Input style={{fontSize:"24px"}}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}
           style={{fontSize:'32px' , justifyContent:"center"}}>
            <Form.Item
             label=
              
             {language === "en" ? "Location" : "ස්ථානය"}
              name="location"
              rules={[{ required: true, message: language === "en" ? "Please input the location!" : "කරුණාකර ස්ථානය ඇතුළත් කරන්න!" }]}
              
            >
              <Input style={{fontSize:"24px"}}/>
            </Form.Item>
          </Col>



          <Col xs={24}>
            <Form.Item>
              <div style={{ 
                marginLeft:"10px",
                display: "flex", 
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",
                gap: "50px", 
                alignItems:"center"
                }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    flex:"1 1 48%",
                    maxWidth: "300px",
                    backgroundColor: "#950C33",
                    borderColor: "#950C33",
                    height:"40px",
                    // width: "48%",
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
                  {language === "en" ? "Create License" : "බලපත්‍රය සාදන්න"}
                </Button>

                <Button
                  type="default"
                  onClick={handleCancel}
                  style={{
                    flex:"1 1 48%",
                    maxWidth:"300px",
                    // width: "48%",
                    backgroundColor:"#FFFFFF",
                    borderColor: "#950C33",
                    height:"40px"
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