// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLanguage } from '../../contexts/LanguageContext';
// import logo from '../../assets/images/gsmbLogo.png';
// import backgroundImage from '../../assets/images/dump-truck-pit-mine.jpg';

// const Dashboard = () => {
//   const { language } = useLanguage();
//   const [input, setInput] = useState('');
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const navigate = useNavigate();

//   const handleCheck = () => {
//     if (/^\d+$/.test(input)) {
//       navigate('/police-officer/valid');
//     } else {
//       navigate('/police-officer/invalid');
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const styles = {
//     pageContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       minHeight: '70vh',
//       backgroundImage: `url(${backgroundImage})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//       color: '#fff',
//     },
//     header: {
//       padding: '1rem',
//       textAlign: 'center',
//       backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent header background
//     },
//     headerLogo: {
//       width: isMobile ? '120px' : '180px',
//     },
//     mainContent: {
//       flex: '1 0 auto', // Allow main content to grow but not shrink
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: '2rem',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay for better contrast
//       marginBottom: 'auto',
//       // height: `calc(100vh - 120px)`, // Adjust height based on header and footer
//       boxSizing: 'border-box', // Include padding in height calculation
//     },
//     title: {
//       fontSize: isMobile ? '1.5rem' : '2rem',
//       fontWeight: 'bold',
//       marginBottom: '1.5rem',
//     },
//     inputContainer: {
//       marginBottom: '1.5rem',
//       width: '100%',
//       maxWidth: '20rem',
//       color:'black',
//     },
//     inputBox: {
//       width: '100%',
//       padding: isMobile ? '0.6rem' : '0.75rem',
//       border: '1px solid #ccc',
//       borderRadius: '1.5rem',
//       fontSize: isMobile ? '0.9rem' : '1rem',
//     },
//     checkButton: {
//       backgroundColor: '#800000',
//       color: '#fff',
//       padding: isMobile ? '0.6rem 1.5rem' : '0.75rem 2rem',
//       border: 'none',
//       borderRadius: '1.5rem',
//       fontSize: isMobile ? '0.9rem' : '1rem',
//       cursor: 'pointer',
//       width: '100%',
//       maxWidth: '20rem',
//     },
//   };

//   return (
//     <div style={styles.pageContainer}>
//       {/* Header */}
//       <header style={styles.header}>
//         <img src={logo} alt="Logo" style={styles.headerLogo} />
//       </header>

//       {/* Main Content */}
//       <main style={styles.mainContent}>
//         <h2 style={styles.title}>
//           {language === 'en' ? 'Geological Survey & Mines Bureau' : 'භූ විද්‍යා සමීක්ෂණ හා පතල් කාර්යාංශය'}
//         </h2>
//         <div style={styles.inputContainer}>
//           <input
//             type="text"
//             placeholder={language === 'en' ? 'Enter vehicle number' : 'විස්තර ඇතුළත් කරන්න'}
//             style={styles.inputBox}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//         </div>
//         <button
//           style={styles.checkButton}
//           onMouseOver={(e) => (e.target.style.backgroundColor = '#5a0000')}
//           onMouseOut={(e) => (e.target.style.backgroundColor = '#800000')}
//           onClick={handleCheck}
//         >
//           {language === 'en' ? 'Check' : 'පරීක්ෂා කරන්න'}
//         </button>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/images/gsmbLogo.png';
import backgroundImage from '../../assets/images/dump-truck-pit-mine.jpg';

const Dashboard = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state
  const navigate = useNavigate();

  const handleCheck = () => {
    if (/^\d+$/.test(input)) {
      navigate('/police-officer/valid');
    } else {
      setIsModalOpen(true);  // Open modal on invalid input
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close modal
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
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent header background
    },
    headerLogo: {
      width: isMobile ? '120px' : '180px',
    },
    mainContent: {
      flex: '1 0 auto', // Allow main content to grow but not shrink
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay for better contrast
      marginBottom: 'auto',
      boxSizing: 'border-box', // Include padding in height calculation
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
      color:'black',
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
      padding: '3rem',
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
    // modalButton: {
    //   backgroundColor: '#800000',
    //   color: '#fff',
    //   padding: '0.75rem 2rem',
    //   border: 'none',
    //   borderRadius: '1.5rem',
    //   cursor: 'pointer',
    //   fontSize: '1rem',
    // }
  };

  const textContent = {
    // reportButton: language === 'en' ? 'Report to GSMB' : 'GSMB වෙත වාර්තා කරන්න',
    contacts: [
      { number: '+94-11-2886289', icon: ' 📞' },
      { number: '+94-11-2886290', icon: ' 📞' },
      { number: '901', icon: ' 📞' },
    ],
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <img src={logo} alt="Logo" style={styles.headerLogo} />
      </header>
      <main style={styles.mainContent}>
        <h2 style={styles.title}>{textContent.title}</h2>
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
      </main>
      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button
              style={styles.modalCloseButton}
              onClick={closeModal}
            >
              &times;
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <input
                type="text"
                value={language === 'en' ? 'Invalid' : 'අවලංගු'}
                readOnly
                style={{
                  backgroundColor: '#FF0000',
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

              <button
                style={{
                  backgroundColor: '#fff',
                  color: '#FF0000',
                  border: '2px solid #FF0000',
                  padding: '0.75rem 2rem',
                  borderRadius: '1.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  margin: '1rem 0',
                  width: '200px',
                  height: '50px',
                }}
              >
                {language === 'en' ? 'Report to GSMB' : 'GSMB වෙත වාර්තා කරන්න'}
              </button>
            </div>
            
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;
