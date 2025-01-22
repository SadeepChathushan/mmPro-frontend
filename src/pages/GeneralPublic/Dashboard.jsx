import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/images/gsmbLogo.png';
import backgroundImage from '../../assets/images/Transport-image.jpeg';

// Apply global styles to prevent scrolling
const preventScrollStyles = `
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
  }
`;

const Dashboard = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [validModalVisible, setValidModalVisible] = useState(false); // Valid modal visibility state
  const [invalidModalVisible, setInvalidModalVisible] = useState(false); // Invalid modal visibility state

  const navigate = useNavigate();
  
  const handleCheck = () => {  
    if (/^\d+$/.test(input)) {
      // If input is valid (numbers only)
      setValidModalVisible(true);
    } else {
      // If input is invalid
      setInvalidModalVisible(true);
    }
  };

  const closeModals = () => {
    setValidModalVisible(false);
    setInvalidModalVisible(false);
  };

  // Update isMobile state on window resize
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
    title: language === 'si' ? 'භූ විද්‍යා සමීක්ෂණ සහ පතල් කාර්යාංශය' : 'Geological Survey & Mines Bureau',
    invalidText: language === 'si' ? 'අවලංගුයි' : 'Invalid',
    reportButton: language === 'si' ? 'GSMB වෙත වාර්තා කරන්න' : 'Report to GSMB',
    contacts: [
      { number: '+94-11-2886289', icon: '📞' },
      { number: '+94-11-2886290', icon: '📞' },
      { number: '901', icon: '📞' },
    ],
  }; 

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      maxWidth: '100vw',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    leftPanel: {
      flex: 1,
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    rightPanel: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
      color: '#333',
      padding: isMobile ? '1rem' : '2rem',
    },
    logo: {
      width: isMobile ? '150px' : '250px',
      marginBottom: '1rem',
      objectFit: 'contain',
    },
    title: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    inputContainer: {
      width: '100%',
      maxWidth: '20rem',
      marginBottom: '1.5rem',
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
      padding: '2rem',
      borderRadius: '8px',
      width: isMobile ? '90%' : '400px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    closeModalButton: {
      backgroundColor: '#800000',
      color: '#fff',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '1rem',
    },
    successButton: {
      backgroundColor: '#28a745', // Green background
      color: '#fff', // White text
      padding: isMobile ? '0.6rem 1.5rem' : '0.75rem 2rem',
      border: 'none',
      borderRadius: '1rem', // Rounded corners
      fontSize: isMobile ? '0.9rem' : '1rem',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '15rem',
      textAlign: 'center',
      marginTop: '1rem',
    },
    button: {
      backgroundColor: 'white',
      color: '#FF0000',
      border: '1px solid #FF0000',
      padding: '0.75rem 2rem',
      borderRadius: '1rem',
      cursor: 'pointer',
      fontSize: '1rem',
      width: '16rem',
      marginBottom: '1rem',
    },
    Invalidbutton: {
      backgroundColor: '#FF0000',
      color: 'white',
      border: '1px solid #FF0000',
      padding: '0.75rem 2rem',
      borderRadius: '1rem',
      cursor: 'pointer',
      fontSize: '1rem',
      width: '16rem',
      marginBottom: '1rem',
    },
    contactContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '100%',
      maxWidth: '400px',
      marginTop: '1rem',
    },
    contactInput: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: 'white',
      cursor: 'default',
    },
    contactIcon: {
      position: 'absolute',
      right: '8px',
      fontSize: '16px',
    },
  };

  return (
    <>
      {/* Inject global styles */}
      <style>{preventScrollStyles}</style>

      <div style={styles.container}>
        {/* Left Panel with Background Image */}
        <div style={styles.leftPanel}></div>

        {/* Right Panel with Content */}
        <div style={styles.rightPanel}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h2 style={styles.title}>
            {language === 'en'
              ? 'Transport License Verification'
              : 'භූ විද්‍යා සමීක්ෂණ හා පතල් කාර්යාංශය'}
          </h2>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder={
                language === 'en'
                  ? 'Enter vehicle number'
                  : 'වාහන අංකය ඇතුලු කරන්න'
              }                                 
              style={styles.inputBox}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            style={styles.checkButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#5a0000')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#800000')}
            onClick={handleCheck} // Trigger check on click
          >
            {language === 'en' ? 'Check' : 'පරීක්ෂා කරන්න'}
          </button>
        </div>
      </div>
                                                          
      {/* Valid Modal */}
      {validModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.successButton}>{language === 'en' ? 'The Vehicle is valid!' : 'අංකය වලංගු වේ!'}</button>
            <br></br>
            <button
              style={styles.closeModalButton}
              onClick={closeModals} // Close modal on click
            >
              {language === 'en' ? 'Close' : 'වසන්න'}
            </button>
          </div>
        </div>
      )}
     
      {/* Invalid Modal */}
      {invalidModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.Invalidbutton}>{language === 'en' ? 'The number is invalid!' : 'අංකය අවලංගු වේ!'}</button>
            <br></br>
            <button style={styles.button}>{language === 'en' ? 'Report GSMB' : 'අංකය අවලංගු වේ!'}</button>
            <br></br>
            {/* Contact List */}
            <div style={styles.contactContainer}>
              {textContent.contacts.map((contact, index) => (
                <div key={index} style={{ position: 'relative', marginBottom: '10px' }}>
                  <input type="text" value={contact.number} readOnly style={styles.contactInput} />
                  <span style={styles.contactIcon}>{contact.icon}</span>
                </div>
              ))}
            </div>
            <br></br>
            <button
              style={styles.closeModalButton}
              onClick={closeModals} // Close modal on click
            >
              {language === 'en' ? 'Close' : 'වසන්න'}
            </button>
          </div>
        </div>   
      )}
    </>
  );
};

export default Dashboard;
