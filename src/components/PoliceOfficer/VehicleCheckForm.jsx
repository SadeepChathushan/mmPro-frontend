// src/components/PoliceOfficer/components/VehicleCheckForm.jsx

import React from 'react';
import { getTranslations } from '../../utils/PoliceOfficer/languageUtils';

const VehicleCheckForm = ({ input, onInputChange, onCheck, language }) => {
    const translations = getTranslations(language);

    return (
        <div className="po-input-container">
            <input
                type="text"
                placeholder={translations.placeholder[language]}
                className="po-input-box"
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
            />
            <button
                className="po-check-button"
                onClick={onCheck}
            >
                {translations.checkButton[language]}
            </button>
        </div>
    );
};

export default VehicleCheckForm;