// src/components/GeneralPublic/Modal.jsx
import React from 'react';

const Modal = ({ modalMessage, phoneNumber, setPhoneNumber, handleReport, closeModal, language }) => {
  const isSinhala = language === 'si';

  const textContent = {
    reportButton: isSinhala
      ? 'GSMB වෙත වාර්තා කරන්න'
      : language === 'ta'
      ? 'GSMB இற்கு புகார் செய்யவும்'
      : 'Report to GSMB',
    vehiclePlaceholder: isSinhala
      ? 'උදා : 0711231231'
      : language === 'ta'
      ? 'எ.கா : 0711231231'
      : 'e.g : 0711231231',
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="text"
            value={modalMessage}
            readOnly
            style={{
              backgroundColor: modalMessage === (language === 'en' ? 'Valid Load' : language === 'si' ? 'වලංගු පැටවීමකි' : 'சரியான ஏற்றுதல்') ? '#28a745' : '#FF0000',
              color: '#fff',
              padding: '0.75rem 1rem',
              border: 'none',
              borderRadius: '1.5rem',
              fontSize: '1rem',
              textAlign: 'center',
              width: '200px',
              height: '50px',
            }}
          />
          {modalMessage === (language === 'en' ? 'Invalid Load' : language === 'si' ?'අනවසර පැටවීමකි' : 'தவறான சுமை') && (
            <div style={{ marginTop: '1rem', textAlign: 'center', }}>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder={textContent.vehiclePlaceholder}
                  className="phone-number-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <button className="report-button" onClick={handleReport}>
                {textContent.reportButton}
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
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
