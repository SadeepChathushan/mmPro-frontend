import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/images/gsmbLogo.jpg';
import { submitComplaint } from '../../services/complaint';
import { fetchLorryNumber } from '../../services/GeneralPublic/fetchLorryNumber';
import { validateVehicleNumber } from '../../services/GeneralPublic/validation';
import Modal from '../../components/GeneralPublic/Modal';
import VehicleInput from '../../components/GeneralPublic/VehicleInput';
import '../../styles/GeneralPublic/GeneralPublicdashboard.css';
import backgroundImage from '../../assets/images/generalpublic.jpg';

const Dashboard = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [data, setData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const loadLorryNumbers = async () => {
      const lorryNumbers = await fetchLorryNumber();
      setData(lorryNumbers);
    };
    loadLorryNumbers();
  }, []);

  const handleReport = async () => {
    const success = await submitComplaint(input, phoneNumber, language);
    if (success) {
      closeModal();
    }
  };

  const handleCheck = () => {
    if (!validateVehicleNumber(input)) {
      setModalMessage(
        language === 'en'
          ? 'Invalid Vehicle Number Format!'
          : language === 'si'
          ? 'අනවශ්‍ය වාහන අංකයක්!'
          : 'தவறான வாகன எண்ணம்!'
      );
      setIsModalOpen(true);
      return;
    }

    const validVehicle = data.find((item) => item.vehicleNumber === input.trim());

    setModalMessage(
      validVehicle
        ? language === 'en'
          ? 'Valid Load'
          : language === 'si'
          ? 'වලංගු පැටවීමකි'
          : 'சரியான ஏற்றுதல்'
        : language === 'en'
        ? 'Invalid Load'
        : language === 'si'
        ? 'අනවසර පැටවීමකි'
        : 'தவறான சுமை'
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPhoneNumber('');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="page-container">
      <div className="background-section" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <main className="main-content">
        <header className="header">
          <img src={logo} alt="logo" className="header-logo" />
        </header>
        <h4 className="title">
          {language === 'en'
            ? 'GEOLOGICAL SURVEY & MINES BUREAU'
            : language === 'si'
            ? 'භූගෝලීය සමීක්ෂණ සහ පතල් කාර්යාංශය'
            : 'புவியியல் ஆய்வு மற்றும் சுரங்கப் பணியகம்'}
        </h4>
        <p className="para">
          {language === 'en'
            ? 'General public users can verify a vehicle’s validity by entering its vehicle number. The system checks the details against the database and provides an instant result, confirming whether the vehicle is valid or invalid. Additionally, users can submit complaints regarding suspicious or unauthorized vehicles, ensuring better compliance and road safety.'
            : language === 'si'
            ? 'සාමාන්‍ය පරිශීලකයින්ට වාහනයක වලංගුභාවය එහි වාහන අංකය ඇතුළත් කිරීමෙන් සත්‍යාපනය කළ හැකිය...'
            : 'பொது பயனர்கள் ஒரு வாகனத்தின் செல்லுபடியை அதன் வாகன எண்ணை உள்ளிடுவதன் மூலம் சரிபார்க்கலாம்...'}
        </p>
        <VehicleInput input={input} setInput={setInput} language={language} />
        <button
          className="check-button"
          onMouseOver={(e) => (e.target.style.backgroundColor = '#5a0000')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#800000')}
          onClick={handleCheck}
        >
          {language === 'en' ? 'Check' : language === 'si' ? 'පරීක්ෂා කරන්න' : 'சரிபார்க்கவும்'}
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
