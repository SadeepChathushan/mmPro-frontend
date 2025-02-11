import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import logo from "../../assets/images/gsmbLogo.jpg";
import { submitComplaint } from "../../services/complaint";
import { fetchLorryNumber } from "../../services/GeneralPublic/fetchLorryNumber";
import {
  validateVehicleNumber,
  validatePhoneNumber,
} from "../../services/GeneralPublic/validation";
import Modal from "../../components/GeneralPublic/Modal";
import VehicleInput from "../../components/GeneralPublic/VehicleInput";
import "../../styles/GeneralPublic/GeneralPublicdashboard.css";
import backgroundImage from "../../assets/images/generalpublic.jpg";

const Dashboard = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [data, setData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleReport = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setModalMessage(
        language === "en"
          ? "Invalid Phone Number Format!"
          : language === "si"
          ? "වලංගු නොවන දුරකථන අංක ආකෘතියකි!"
          : "தவறான தொலைபேசி எண் வடிவம்!"
      );
      setIsModalOpen(true);
      return;
    }
    const success = await submitComplaint(input, phoneNumber, language);
    if (success) {
      closeModal();
    }
  };
  const handleCheck = async () => {
    if (!validateVehicleNumber(input)) {
      setModalMessage(
        language === "en"
          ? "Invalid Vehicle Number Format!"
          : language === "si"
          ? "අනවශ්‍ය වාහන අංකයක්!"
          : "தவறான வாகன எண்ணம்!"
      );
      setIsModalOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem("USER_TOKEN");

      if (!token) {
        setModalMessage(
          language === "en"
            ? "Authentication required!"
            : language === "si"
            ? "සත්‍යාපනය අවශ්යයි!"
            : "அங்கீகாரம் தேவை!"
        );
        setIsModalOpen(true);
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:5000/general-public/validate-lorry-number?lorry_number=${encodeURIComponent(
          input.trim()
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        throw new Error("Unauthorized - Invalid token");
      }

      if (!response.ok) throw new Error("API request failed");

      const result = await response.json();

      setModalMessage(
        result.valid
          ? language === "en"
            ? "Valid Load"
            : language === "si"
            ? "වලංගු පැටවීමකි"
            : "சரியான ஏற்றுதல்"
          : language === "en"
          ? "Invalid Load"
          : language === "si"
          ? "අනවසර පැටවීමකි"
          : "தவறான சுமை"
      );
    } catch (error) {
      console.error("Validation error:", error);
      setModalMessage(
        error.message.includes("Unauthorized")
          ? language === "en"
            ? "Session expired, please login again"
            : language === "si"
            ? "සැසිය කල් ඉකුත් වී ඇත, නැවත ලොග් වන්න"
            : "அமர்வு காலாவதியானது, மீண்டும் உள்நுழையவும்"
          : language === "en"
          ? "Error validating vehicle number"
          : language === "si"
          ? "වාහන අංකය සත්‍යාපනය කිරීමේ දෝෂයක්"
          : "வாகன எண்ணை சரிபார்க்கும் பிழை"
      );
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPhoneNumber("");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="page-container">
      <div
        className="background-section"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <main className="main-content">
        <header className="header">
          <img src={logo} alt="logo" className="header-logo" />
        </header>
        <h4 className="title">
          {language === "en"
            ? "GEOLOGICAL SURVEY & MINES BUREAU"
            : language === "si"
            ? "භූගෝලීය සමීක්ෂණ සහ පතල් කාර්යාංශය"
            : "புவியியல் ஆய்வு மற்றும் சுரங்கப் பணியகம்"}
        </h4>
        <p className="para">
          {language === "en"
            ? "General public users can verify a vehicle’s validity by entering its vehicle number. The system checks the details against the database and provides an instant result, confirming whether the vehicle is valid or invalid. Additionally, users can submit complaints regarding suspicious or unauthorized vehicles, ensuring better compliance and road safety."
            : language === "si"
            ? "සාමාන්‍ය පරිශීලකයින්ට වාහනයක වලංගුභාවය එහි වාහන අංකය ඇතුළත් කිරීමෙන් සත්‍යාපනය කළ හැකිය..."
            : "பொது பயனர்கள் ஒரு வாகனத்தின் செல்லுபடியை அதன் வாகன எண்ணை உள்ளிடுவதன் மூலம் சரிபார்க்கலாம்..."}
        </p>
        <VehicleInput input={input} setInput={setInput} language={language} />
        <button
          className="check-button"
          onMouseOver={(e) => (e.target.style.backgroundColor = "#5a0000")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#800000")}
          onClick={handleCheck}
        >
          {language === "en"
            ? "Check"
            : language === "si"
            ? "පරීක්ෂා කරන්න"
            : "சரிபார்க்கவும்"}
        </button>
      </main>

      {isModalOpen && (
        <Modal
          modalMessage={modalMessage}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleReport={handleReport}
          closeModal={closeModal}
          language={language}
        />
      )}
    </div>
  );
};

export default Dashboard;
