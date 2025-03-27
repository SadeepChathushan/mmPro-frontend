import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const CreateAccountModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSubmit = async (values) => {
    try {
      // Combine values with selected role
      const accountData = {
        ...values,
        role: selectedRole
      };

      console.log("Create Account Submission:", accountData);
      
      // TODO: Add actual account creation logic
      message.success("Account creation request submitted");
      onCancel(); // Close the modal after submission
    } catch (error) {
      console.error("Account Creation Error:", error);
      message.error("Failed to create account. Please try again.");
    }
  };

  const roles = [
    { value: 'gsmb_officer', label: 'GSMB Officer' },
    { value: 'police', label: 'Police' },
    { value: 'ml_owner', label: 'Mining License Owner' }
  ];

  return (
    <Modal
      title="Create New Account"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Enter your full name" 
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" }
          ]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder="Enter your email" 
          />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select your role" }]}
        >
          <Select
            placeholder="Select your role"
            onChange={(value) => setSelectedRole(value)}
          >
            {roles.map(role => (
              <Select.Option key={role.value} value={role.value}>
                {role.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters" }
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Create a password" 
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: "Please confirm your password!" },
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
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Confirm password" 
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAccountModal;

// import React from "react";
// import { Modal, Button } from "antd";
// import { UserOutlined, SecurityScanOutlined, SafetyOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";

// const CreateAccountModal = ({ visible, onCancel }) => {
//   const navigate = useNavigate();

//   const roleButtons = [
//     {
//       role: 'gsmb_officer',
//       label: 'GSMB Officer',
//       icon: <UserOutlined />,
//       path: '/register/gsmb-officer'
//     },
//     {
//       role: 'police',
//       label: 'Police',
//       icon: <SecurityScanOutlined />,
//       path: '/register/police'
//     },
//     {
//       role: 'ml_owner',
//       label: 'Mining License Owner',
//       icon: <SafetyOutlined />,
//       path: '/MlOwnerRegister'
//     }
//   ];

//   const handleRoleSelect = (path) => {
//     navigate(path);
//     onCancel(); // Close the modal
//   };

//   return (
//     <Modal
//       title="Select Your Role"
//       visible={visible}
//       onCancel={onCancel}
//       footer={null}
//       centered
//     >
//       <div style={{ 
//         display: 'flex', 
//         flexDirection: 'column', 
//         gap: '16px', 
//         padding: '20px' 
//       }}>
//         {roleButtons.map((item) => (
//           <Button 
//             key={item.role}
//             type="primary" 
//             icon={item.icon}
//             size="large"
//             block
//             onClick={() => handleRoleSelect(item.path)}
//           >
//             {item.label}
//           </Button>
//         ))}
//       </div>
//     </Modal>
//   );
// };

// export default CreateAccountModal;