import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const ValidPage = () => {
  const { language } = useLanguage();
  const isSinhala = language === 'si';

  const textContent = {
    licenseTitle: isSinhala ? 'වැලි පතල් බලපත්‍රය' : 'Sand Mining License',
    validText: isSinhala ? 'වලංගුයි' : 'Valid',
    fields: [
      [
        { label: isSinhala ? 'බලපත්‍ර අංකය' : 'License Number', value: 'TN/JN/P/B/2024/03/005' },
        { label: isSinhala ? 'ආරම්භක ස්ථානය' : 'Location Started', value: 'Colombo' },
      ],
      [
        { label: isSinhala ? 'කල් ඉකුත්වන දිනය' : 'Expires', value: '2024-01-19' },
        { label: isSinhala ? 'පැටවූ දිනය / වේලාව' : 'Loaded date/time', value: '2024-01-18 10:30 AM' },
      ],
      [
        { label: isSinhala ? 'ප්‍රමාණය' : 'Quantity', value: '100' },
        { label: isSinhala ? 'අවලංගු දිනය/ වේලාව' : 'Due date/Time', value: '2024-01-19 4:00 PM' },
      ],
      [
        { label: isSinhala ? 'පැටවුම් අංකය' : 'Load Number', value: '8456' },
        { label: isSinhala ? 'ගමනාන්තය' : 'Destination', value: 'Kandy' },
      ],
      [{ label: isSinhala ? 'බලපත්‍ර හිමිකරු' : 'License Holder', value: 'Kamal' }],
    ],
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // minHeight: '50vh',
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
      // marginBottom: '1px',
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
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
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
  };

  // Media queries for responsive design
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

  const [responsiveStyles, setResponsiveStyles] = React.useState(getResponsiveStyles());

  React.useEffect(() => {
    const handleResize = () => {
      setResponsiveStyles(getResponsiveStyles());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={styles.container}>
      {/* Header Section with Badge and Title */}
      <div style={styles.headerSection}>
        <div style={responsiveStyles.validBadge}>
          {textContent.validText}
        </div>
        <h1 style={responsiveStyles.sectionTitle}>
          {textContent.licenseTitle}
        </h1>
      </div>

      {/* Content Section */}
      <div style={responsiveStyles.content}>
        <div style={responsiveStyles.fieldsContainer}>
          {textContent.fields.flat().map((field, i) => (
            <div key={i} style={styles.field}>
              <label style={styles.label}>{field.label}</label>
              <input
                type="text"
                value={field.value}
                readOnly
                style={styles.input}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValidPage;



// import React from 'react';
// import { useLanguage } from '../../contexts/LanguageContext';

// const ValidPage = () => {
//   const { language } = useLanguage();
//   const isSinhala = language === 'si';

//   const textContent = {
//     licenseTitle: isSinhala ? 'වැලි පතල් බලපත්‍රය' : 'Sand Mining License',
//     validText: isSinhala ? 'වලංගුයි' : 'Valid',
//     fields: [
//       [
//         { label: isSinhala ? 'බලපත්‍ර අංකය' : 'License Number', value: 'TN/JN/P/B/2024/03/005' },
//         { label: isSinhala ? 'ආරම්භක ස්ථානය' : 'Location Started', value: 'Colombo' },
//       ],
//       [
//         { label: isSinhala ? 'කල් ඉකුත්වන දිනය' : 'Expires', value: '2024-01-19' },
//         { label: isSinhala ? 'පැටවූ දිනය / වේලාව' : 'Loaded date/time', value: '2024-01-18 10:30 AM' },
//       ],
//       [
//         { label: isSinhala ? 'ප්‍රමාණය' : 'Quantity', value: '100' },
//         { label: isSinhala ? 'අවලංගු දිනය/ වේලාව' : 'Due date/Time', value: '2024-01-19 4:00 PM' },
//       ],
//       [
//         { label: isSinhala ? 'පැටවුම් අංකය' : 'Load Number', value: '8456' },
//         { label: isSinhala ? 'ගමනාන්තය' : 'Destination', value: 'Kandy' },
//       ],
//       [{ label: isSinhala ? 'බලපත්‍ර හිමිකරු' : 'License Holder', value: 'Kamal' }],
//     ],
//   };

//   const styles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'flex-start',
//       minHeight: '20vh',
//       padding: '20px',
//       backgroundColor: '#f4f4f9',
//       color: '#333',
//     },
//     headerContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       width: '100%',
//       maxWidth: '1200px',
//       marginBottom: '30px',
//       position: 'relative',
//     },
//     validBadge: {
//       backgroundColor: '#28a745',
//       color: '#fff',
//       padding: '15px 60px',
//       borderRadius: '30px',
//       fontSize: '1.5rem',
//       textAlign: 'center',
//       position: 'absolute',
//       left: 0,
//     },
//     sectionTitle: {
//       fontSize: '2rem',
//       fontWeight: 'bold',
//       color: '#8B0000',
//       margin: '0 auto',
//       textAlign: 'center',
//       width: '100%',
//     },
//     content: {
//       width: '100%',
//       maxWidth: '1200px',
//       backgroundColor: '#fff',
//       borderRadius: '15px',
//       boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
//       padding: '30px',
//     },
//     fieldsContainer: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//       gap: '20px',
//     },
//     field: {
//       display: 'flex',
//       flexDirection: 'column',
//       border: '1px solid #ddd',
//       borderRadius: '10px',
//       padding: '15px',
//       backgroundColor: '#fafafa',
//       boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
//     },
//     label: {
//       fontSize: '14px',
//       fontWeight: 'bold',
//       color: '#555',
//       marginBottom: '5px',
//     },
//     input: {
//       padding: '10px',
//       border: '1px solid #ccc',
//       borderRadius: '5px',
//       fontSize: '14px',
//       backgroundColor: '#f9f9f9',
//       color: '#333',
//       fontWeight: 'bold',
//       textAlign: 'center',
//       pointerEvents: 'none',
//     },
//     // Media query for mobile responsiveness
//     '@media (max-width: 768px)': {
//       validBadge: {
//         padding: '10px 40px',
//         fontSize: '1.25rem',
//         marginBottom: '15px',
//       },
//       sectionTitle: {
//         fontSize: '1.75rem',
//         marginBottom: '20px',
//       },
//       content: {
//         maxWidth: '500px',
//         padding: '20px',
//       },
//     },
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.headerContainer}>
//         <div style={styles.validBadge}>{textContent.validText}</div>
//         <h1 style={styles.sectionTitle}>{textContent.licenseTitle}</h1>
//       </div>

//       {/* Content */}
//       <div style={styles.content}>
//         <div style={styles.fieldsContainer}>
//           {textContent.fields.flat().map((field, i) => (
//             <div key={i} style={styles.field}>
//               <label style={styles.label}>{field.label}</label>
//               <input type="text" value={field.value} readOnly style={styles.input} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ValidPage;




// import React from 'react';
// // import logo from '../../assets/images/gsmbLogo.jpg';
// import { useLanguage } from '../../contexts/LanguageContext';

// const ValidPage = () => {
//   const { language } = useLanguage();
//   const isSinhala = language === 'si';

//   const textContent = {
//     licenseTitle: isSinhala ? 'වැලි පතල් බලපත්‍රය' : 'Sand Mining License',
//     validText: isSinhala ? 'වලංගුයි' : 'Valid',
//     fields: [
//       [
//         { label: isSinhala ? 'බලපත්‍ර අංකය' : 'License Number', value: 'TN/JN/P/B/2024/03/005' },
//         { label: isSinhala ? 'ආරම්භක ස්ථානය' : 'Location Started', value: 'Colombo' },
//       ],
//       [
//         { label: isSinhala ? 'කල් ඉකුත්වන දිනය' : 'Expires', value: '2024-01-19' },
//         { label: isSinhala ? 'පැටවූ දිනය / වේලාව' : 'Loaded date/time', value: 'USD' },
//       ],
//       [
//         { label: isSinhala ? 'ප්‍රමාණය' : 'Quantity', value: '100' },
//         { label: isSinhala ? 'අවලංගු දිනය/ වේලාව' : 'Due date/Time', value: '9456' },
//       ],
//       [
//         { label: isSinhala ? 'පැටවුම් අංකය' : 'Load Number', value: '8456' },
//         { label: isSinhala ? 'ගමනාන්තය' : 'Destination', value: 'Kandy' },
//       ],
//       [{ label: isSinhala ? 'බලපත්‍ර හිමිකරු' : 'License Holder', value: 'Kamal' }],
//     ],
//   };

//   const styles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '60vh',
//       padding: '20px',
//       backgroundColor: 'white',
//       color: '#333',
//     },
//     headerContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       width: '100%',
//       maxWidth: '1000px',
//       marginBottom: '20px',
//       position: 'relative',
//     },
//     validBadge: {
//       backgroundColor: 'green',
//       color: '#fff',
//       padding: '10px 50px',
//       borderRadius: '20px',
//       fontSize: '1.25rem',
//       textAlign: 'center',
//       position: 'absolute',
//       left: 0,
//     },
//     sectionTitle: {
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//       color: '#8B0000',
//       margin: '0 auto', // Center aligns the title
//     },
//     content: {
//       width: '100%',
//       maxWidth: '1000px',
//       backgroundColor: '#fff',
//       borderRadius: '10px',
//       boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//       padding: '20px',
//     },
//     fieldsContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '20px',
//     },
//     row: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       gap: '20px',
//     },
//     field: {
//       flex: '1 1 calc(50% - 10px)',
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     label: {
//       fontSize: '14px',
//       fontWeight: 'bold',
//       color: '#333',
//       marginBottom: '5px',
//     },
//     input: {
//       padding: '10px',
//       border: '1px solid #ccc',
//       borderRadius: '5px',
//       fontSize: '14px',
//       backgroundColor: '#f9f9f9',
//       width: '100%',
//     },
//     '@media (max-width: 768px)': {
//       field: {
//         flex: '1 1 100%',
//       },
//     },
//   };
  
//   return (
//     <div style={styles.container}>
//       <div style={styles.headerContainer}>
//         <div style={styles.validBadge}>{textContent.validText}</div>
//         <h1 style={styles.sectionTitle}>{textContent.licenseTitle}</h1>
//       </div>
//       <div style={styles.content}>
//         <div style={styles.fieldsContainer}>
//           {textContent.fields.map((row, i) => (
//             <div key={i} style={styles.row}>
//               {row.map((field, j) => (
//                 <div key={j} style={styles.field}>
//                   <label style={styles.label}>{field.label}</label>
//                   <input type="text" value={field.value} readOnly style={styles.input} />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
  
  
// };

// export default ValidPage;