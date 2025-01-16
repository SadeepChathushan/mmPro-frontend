import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/gsmbLogo.jpg';

const DashboardSinhala = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleCheck = () => {
    if (/^\d+$/.test(input)) {
      // සංඛ්‍යාත්මක අදානයක් නම්
      navigate('/police-officer/valid');
    } else {
      // සංඛ්‍යාත්මක නොවන අදානයක් නම්
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
      width: '12rem',
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
        <img
          src={logo}
          alt="Logo"
          style={{ marginBottom: 0, width: 350 }}
        />
        <h2 style={styles.title}>භූ විද්‍යා හා පතල් කාර්‍යංශය</h2>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="විස්තර ඇතුළත් කරන්න"
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
          පරීක්ෂා කරන්න
        </button>
      </main>
    </div>
  );
};

export default DashboardSinhala;
