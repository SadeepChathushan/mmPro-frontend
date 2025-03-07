import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { fetchVehicleData } from "../../services/PoliceOfficer/vehicleService";
import { submitComplaint } from "../../services/complaint";
import { getTranslations } from "../../utils/PoliceOfficer/languageUtils";
import {
  validateVehicleNumber,
  validatePhoneNumber,
} from "../../services/PoliceOfficer/validation";
import ReportModal from "../../components/PoliceOfficer/Modal";
import ValidationModal from "../../components/PoliceOfficer/ValidationModal";
import VehicleCheckForm from "../../components/PoliceOfficer/VehicleCheckForm";
import logo from "../../assets/images/gsmbLogo.png";
import backgroundImage from "../../assets/images/machinery.jpg";
import "../../styles/PoliceOfficer/PoliceOfficerdashboard.css";
import axios from "axios";
import api from "./services/axiosConfig";

const BASE_URL = import.meta.env.VITE_BASE_URL; // ✅ For Vite (modern setup)

const Dashboard = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const translations = getTranslations(language);

  const handleCheck = async () => {
    if (!validateVehicleNumber(input)) {
      setValidationMessage(translations.invalidVehicleNumber[language]);
      setIsValidationModalOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem("USER_TOKEN");

      const response = await api.get(`/police-officer/check-lorry-number`, {
        params: { lorry_number: input.trim() },
      });

      const data = response.data;

      if (data.license_details) {
        navigate("/police-officer/valid", {
          state: { licenseDetails: data.license_details },
        });
      } else {
        setModalMessage(translations.invalidLoad[language]);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);

      if (error.response?.status === 401) {
        // If access token is expired, try to refresh the token
        const newToken = await authService.refreshToken(); // Refresh token

        if (!newToken) {
          // If refresh fails, redirect to login
          message.error("Session expired. Please log in again.");
          navigate("/login");
        } else {
          // Retry the original request with the new token
          localStorage.setItem("ACCESS_TOKEN", newToken);
          // Re-run the request with the new token
          handleCheck();
        }
      } else {
        setModalMessage(translations.invalidLoad[language]);
        setIsModalOpen(true);
      }
    }
  };

  const handleReport = async () => {
    // if (!validatePhoneNumber(phoneNumber)) {
    //   setValidationMessage(translations.invalidPhoneNumber[language]);
    //   setIsValidationModalOpen(true);
    //   return;
    // }

    try {
      const success = await submitComplaint(input, language);
      if (success) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to submit report:", error);
    }
  };

  useEffect(() => {
    setModalMessage(translations.invalidLoad[language]); // Update message when language changes
  }, [language]);

  return (
    <div className="po-dashboard-container">
      <div
        className="po-background-section"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <main className="po-main-content">
        <header className="po-header">
          <img src={logo} alt="Logo" className="po-header-logo" />
        </header>
        <h3 className="po-org-title">{translations.title[language]}</h3>
        <p className="po-org-description">
          {translations.description[language]}
        </p>

        <VehicleCheckForm
          input={input}
          onInputChange={setInput}
          onCheck={handleCheck}
          language={language}
        />

        {isModalOpen && (
          <ReportModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            message={modalMessage}
            onReport={handleReport}
            language={language}
          />
        )}

        {isValidationModalOpen && (
          <ValidationModal
            isOpen={isValidationModalOpen}
            onClose={() => setIsValidationModalOpen(false)}
            message={validationMessage}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
