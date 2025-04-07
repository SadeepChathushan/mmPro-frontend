import { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import logo from "../../assets/images/gsmbLogo.jpg";
import { submitComplaintPublic } from "../../services/complaint";
import {
  validateVehicleNumber,
  validatePhoneNumber,
} from "../../services/GeneralPublic/validation";
import Modal from "../../components/GeneralPublic/Modal";
import VehicleInput from "../../components/GeneralPublic/VehicleInput";
import "../../styles/GeneralPublic/GeneralPublicdashboard.css";
import backgroundImage from "../../assets/images/generalpublic.jpg";
import { handleCheckService } from "../../services/GeneralPublic/fetchLorryNumber";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL; // ✅ For Vite (modern setup)

const Dashboard = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [data, setData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [complaintData, setComplaintData] = useState({
    description: "",
    location: "",
    evidence: null
  });

  // useEffect(() => {
  //   const loadLorryNumbers = async () => {
  //     const lorryNumbers = await fetchLorryNumber();
  //     setData(lorryNumbers);
  //   };
  //   loadLorryNumbers();
  // }, []);

  // const handleReport = async () => {
  //   if (!validatePhoneNumber(phoneNumber)) {
  //     setModalMessage(
  //       language === "en"
  //         ? "Invalid Phone Number Format!"
  //         : language === "si"
  //         ? "වලංගු නොවන දුරකථන අංක ආකෘතියකි!"
  //         : "தவறான தொலைபேசி எண் வடிவம்!"
  //     );
  //     setIsModalOpen(true);
  //     return;
  //   }
  //   const success = await submitComplaintPublic(input, phoneNumber, language);
  //   if (success) {
  //     closeModal();
  //   }
  // };
  // const handleCheck = async () => {
  //   if (!validateVehicleNumber(input)) {
  //     setModalMessage(
  //       language === "en"
  //         ? "Invalid Vehicle Number Format!"
  //         : language === "si"
  //         ? "අනවශ්‍ය වාහන අංකයක්!"
  //         : "தவறான வாகன எண்ணம்!"
  //     );
  //     setIsModalOpen(true);
  //     return;
  //   }

  //   try {
  //     const result = await axios
  //       .get(`${BASE_URL}/general-public/validate-lorry-number`, {
  //         params: { lorry_number: input.trim() },
  //       })
  //       .then((response) => response.data)
  //       .catch((error) => {
  //         if (error.response?.status === 401) {
  //           throw new Error("Unauthorized - Invalid token");
  //         } else {
  //           throw new Error("API request failed");
  //         }
  //       });

  //     setModalMessage(
  //       result.valid
  //         ? language === "en"
  //           ? "Valid Load"
  //           : language === "si"
  //           ? "වලංගු පැටවීමකි"
  //           : "சரியான ஏற்றுதல்"
  //         : language === "en"
  //         ? "Invalid Load"
  //         : language === "si"
  //         ? "අනවසර පැටවීමකි"
  //         : "தவறான சுமை"
  //     );
  //   } catch (error) {
  //     console.error("Validation error:", error);
  //     setModalMessage(
  //       error.message.includes("Unauthorized")
  //         ? language === "en"
  //           ? "Session expired, please login again"
  //           : language === "si"
  //           ? "සැසිය කල් ඉකුත් වී ඇත, නැවත ලොග් වන්න"
  //           : "அமர்வு காலாவதியானது, மீண்டும் உள்நுழையவும்"
  //         : language === "en"
  //         ? "Error validating vehicle number"
  //         : language === "si"
  //         ? "වාහන අංකය සත්‍යාපනය කිරීමේ දෝෂයක්"
  //         : "வாகன எண்ணை சரிபார்க்கும் பிழை"
  //     );
  //   }
  //   setIsModalOpen(true);
  // };

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

    await handleCheckService(input, language, setModalMessage, setIsModalOpen);
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

  // Toggle complaint form visibility
  const toggleComplaintForm = () => {
    setShowComplaintForm(!showComplaintForm);
  };

  // Handle complaint form input changes
  const handleComplaintChange = (e) => {
    const { name, value } = e.target;
    setComplaintData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file upload for evidence
  const handleFileChange = (e) => {
    setComplaintData(prev => ({ ...prev, evidence: e.target.files[0] }));
  };

  // Submit complaint
  const handleComplaintSubmit = async () => {
    if (!validateVehicleNumber(input)) {
      setModalMessage(
        language === "en" ? "Invalid vehicle number!" :
        language === "si" ? "වලංගු නොවන වාහන අංකය!" :
        "தவறான வாகன எண்!"
      );
      setIsModalOpen(true);
      return;
    }

    if (!complaintData.description) {
      setModalMessage(
        language === "en" ? "Please enter complaint details!" :
        language === "si" ? "කරුණාකර පැමිණිල්ලේ විස්තර ඇතුළත් කරන්න!" :
        "தயவு செய்து புகார் விவரங்களை உள்ளிடவும்!"
      );
      setIsModalOpen(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('vehicleNumber', input);
      formData.append('description', complaintData.description);
      formData.append('location', complaintData.location);
      if (complaintData.evidence) {
        formData.append('evidence', complaintData.evidence);
      }

      const success = await submitComplaintPublic(formData, language);
      if (success) {
        setModalMessage(
          language === "en" ? "Complaint submitted successfully!" :
          language === "si" ? "පැමිණිල්ල සාර්ථකව ඉදිරිපත් කරන ලදී!" :
          "புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!"
        );
        setIsModalOpen(true);
        setShowComplaintForm(false);
        setComplaintData({
          description: "",
          location: "",
          evidence: null
        });
      }
    } catch (error) {
      setModalMessage(
        language === "en" ? "Failed to submit complaint. Please try again." :
        language === "si" ? "පැමිණිල්ල ඉදිරිපත් කිරීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න." :
        "புகாரை சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்."
      );
      setIsModalOpen(true);
    }
  };

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
        <div className="button-group">
        <button
          className="check-button"
          onMouseOver={(e) => (e.target.style.backgroundColor = "#5a0000")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#800000")}
          onClick={handleCheck}
        >
          {language === "en"
            ? "CHECK"
            : language === "si"
            ? "පරීක්ෂා කරන්න"
            : "சரிபார்க்கவும்"}
        </button>

{/* Complaint Form Popup */}
{showComplaintForm && (
          <div className="complaint-popup">
            <div className="complaint-popup-content">
              <h3>
                {language === "en" ? "Submit Complaint" :
                 language === "si" ? "පැමිණිල්ල ඉදිරිපත් කරන්න" :
                 "புகாரை சமர்ப்பிக்கவும்"}
              </h3>
              
              <div className="form-group">
                <label>
                  {language === "en" ? "Vehicle Number" :
                   language === "si" ? "වාහන අංකය" :
                   "வாகன எண்"}
                </label>
                <input 
                  type="text" 
                  value={input} 
                  readOnly 
                  className="read-only-input"
                />
              </div>

              <div className="form-group">
                <label>
                  {language === "en" ? "Description" :
                   language === "si" ? "විස්තර" :
                   "விளக்கம்"} *
                </label>
                <textarea
                  name="description"
                  value={complaintData.description}
                  onChange={handleComplaintChange}
                  required
                  rows={4}
                  placeholder={
                    language === "en" ? "Describe the issue in detail..." :
                    language === "si" ? "ගැටලුව විස්තරාත්මකව විස්තර කරන්න..." :
                    "சிக்கலை விரிவாக விவரிக்கவும்..."
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  {language === "en" ? "Location" :
                   language === "si" ? "ස්ථානය" :
                   "இடம்"}
                </label>
                <input
                  type="text"
                  name="location"
                  value={complaintData.location}
                  onChange={handleComplaintChange}
                  placeholder={
                    language === "en" ? "E.g., Colombo" :
                    language === "si" ? "උදා., කොළඹ" :
                    "எ.கா., கொழும்பு"
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  {language === "en" ? "Evidence (Photo/Video)" :
                   language === "si" ? "සාක්ෂි (ඡායාරූප/වීඩියෝ)" :
                   "ஆதாரம் (புகைப்படம்/வீடியோ)"}
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="popup-buttons">
                <button 
                  className="submit-btn"
                  onClick={handleComplaintSubmit}
                >
                  {language === "en" ? "Submit" :
                   language === "si" ? "ඉදිරිපත් කරන්න" :
                   "சமர்ப்பிக்கவும்"}
                </button>
                <button 
                  className="cancel-btn"
                  onClick={toggleComplaintForm}
                >
                  {language === "en" ? "Cancel" :
                   language === "si" ? "අවලංගු කරන්න" :
                   "ரத்து செய்"}
                </button>
              </div>
            </div>
          </div>
        )}
        
        <button
          className="complaint-button"
          onMouseOver={(e) => (e.target.style.backgroundColor = "#005a5a")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#008080")}
          onClick={toggleComplaintForm}
        >
          {language === "en"
            ? "Submit Complaint"
            : language === "si"
            ? "පැමිණිල්ලක් ඉදිරිපත් කරන්න"
            : "புகாரை சமர்ப்பிக்கவும்"}
        </button>
        </div>
      </main>

      {isModalOpen && (
        <Modal
          modalMessage={modalMessage}
          // phoneNumber={phoneNumber}
          // setPhoneNumber={setPhoneNumber}
          // handleReport={handleReport}
          setInput={setInput}
          vehicleNumber={input}
          language={language}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
