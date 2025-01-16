import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/images/gsmbLogo.png';
import backgroundImage from '../../assets/images/dump-truck-pit-mine.jpg';

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
  const navigate = useNavigate();

  const handleCheck = () => {
    if (/^\d+$/.test(input)) {
      navigate('/generalpublic/valid');
    } else {
      navigate('/generalpublic/invalid');
    }
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

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Full height of the viewport
      width: '100vw', // Full width of the viewport
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative', // To position child elements
      color: '#fff',
      textAlign: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
      zIndex: 1,
    },
    content: {
      position: 'relative',
      zIndex: 2, // Place above the overlay
    },
    logo: {
      width: isMobile ? '150px' : '250px',
      marginBottom: '1rem',
      objectFit: 'contain',
      filter: 'invert(1)',
    },
    title: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: 'bold',
    },
    inputContainer: {
      marginBottom: '1.5rem',
      width: '100%',
      maxWidth: '20rem',
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
  };

  return (
    <>
      {/* Inject global styles */}
      <style>{preventScrollStyles}</style>

      <div style={styles.container}>
        {/* Background Overlay */}
        <div style={styles.overlay}></div>

        {/* Content */}
        <div style={styles.content}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h2 style={styles.title}>
            {language === 'en' ? 'Geological Survey & Mines Bureau' : 'භූ විද්‍යා සමීක්ෂණ හා පතල් කාර්යාංශය'}
          </h2>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder={language === 'en' ? 'Enter vehicle number' : 'විස්තර ඇතුළත් කරන්න'}
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
