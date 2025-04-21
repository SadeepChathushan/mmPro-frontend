import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Tabs, message, ConfigProvider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import officerService from "../../services/officerService";
import "../../styles/GSMBofficer/gsmbofficer.css";

const MlOwnerRegister = () => {
  const { language } = useLanguage();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("owner");
  const [role, setRole] = useState(null);
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const roleParam = queryParams.get('role');
    
    if (!roleParam) {
      message.warning(
        language === "en"
          ? "No role specified. Redirecting..."
          : language === "si"
          ? "කිසිදු භූමිකාවක් නියම කර නැත. යළි-යොමු කිරීම..."
          : "எந்தப் பாத்திரமும் குறிப்பிடப்படவில்லை. திருப்பி விடப்படுகிறது..."
      );
      navigate('/register');
      return;
    }
    
    setRole(roleParam);
    
    if (roleParam !== 'ml_owner') {
      message.warning(
        language === "en"
          ? "Invalid role for this registration form"
          : language === "si"
          ? "මෙම ලියාපදිංචි ආකෘතිය සඳහා වලංගු නොවන භූමිකාව"
          : "இந்த பதிவு படிவத்திற்கு தவறான பங்கு"
      );
      navigate('/register');
    }
  }, [search, language, navigate]);

  const onFinish = async (values) => {
    try {
      let userPayload;
      
      if (activeTab === "owner") {
        userPayload = {
          user: {
            login: values.firstname,
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            role: role,
            custom_fields: [
              { id: 21, name: "Mobile Number", value: values.phoneNumber },
              { id: 22, name: "Address", value: values.address },
              { id: 20, name: "NIC", value: values.NIC },
            ],
          },
        };
      } else {
        userPayload = {
          user: {
            login: values.companyName,
            firstname: values.companyName,
            email: values.companyEmail,
            role: role,
            custom_fields: [
              { id: 21, name: "Mobile Number", value: values.companyPhoneNumber },
              { id: 22, name: "Address", value: values.companyAddress },
              { id: 23, name: "Company Registration Number", value: values.companyRegNo },
              { id: 24, name: "Company Type", value: values.companyType },
            ],
          },
        };
      }

      const newUser = await officerService.registerUser(userPayload);
      if (!newUser || !newUser.id) {
        throw new Error("User registration failed.");
      }
  
      console.log("User registered successfully:", newUser);
  
      message.success(
        activeTab === "owner"
          ? (language === "en"
              ? "Mining License Owner registered successfully!"
              : language === "si"
              ? "පතල් බලපත්‍ර හිමිකරු සාර්ථකව ලියාපදිංචි කරන ලදී!"
              : "சுரங்க அனுமதி உரிமையாளர் வெற்றிகரமாக பதிவு செய்யப்பட்டது!")
          : (language === "en"
              ? "Mining License Company registered successfully!"
              : language === "si"
              ? "පතල් බලපත්‍ර සමාගම සාර්ථකව ලියාපදිංචි කරන ලදී!"
              : "சுரங்க அனுமதி நிறுவனம் வெற்றிகரமாக பதிவு செய்யப்பட்டது!")
      );
  
      form.resetFields();
      navigate('/login');
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
    navigate('/register');
  };

  const renderContactFields = (prefix = "") => {
    const namePrefix = prefix ? `${prefix}` : "";
    
    return (
      <>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label={language === "en" 
              ? `${prefix ? "Company " : ""}Mobile Number` 
              : language === "si" 
              ? `${prefix ? "සමාගම් " : ""}ජංගම දුරකථන අංකය` 
              : `${prefix ? "நிறுவன " : ""}மொபைல் எண்`}
            name={`${namePrefix}phoneNumber`}
            rules={[
              {
                required: true,
                message:
                  language === "en"
                    ? `Please input the ${prefix ? "company " : ""}mobile number!`
                    : language === "si"
                    ? `${prefix ? "සමාගම් " : ""}ජංගම දුරකථන අංකය ඇතුළත් කරන්න!`
                    : `${prefix ? "நிறுவன " : ""}மொபைல் எண்ணை உள்ளிடவும்!`,
              },
              {
                pattern: /^[0-9]{10}$/,
                message:
                  language === "en"
                    ? "Please enter a valid 10-digit mobile number!"
                    : language === "si"
                    ? "කරුණාකර වලංගු ජංගම දුරකථන අංකයක් ඇතුළත් කරන්න!"
                    : "சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்!",
              },
            ]}
          >
            <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
          </Form.Item>
        </Col>
        
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label={language === "en" 
              ? `${prefix ? "Company " : ""}Address` 
              : language === "si" 
              ? `${prefix ? "සමාගම් " : ""}ලිපිනය` 
              : `${prefix ? "நிறுவன " : ""}முகவரி`}
            name={`${namePrefix}address`}
            rules={[
              {
                required: true,
                message:
                  language === "en"
                    ? `Please input the ${prefix ? "company " : ""}address!`
                    : language === "si"
                    ? `${prefix ? "සමාගම් " : ""}ලිපිනය ඇතුළත් කරන්න!`
                    : `${prefix ? "நிறுவன " : ""}முகவரியை உள்ளிடவும்!`,
              },
            ]}
          >
            <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
          </Form.Item>
        </Col>
      </>
    );
  };

  const renderOwnerForm = () => (
    <Row gutter={[16, 16]} style={{ padding: '0 20px' }}>
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
            {
              type: 'email',
              message:
                language === "en"
                  ? "Please enter a valid email!"
                  : language === "si"
                  ? "කරුණාකර වලංගු ඊමේල් ලිපිනයක් ඇතුළත් කරන්න!"
                  : "சரியான மின்னஞ்சலை உள்ளிடவும்!",
            },
          ]}
        >
          <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
        </Form.Item>
      </Col>

      {renderContactFields()}

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
            {
              pattern: /^([0-9]{9}[xXvV]|[0-9]{12})$/,
              message:
                language === "en"
                  ? "Please enter a valid NIC number!"
                  : language === "si"
                  ? "කරුණාකර වලංගු ජාතික හැඳුනුම්පත අංකයක් ඇතුළත් කරන්න!"
                  : "சரியான தேசிய அடையாள எண்ணை உள்ளிடவும்!",
            },
          ]}
        >
          <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderCompanyForm = () => (
    <Row gutter={[16, 16]} style={{ padding: '0 20px' }}>
      <Col xs={24} sm={24} md={12}>
        <Form.Item
          label={language === "en" ? "Company Name" : language === "si" ? "සමාගමේ නම" : "நிறுவன பெயர்"}
          name="companyName"
          rules={[
            {
              required: true,
              message:
                language === "en"
                  ? "Please input the company name!"
                  : language === "si"
                  ? "සමාගමේ නම ඇතුළත් කරන්න!"
                  : "நிறுவன பெயரை உள்ளிடவும்!",
            },
          ]}
        >
          <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
        </Form.Item>
      </Col>

      <Col xs={24} sm={24} md={12}>
        <Form.Item
          label={language === "en" ? "Company Registration Number" : language === "si" ? "සමාගම් ලියාපදිංචි අංකය" : "நிறுவன பதிவு எண்"}
          name="companyRegNo"
          rules={[
            {
              required: true,
              message:
                language === "en"
                  ? "Please input the company registration number!"
                  : language === "si"
                  ? "සමාගම් ලියාපදිංචි අංකය ඇතුළත් කරන්න!"
                  : "நிறுவன பதிவு எண்ணை உள்ளிடவும்!",
            },
          ]}
        >
          <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
        </Form.Item>
      </Col>

      <Col xs={24} sm={24} md={12}>
        <Form.Item
          label={language === "en" ? "Company Type" : language === "si" ? "සමාගමේ වර්ගය" : "நிறுவன வகை"}
          name="companyType"
          rules={[
            {
              required: true,
              message:
                language === "en"
                  ? "Please input the company type!"
                  : language === "si"
                  ? "සමාගමේ වර්ගය ඇතුළත් කරන්න!"
                  : "நிறுவன வகையை உள்ளிடவும்!",
            },
          ]}
        >
          <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
        </Form.Item>
      </Col>

      <Col xs={24} sm={24} md={12}>
        <Form.Item
          label={language === "en" ? "Company Email" : language === "si" ? "සමාගම් විද්‍යුත් තැපෑල" : "நிறுவன மின்னஞ்சல்"}
          name="companyEmail"
          rules={[
            {
              required: true,
              message:
                language === "en"
                  ? "Please input the company email!"
                  : language === "si"
                  ? "සමාගම් විද්‍යුත් තැපෑල ඇතුළත් කරන්න!"
                  : "நிறுவன மின்னஞ்சலை உள்ளிடவும்!",
            },
            {
              type: 'email',
              message:
                language === "en"
                  ? "Please enter a valid email!"
                  : language === "si"
                  ? "කරුණාකර වලංගු ඊමේල් ලිපිනයක් ඇතුළත් කරන්න!"
                  : "சரியான மின்னஞ்சலை உள்ளிடவும்!",
            },
          ]}
        >
          <Input className="text-input" style={{ color: "black", fontSize: "20px" }} />
        </Form.Item>
      </Col>

      {renderContactFields("company")}
    </Row>
  );

  const tabItems = [
    {
      key: "owner",
      label: language === "en" 
        ? "Register New License Owner" 
        : language === "si" 
        ? "නව බලපත්‍ර අයිතිකරු ලියාපදිංචි කරන්න" 
        : "புதிய அனுமதி உரிமையாளரை பதிவு செய்",
      children: (
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={onFinish}
          className="black-text-form"
        >
          {renderOwnerForm()}
          
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
                  padding: '20px 0'
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
        </Form>
      )
    },
    {
      key: "company",
      label: language === "en" 
        ? "Register New License Company" 
        : language === "si" 
        ? "නව බලපත්‍ර සමාගම ලියාපදිංචි කරන්න" 
        : "புதிய அனுமதி நிறுவனத்தை பதிவு செய்",
      children: (
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={onFinish}
          className="black-text-form"
        >
          {renderCompanyForm()}
          
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
                  padding: '20px 0'
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
        </Form>
      )
    }
  ];

  if (!role) {
    return null;
  }

  return (
    <div className="license-form-container" style={{ padding: '30px 20px' }}>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#1a1a1a",
          fontSize: "32px",
          marginBottom: '20px'
        }}
      >
        {language === "en"
          ? "Register New License"
          : language === "si"
          ? "නව බලපත්‍ර ලියාපදිංචි කරන්න"
          : "புதிய அனுமதி பதிவு"}
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
        <div style={{ padding: '0 15px' }}>
          <Tabs 
            centered 
            activeKey={activeTab} 
            onChange={setActiveTab}
            items={tabItems}
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default MlOwnerRegister;