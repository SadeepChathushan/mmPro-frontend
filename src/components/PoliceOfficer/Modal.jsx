// src/components/PoliceOfficer/Modal.jsx

import React from 'react';
import { getTranslations } from '../../utils/PoliceOfficer/languageUtils';

const CONTACT_INFO = [
    { number: '+94-11-2886289', icon: ' 📞' },
    { number: '+94-11-2886290', icon: ' 📞' },
    { number: '901', icon: ' 📞' },
];

const Modal = ({
    isOpen,
    onClose,
    message,
    phoneNumber,
    onPhoneNumberChange,
    onReport,
    language
}) => {
    if (!isOpen) return null;

    const translations = getTranslations(language);

    return (
        <div className="po-modal">
            <div className="po-modal-content">
                <button className="po-modal-close-button" onClick={onClose}>
                    &times;
                </button>

                {/* Red warning message */}
                <div className="po-modal-warning">
                    <input
                        type="text"
                        value={message}
                        readOnly
                        className="po-modal-message"
                    />
                </div>

                {/* Phone number input */}
                <div>
                    <h3>{translations.phoneNumber[language]}</h3>
                </div>
                {/* <input
                    type="text"
                    placeholder={translations.phoneNumberPlaceholder[language]}
                    className="po-modal-input"
                    value={phoneNumber}
                    onChange={(e) => onPhoneNumberChange(e.target.value)}
                /> */}

                {/* Report button */}
                <button className="po-report-button" onClick={onReport}>
                    {translations.reportButton[language]}
                </button>

                {/* Emergency contacts */}
                <div className="po-contacts-container">
                    {CONTACT_INFO.map((contact, index) => (
                        <div key={index} className="po-contact-item">
                            <span>{contact.icon}</span>
                            <span>{contact.number}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Modal;