import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import FPIcon from "../../assets/images/notion_help_center.png";
import "../../styles/forgotpassword.css";
import ConfirmationModal from "./ConfirmationModal";

const ForgotPasswordModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);

  const handleSubmit = async (values) => {
    try {
      console.log("Email submitted for password reset:", values.email);
      setIsConfirmationModalVisible(true); 
      onCancel();
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalVisible(false); 
  };

  return (
    <>
      {/* Forgot Password Modal */}
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={null}
        centered
        className="fp-modal"
      >
        <div className="modal-container">
        <div className="icon-container">
          <img src={FPIcon} alt="Forgot Password Icon" className="fp-icon" />
        </div>

        <div className="modal-title">Forgot Your Password ?</div>

        <div className="modal-p">
          Enter your email so that we can send you a password reset link.
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="input-icon" />}
              placeholder="Enter your email"
              size="large"
              className="modal_input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="submit-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        visible={isConfirmationModalVisible}
        onClose={handleConfirmationModalClose}
      />
    </>
  );
};

export default ForgotPasswordModal;