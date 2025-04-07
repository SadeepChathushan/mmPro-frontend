import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import authService from "../../services/authService";
import "../../styles/forgotpassword.css";
import reset from "../../assets/images/reset_password.png";

const ResetPasswordModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); 

  const handleSubmit = async (values) => {
    try {
      if (!token) {
        console.error("No token found in URL");
        throw new Error("Invalid reset token");
      }

      if (values.newPassword !== values.confirmPassword) {
        console.error("Passwords don't match");
        throw new Error("Passwords do not match");
      }

      if (values.newPassword.length < 8) {
        console.error("Password too short");
        throw new Error("Password must be at least 8 characters");
      }

      console.log("Calling resetPassword service with:", {
        token,
        newPassword: values.newPassword,
      });

      // Call the reset password service
      const response = await authService.resetPassword(
        token,
        values.newPassword
      );
      console.log("Reset password response:", response);

      message.success("Password reset successfully!");
      navigate("/signin");
      if (typeof onCancel === "function") {
        onClose();
      }
    } catch (error) {
      console.error("Error in handleSubmit:", {
        error: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
      message.error(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose} 
      footer={null}
      centered
      className="reset-password-modal"
    >
      <div className="icon-container">
        <img src={reset} alt="Reset Password Icon" className="fp-icon" />
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
