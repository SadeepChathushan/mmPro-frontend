  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useLanguage } from '../../contexts/LanguageContext';
  import logo from '../../assets/images/gsmbLogo.png';
  import backgroundImage from '../../assets/images/dump-truck-pit-mine.jpg';
  
  const Dashboard = () => {
    const { language } = useLanguage();
    const [input, setInput] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();
  
    const handleCheck = () => {
      if (/^\d+$/.test(input)) {
        navigate('/police-officer/valid');
      } else {
        navigate('/police-officer/invalid');
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
        flexDirection: isMobile ? 'column' : 'row',
        minHeight: '100vh',
      },
      leftColumn: {
        flex: 1,
        position: 'relative',
        display: isMobile ? 'none' : 'block',
      },
      backgroundImage: {
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(0.5px)',
      },
      overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      logo: {
        width: isMobile ? '150px' : '250px',
        marginBottom: 20,
        zIndex: 1,
        objectFit: 'contain',
        filter: 'invert(1)',
      },
      title: {
        fontSize: isMobile ? '1.5rem' : '1.75rem',
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
      },
      rightColumn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '1rem' : '2rem',
        backgroundColor: isMobile ? '#fff' : '#f9f9f9',
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
      mobileHeader: {
        display: isMobile ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
        width: '100%',
        height: '200px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(0.5px)',
      },
    };
  
    return (
      <div style={styles.container}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          <div style={styles.backgroundImage}></div>
          <div style={styles.overlay}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <h2 style={styles.title}>
              {language === 'en' ? 'Geological Survey & Mines Bureau' : 'භූ විද්‍යා සමීක්ෂණ හා පතල් කාර්යාංශය'}
            </h2>
          </div>
        </div>
  
        {/* Right Column */}
        <div style={styles.rightColumn}>
          <div style={styles.mobileHeader}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <h2 style={styles.title}>
              {language === 'en' ? 'Geological Survey & Mines Bureau' : 'භූ විද්‍යා සමීක්ෂණ හා පතල් කාර්යාංශය'}
            </h2>
          </div>
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
    );
  };
  
  export default Dashboard;
  


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLanguage } from '../../contexts/LanguageContext';
// import logo from '../../assets/images/gsmbLogo.jpg';

// const Dashboard = () => {
//   const { language } = useLanguage();
//   const [input, setInput] = useState('');
//   const navigate = useNavigate();

//   const handleCheck = () => {
//     if (/^\d+$/.test(input)) {
//       navigate('/police-officer/valid');
//     } else {
//       navigate('/police-officer/invalid');
//     }
//   };

//   const styles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       minHeight: '100vh',
//     },
//     main: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       textAlign: 'center',
//       padding: '2rem',
//     },
//     logo: {
//       width: '17rem',
//       height: '12rem',
//       marginBottom: '1.5rem',
//     },
//     title: {
//       fontSize: '1.75rem',
//       fontWeight: 'bold',
//       color: '#800000',
//       marginBottom: '2rem',
//       marginTop: '2rem',
//     },
//     inputContainer: {
//       marginBottom: '1.5rem',
//     },
//     inputBox: {
//       width: '20rem',
//       padding: '0.75rem',
//       border: '1px solid #ccc',
//       borderRadius: '1.5rem',
//       fontSize: '1rem',
//     },
//     checkButton: {
//       backgroundColor: '#800000',
//       color: '#fff',
//       padding: '0.75rem 2rem',
//       border: 'none',
//       borderRadius: '1.5rem',
//       fontSize: '1rem',
//       cursor: 'pointer',
//       width: '20rem',
//     },
//     checkButtonHover: {
//       backgroundColor: '#5a0000',
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <main style={styles.main}>
//         <img src={logo} alt="Logo" style={styles.logo} />
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
//           onMouseOver={(e) => (e.target.style.backgroundColor = styles.checkButtonHover.backgroundColor)}
//           onMouseOut={(e) => (e.target.style.backgroundColor = styles.checkButton.backgroundColor)}
//           onClick={handleCheck}
//         >
//           {language === 'en' ? 'Check' : 'පරීක්ෂා කරන්න'}
//         </button>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;