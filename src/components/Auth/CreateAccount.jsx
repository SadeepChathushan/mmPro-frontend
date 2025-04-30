// import React, { useState } from "react";
// import { Modal, Form, Input, Select, Button, message } from "antd";
// import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
// import authService from "../../services/authService";

// const CreateAccountModal = ({ visible, onCancel }) => {
//   const [form] = Form.useForm();
//   const [selectedRole, setSelectedRole] = useState(null);

//   const handleSubmit = async (values) => {
//     try {
//       // Prepare the payload including files
//       const payload = {
//         firstName: values.firstName,
//         lastName: values.lastName,
//         email: values.email,
//         password: values.password,
//         designation: values.designation, // Note: Fix typo from 'designation' to match your form
//         nic: values.nic,
//         mobile: values.mobile,
//       };

//       // Call the registration service
//       const result = await authService.registerUser(payload, selectedRole);

//       if (result) {
//         message.success("Account created successfully!");
//         form.resetFields();
//         onCancel();
//       }
//     } catch (error) {
//       console.error("Account Creation Error:", error);
//       message.error(
//         error.message || "Failed to create account. Please try again."
//       );
//     }
//   };

//   const roles = [
//     { value: "gsmb_officer", label: "GSMB Officer" },
//     { value: "police", label: "Police" },
//     { value: "ml_owner", label: "Mining License Owner" },
//   ];

//   return (
//     <Modal
//       title="Create New Account"
//       visible={visible}
//       onCancel={onCancel}
//       footer={null}
//       centered
//     >
//       <Form form={form} layout="vertical" onFinish={handleSubmit}>
//         <Form.Item
//           label="First Name"
//           name="firstName"
//           rules={[{ required: true, message: "Please enter your First name" }]}
//         >
//           <Input
//             prefix={<UserOutlined />}
//             placeholder="Enter your First name"
//           />
//         </Form.Item>

//         <Form.Item
//           label="Last Name"
//           name="lastName"
//           rules={[{ required: true, message: "Please enter your Last name" }]}
//         >
//           <Input prefix={<UserOutlined />} placeholder="Enter your Last name" />
//         </Form.Item>

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             { required: true, message: "Please input your email!" },
//             { type: "email", message: "Please enter a valid email!" },
//           ]}
//         >
//           <Input prefix={<MailOutlined />} placeholder="Enter your email" />
//         </Form.Item>

//         <Form.Item
//           label="Role"
//           name="role"
//           rules={[{ required: true, message: "Please select your role" }]}
//         >
//           <Select
//             placeholder="Select your role"
//             onChange={(value) => setSelectedRole(value)}
//           >
//             {roles.map((role) => (
//               <Select.Option key={role.value} value={role.value}>
//                 {role.label}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label="NIC Number"
//           name="nic"
//           rules={[
//             { required: true, message: "Please input your nic!" },
//             { type: "nic", message: "Please enter a NIC Number!" },
//           ]}
//         >
//           <Input
//             prefix={<MailOutlined />}
//             placeholder="Enter your Nic Number"
//           />
//         </Form.Item>

//         <Form.Item
//           label="Mobile Number"
//           name="mobile"
//           rules={[
//             { required: true, message: "Please input your Mobile Number!" },
//             { type: "mobile", message: "Please enter a Mobile Number!" },
//           ]}
//         >
//           <Input
//             prefix={<MailOutlined />}
//             placeholder="Enter your Mobile Number"
//           />
//         </Form.Item>

//         <Form.Item
//           label="Designation"
//           name="designation"
//           rules={[
//             { required: true, message: "Please input your Designation!" },
//             { type: "designation", message: "Please enter a Designation!" },
//           ]}
//         >
//           <Input
//             prefix={<MailOutlined />}
//             placeholder="Enter your Designation"
//           />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             { required: true, message: "Please input your password!" },
//             { min: 8, message: "Password must be at least 8 characters" },
//           ]}
//         >
//           <Input.Password
//             prefix={<LockOutlined />}
//             placeholder="Create a password"
//           />
//         </Form.Item>

//         <Form.Item
//           label="Confirm Password"
//           name="confirmPassword"
//           dependencies={["password"]}
//           rules={[
//             { required: true, message: "Please confirm your password!" },
//             ({ getFieldValue }) => ({
//               validator(_, value) {
//                 if (!value || getFieldValue("password") === value) {
//                   return Promise.resolve();
//                 }
//                 return Promise.reject(new Error("Passwords do not match!"));
//               },
//             }),
//           ]}
//         >
//           <Input.Password
//             prefix={<LockOutlined />}
//             placeholder="Confirm password"
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             Create Account
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default CreateAccountModal;

import React from "react";
import { Modal, Button } from "antd";
import { UserOutlined, SecurityScanOutlined, SafetyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CreateAccountModal = ({ visible, onCancel }) => {
  const navigate = useNavigate();

  const roleButtons = [
    {
      role: 'gsmb_officer',
      label: 'GSMB Officer',
      icon: <UserOutlined />,
      path: '/GSMBOfficerRegister'
    },
    {
      role: 'police',
      label: 'Police',
      icon: <SecurityScanOutlined />,
      path: '/PoliceOfficerRegister'
    },
    {
      role: 'ml_owner',
      label: 'Mining License Owner',
      icon: <SafetyOutlined />,
      path: '/NewOwnerRegister'
    },
    {
      role: 'mining_engineer',
      label: 'Mining Engineer',
      icon: <SafetyOutlined />,
      path: '/MiningEngineerRegister'
    }
  ];

  const handleRoleSelect = (path, role) => {
    navigate(`${path}?role=${role}`);
    onCancel(); // Close the modal
  };

  return (
    <Modal
      title="Select Your Role"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px'
      }}>
        {roleButtons.map((item) => (
          <Button
            key={item.role}
            type="primary"
            icon={item.icon}
            size="large"
            block
            onClick={() => handleRoleSelect(item.path, item.role)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </Modal>
  );
};

export default CreateAccountModal;
