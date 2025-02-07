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

const SignInPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, password } = values;
    const response = await authService.login(username, password);

    if (response.success) {
      message.success("Login successful!");
      redirectToDashboard(response.role);
    } else {
      message.error(response.message);
    }
  };

  const redirectToDashboard = (role) => {
    console.log("the role is:", role);
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
    try {
      const res = await axios.post("http://localhost:5000/auth/google", {
        token: credential,
      });

      const userRole = res.data.user.role;

      if (res.data.user) {
        message.success("Google login successful!");
        localStorage.setItem("USERROLE", userRole);
        redirectToDashboard(userRole); // Redirect based on role
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
              <GoogleOAuthProvider clientId="329550488375-r7qkh9339o8cn1cmniinkboo5vac6m9g.apps.googleusercontent.com">
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
