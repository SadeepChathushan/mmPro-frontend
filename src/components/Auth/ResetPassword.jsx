import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; 
import "../../styles/forgotpassword.css";
import reset from "../../assets/images/reset_password.png";

const ResetPasswordModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); 

  const handleSubmit = async (values) => {
    try {
      console.log("New password submitted:", values.newPassword);
      message.success("Password reset successfully!");

      onCancel();

      navigate("/signin");
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
      className="reset-password-modal"
    >
      <div className="icon-container">
        <img src={reset} alt="Forgot Password Icon" className="fp-icon" />
      </div>

      <div className="modal-title">Reset Your Password</div>

      <div className="modal-p">Please enter your new password below.</div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
            { min: 8, message: "Password must be at least 8 characters long!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="input-icon" />}
            placeholder="Enter your new password"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="input-icon" />}
            placeholder="Confirm your new password"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="submit-button"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResetPasswordModal;