import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import axios from 'axios';

const ValidPage = () => {
  const { language } = useLanguage();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [responsiveStyles, setResponsiveStyles] = useState({});
  const vehicleNumber = state?.vehicleNumber;
  const isSinhala = language === 'si';

  const textContent = {
    licenseTitle: isSinhala ? 'වැලි පතල් බලපත්‍රය' : 'Sand Mining License',
    validText: isSinhala ? 'වලංගුයි' : 'Valid',
    fields: [
      [
        { label: isSinhala ? 'බලපත්‍ර අංකය' : 'License Number', dataIndex: 'licenseNumber'},
        { label: isSinhala ? 'ආරම්භක ස්ථානය' : 'Location Started', dataIndex: 'location'},
      ],
      [
        { label: isSinhala ? 'කල් ඉකුත්වන දිනය' : 'Expires',dataIndex: 'expire' },
        { label: isSinhala ? 'පැටවූ දිනය / වේලාව' : 'Loaded date/time', dataIndex: 'start'},
      ],
      [
        { label: isSinhala ? 'කියුබ් ගණන' : 'Capacity(Cubes)', dataIndex: 'capacity'},
        { label: isSinhala ? 'අවලංගු දිනය/ වේලාව' : 'Due date/Time', dataIndex: 'dueDate'},
      ],
      [
        { label: isSinhala ? 'පැටවුම් අංකය' : 'Load Number', dataIndex: 'loadNumber'},
        { label: isSinhala ? 'ගමනාන්තය' : 'Destination', dataIndex: 'destination'},
      ],
      [{ label: isSinhala ? 'බලපත්‍ර හිමිකරු' : 'License Holder', dataIndex: 'owner'}],
    ],
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '5px',
      backgroundColor: '#f4f4f9',
      color: '#333',
    },
    headerSection: {
      width: '100%',
      maxWidth: '1200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    validBadge: {
      backgroundColor: '#28a745',
      color: '#fff',
      padding: '12px 70px',
      borderRadius: '30px',
      fontSize: '1.2rem',
      textAlign: 'center',
      marginBottom: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#8B0000',
      textAlign: 'center',
      marginBottom: '10px',
    },
    content: {
      width: '100%',
      maxWidth: '1200px',
      backgroundColor: '#fff',
      borderRadius: '15px',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
      padding: '15px',
    },
    fieldsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
    },
    field: {
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '10px',
      backgroundColor: '#fafafa',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    },
    label: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#555',
      marginBottom: '8px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '14px',
      backgroundColor: '#f9f9f9',
      color: '#333',
      fontWeight: 'bold',
      textAlign: 'center',
      width: '100%',
      pointerEvents: 'none',
    },
    fieldRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      borderBottom: '1px solid #eee',
      margin: '5px 0',
    },
    fieldValue: {
      textAlign: 'right',
      fontWeight: 'bold',
    },
  };

  // Get responsive styles
  const getResponsiveStyles = () => {
    if (window.innerWidth <= 768) {
      return {
        fieldsContainer: {
          ...styles.fieldsContainer,
          gridTemplateColumns: '1fr',
        },
        validBadge: {
          ...styles.validBadge,
          padding: '10px 30px',
          fontSize: '1rem',
        },
        sectionTitle: {
          ...styles.sectionTitle,
          fontSize: '1.5rem',
        },
        content: {
          ...styles.content,
          padding: '15px',
        },
      };
    }
    return styles;
  };

  useEffect(() => {
    const handleResize = () => {
      setResponsiveStyles(getResponsiveStyles());
    };

    handleResize(); // Set initial responsive styles
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = "@achinthamihiran";
        const password = "Ab2#*De#";

        const response = await axios.get('/api/projects/gsmb/issues.json', {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username,
            password,
          },
        });

        
        // Separate issues by tracker
        const tplIssues = response.data.issues.filter(issue => issue.tracker.name === 'TPL');
        const mlIssues = response.data.issues.filter(issue => issue.tracker.name === 'ML');


        // Map TPL issues
        const tplData = tplIssues.map((issue) => ({
          vehicleNumber: issue.custom_fields.find((field) => field.name === 'Lorry Number')?.value,
          licenseNumber: issue.custom_fields.find((field) => field.name === 'License Number')?.value,
          start: issue.start_date, // Using standard field
          dueDate: issue.due_date, 
          capacity: issue.custom_fields.find((field) => field.name === 'Cubes')?.value,    
          destination: issue.custom_fields.find((field) => field.name === 'Destination')?.value,  
          loadNumber: issue.id.toString(), // Get TPL issue number for Load Number        
        }));
 
        const hardcodedLocation = "Kegalla";

        // Find the matching TPL issue based on vehicle number
        const matchingTplData = tplData.find((item) => item.vehicleNumber === vehicleNumber);

        if (matchingTplData) {
          // Find corresponding ML issue using License Number
          const matchingMlIssue = mlIssues.find(issue => 
            issue.custom_fields.find(field => 
              field.name === 'License Number'
            )?.value === matchingTplData.licenseNumber
          );

          // Get owner from ML issue
          const owner = matchingMlIssue?.custom_fields.find(field => field.name === 'Owner Name')?.value;

          const expire = matchingMlIssue?.due_date; // Get expiry date from ML standard field

          // Combine TPL and ML data
          setData({
            ...matchingTplData,
            owner: owner || 'N/A',
            expire: expire || 'N/A',
            location: hardcodedLocation,
          });
        } else {
          setData(null);
        }       

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (vehicleNumber) {
      fetchData();
    }
  }, [vehicleNumber]);

  if (!vehicleNumber) {
    return (
      <div style={{ ...styles.container, minHeight: '100vh', justifyContent: 'center' }}>
        {language === "en" ? "No vehicle number provided" : "වාහන අංකයක් සපයා නැත"}
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ ...styles.container, minHeight: '100vh', justifyContent: 'center' }}>
        {language === "en" ? "Loading..." : "පූරණය වෙමින්..."}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <div style={responsiveStyles?.validBadge || styles.validBadge}>
          {textContent.validText}
        </div>
        <h1 style={responsiveStyles?.sectionTitle || styles.sectionTitle}>
          {textContent.licenseTitle}
        </h1>
      </div>

      <div style={responsiveStyles?.content || styles.content}>
        {textContent.fields.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.fieldsContainer}>
            {row.map((field, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} style={styles.field}>
                <div style={styles.label}>{field.label}</div>
                <input 
                  style={styles.input}
                  type="text"
                  value={data[field.dataIndex] || 'N/A'}
                  readOnly
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValidPage;