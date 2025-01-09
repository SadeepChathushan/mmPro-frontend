import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import logo from '../../assets/images/gsmbLogo.jpg';

const Signup = () => {
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
        <img src={logo} alt="Logo" style={{ marginBottom: 0, width: 120 }} />
        <h2 style={{ marginBottom: 20, color: '#a52a2a' }}>Sign Up</h2>
        <p style={{ marginBottom: 20 }}>Enter your details to sign Up!</p>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* Row 1: First Name and Last Name */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="fname"
                rules={[{ required: true, message: 'Please input First Name!' }]}
              >
                <Input placeholder="John" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lname"
                rules={[{ required: true, message: 'Please input Last Name!' }]}
              >
                <Input placeholder="Doe" />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 2: Address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input.TextArea placeholder="123, Main Street, Colombo" rows={3} />
          </Form.Item>

          {/* Row 3: Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email address!' }]}
          >
            <Input placeholder="john@gmail.com" />
          </Form.Item>

          {/* Row 4: Phone Number and NIC */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Please input your phone number!' },
                  { pattern: /^[0-9]{10}$/, message: 'Phone number must be exactly 10 digits!' },
                ]}
              >
                <Input placeholder="0711234567" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="NIC"
                name="nic"
                rules={[
                  { required: true, message: 'Please input your NIC!' },
                  {
                    pattern: /^(?:\d{9}[Vv]|\d{12})$/,
                    message: "NIC must be 9 digits followed by 'V' or 12 digits!",
                  },
                ]}
              >
                <Input placeholder="123456789V or 123456789012" />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 5: Password and Confirm Password */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Re-enter your password" />
              </Form.Item>
            </Col>
          </Row>

          {/* Checkbox and Forgot Password */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Keep me logged in</Checkbox>
            </Form.Item>
            <a href="/forgot-password" style={{ color: '#a52a2a' }}>
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
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

          {/* Google Sign Up */}
          <Button
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
            Sign Up with Google
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
