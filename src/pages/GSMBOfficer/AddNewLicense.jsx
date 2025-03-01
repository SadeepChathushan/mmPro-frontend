
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, DatePicker, Row, Col, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import getValidationRules from "../../utils/validationRules";
import officerService from "../../services/officerService";
import moment from "moment";

const NewLicenseForm = () => {
  const { language } = useLanguage();
  const [form] = Form.useForm();
  const rules = getValidationRules(language);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  const { userId } = useParams();
  console.log("user id is ", userId);

  //###############################    UseEffect #################################################

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await officerService.getUserDetails(userId);
        console.log("Data fetch", data);
        // Check if the data is in the expected format and set it to state
        if (data && data.user_detail) {
          setUserDetails(data.user_detail);  // Set the state correctly
        } else {
          setError("User details not found.");
        }
      } catch (error) {
        setError("Failed to fetch user details. Please try again.");
      }
    };
  
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);
  

  // Render a loading message while userDetails are being fetched
  if (!userDetails) {
    return <div>Loading user details...</div>;
  }



  const onFinish = async (values) => {
    try {
      const payload = {
        issue: {
          project: { id: 31 },
          tracker: { id: 7 },
          // Remove the duplicate subject key and only keep the correct one
          // subject: language === "en" ? "New License" : "නව බලපත්‍රය",
          status: { id: 17 },
          // assigned_to:{userID}
          subject:values.licenseNumber,
          start_date: values.validityStart.format("YYYY-MM-DD"),
          due_date: values.endDate.format("YYYY-MM-DD"),
          estimated_hours: 24.0,
          custom_fields: [
            { id: 8, name: "License Number", value: values.licenseNumber },
            { id: 2, name: "Owner Name", value: values.ownerName },
            { id: 3, name: "Mobile Number", value: values.mobile },
            { id: 5, name: "Capacity", value: values.capacity },
            { id: 11, name: "Location", value: values.location },
            { id: 37, name: "NIC", value: values.NIC },
          ],
        },
      };

      const result = await officerService.addNewLicense(payload);

      console.log("Data posted successfully:", result);
      message.success(
        language === "en"
          ? "License created successfully!"
          : "බලපත්‍රය සාර්ථකව සාදන ලදි!"
      );
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

  const handleCancel = () => {
    form.resetFields();
  };

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

  if (error) {
    return (
      <div style={{ textAlign: "center", fontSize: "20px", color: "red" }}>
        {error}
      </div>
    );
  }
    
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
    NIC:
      userDetails?.custom_fields?.find((field) => field.name === "NIC")
        ?.value || "",
    ownerName: `${userDetails?.firstname} ${userDetails?.lastname}` || "",
    mobile:
      userDetails?.custom_fields?.find((field) => field.name === "Phone Number")
        ?.value || "",
    capacity: "", // Default to empty for officer to fill
    location: "", // Default to empty for officer to fill
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
            >
              <Input
                style={{ fontSize: "24px" }}
                value={`${userDetails?.firstname} ${userDetails?.lastname}`} // Fetched from user data
                disabled
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Mobile" : "ජංගම දුරකථන අංකය"}
              name="mobile"
            >
              <Input
                style={{ fontSize: "24px" }}
                value={
                  userDetails?.custom_fields?.find(
                    (field) => field.name === "Phone Number"
                  )?.value
                }
                disabled
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "NIC" : "ජාතික හැඳුනුම්පත් අංකය"}
              name="NIC"
            >
              <Input
                style={{ fontSize: "24px" }}
                value={
                  userDetails?.custom_fields?.find(
                    (field) => field.name === "NIC"
                  )?.value
                }
                disabled
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Capacity (Cubes)" : "කියුබ්ස් ගණන"}
              name="capacity"
              rules={rules.capacity}
            >
              <Input style={{ fontSize: "24px" }} />
            </Form.Item>
          </Col>

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
              rules={[...rules.endDate]}
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
