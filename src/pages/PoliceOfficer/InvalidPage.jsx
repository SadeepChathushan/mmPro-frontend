import React from 'react';
import logo from '../../assets/images/gsmbLogo.jpg';
import { useLanguage } from '../../contexts/LanguageContext'; // Language context for dynamic switching

const InvalidPage = () => {
  const { language } = useLanguage(); // Fetch language preference
  const isSinhala = language === 'si';

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '20vh' }}>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1rem', // Reduced padding
          minHeight: 'vh', // Reduced minimum height
          maxWidth: '80%', // Limited width of the container
          margin: '0 auto', // Centering the container
        }}
      >
        {/* Optional: Logo and Title */}
        {/* <img src={logo} alt="Logo" style={{ marginBottom: 0, width: 300 }} />
        <h2
          style={{
            fontSize: '1.5rem', // Reduced font size
            fontWeight: 'bold',
            color: '#800000',
            marginBottom: '1.5rem',
            marginTop: '1.5rem',
          }}
        >
          {textContent.title}
        </h2> */}
        <div style={{ marginBottom: '1rem' }}>
          <div
            style={{
              backgroundColor: 'red',
              color: '#fff',
              padding: '0.5rem 1.5rem', // Reduced padding
              border: 'none',
              borderRadius: '1.5rem',
              fontSize: '1rem',
              width: '14rem', // Reduced width
            }}
          >
            {textContent.invalidText}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px', // Reduced gap between elements
            padding: '10px', // Reduced padding
            maxWidth: '300px', // Decreased maximum width
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              style={{
                backgroundColor: 'white',
                color: '#FF0000',
                border: '1px solid #FF0000',
                padding: '0.5rem 1.5rem', // Reduced padding
                borderRadius: '1.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                width: '14rem', // Reduced width
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#FFF0F0')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
            >
              {textContent.reportButton}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {textContent.contacts.map((contact, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <input
                  type="text"
                  value={contact.number}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '6px', // Reduced padding
                    paddingRight: '30px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    cursor: 'default',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: '8px',
                    fontSize: '16px',
                  }}
                >
                  {contact.icon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvalidPage;

