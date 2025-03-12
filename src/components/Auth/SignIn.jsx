import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import background from "../../assets/images/lake.avif";
import logo from "../../assets/images/gsmbLogo.png";
// import googleLogo from "../../assets/images/google_icon.png";
import "./Signin.css";
// import authService from "../../services/authService";
// import { login, redirectToDashboard, handleGoogleLogin } from '../../services/authService';
import authService from "../../services/authService"; 

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log("clientId", clientId);

const SignInPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const role = await authService.login(values);
    authService.redirectToDashboard(role, navigate);
  };

  const handleGoogleLoginSuccess = async (response) => {
    const role = await authService.handleGoogleLogin(response);
    authService.redirectToDashboard(role, navigate);
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