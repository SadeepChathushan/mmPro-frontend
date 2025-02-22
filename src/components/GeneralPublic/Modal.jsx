import React, { useState } from "react";
import OtpVerificationModal from "./OtpVerificationModal.jsx";
import axios from "axios";

const Modal = ({
  modalMessage,
  language,
  closeModal,
  vehicleNumber,
  //reportDetails
}) => {
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState(null);

  const textContent = {
    reportButton:
      language === "si"
        ? "GSMB වෙත වාර්තා කරන්න"
        : language === "ta"
        ? "GSMB இற்கு புகார் செய்யவும்"
        : "Report to GSMB",
    contacts: [
      { number: "+94-11-2886289", icon: "📞" },
      { number: "+94-11-2886290", icon: "📞" },
      { number: "901", icon: "📞" },
    ],
  };

  const handleOpenOtpModal = () => {
    setIsOtpModalOpen(true);
  };

  const handleCloseOtpModal = () => {
    setIsOtpModalOpen(false);
  };

  const onClose = () => {
    closeModal();
  };

  const handleSubmitReport = async (phone, vehicleNumber) => {
    try {
      const token = localStorage.getItem("USER_TOKEN"); // Or wherever you store your token

      console.log(phone);
      console.log(vehicleNumber);
      const response = await axios.post(
        "http://127.0.0.1:5000/general-public/create-complaint",
        {
          phoneNumber: phone,
          vehicleNumber: vehicleNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        onClose();
      } else {
        console.error("Report submission failed");
      }
    } catch (error) {
      console.error("Error submitting report", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close-button" onClick={closeModal}>
          &times;
        </button>
        <div className="gp-modal-body">
          <input
            type="text"
            value={modalMessage}
            readOnly
            className={
              modalMessage ===
              (language === "en"
                ? "Valid Load"
                : language === "si"
                ? "වලංගු පැටවීමකි"
                : "சரியான ஏற்றுதல்")
                ? "valid-message"
                : "invalid-message"
            }
          />

          {modalMessage !==
            (language === "en"
              ? "Valid Load"
              : language === "si"
              ? "වලංගු පැටවීමකි"
              : "சரியான ஏற்றுதல்") && (
            <div className="modal-actions">
              <button className="gp-report-button" onClick={handleOpenOtpModal}>
                {textContent.reportButton}
              </button>

              <div className="contact-list">
                {textContent.contacts.map((contact, index) => (
                  <div key={index} className="contact">
                    <span>{contact.number}</span>
                    <span>{contact.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <OtpVerificationModal
          isOpen={isOtpModalOpen}
          onClose={handleCloseOtpModal}
          onVerificationSuccess={(phone) =>
            handleSubmitReport(phone, vehicleNumber)
          }
          language={language}
        />
      </div>
    </div>
  );
};

export default Modal;
