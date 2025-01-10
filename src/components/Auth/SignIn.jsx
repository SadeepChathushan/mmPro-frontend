import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import logo from "../../assets/images/gsmbLogo.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scroll when on the SignIn page
    document.body.style.overflow = "hidden";

    // Re-enable scroll when leaving the SignIn page
    return () => {
      document.body.style.overflow = "auto";
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
      console.log(userId);

      // Step 2: Fetch roles for the user in the "sample" project
      const membershipsResponse = await axios.get(
        `/api/projects/sample/memberships.json`,
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

      // Step 4: Store the role and redirect the user
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("authToken", response.data.user.api_key); // Assuming you're using API key for authentication

      // Redirect based on the user's role
      if (userRole === "GSMB License Officer") {
        navigate("/dashboard/gsmbo");
      } else if (userRole === "Mining License Officer") {
        navigate("/dashboard/mining-owner");
      } else if (userRole === "Police Officer") {
        navigate("/dashboard/police");
      } else {
        navigate("/dashboard/general-public");
      }
    } catch (error) {
      console.log("Login failed:", error);
      // Display an error message or handle the error accordingly
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url("/path-to-your-background-image.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          width: 400,
          padding: "20px 40px",
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <img src={logo} alt="Logo" style={{ marginBottom: 0, width: 120 }} />
        <h2 style={{ marginBottom: 20, color: "#a52a2a" }}>Sign In</h2>
        <p style={{ marginBottom: 20 }}>
          Enter your email and password to sign in!
        </p>
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
            rules={[
              { required: true, message: "Please input your email address!" },
            ]}
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
            }}
          >
            Sign in with Google
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
