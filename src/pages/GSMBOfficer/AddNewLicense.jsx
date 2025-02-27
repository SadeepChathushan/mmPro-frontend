
// NewLicenseForm.js

import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
  message,
  InputNumber,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import getValidationRules from "../../utils/validationRules";
import officerService from "../../services/officerService";
import moment from "moment";

const NewLicenseForm = () => {
  const { language } = useLanguage();
  const [form] = Form.useForm();
  const rules = getValidationRules(language);

  // Handle form submission
  const onFinish = async (values) => {
    try {
      // Build the payload to match Redmine's issue creation format
      const payload = {
        issue: {

          project: { id: 31 }, // GSMB Project ID
          tracker: { id: 7 }, // ML Tracker ID
          subject: values.licenseNumber,
          status: { id: 17 },
          // priority: { id: 2 },
          start_date: values.validityStart.format("YYYY-MM-DD"), // Start date
          due_date: values.endDate.format("YYYY-MM-DD"), // End date
          estimated_hours: 24.0, // Default estimated hour
          subject: language === "en" ? "New License" : "නව බලපත්‍රය",

          custom_fields: [
            { id: 8, name: "License Number", value: values.licenseNumber },
            { id: 2, name: "Owner Name", value: values.ownerName },
            { id: 3, name: "Mobile Number", value: values.mobile },
            { id: 5, name: "Capacity", value: values.capacity },
            { id: 11, name: "Location", value: values.location },
            { id: 37, name: "NIC", value: values.NIC },
            // { id: 84, name: "Used", value: "0" }, // Initially, no capacity is used
            // { id: 85, name: "Remaining", value: values.capacity }, // Full capacity at start
            // { id: 86, name: "Royalty(sand)due", value: "0" }, // No royalty due initially
          ],
        },
      };

      // Call the service function to add a new license
      const result = await officerService.addNewLicense(payload);

      console.log("Data posted successfully:", result);
      message.success(
        language === "en"
          ? "License created successfully!"
          : "බලපත්‍රය සාර්ථකව සාදන ලදි!"
      );
      // Reset the form after successful submission
      form.resetFields();
    } catch (error) {
      console.error("Error posting data:", error);
      message.error(
        language === "en"
          ? "Failed to create license. Please try again."
          : "බලපත්‍රය සාදීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න."
      );
    }
  };

  // Handle form cancel
  const handleCancel = () => {
    form.resetFields();
  };

  // Custom validator to ensure endDate is after validityStart
  const validateEndDate = (_, value) => {
    const startDate = form.getFieldValue("validityStart");
    if (!value || !startDate) {
      return Promise.resolve();
    }
    if (value.isSameOrAfter(startDate, "day")) {
      return Promise.resolve();
    }
    return Promise.reject(
      language === "en"
        ? "End Date must be after the Start Date!"
        : "අවසාන දිනය ආරම්භක දිනයට පසු විය යුතුයි!"
    );
  };

  return (
    <div>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        style={{
          marginBottom: "10px",
          paddingLeft: 0,
          color: "#000000",
        }}
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
        {language === "en" ? "New License" : "නව බලපත්‍රය"}
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          validityStart: null,
          endDate: null,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "License Number" : "බලපත්‍රය අංකය"}
              name="licenseNumber"
              rules={rules.licenseNumber}
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Owner Name" : "අයිතිකරුගේ නම"}
              name="ownerName"
              rules={rules.ownerName}
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Mobile" : "ජංගම දුරකථන අංකය"}
              name="mobile"
              rules={rules.mobile}
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "NIC" : "ජාතික හැඳුනුම්පත් අංකය"}
              name="NIC"
              rules={rules.NIC} // Ensure you define validation for NIC in your rules
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>



          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Capacity (Cubes)" : "කියුබ්ස් ගණන"}
              name="capacity"
              rules={rules.capacity} // Ensure you define validation for NIC in your rules
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>


          
{/* 
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Capacity (Cubes)" : "කියුබ්ස් ගණන"}
              name="capacity"
              rules={rules.capacity}
            >
              <InputNumber
                style={{ width: "100%", fontSize: "24px" }}
                min={1}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col> */}

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Location" : "ස්ථානය"}
              name="location"
              rules={rules.location}
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={
                language === "en" ? "Validity Start" : "වලංගුතාව ආරම්භක දිනය"
              }
              name="validityStart"
              rules={rules.validityStart}
            >
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: "100%", fontSize: "24px" }}
                disabledDate={(current) =>
                  current && current < moment().startOf("day")
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Valid Until" : "අවලංගු වන දිනය"}
              name="endDate"
              rules={[
                ...rules.endDate,
                
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: "100%", fontSize: "24px" }}
                disabledDate={(current) => {
                  const startDate = form.getFieldValue("validityStart");
                  if (!startDate) {
                    return current && current < moment().startOf("day");
                  }
                  return current && current < moment(startDate).endOf("day");
                }}
              />
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFE143";
                    e.currentTarget.style.borderColor = "#FFE143";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#950C33";
                    e.currentTarget.style.borderColor = "#950C33";
                  }}
                >
                  {language === "en" ? "Create License" : "බලපත්‍රය සාදන්න"}
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
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#950C33";
                    e.currentTarget.style.borderColor = "#950C33";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                    e.currentTarget.style.borderColor = "#950C33";
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
