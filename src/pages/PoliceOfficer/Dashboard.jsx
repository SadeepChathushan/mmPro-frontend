import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/images/gsmbLogo.jpg';

const Dashboard = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleCheck = () => {
    if (/^\d+$/.test(input)) {
      navigate('/police-officer/valid');
    } else {
      navigate('/police-officer/invalid');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    },
    logo: {
      width: '17rem',
      height: '12rem',
      marginBottom: '1.5rem',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#800000',
      marginBottom: '2rem',
      marginTop: '2rem',
    },
    inputContainer: {
      marginBottom: '1.5rem',
    },
    inputBox: {
      width: '20rem',
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '1.5rem',
      fontSize: '1rem',
    },
    checkButton: {
      backgroundColor: '#800000',
      color: '#fff',
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '1.5rem',
      fontSize: '1rem',
      cursor: 'pointer',
      width: '20rem',
    },
    checkButtonHover: {
      backgroundColor: '#5a0000',
    },
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
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
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.checkButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.checkButton.backgroundColor)}
          onClick={handleCheck}
        >
          {language === 'en' ? 'Check' : 'පරීක්ෂා කරන්න'}
        </button>
      </main>
    </div>
  );
};

export default Dashboard;