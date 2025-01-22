import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { message } from 'antd';  // Import message for notifications
import axios from 'axios';  // Import axios for API requests
import logo from '../../assets/images/gsmbLogo.png';

import backgroundImage from '../../assets/images/machinery.jpg';
import { display, height, textAlign, width } from '@mui/system';
import { lang } from 'moment/moment';


const Dashboard = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [modalMessage, setModalMessage] = useState(''); // Modal message
  const navigate = useNavigate();
  const [data, setData] = useState([]); // All data fetched from API


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
    // const isValid = data.some(
    //   (item) => item.vehicleNumber && item.vehicleNumber === input.trim()
    // );

    // if (isValid) {
    //   // navigate('/police-officer/valid');
    //   navigate('/police-officer/valid', { state: { vehicleNumber: input.trim() } });
    const validVehicle = data.find(item => item.vehicleNumber === input.trim());
  
    if (validVehicle) {
      navigate('/police-officer/valid', { 
        state: { vehicleNumber: input.trim() }
      });  

    } else {
      setModalMessage(language === 'en' ? 'Invalid License Number' : 'අවලංගු බලපත් අංකය');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = "@achinthamihiran"; // Replace with actual username
        const password = "Ab2#*De#"; // Replace with actual password

        const response = await axios.get('/api/projects/gsmb/issues.json', {
          headers: {
            'Content-Type': 'application/json',
          },
          auth: {
            username,
            password,
          },
        });

        const mappedData = response.data.issues.map((issue) => ({
          vehicleNumber: issue.custom_fields.find((field) => field.name === 'Lorry Number')?.value,
        }));

        setData(mappedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between', // Space between left and right sections
      alignItems: 'center',
      height:'60vh',
      // height: '100vh', // Full page height
      backgroundColor: '#fff', // Fallback color if background image fails
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
    },
   
    backgroundSection: {
      flex: '1 1 0% ',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'left center', // Align the image to the left
      backgroundRepeat: 'no-repeat',

      height: '100%',
      width:'100%',
      display: isMobile ? 'none' : 'block',
    },
    // mainContent: {
    //   flex: '1 1 0 ', // Allow main content to grow but not shrink

    //   color: '#fff',
    // },
    header: {
      padding: '1rem',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    headerLogo: {
      width: isMobile ? '120px' : '180px',
    },
    mainContent: {
      flex: '1 1 ',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

      padding: '40px',
      backgroundColor: '#fff', // Overlay for better contrast
      marginBottom: 'auto',
      boxSizing: 'border-box', 
      // Include padding in height calculation
    },
     header: {
      padding: '10px',
      textAlign: 'right',
      backgroundColor: '#fff', 
      
    },
    headerLogo: {
      width: isMobile ? '200px' : '250px',

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
      textAlign:'center',

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
      <div style={styles.backgroundSection}></div>
     
          <main style={styles.mainContent}>

        <h2 style={styles.title}>{textContent.title}</h2>
         <header style={styles.header} >
        <img src={logo} alt="Logo" style={styles.headerLogo} />
      </header>
      <h3 style={{fontFamily:"inherit",fontWeight:'bold',color:'#950C33'}}>
        {language === 'en' ? 'GEOL0GICAL SURVEY & MINES BUREAU' : language === 'si' ? 'භූගෝලීය සමීක්ෂණ සහ පතල් කාර්යාංශය' :'புவியியல் ஆய்வு மற்றும் சுரங்கப் பணியகம்'}  </h3>
      <p style={{color:'#444242',marginTop:'5px',fontSize:"14px" , textAlign:'center',marginTop:"10px"}}>
        {language == 'en' ? ' Police officers to verify a vehicles validity by entering its registration number. The system checks thedetails against the database and provides an instant result, confirming whether the vehicle is  valid or invalid, ensuring compliance and road safety.' :language === 'si' ? 'පොලිස් නිලධාරීන් වාහනයක ලියාපදිංචි අංකය ඇතුළත් කිරීමෙන් එහි වලංගුභාවය සත්‍යාපනය කළ යුතුය. පද්ධතිය දත්ත සමුදායට අනුව විස්තර පරීක්ෂා කර ක්ෂණික ප්‍රතිඵලයක් ලබා දෙන අතර, වාහනය වලංගුද අවලංගුද යන්න තහවුරු කරයි, අනුකූලතාව සහ මාර්ග ආරක්ෂාව සහතික කරයි.' :'காவல்துறை அதிகாரிகள் ஒரு வாகனத்தின் பதிவு எண்ணை உள்ளிட்டு அதன் செல்லுபடியை சரிபார்க்க வேண்டும். இந்த அமைப்பு தரவுத்தளத்துடன் விவரங்களைச் சரிபார்த்து, வாகனம் செல்லுபடியாகுமா அல்லது செல்லாததா என்பதை உறுதிசெய்து, உடனடி முடிவை வழங்குகிறது, இணக்கத்தையும் சாலை பாதுகாப்பையும் உறுதி செய்கிறது.'}
       
        </p>
        
      {/* <Text>hjegwfjguuregsthth</Text> */}
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder={language === 'en' ? 'Enter vehicle number' :language === 'si' ? 'විස්තර ඇතුළත් කරන්න' :'வாகன எண்ணை உள்ளிடவும்'}

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
          {language === 'en' ? 'Check' : language === 'si'? 'පරීක්ෂා කරන්න':'சரிபார்க்கவும்'}
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
                value={language === 'en' ? 'Invalid' :language === 'si'? 'අවලංගු':'தவறானது'}
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
                {language === 'en' ? 'Report to GSMB' : language === 'si'? 'GSMB වෙත වාර්තා කරන්න' :'GSMB-க்கு புகாரளிக்கவும்'}
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


