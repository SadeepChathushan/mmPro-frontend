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
import { message } from 'antd';  // Import message for notifications
import axios from 'axios';  // Import axios for API requests
import logo from '../../assets/images/gsmbLogo.png';
import backgroundImage from '../../assets/images/dump-truck-pit-mine.jpg';

const Dashboard = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state
  const navigate = useNavigate();


  const handleReport = async () => {
    if (!input.trim()) {
      // If input is empty, show a warning and return early
      message.error(language === "en" ? "Please enter a vehicle number!" : "කරුණාකර වාහන අංකයක් ඇතුළු කරන්න!");
      return;
    }
  
    try {
      const payload = {
        issue: {
          project_id: 31,
          tracker_id: 26,
          subject: language === "en" ? "New Complaint" : "නව පැමිණිල්ලක්",
          custom_fields: [
            { id: 13, name: "Lorry Number", value: input }, 
            { id: 68, name: "Role", value: "Police Officer" },
          ],
        },
      };
  
      const username = "Dilmi_123";
      const password = "dIlmI@99";
  
      const response = await axios.post(
        "/api/projects/gsmb/issues.json",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username,
            password,
          },
        }
      );
  
      // Validation
      message.success(language === "en" ? "Report Submitted successfully!" : "පැමිණිල්ල සාර්ථකව ඉදිරිපත් කරන ලදී.");
      closeModal(); // Close modal after success
      console.log("API response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
      message.error(language === "en" ? "Report Submission Failed! Please try again." : "පැමිණිල්ල ඉදිරිපත් කිරීම අසාර්ථකයි. නැවත උත්සාහ කරන්න.");
    }
  };
  
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
      minHeight: '70vh',
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

      // backgroundColor: '#fff',
      // padding: '3rem', // Increased padding for more space
      // borderRadius: '12px', // Slightly larger border radius for a modern look
      // textAlign: 'center',
      // width: '0%', // Increase width to make it larger
      // maxWidth: '600px', // Set a maximum width for responsiveness
      // fontSize: '1.25rem', // Increase font size for larger text
    },
    modalButton: {
      backgroundColor: '#800000',
      color: '#fff',
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '1.5rem',
      cursor: 'pointer',
      fontSize: '1rem',
    }
  };

  const textContent = {
    // title: language === 'en' ? 'Geological Survey & Mines Bureau' : 'භූ විද්‍යා සමීක්ෂණ හා පතල් කාර්යාංශය',
    // invalidText: language === 'en' ? 'Invalid' : 'අවලංගුයි',
    reportButton: language === 'en' ? 'Report to GSMB' : 'GSMB වෙත වාර්තා කරන්න',
    contacts: [
      { number: '+94-11-2886289', icon: '📞' },
      { number: '+94-11-2886290', icon: '📞' },
      { number: '901', icon: '📞' },
    ],
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <header style={styles.header}>
        <img src={logo} alt="Logo" style={styles.headerLogo} />
      </header>
      {/* Main Content */}
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

      {/* Modal for Invalid Input */}
      {isModalOpen && (
  <div style={styles.modal}>
    <div style={styles.modalContent}>
      {/* Invalid Message */}
      <h2>{textContent.invalidText}</h2>

      {/* Invalid Button */}
      <button
        style={{
          backgroundColor: '#FF0000',
          color: '#fff',
          padding: '0.75rem 2rem',
          border: 'none',
          borderRadius: '1.5rem',
          cursor: 'pointer',
          fontSize: '1rem',
          margin: '1rem 0',
        }}
      >
        {language === 'en' ? 'Invalid' : 'අවලංගු'}
      </button>

      {/* Emergency Contact Heading */}
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
            <span>{contact.icon}</span>
            <span>{contact.number}</span>
          </div>
        ))}
      </div>

      {/* Report Button */}
      <button
        style={{
          backgroundColor: '#800000',
          color: '#fff',
          padding: '0.75rem 2rem',
          border: 'none',
          borderRadius: '1.5rem',
          cursor: 'pointer',
          fontSize: '1rem',
          margin: '1rem 0',
        }}
        onClick={handleReport} // This calls the handleReport function
      >
        {language === 'en' ? 'Report to GSMB' : 'GSMB වෙත පැමිණිලි කරන්න'}
      </button>

      {/* Close Button with X Icon */}
      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: '#FF0000',
        }}
        onClick={closeModal}
      >
        &times; {/* This is the X (close) icon */}
      </button>
    </div>
  </div>
)}

    </div>
  );
};


export default Dashboard;
