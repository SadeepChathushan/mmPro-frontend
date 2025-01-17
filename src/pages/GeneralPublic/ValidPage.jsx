import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/gsmbLogo.jpg';
import backgroundImage from '../../assets/images/dump-truck-pit-mine.jpg';
import { useLanguage } from '../../contexts/LanguageContext'; // Language context for dynamic switching

const Dashboard = () => {
  const { language } = useLanguage();
  const isSinhala = language === 'si';

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const textContent = {
    title: isSinhala ? 'භූ විද්‍යා සමීක්ෂණ සහ පතල් කාර්යාංශය' : 'Geological Survey & Mines Bureau',
    validText: isSinhala ? 'වලංගුයි' : 'Valid',
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: '100vh',
    },
    leftColumn: {
      flex: 1,
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      color: '#fff',
    },
    logo: {
      width: isMobile ? '150px' : '250px',
      marginBottom: '1rem',
    },
    title: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: 'bold',
      color: '#fff',
    },
    rightColumn: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '1rem' : '2rem',
      backgroundColor: '',
    },
  };

  return (
    <div style={styles.container}>
      {/* Left Column */}
      <div style={styles.leftColumn}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>{textContent.title}</h2>
      </div>

      {/* Right Column */}
      <div style={styles.rightColumn}>
        {/* Valid Text Box */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              backgroundColor: 'green',
              color: '#fff',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '1.5rem',
              fontSize: isMobile ? '0.9rem' : '1rem',
              width: '16rem',
              textAlign: 'center',
            }}
          >
            {textContent.validText}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
