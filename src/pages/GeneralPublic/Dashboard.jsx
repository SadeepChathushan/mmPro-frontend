// src/pages/GeneralPublic/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/images/gsmbLogo.png';
import { submitComplaint } from '../../services/complaint';
import { fetchLorryNumber } from '../../services/fetchLorryNumber';
import Modal from '../../components/GeneralPublic/Modal';
import VehicleInput from '../../components/GeneralPublic/VehicleInput';
import '../../styles/GeneralPublic/dashboard.css';

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
    const validVehicle = data.find(item => item.vehicleNumber === input.trim());

    if (validVehicle) {
      setModalMessage(language === 'en' ? 'Valid Load' : language === 'si' ? 'වලංගු පැටවීමකි' : 'சரியான ஏற்றுதல்');
      setIsModalOpen(true);
    } else {
      setModalMessage(language === 'en' ? 'Invalid Load' : language === 'si' ?'අනවසර පැටවීමකි' : 'தவறான சுமை');
      setIsModalOpen(true);
    }
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
      <header className="header">
        <img src={logo} alt="Logo" className="header-logo" />
      </header>
      <main className="main-content">
        <h2 className="title">{language === 'en' ? 'Enter Vehicle Number' : language === 'si' ? 'වාහන අංකය ඇතුලත් කරන්න' : 'வாகன எண்ணை உள்ளிடவும்'}</h2>
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
