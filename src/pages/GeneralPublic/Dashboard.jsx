import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/images/gsmbLogo.png';
import backgroundImage from '../../assets/images/Transport-image.jpeg';
import { checkVehicleNumber } from '@service/publicLorryNumber';

const Dashboard = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [validModalVisible, setValidModalVisible] = useState(false);
  const [invalidModalVisible, setInvalidModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleCheck = async () => {
    const result = await checkVehicleNumber(input);  // 'input' is the user-entered vehicle number

    if (result.valid) {
      setValidModalVisible(true);  // Display the modal for valid vehicle
    } else {
      setInvalidModalVisible(true);  // Display the modal for invalid vehicle
    }
  };

  const closeModals = () => {
    setValidModalVisible(false);
    setInvalidModalVisible(false);
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

  const textContent = {
    title:
      language === 'si'
        ? 'භූ විද්‍යා සමීක්ෂණ සහ පතල් කාර්යාංශය'
        : 'Geological Survey & Mines Bureau',
    invalidText: language === 'si' ? 'අවලංගුයි' : 'Invalid',
    reportButton:
      language === 'si' ? 'GSMB වෙත වාර්තා කරන්න' : 'Report to GSMB',
    contacts: [
      { number: '+94-11-2886289', icon: '📞' },
      { number: '+94-11-2886290', icon: '📞' },
      { number: '901', icon: '📞' },
    ],
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      backgroundColor: '#f4f4f9',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      width: '100%',
      height: '40vh',
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      textShadow: '0 4px 6px rgba(0,0,0,0.3)',
    },
    headerText: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    content: {
      width: '100%',
      maxWidth: '400px',
      marginTop: '-10vh',
      padding: '1rem',
      background: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '12px',
      textAlign: 'center',
    },
    logo: {
      width: '150px',
      marginBottom: '1rem',
    },
    inputBox: {
      width: '100%',
      padding: '0.75rem',
      marginBottom: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: '1.5rem',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '400px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
      padding: '0.5rem 1rem',
      marginTop: '1rem',
      backgroundColor: '#ff4d4f',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>{textContent.title}</h1>
      </div>
      <div style={styles.content}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <input
          type="text"
          placeholder={
            language === 'en'
              ? 'Enter vehicle number (e.g: LA - 1234)'
              : 'වාහන අංකය ඇතුලු කරන්න (උදා: LA - 1234)'
          }
          style={styles.inputBox}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
          onClick={handleCheck}
        >
          {language === 'en' ? 'Check' : 'පරීක්ෂා කරන්න'}
        </button>
      </div>
      {validModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <p>
              {language === 'en'
                ? 'The Vehicle is valid!'
                : 'අංකය වලංගු වේ!'}
            </p>
            <button style={styles.closeButton} onClick={closeModals}>
              {language === 'en' ? 'Close' : 'වසන්න'}
            </button>
          </div>
        </div>
      )}
      {invalidModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <p>
              {language === 'en'
                ? 'The number is invalid!'
                : 'අංකය අවලංගු වේ!'}
            </p>
            <button style={styles.closeButton} onClick={closeModals}>
              {language === 'en' ? 'Close' : 'වසන්න'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
