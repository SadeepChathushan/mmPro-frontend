// src/components/PoliceOfficer/ValidationModal.jsx

import React from 'react';
import '../../styles/PoliceOfficer/PoliceOfficerdashboard.css';

const ValidationModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="validation-modal-overlay">
            <div className="validation-modal">
                <p className="validation-message">{message}</p>
                <button className="validation-close-button" onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default ValidationModal;
