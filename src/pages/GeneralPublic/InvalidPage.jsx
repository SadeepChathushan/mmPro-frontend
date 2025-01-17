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
    invalidText: isSinhala ? 'අවලංගුයි' : 'Invalid',
    reportButton: isSinhala ? 'GSMB වෙත වාර්තා කරන්න' : 'Report to GSMB',
    contacts: [
      { number: '+94-11-2886289', icon: '📞' },
      { number: '+94-11-2886290', icon: '📞' },
      { number: '901', icon: '📞' },
    ],
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
      backgroundColor: '#f9f9f9',
    },
    button: {
      // backgroundColor: 'white',
      // color: '#FF0000',
      // border: '1px solid #FF0000',
      // padding: '0.75rem 2rem',
      // borderRadius: '1.5rem',
      // cursor: 'pointer',
      // fontSize: isMobile ? '0.9rem' : '1rem',
      // width: '100%',
      // maxWidth: '16rem',
      // textAlign: 'center',
      backgroundColor: 'white',
      color: '#FF0000',
      border: '1px solid #FF0000',
      padding: '0.75rem 2rem',
      borderRadius: '1.5rem',
      cursor: 'pointer',
      fontSize: '1rem',
      width: '16rem',
    },
    buttonHover: {
      backgroundColor: '#FFF0F0',
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
    <div style={styles.container}>
      {/* Left Column */}
      <div style={styles.leftColumn}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>{textContent.title}</h2>
      </div>

      {/* Right Column */}
      <div style={styles.rightColumn}>
        {/* Invalid Text Box */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              // backgroundColor: 'red',
              // color: '#fff',
              // padding: '0.75rem 2rem',
              // border: 'none',
              // borderRadius: '1.5rem',
              // fontSize: isMobile ? '0.9rem' : '1rem',
              // textAlign: 'center',
              // width: '100%',
              // maxWidth: '16rem',

              backgroundColor: 'red',
              color: '#fff',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '1.5rem',
              fontSize: isMobile ? '0.9rem' : '1rem',
              width: '16rem',
              textAlign: 'center',
            }}
          >
            {textContent.invalidText}
          </div>
        </div>

        {/* Report Button */}
        <div>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
          >
            {textContent.reportButton}
          </button>
        </div>

        {/* Contact List */}
        <div style={styles.contactContainer}>
          {textContent.contacts.map((contact, index) => (
            <div key={index} style={{ position: 'relative', marginBottom: '10px' }}>
              <input type="text" value={contact.number} readOnly style={styles.contactInput} />
              <span style={styles.contactIcon}>{contact.icon}</span>
            </div>
          ))}
        </div>
</div>

    </div>
  );
};

export default Dashboard;
