import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Tabs } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import logo from "../../assets/images/gsmbLogo.jpg"; // Transparent background logo
import excavator from "../../assets/images/dump-truck-pit-mine.jpg"; // Excavator image
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { TabPane } = Tabs;

const Auth = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Disable scroll when on the SignIn page
    if (isMobile) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "auto";
    }

    // Re-enable scroll when leaving the SignIn page
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const onFinishSignIn = async (values) => {
    try {
      // SignIn logic here
    } catch (error) {
      console.log("Login failed:", error);
    }
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
        overflowY: isMobile ? "scroll" : "auto", // Ensure scrolling on mobile
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          width: isMobile ? "100%" : "80%", // Increase width for tiles on larger screens
          gap: "20px", // Reduce the gap between tiles
          padding: isMobile ? "20px" : "40px", // Padding for the container
          background: "rgb(255, 165, 0)", // Set background color for the main tile
          borderRadius: 12,
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Tile 1: Logo + Welcome Message */}
        <div
          style={{
            width: isMobile ? "100%" : "48%", // Adjust width of tiles to make them larger
            background: `url(${excavator}) center center/cover no-repeat`, // Set excavator image as background
            borderRadius: 12,
            padding: "40px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            color: "white", // Ensure the text is white for contrast
            position: "relative", // Needed for overlay
            minHeight: isMobile ? "300px" : "450px", // Set a minimum height for larger tiles
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
              borderRadius: 12,
              zIndex: -1, // Ensure it stays behind the text
            }}
          ></div>

          {/* GSMB Logo */}
          <img
            src={logo}
            alt="GSMB Logo"
            style={{
              width: isMobile ? 180 : 250,
              marginBottom: 20,
              zIndex: 1, // Ensure the logo is above the overlay
              mixBlendMode: "multiply", // Blend the logo with the background if the logo has a white background
            }}
          />

          <h2 style={{ fontSize: isMobile ? "24px" : "30px", marginBottom: 10, zIndex: 1,color:"rgb(13, 10, 11)" }}>
            Welcome to GSMB
          </h2>
          <p style={{ fontSize: 14, color: "#ddd", marginBottom: 30, zIndex: 1 }}>
            Sign in or sign up to access your dashboard.
          </p>
        </div>

        {/* Design Element Between Tiles */}
        <div
          style={{
            display: isMobile ? "none" : "block",
            height: "80%", // Full height of the container
            width: "2px", // Thin dividing line
            background: "#ddd", // Light gray color for the divider
            margin: "auto", // Centered divider between tiles
          }}
        ></div>

        {/* Tile 2: Sign In / Sign Up Forms */}
        <div
          style={{
            width: isMobile ? "100%" : "48%", // Adjust width of tiles to make them larger
            background: "#ffffff", // White background
            borderRadius: 12,
            padding: "40px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Sign In" key="1">
              <h2 style={{ marginBottom: 20, color: "#a52a2a", fontSize: "24px" }}>Sign In</h2>
              <Form
                name="signin"
                initialValues={{ remember: true }}
                onFinish={onFinishSignIn}
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
