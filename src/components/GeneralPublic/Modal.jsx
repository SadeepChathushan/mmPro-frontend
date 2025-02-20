import React, { useState } from 'react';
import OtpVerificationModal from './OtpVerificationModal.jsx';
import axios from 'axios';

const Modal = ({ 
  modalMessage, 
  language, 
  closeModal
  //reportDetails 
}) => {
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState(null);

  const textContent = {
    reportButton: language === 'si'
      ? 'GSMB වෙත වාර්තා කරන්න'
      : language === 'ta'
        ? 'GSMB இற்கு புகார் செய்யவும்'
        : 'Report to GSMB',
    contacts: [
      { number: '+94-11-2886289', icon: '📞' },
      { number: '+94-11-2886290', icon: '📞' },
      { number: '901', icon: '📞' },
    ],
  };

  const handleOpenOtpModal = () => {
    setIsOtpModalOpen(true);
  };

  const handleCloseOtpModal = () => {
    setIsOtpModalOpen(false);
  };

  const handleSubmitReport = async (phoneNumber) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/submit-report', {
        //...reportDetails,
        phoneNumber: phoneNumber
      });

      if (response.data.success) {
        // Handle successful report submission
        onClose(); // Close the modal
      } else {
        // Handle submission error
        console.error('Report submission failed');
      }
    } catch (error) {
      console.error('Error submitting report', error);
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
            className={modalMessage === (language === 'en' ? 'Valid Load' : language === 'si' ? 'වලංගු පැටවීමකි' : 'சரியான ஏற்றுதல்') ? 'valid-message' : 'invalid-message'}
          />

          {modalMessage !== (language === 'en' ? 'Valid Load' : language === 'si' ? 'වලංගු පැටවීමකි' : 'சரியான ஏற்றுதல்') && (
            <div className="modal-actions">
              <button 
                className="gp-report-button" 
                onClick={handleOpenOtpModal}
              >
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
          onVerificationSuccess={handleSubmitReport}
          language={language}
        />
      </div>
    </div>
  );
};

export default Modal;