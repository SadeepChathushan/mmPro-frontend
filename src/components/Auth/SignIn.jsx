import { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import background from "../../assets/images/lake.avif";
import logo from "../../assets/images/gsmbLogo.png";
import "./Signin.css";
import authService from "../../services/authService";
import ForgotPasswordModal from "./forgotPassword";
import ResetPasswordModal from "./ResetPassword"; 

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log("clientId", clientId);

const SignInPage = () => {
  const navigate = useNavigate();
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] = useState(false);
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] = useState(false);

  // Toggle the overlay when the Forgot Password modal opens/closes
  const isAnyModalVisible = isForgotPasswordModalVisible || isResetPasswordModalVisible;

  useEffect(() => {
    if (isAnyModalVisible) {
      document.body.classList.add("modal-overlay");
      document.querySelector('.background-container').classList.add('modal-active');
    } else {
      document.body.classList.remove("modal-overlay");
      document.querySelector('.background-container').classList.remove('modal-active');
    }

    return () => {
      document.body.classList.remove("modal-overlay");
      document.querySelector('.background-container')?.classList.remove('modal-active');
    };
  }, [isAnyModalVisible]);

  const onFinish = async (values) => {
    const role = await authService.login(values);
    authService.redirectToDashboard(role, navigate);
  };

  const handleGoogleLoginSuccess = async (response) => {
    const role = await authService.handleGoogleLogin(response);
    authService.redirectToDashboard(role, navigate);
  };

  const showForgotPasswordModal = () => {
    setIsForgotPasswordModalVisible(true);
  };

  const handleForgotPasswordCancel = () => {
    setIsForgotPasswordModalVisible(false);
  };

  const showResetPasswordModal = () => {
    setIsResetPasswordModalVisible(true);
  };

  const handleResetPasswordCancel = () => {
    setIsResetPasswordModalVisible(false);
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
              <Button type="link" onClick={showForgotPasswordModal} className="links">
                Forgot password?
              </Button>
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

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        visible={isForgotPasswordModalVisible}
        onCancel={handleForgotPasswordCancel}
        onResetPassword={() => {
          setIsForgotPasswordModalVisible(false); 
          showResetPasswordModal();
        }}
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
      />

      {/* Reset Password Modal */}
      <ResetPasswordModal
        visible={isResetPasswordModalVisible}
        onCancel={handleResetPasswordCancel}
      />
    </div>
  );
};

export default SignInPage;