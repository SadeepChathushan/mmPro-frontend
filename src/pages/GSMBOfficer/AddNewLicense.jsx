
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, DatePicker, Row, Col, message, Checkbox, ConfigProvider } from "antd";
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
            { id: 12, name: "Exploration License Number", value: values.explorationLicenseNumber },
            { id: 13, name: "Land Name", value: values.landName },
            { id: 14, name: "Land Owner Name", value: values.landOwnerName },
            { id: 15, name: "Village Name", value: values.villageName },
            { id: 16, name: "Grama Niladhari Division", value: values.gramaNiladhariDivision },
            { id: 17, name: "Divisional Secretary Division", value: values.divisionalSecretaryDivision },
            { id: 18, name: "Administrative District", value: values.administrativeDistrict }
          ],
        },
      };

      const result = await officerService.addNewLicense(payload);

      console.log("Data posted successfully:", result);
      message.success(
        language === "en"
          ? "License created successfully!"
          : language === "si"
          ? "බලපත්‍රය සාර්ථකව සාදන ලදි!"
          : "அனுமதி வெற்றிகரமாக உருவாக்கப்பட்டது!"
      );
      form.resetFields();
    } catch (error) {
      console.error("Error posting data:", error);
      message.error(
        language === "en"
          ? "Failed to create license. Please try again."
          : language === "si"
          ? "බලපත්‍රය සාදීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න."
          : "அனுமதியை உருவாக்குவதில் தோல்வி. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
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
        : language === "si"
        ? "අවසාන දිනය ආරම්භක දිනයට පසු විය යුතුයි!"
        : "முடிவுத் தேதி தொடக்கத் தேதிக்கு பிறகு இருக்க வேண்டும்!"
    );
  };

  if (error) {
    return (
      <div style={{ textAlign: "center", fontSize: "20px", color: "red" }}>
        {error}
      </div>
    );
  }

  const inputStyle = { fontSize: "20px" };

    return (
    <div>
      {/* <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        style={{
          marginBottom: "10px",
          paddingLeft: 0,
          color: "#000000",
        }}
        href="/gsmb/dashboard"
        >
        {language === "en" ? "Back" : language === "si" ? "ආපසු" : "மீண்டும்"}
      </Button> */}

      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#1a1a1a",
          fontSize: "32px",
        }}
        >
        {language === "en" ? "New License" : language === "si" ? "නව බලපත්‍රය" : "புதிய அனுமதி"}
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
    licenseNumber: "",
    explorationLicenseNumber: "",
    landName: "",
    landOwnerName: "",
    villageName: "",
    gramaNiladhariDivision: "",
    divisionalSecretaryDivision: "",
    administrativeDistrict: ""
  }}
>

        <ConfigProvider 
          theme={{ 
            token: {
              fontSize: 18,
            },
            components: { 
              Input: { 
                fontSize: 24
              },
              DatePicker: {
                fontSize: 24
              } 
            } 
          }}
        >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={language === "en" ? "Industrial Mining License Number" : language === "si" ? "කාර්මික මැණික් බලපත්‍ර අංකය" : "தொழில்துறை சுரங்க அனுமதி எண்"}
              name="licenseNumber"
              rules={rules.licenseNumber}
            >
              <Input style={inputStyle} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Name Of Applicant Or Company" : language === "si" ? "අයදුම්කරු හෝ සමාගමේ නම" : "அய்தும்காரரின் அல்லது நிறுவனத்தின் பெயர்"}
                name="ownerName"
              >
                <Input 
                  style={inputStyle}
                  disabled
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Exploration License Number" : language === "si" ? "පර්යේෂණ බලපත්‍ර අංකය" : "ஆய்வு அனுமதி எண்"}
                name="explorationLicenseNumber"
                rules={rules.licenseNumber}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Land Name(License Details)" : language === "si" ? "ඉඩමේ නම (බලපත්‍ර විස්තර)" : "நிலத்தின் பெயர் (அனுமதி விவரங்கள்)"}
                name="landName"
                rules={rules.licenseNumber}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Land Owners' Name" : language === "si" ? "ඉඩම් හිමිකරුගේ නම" : "நில உரிமையாளரின் பெயர்"}
                name="landOwnerName"
                rules={rules.capacity}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Name Of Village" : language === "si" ? "ගමේ නම" : "கிராமத்தின் பெயர்"}
                name="villageName"
                rules={rules.capacity}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Grama Niladhari Division" : language === "si" ? "ග්‍රාම නිලධාරි කොට්ඨාසය" : "கிராம நிர்வாகி பிரிவு"}
                name="gramaNiladhariDivision"
                rules={rules.capacity}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Divisional Secretary Division" : language === "si" ? "ප්‍රාදේශීය ලේකම් කොට්ඨාසය" : "பிரதேச செயலாளர் பிரிவு"}
                name="divisionalSecretaryDivision"
                rules={rules.capacity}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Administrative District" : language === "si" ? "පරිපාලන දිස්ත්‍රික්කය" : "நிர்வாக மாவட்டம்"}
                name="administrativeDistrict"
                rules={rules.capacity}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Capacity (Cubes)" : language === "si" ? "කියුබ්ස් ගණන" : "கியூப்ஸ்"}
                name="capacity"
                rules={rules.capacity}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "Location" : language === "si" ? "ස්ථානය" : "இடம்"}
                name="location"
                rules={rules.location}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={language === "en" ? "NIC" : language === "si" ? "ජාතික හැඳුනුම්පත් අංකය" : "தேசிய அடையாள அட்டை எண்"}
                name="NIC"
              >
                <Input style={inputStyle} disabled />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={
                  language === "en" ? "Validity Start" : language === "si" ? "වලංගුතාව ආරම්භක දිනය" : "செல்லுபடியாகும் ஆரம்ப தேதி"
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
                label={language === "en" ? "Valid Until" : language === "si" ? "අවලංගු වන දිනය" : "செல்லுபடியாகும் தேதி"}
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

            <Col xs={24} sm={24} md={24}>
              <div style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "bold" }}>
                {language === "en" ? "Required Documents" : language === "si" ? "අවශ්‍ය ලේඛන" : "தேவையான ஆவணங்கள்"}
              </div>
            </Col>

            <Col span={12}>
              <Checkbox name="licensedBoundarySurvey" style={{ fontSize: "18px" }}>
                {language === "en" ? "Licensed Boundary Survey" : language === "si" ? "බලපත්‍රිත සීමා පරීක්ෂණය" : "அனுமதிக்கப்பட்ட எல்லை ஆய்வு"}
              </Checkbox>
            </Col>

            <Col span={12}>
              <Checkbox name="professional" style={{ fontSize: "18px" }}>
                {language === "en" ? "Professional" : language === "si" ? "වෘත්තීය" : "விருத்தி"}
              </Checkbox>
            </Col>

            <Col span={12}>
              <Checkbox name="economicViabilityReport" style={{ fontSize: "18px" }}>
                {language === "en" ? "Economic Viability Report" : language === "si" ? "ආර්ථික ශක්යතා වාර්තාව" : "பொருளாதார நம்பகத்தன்மை அறிக்கை"}
              </Checkbox>
            </Col>

            <Col span={12}>
              <Checkbox name="detailedMineRestorationPlan" style={{ fontSize: "18px" }}>
                {language === "en" ? "Detailed Mine Restoration Plan" : language === "si" ? "පතල් ප්‍රතිසංස්කරණ සැලසුම" : "சுரங்க மீட்புத் திட்டம்"}
              </Checkbox>
            </Col>

            <Col span={12}>
              <Checkbox name="licenseFeeReceipt" style={{ fontSize: "18px" }}>
                {language === "en" ? "License fee receipt" : language === "si" ? "බලපත්ර ගාස්තු කුවිතාන්සිය" : "உரிமக் கட்டண ரசீது"}
              </Checkbox>
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
                    {language === "en" ? "Create License" : language === "si" ? "බලපත්‍රය සාදන්න" : "அனுமதி உருவாக்கவும்"}
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
                    {language === "en" ? "Cancel" : language === "si" ? "අවලංගු කරන්න" : "ரத்து செய்"}
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </ConfigProvider>
      </Form>
    </div>
  );
};

export default NewLicenseForm;