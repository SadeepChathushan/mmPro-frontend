import { Modal, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons"; // Import the arrow icon
import emailIcon from "../../assets/images/check_email.png";
import "../../styles/forgotpassword.css";

const ConfirmationModal = ({ visible, onClose }) => {
  const handleResendEmail = () => {
    // Simulate resending the email
    console.log("Resending email...");
    message.success("Email resent successfully!");
  };
  
  const openEmailClient = () => {
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="confirmation-modal"
    >
      <div className="modal-container">
        <div className="icon-container">
          <img src={emailIcon} alt="Forgot Password Icon" className="fp-icon" />
        </div>

        <div className="modal-title">Check Your Email !</div>

        <div className="modal-p">
          Thanks! An email was sent that will ask you to click on a link to
          verify that you own this account.
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="primary"
            size="large"
            className="submit-button"
            style={{ marginBottom: "10px" }}
            onClick={openEmailClient}
          >
            Open Email Inbox
          </Button>
          <Button
            type="default"
            size="large"
            className="resend-button"
            onClick={handleResendEmail}
            icon={<ArrowRightOutlined />}
          >
            Resend Email
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
