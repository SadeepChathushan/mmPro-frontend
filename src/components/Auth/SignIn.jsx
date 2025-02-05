import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import background from "../../assets/images/lake.avif";
import logo from "../../assets/images/gsmbLogo.png";
import googleLogo from "../../assets/images/google_icon.png";
import "./Signin.css";
import authService from "../../services/authService";

const SignInPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // const { email, password } = values;

    // const response = await authService.login(email, password);

    const { username, password } = values;

    const response = await authService.login(username, password);

    console.log(response); // Add this line to inspect the response

    if (response.success) {
      message.success("Login successful!");

      // Navigate based on user role
      switch (response.role) {
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
    } else {
      message.error(response.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* Blurred background */}
      <div
        className="background-container"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      {/* Optional overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="content-container">
        {/* Left Section: Text and Logo */}
        <div className="left-section">
          <div style={{ display: "flex", alignItems: "center", gap: "0rem" }}>
            <h1>
              WELCOME <br /> ආයුබෝවන් <br /> வரவேற்கின்றேன்
            </h1>
            <img src={logo} alt="Logo" />
          </div>
          <br />
          <p>
            Welcome to mmPro, your trusted partner in revolutionizing mining and
            mineral production management. Designed for precision, efficiency,
            and sustainability, mmPro empowers you to monitor operations, gain
            valuable insights, and drive better decision-making.
          </p>
          <p>
            mmPro වෙත ඔබව සාදරයෙන් පිළිගනිමු. ඔබගේ පතල් කැණීමේ සහ ඛනිජ නිෂ්පාදන
            කළමනාකරණය ප්‍රතිසංස්කරණය කිරීමේ ආරක්ෂිත සහ විශ්වාසනීය සංග්‍රහය වන
            mmPro, කාර්යක්ෂමතාව, ක්ෂණික බව සහ තිරසාරතාව සඳහා නිර්මාණය කරන ලදි.
          </p>

          <p>
            mmPro இல் உங்களை வரவேற்கின்றோம். உங்களின் உழைக்கும் மற்றும் கனிம
            உற்பத்தி மேலாண்மையை புரட்சிகரிக்கும் பாதுகாப்பான மற்றும் நம்பகமான
            துணை நிறுவனமான mmPro, துல்லியம், திறன் மற்றும் நிலைத்தன்மைக்கு
            வடிவமைக்கப்பட்டுள்ளது.
          </p>
        </div>

        {/* Right Section: Login Form */}
        <div className="right-section">
          <h2>Sign In</h2>
          <Form
            layout="vertical"
            name="sign-in"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* <Form.Item
              label={
                <span style={{ color: "#ffffff" }}>
                  Email / විද්‍යුත් තැපෑල / மின்னஞ்சல்
                </span>
              }
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input placeholder="E mail Address" />
            </Form.Item> */}

            <Form.Item
              label={
                <span style={{ color: "#ffffff" }}>Username /පරිශීලක නාමය / பயனர் பெயர்</span>
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
            <Form.Item className="center-text">
              <Button type="default" className="google-btn">
                <img src={googleLogo} alt="Google" />
                Sign up with Google
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
