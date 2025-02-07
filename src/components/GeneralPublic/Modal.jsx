// src/components/GeneralPublic/Modal.jsx
import React from 'react';
import '../../styles/GeneralPublic/GeneralPublicdashboard.css'; // Make sure to import the CSS file

const Modal = ({ modalMessage, phoneNumber, setPhoneNumber, handleReport, closeModal, language }) => {
  const isSinhala = language === 'si';

  const textContent = {
    reportButton: isSinhala
      ? 'GSMB වෙත වාර්තා කරන්න'
      : language === 'ta'
        ? 'GSMB இற்கு புகார் செய்யவும்'
        : 'Report to GSMB',
    vehiclePlaceholder: isSinhala
      ? 'උදා : 071XXXXXXX'
      : language === 'ta'
        ? 'எ.கா : 071XXXXXXX'
        : 'e.g : 071XXXXXXX',
    contacts: [
      { number: '+94-11-2886289', icon: '📞' },
      { number: '+94-11-2886290', icon: '📞' },
      { number: '901', icon: '📞' },
    ],
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

          {modalMessage === (language === 'en' ? 'Invalid Load' : language === 'si' ? 'අනවසර පැටවීමකි' : 'தவறான சுமை') && (
            <div className="modal-input-section">
              <h3 className="modal-title">
                {language === 'en'
                  ? 'Enter Your Phone Number (e.g : 071XXXXXXX)'
                  : language === 'si'
                    ? 'දුරකථන අංකය ඇතුළු කරන්න (උදා : 071XXXXXXX)'
                    : 'தொலைபேசி எண்ணை உள்ளிடவும் (எ.கா : 071XXXXXXX)'}
              </h3>
              <input
                type="text"
                placeholder={textContent.vehiclePlaceholder}
                className="phone-number-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button className="report-button" onClick={handleReport}>
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
      </div>
    </div>
  );
};

export default Modal;
