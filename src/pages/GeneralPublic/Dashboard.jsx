import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/images/gsmbLogo.png';
import backgroundImage from '../../assets/images/generalpublic.jpg';
import { submitComplaint } from '../../services/complaint';
import { fetchLorryNumber } from '../../services/fetchLorryNumber';
import { message } from 'antd';

const Dashboard = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [data, setData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const isSinhala = language === 'si';
  const textContent = {
    reportButton: isSinhala ? 'GSMB වෙත වාර්තා කරන්න' : 'Report to GSMB',
    vehiclePlaceholder: isSinhala ? 'උදා : LA 1234' : 'e.g : LA 1234',
    contacts: [
      { number: '+94-11-2886289', icon: '📞' },
      { number: '+94-11-2886290', icon: '📞' },
      { number: '901', icon: '📞' },
    ],
  };

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
      setModalMessage(language === 'en' ? 'Valid Load' : 'වලංගු පැටවීම');
      setIsModalOpen(true);
    } else {
      setModalMessage(language === 'en' ? 'Invalid Load' : 'අවලංගු බලපත් අංකය');
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

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: '#fff',
    },
    header: {
      padding: '1rem',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    headerLogo: {
      width: isMobile ? '120px' : '180px',
    },
    mainContent: {
      flex: '1 0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
    },
    inputContainer: {
      marginBottom: '1.5rem',
      width: '100%',
      maxWidth: '20rem',
      color: 'black',
    },
    inputBox: {
      width: '100%',
      padding: isMobile ? '0.6rem' : '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '1.5rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    checkButton: {
      backgroundColor: '#800000',
      color: '#fff',
      padding: isMobile ? '0.6rem 1.5rem' : '0.75rem 2rem',
      border: 'none',
      borderRadius: '1.5rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '20rem',
    },
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: '4rem',
      borderRadius: '12px',
      textAlign: 'center',
      position: 'relative',
    },
    modalCloseButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#000',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <img src={logo} alt="Logo" style={styles.headerLogo} />
      </header>
      <main style={styles.mainContent}>
        <h2 style={styles.title}>Enter Vehicle Number</h2>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder={language === 'en' ? 'e.g : LA1234' : 'උදා : LA1234'}
            style={styles.inputBox}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
          style={styles.checkButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#5a0000')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#800000')}
          onClick={handleCheck}
        >
          {language === 'en' ? 'Check' : 'පරීක්ෂා කරන්න'}
        </button>
      </main>

      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button style={styles.modalCloseButton} onClick={closeModal}>
              &times;
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <input
                type="text"
                value={modalMessage}
                readOnly
                style={{
                  backgroundColor: modalMessage === 'Valid Load' ? '#28a745' : '#FF0000',
                  color: '#fff',
                  padding: '0.75rem 2rem',
                  border: 'none',
                  borderRadius: '1.5rem',
                  fontSize: '1rem',
                  textAlign: 'center',
                  width: '200px',
                  height: '50px',
                }}
              />
              {modalMessage === (language === 'en' ? 'Invalid Load' : 'අවලංගු බලපත් අංකය') && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'Enter Your Phone Number' : 'දුරකථන අංකය ඇතුළු කරන්න'}
                      style={{
                        backgroundColor: '#f9f9f9',
                        color: '#000',
                        padding: '0.75rem 2rem',
                        border: 'solid #ccc',
                        borderRadius: '1.5rem',
                        fontSize: '1rem',
                        width: '275px',
                      }}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <button
                    style={{
                      backgroundColor: '#800000',
                      color: '#fff',
                      padding: '0.75rem 2rem',
                      border: 'none',
                      borderRadius: '1.5rem',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      marginBottom: '1rem',
                    }}
                    onClick={handleReport}
                  >
                    {language === 'en' ? 'Report to GSMB' : 'GSMB වෙත පැමිණිලි කරන්න'}
                  </button>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
                    {textContent.contacts.map((contact, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 16px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          fontSize: '14px',
                          backgroundColor: '#f9f9f9',
                          color: 'black',
                        }}
                      >
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
      )}
    </div>
  );
};

export default Dashboard;
