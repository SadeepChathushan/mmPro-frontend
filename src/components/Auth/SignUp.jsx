import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import logo from '../../assets/images/gsmbLogo.jpg';


const SignIn = () => {
  useEffect(() => {
    // Disable scroll when on the SignIn page
    document.body.style.overflow = 'hidden';

    // Re-enable scroll when leaving the SignIn page
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div

    
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("/path-to-your-background-image.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          width: 400,
          padding: '20px 40px',
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ marginBottom:0, width: 120 }}
        />
        <h2 style={{ marginBottom: 20, color: '#a52a2a' }}>Sign Up</h2>
        <h3><strong>Create an account</strong></h3>
        <p style={{ marginBottom: 20 }}>Already have an account? 
          <a 
            href="/signin" 
            style={{
            fontWeight: "500", 
            color: "#4f46e5", 
            textDecoration: "none",
            cursor: "pointer"
          }} 
          onMouseOver={(e) => e.target.style.color = "#6366f1"}
          onMouseOut={(e) => e.target.style.color = "#4f46e5"}
        >
          Login
        </a>
        </p>
        {/* <br></br> */}
        <Form
          name="signin"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
            <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email address!' }]}
          >
            <Input placeholder="john@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone number"
            rules={[{ required: true, message: 'Please input your phone number' }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: '#a52a2a',
                borderColor: '#a52a2a',
                marginBottom: 10,
              }}
            >
              Sign Up
            </Button>
          </Form.Item>
          {/* <Button
            icon={<GoogleOutlined />}
            block
            style={{
              backgroundColor: '#fff',
              borderColor: '#d9d9d9',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Sign in with Google
          </Button> */}
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
