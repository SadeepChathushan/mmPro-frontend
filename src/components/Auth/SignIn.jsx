import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Checkbox, Tabs, Row, Col, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import logo from "../../assets/images/gsmbLogo.png"; // Transparent background logo
import excavator from "../../assets/images/dump-truck-pit-mine.jpg"; // Default excavator image
import signupImage from "../../assets/images/signup-image.jpg"; // New image for Sign Up tab
import google from "../../assets/images/google_icon.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Auth.css'; // Import custom CSS for transitions
import "@fontsource/noto-sans-sinhala";


const { TabPane } = Tabs;

const MyComponent = () => {
  const items = [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab 2',
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

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

  const SignInWithGoogleButton = () => {
    const [hover, setHover] = useState(false);
  
    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);
  };

  return (
    <div
  style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white", // Gradient background
    backgroundSize: "cover", // Ensure the background covers the whole container
    backgroundPosition: "center", // Center the background
    padding: isMobile ? "5px 2px" : "0", // Add padding for mobile
    overflowY: "scroll", // Ensure scrolling on mobile
    fontFamily: "'Noto Sans Sinhala', sans-serif",
  }}
>

<div
  style={{
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "center",
    width: isMobile ? "100%" : "95%", // Adjust width for mobile screens
    gap: isMobile ? "20px" : "0", // Add gap for mobile view
    padding: isMobile ? "2px" : "10px", // Add padding for mobile view
    background: "linear-gradient(135deg, rgb(223, 223, 223) 0%, rgb(190, 190, 190) 100%)", // Dark red gradient
    borderRadius: 12,
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  }}
>
        {/* Tile 1: Logo + Welcome Message with Conditionally Changing Background Image */}
        <div
          style={{
            width: isMobile ? "100%" : "50%", // Adjust width of tiles to make them larger
            background: `url(${activeTab === "2" ? signupImage : excavator}) center center/cover no-repeat`, // Conditionally set image based on active tab
            padding: "10px",
            textAlign: "center",
            color: "white", // Ensure the text is white for contrast
            position: "relative", // Needed for overlay
            minHeight: isMobile ? "300px" : "550px", // Set a minimum height for larger tiles
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
<div
  style={{
    backgroundColor: "rgba(255, 255, 255, 0.5)", // White background with 80% opacity
    padding: "20px", // Padding around the content
    borderRadius: "12px", // Rounded corners for a softer look
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add a subtle shadow for depth
    textAlign: "center", // Center the content horizontally
    width: isMobile ? "100%" : "80%", // Increased width for both mobile and desktop
    margin: "0 auto", // Center the square within its parent
  }}
>
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
  <span style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>ආයුබෝවන්</span>
  <br />
  வணக்கம்
  <br />
  Welcome to GSMB
</h2>


  {/* Conditional Paragraphs for Sign In and Sign Up */}S
  <div
    style={{
      textAlign: "left",
      color: "#333333", // Adjusted text color for contrast
      fontSize: "16px",
      backgroundColor: "#ffc3c3", // Light grey background with 90% opacity
      padding: "10px", // Add padding for better spacing
      borderRadius: "8px", // Rounded corners for a softer look
    }}
  >
    {activeTab === "1" ? (
      <p style={{ marginBottom: "10px" }}>
        To access your account, please provide your login credentials. Signing
        in allows you to view your personalized dashboard and manage your
        information.
      </p>
    ) : (
      <p style={{ marginBottom: "10px" }}>
        Create an account to enjoy all the features of GSMB. Signing up is quick
        and easy. You just need to provide some basic information such as your
        name, email, and password.
        <br />
       
      </p>
    )}
  </div>

</div>
        </div>
        {/* Tile 2: Sign In / Sign Up Forms */}
        <div
          style={{
            width: isMobile ? "100%" : "50%", // Adjust width of tiles to make them larger
            background: 'radial-gradient(circle, rgb(241, 241, 241) 0%, rgb(220, 220, 220) 100%)',
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
           <TabPane
    tab={<span style={{
       fontSize: "14px", 
       fontWeight: "300", 
       textAlign: "left", 
       
        }}>SIGN IN</span>}
    key="1"
  >
            <h2 style={{
    marginBottom: 20,
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    background: "linear-gradient(to right, #8b0000, #4b0000)", 
    WebkitBackgroundClip: "text",
    color: "transparent",
    fontFamily: "'Noto Sans Sinhala', sans-serif"
}}>Sign In / පුරන්න / உள்நுழைக</h2>
              <Form
                name="signin"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
              >
              <Form.Item
  label={
    <span
      style={{
        fontSize: '14px',
        fontFamily: "'Noto Sans Sinhala', sans-serif",
      }}
    >
      Email / විද්‍යුත් තැපෑල / மின்னஞ்சல்
    </span>
  }
  name="email"
  rules={[
    {
      required: true,
      message: "Please input your email address!",
    },
  ]}
  labelCol={{
    style: {
      fontSize: '16px',
    },
  }}
>
  <Input
    placeholder="Enter your email address"
    style={{
      fontFamily: "'Noto Sans Sinhala', sans-serif",
    }}
  />
</Form.Item>
<Form.Item
  label={
    <span
      style={{
        fontSize: '14px',
        fontFamily: "'Noto Sans Sinhala', sans-serif",
      }}
    >
      Password / මුරපදය / கடவுச்சொல்
    </span>
  }
  name="password"
  rules={[
    {
      required: true,
      message: "Please input your password!",
    },
  ]}
>
  <Input.Password
    placeholder="Enter your password"
    style={{
      fontFamily: "'Noto Sans Sinhala', sans-serif",
    }}
  />
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
                  <a href="/forgot-password" className="auth-forgot-password">Forgot password?</a>
                </div>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{
                      backgroundColor: "#4f0000",
                      borderColor: "#400000",
                      marginBottom: 10,
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Sign In
                  </Button>
                </Form.Item>
                <Button
  icon={<img src={google} alt="Google Icon" style={{ width: '20px', marginRight: '10px' }} />}
  block
  style={{
    background: 'radial-gradient(circle, rgb(0, 25, 149) 0%, rgb(4, 0, 80) 100%)', // Gradient background
    borderColor: '#d9d9d9',
    color: '#fff', // Changed to white for better contrast on the gradient
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    fontSize: '16px',
    padding: '10px 20px', // Padding for a better button feel
  }}
>
  Sign in with Google
</Button>
              </Form>
            </TabPane>

            <TabPane tab="SIGN UP" key="2">
              <h2 style={{
    marginBottom: 20,
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    background: "linear-gradient(to right, #8b0000, #4b0000)", 
    WebkitBackgroundClip: "text",
    color: "transparent",
    fontFamily: "'Noto Sans Sinhala', sans-serif",

}}>Sign Up / ලියාපදිංචි වන්න / பதிவு செய்யவும்</h2>
              <Form
               name="signup"
               initialValues={{ remember: true }}
               onFinish={onFinishSignUp}
               layout="vertical"
               style={{
                padding: '10px',
                borderRadius: '8px' // Optional: For rounded corners
              }}
              
              >
                <Row gutter= {[8, 0]}>
                  {/* First Name and Last Name on the same row */}

                  <Col span={12}>
                    <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please input your first name!" }]}>
                      <Input placeholder="John" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please input your last name!" }]}>
                      <Input placeholder="Doe" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please input your address!" }]}>
                  <Input placeholder="123 Main St, City, Country" />
                </Form.Item>
                <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: "Please input your phone number!" }]}>
                  <Input placeholder="(123) 456-7890" />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email address!" }]}>
                  <Input placeholder="john@gmail.com" />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
                <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: "Please confirm your password!" }]}>
                  <Input.Password placeholder="Confirm your password" />
                </Form.Item>


                <Row gutter={[16, 0]} justify="center">
  {/* Sign Up Button */}
  <Col span={12}>
    <Button
      type="primary"
      htmlType="submit"
      block
      style={{
        background: "linear-gradient(135deg, #8B0000, #a52a2a)",
        borderColor: "#a52a2a",
        fontSize: "18px",
        fontWeight: "500",
        color: "white",
      }}
    >
      Sign Up
    </Button>
  </Col>

  {/* Sign Up with Google Button */}
  <Col span={12}>
    <Button
      icon={
        <img
          src={google}
          alt="Google Icon"
          style={{ width: "20px", marginRight: "10px" }}
        />
      }
      block
      style={{
        background: "radial-gradient(circle, rgb(0, 21, 123) 0%, rgb(4, 0, 80) 100%)",
        borderColor: "#d9d9d9",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "500",
        fontSize: "16px",
        padding: "10px 20px",
      }}
    >
      Sign up with Google
    </Button>
  </Col>
</Row>

              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};


export default Auth;
