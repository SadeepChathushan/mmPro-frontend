import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import background from "../../assets/images/lake.avif";
import logo from "../../assets/images/gsmbLogo.png";
import googleLogo from "../../assets/images/google_icon.png";
import "./Signin.css";
import authService from "../../services/authService";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log("clientId", clientId);

const SignInPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });

      if (response.data.token) {
        message.success("Login successful!");
        // Save token in localStorage (or sessionStorage depending on your needs)
        localStorage.setItem("USER_TOKEN", response.data.token);
        localStorage.setItem("USERROLE", response.data.role);
        redirectToDashboard(response.data.role);
      } else {
        message.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please try again.");
    }
  };

  const redirectToDashboard = (role) => {
    console.log("user role: ", localStorage.getItem("USERROLE"));
    console.log("token: ", localStorage.getItem("USER_TOKEN"));
    switch (role) {
      case "GSMBOfficer":
        navigate("/gsmb/dashboard");
        break;
      case "MLOwner":
        navigate("/mlowner/home");
        break;
      case "PoliceOfficer":
        navigate("/police-officer/dashboard");
        break;
      case "GeneralPublic":
        navigate("/generalpublic/dashboard");
        break;
      case "GSMBManagement":
        navigate("/gsmbmanagement/dashboard");
        break;
      default:
        navigate("/");
        break;
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    const { credential } = response;
    console.log(credential);
    try {
      const res = await axios.post("http://localhost:5000/auth/google-login", {
        token: credential,
      });

      if (res.data.token) {
        message.success("Google login successful!");
        // Save token in localStorage
        localStorage.setItem("USER_TOKEN", res.data.token);
        localStorage.setItem("USERROLE", res.data.role);
        redirectToDashboard(res.data.role);
      } else {
        message.error("User role not found!");
      }
    } catch (err) {
      console.error("Google login failed:", err);
      message.error("Google login failed. Please try again.");
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* Blurred background */}
      <div
        className="background-container"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="overlay"></div>

      <div className="content-container">
        <div className="left-section">
          <div style={{ display: "flex", alignItems: "center", gap: "0rem" }}>
            <h1>
              WELCOME <br /> ආයුබෝවන් <br /> வரவேற்கின்றேன்
            </h1>
            <img src={logo} alt="Logo" />
          </div>
          <p>
            Welcome to mmPro, your trusted partner in revolutionizing mining and
            mineral production management...
          </p>
        </div>

        <div className="right-section">
          <h2>Sign In</h2>
          <Form
            layout="vertical"
            name="sign-in"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label={
                <span style={{ color: "#ffffff" }}>
                  Username /පරිශීලක නාමය / பயனர் பெயர்
                </span>
              }
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: "#ffffff" }}>
                  Password / මුරපදය / கடவுச்சொல்
                </span>
              }
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox style={{ color: "#ffffff" }}>
                Keep me logged in
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign in
              </Button>
            </Form.Item>

            <Form.Item className="center-text">
              <a href="/forgot-password" className="links">
                Forgot password?
              </a>
            </Form.Item>
            <Form.Item className="center-text">
              <a href="/create-account" className="links">
                Not registered yet? Create an Account
              </a>
            </Form.Item>

            {/* Google Login Button */}
            <Form.Item className="center-text">
              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={() => message.error("Google login failed!")}
                />
              </GoogleOAuthProvider>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
