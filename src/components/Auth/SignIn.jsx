import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishSignUp = async (values) => {
    try {
      // SignUp logic here
    } catch (error) {
      console.log("Sign up failed:", error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF", // Main background color
        padding: isMobile ? "20px 10px" : "0", // Add padding for mobile
        overflowY: "scroll", // Ensure scrolling on mobile
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          width: isMobile ? "100%" : "80%", // Adjust width for mobile screens
          gap: isMobile ? "20px" : "0", // Add gap for mobile view
          padding: isMobile ? "20px" : "40px", // Add padding for mobile view
          background: "fcd5d0", // Set background color for the main tile
          borderRadius: 12,
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Tile 1: Logo + Welcome Message with Conditionally Changing Background Image */}
        <div
          style={{
            width: isMobile ? "100%" : "50%", // Adjust width of tiles to make them larger
            background: `url(${activeTab === "2" ? signupImage : excavator}) center center/cover no-repeat`, // Conditionally set image based on active tab
            padding: "40px",
            textAlign: "center",
            color: "white", // Ensure the text is white for contrast
            position: "relative", // Needed for overlay
            minHeight: isMobile ? "300px" : "450px", // Set a minimum height for larger tiles
            borderTopLeftRadius: 0, // Remove top-left border-radius
            borderBottomLeftRadius: 0, // Remove bottom-left border-radius
            boxShadow: "none", // Remove shadow from the left tile
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Vertically center the content
            alignItems: "center", // Horizontally center the content
          }}
        >
          {/* Add a dark overlay to improve text contrast */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
              zIndex: -1, // Ensure it stays behind the text
            }}
          ></div>

          {/* GSMB Logo */}
          <img
            src={logo}
            alt="GSMB Logo"
            style={{
              width: isMobile ? "150px" : "250px", // Adjust logo size based on screen width
              marginBottom: 20,
              zIndex: 1, // Ensure the logo is above the overlay
              position: "relative", // Make sure the logo remains on top of background
              objectFit: "contain", // Prevent cropping
            }}
          />

          <h2
            style={{
              fontSize: isMobile ? "24px" : "30px",
              marginBottom: 10,
              zIndex: 1,
              color: "rgb(13, 10, 11)",
              textAlign: "center",
            }}
          >
            Welcome to GSMB
          </h2>

          {/* Conditional Paragraphs for Sign In and Sign Up */}
          <div style={{ textAlign: "left", color: "#f8f8f8", fontSize: "16px" }}>
            {activeTab === "1" ? (
              <p style={{ marginBottom: "10px" }}>
                To access your account, please provide your login credentials. Signing in allows you to view your personalized dashboard and manage your information.
              </p>
            ) : (
              <p style={{ marginBottom: "10px" }}>
                Create an account to enjoy all the features of GSMB. Signing up is quick and easy. You just need to provide some basic information such as your name, email, and password.
              </p>
            )}
          </div>
        </div>

        {/* Tile 2: Sign In / Sign Up Forms */}
        <div
          style={{
            width: isMobile ? "100%" : "50%", // Adjust width of tiles to make them larger
            background: "#ffffff", // White background
            padding: "40px",
            borderTopRightRadius: 0, // Remove top-right border-radius
            borderBottomRightRadius: 0, // Remove bottom-right border-radius
            boxShadow: "none", // Remove shadow from the right tile
            overflowY: "scroll", // Allow scrolling if the content overflows
            maxHeight: isMobile ? "70vh" : "none", // Limit height on mobile
          }}
        >
          <Tabs
            defaultActiveKey="1"
            className="smooth-tabs"
            animated
            tabPosition="top"
            onChange={(key) => setActiveTab(key)} // Track the active tab
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
                onFinishFailed={onFinishFailed}
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
                  {/* First Name and Last Name on the same row */}
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

                {/* Address in one row */}
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Please input your address!" }]}
                >
                  <Input placeholder="123 Main St, City, Country" />
                </Form.Item>

                {/* Phone Number in one row */}
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[{ required: true, message: "Please input your phone number!" }]}
                >
                  <Input placeholder="(123) 456-7890" />
                </Form.Item>

                {/* Email Field */}
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please input your email address!" }]}
                >
                  <Input placeholder="john@gmail.com" />
                </Form.Item>

                {/* Password Field */}
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                {/* Confirm Password Field */}
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


























































