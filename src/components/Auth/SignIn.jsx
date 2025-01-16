import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Checkbox, Tabs, Row, Col, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import logo from "../../assets/images/gsmbLogo.png"; // Transparent background logo
import excavator from "../../assets/images/dump-truck-pit-mine.jpg"; // Default excavator image
import signupImage from "../../assets/images/signup-image.jpg"; // New image for Sign Up tab
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Auth.css'; // Import custom CSS for transitions

const { TabPane } = Tabs;

const Auth = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState("1"); // Default to Sign In tab

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const onFinish = async (values) => {
    try {
      // Step 1: Authenticate the user to get their user ID
      const response = await axios.get("/api/users/current.json", {
        auth: {
          username: values.email,
          password: values.password,
        },
      });

      const userId = response.data.user.id; // Get user ID from response

      // Step 2: Fetch roles for the user in the "sample" project
      const membershipsResponse = await axios.get(
        `/api/projects/GSMB/memberships.json`,
        {
          auth: {
            username: values.email,
            password: values.password,
          },
        }
      );

      // Step 3: Find the role based on user ID
      const userMembership = membershipsResponse.data.memberships.find(
        (membership) => membership.user.id === userId
      );

      if (!userMembership) {
        throw new Error("User has no roles assigned in this project.");
      }

      const userRole = userMembership.roles[0].name; // Get role name (e.g., "General Public")
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("authToken", response.data.user.api_key); // Assuming you're using API key for authentication

      // Redirect based on the user's role
      if (userRole === "GSMBOfficer") {
        navigate("/gsmb/dashboard");
      } else if (userRole === "MLOwner") {
        navigate("/mlowner/home");
      } else if (userRole === "PoliceOfficer") {
        navigate("/police-officer/dashboard");
      } else {
        navigate("/dashboard/general-public");
      }
    } catch (error) {
      console.log("Login failed:", error);

      // Check if the error is due to incorrect credentials (401 status)
      if (error.response && error.response.status === 401) {
        message.error("Incorrect email or password. Please try again.");
      } else {
        // Handle other errors (e.g., network issues)
        message.error("An error occurred. Please try again later.");
      }
    }
  };

  const onFinishSignUp = async (values) => {
    try {
      // Check if password and confirm password match
      if (values.password !== values.confirmPassword) {
        message.error("Passwords do not match. Please check again.");
        return;
      }

      // Example sign-up logic (replace this with your actual API call)
      const response = await axios.post("/api/users/signup", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        address: values.address,
        phoneNumber: values.phoneNumber,
      });

      // If the sign-up is successful
      if (response.status === 201) {
        message.success("Your sign-up was successful! Please log in.");
        setActiveTab("1"); // Switch to the Sign In tab
      }
    } catch (error) {
      console.log("Sign up failed:", error);
      message.error("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: isMobile ? "20px 10px" : "0",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          width: isMobile ? "100%" : "80%",
          gap: isMobile ? "20px" : "0",
          padding: isMobile ? "20px" : "40px",
          background: "fcd5d0",
          borderRadius: 12,
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            width: isMobile ? "100%" : "50%",
            background: `url(${activeTab === "2" ? signupImage : excavator}) center center/cover no-repeat`,
            padding: "40px",
            textAlign: "center",
            color: "white",
            position: "relative",
            minHeight: isMobile ? "300px" : "450px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              zIndex: -1,
            }}
          ></div>
          <img
            src={logo}
            alt="GSMB Logo"
            style={{
              width: isMobile ? "150px" : "250px",
              marginBottom: "0px",
              zIndex: 1,
              position: "relative",
              objectFit: "contain",
            }}
          />
          <h2
            style={{
              fontSize: isMobile ? "24px" : "30px",
              marginBottom: 10,
              zIndex: 1,
              color: "rgb(13, 10, 11)",
              textAlign: "center",
              lineHeight: "1.5",
              textShadow: "2px 2px 4px rgba(255, 165, 0, 0.6), -2px -2px 4px rgba(255, 165, 0, 0.6)",
            }}
          >
            Welcome to GSMB <br />
            <span
              style={{
                fontSize: isMobile ? "22px" : "26px",
                color: "rgb(13, 10, 11)",
                fontFamily: "Noto Sans Sinhala, Arial, sans-serif",
                textShadow: "2px 2px 4px rgba(255, 165, 0, 0.6), -2px -2px 4px rgba(255, 165, 0, 0.6)",
              }}
            >
              GSMB වෙත සාදරයෙන් පිළිගනිමු
            </span>
          </h2>
          <div style={{ textAlign: "left", color: "#f8f8f8", fontSize: "10px" }}>
            {activeTab === "1" ? (
              <>
                <p
                  style={{
                    marginBottom: "10px",
                    textShadow: "1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black",
                  }}
                >
                  To access your account, please provide your login credentials.
                  Signing in allows you to view your personalized dashboard and manage your information.
                </p>
                <p
                  style={{
                    marginBottom: "10px",
                    textShadow: "1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black",
                  }}
                >
                  ඔබගේ ගිණුමට ප්‍රවේශ වීමට, කරුණාකර ඔබේ ලොග්-ඇන් ලිපිනයන් ලබා දෙන්න. ඔබේ ගිණුමට පිවිසීම මඟින් ඔබට පෞද්ගලික දැක්මක් ලබා ගැනීමට සහ ඔබේ තොරතුරු පරික්‍ෂා කළ හැක.
                </p>
              </>
            ) : (
              <>
                <p
                  style={{
                    marginBottom: "10px",
                    textShadow: "1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black",
                  }}
                >
                  Create an account to enjoy all the features of GSMB. Signing up is quick and easy. You just need to provide some basic information such as your name, email, and password.
                </p>
                <p
                  style={{
                    marginBottom: "10px",
                    textShadow: "1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black",
                  }}
                >
                  ගැසට් වෙබ් අඩවියට ලියාපදිංචි වීමෙන් ඔබට සියලුම විශේෂාංග ප්‍රවේශය ලැබෙනු ඇත. ලියාපදිංචි වීම ඉතා සුළු කාලයක් ගතකරයි. ඔබට නම, ඊ-තැපැල් ලිපිනය සහ රහස් පදය වැනි මූලික තොරතුරු ලබා දීමට කෙටි පියවර ගත යුතුය.
                </p>
              </>
            )}
          </div>
        </div>

        <div
          style={{
            width: isMobile ? "100%" : "50%",
            background: "#ffffff",
            padding: "40px",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            boxShadow: "none",
            overflowY: "scroll",
            maxHeight: isMobile ? "70vh" : "none",
          }}
        >
          <Tabs
            defaultActiveKey="1"
            className="smooth-tabs"
            animated
            tabPosition="top"
            onChange={(key) => setActiveTab(key)}
            style={{
              overflow: "hidden",
              position: "relative",
              zIndex: 1,
            }}
          >
            <TabPane tab="Sign In" key="1">
              <h2 style={{ marginBottom: 20, color: "#a52a2a", fontSize: "24px" }}>Sign In</h2>
              <Form
                name="signin"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please input your email address!" }]}
                >
                  <Input placeholder="john@gmail.com" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Keep me logged in</Checkbox>
                  </Form.Item>
                  <a href="/forgot-password" style={{ color: "#a52a2a" }}>
                    Forgot password?
                  </a>
                </div>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{
                      backgroundColor: "#a52a2a",
                      borderColor: "#a52a2a",
                      marginBottom: 10,
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Sign In
                  </Button>
                </Form.Item>
                <Button
                  icon={<GoogleOutlined />}
                  block
                  style={{
                    backgroundColor: "#fff",
                    borderColor: "#d9d9d9",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "500",
                  }}
                >
                  Sign in with Google
                </Button>
              </Form>
            </TabPane>

            <TabPane tab="Sign Up" key="2">
              <h2 style={{ marginBottom: 20, color: "#a52a2a", fontSize: "24px" }}>Sign Up</h2>
              <Form
                name="signup"
                initialValues={{ remember: true }}
                onFinish={onFinishSignUp}
                layout="vertical"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[{ required: true, message: "Please input your first name!" }]}
                    >
                      <Input placeholder="John" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[{ required: true, message: "Please input your last name!" }]}
                    >
                      <Input placeholder="Doe" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Please input your address!" }]}
                >
                  <Input placeholder="123 Main St, City, Country" />
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[{ required: true, message: "Please input your phone number!" }]}
                >
                  <Input placeholder="(123) 456-7890" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please input your email address!" }]}
                >
                  <Input placeholder="john@gmail.com" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={[{ required: true, message: "Please confirm your password!" }]}
                >
                  <Input.Password placeholder="Confirm your password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{
                      backgroundColor: "#a52a2a",
                      borderColor: "#a52a2a",
                      marginBottom: 10,
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Sign Up
                  </Button>
                </Form.Item>
                <Button
                  icon={<GoogleOutlined />}
                  block
                  style={{
                    backgroundColor: "#fff",
                    borderColor: "#d9d9d9",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "500",
                  }}
                >
                  Sign up with Google
                </Button>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
