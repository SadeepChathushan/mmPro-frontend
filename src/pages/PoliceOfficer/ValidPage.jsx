import React from 'react';
import logo from '../../assets/images/gsmbLogo.jpg';
import { useLanguage } from '../../contexts/LanguageContext';

const Dashboard = () => {
  const { language } = useLanguage();
  const isSinhala = language === 'si';

  const textContent = {
    title: isSinhala ? 'භූ විද්‍යා සමීක්ෂණ සහ පතල් කාර්යාංශය' : 'Geological Survey & Mines Bureau',
    licenseTitle: isSinhala ? 'වැලි පතල් බලපත්‍රය' : 'Sand Mining License',
    validText: isSinhala ? 'වලංගුයි' : 'Valid',
    fields: [
      [
        { label: isSinhala ? 'බලපත්‍ර අංකය' : 'License Number', value: 'TN/JN/P/B/2024/03/005' },
        { label: isSinhala ? 'ස්ථානය (ජිල්ලාව)' : 'Location (District)', value: 'Colombo' },
      ],
      [
        { label: isSinhala ? 'කල් ඉකුත්වන දිනය' : 'Expires', value: '2024-01-19' },
        { label: isSinhala ? 'සීමිත කොටස/කාලය' : 'Limited Share/Time', value: 'USD' },
      ],
      [
        { label: isSinhala ? 'ප්‍රමාණය' : 'Quantity', value: '100' },
        { label: isSinhala ? 'අය කර ඇති කොටස/කාලය' : 'Due Share/Time', value: '9456' },
      ],
      [
        { label: isSinhala ? 'සැදැහැ අංකය' : 'Load Number', value: '8456' },
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
      justifyContent: 'center',
      height: '70vh',
      padding: '20px',
      backgroundColor: 'white',
      color: '#333',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    logo: {
      width: '100px',
      height: 'auto',
      marginRight: '20px',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#800000',
      textAlign: 'center',
    },
    validBadge: {
      backgroundColor: 'green',
      color: '#fff',
      padding: '10px 30px',
      borderRadius: '20px',
      fontSize: '1.25rem',
      marginBottom: '20px',
      textAlign: 'center',
    },
    content: {
      width: '100%',
      maxWidth: '1000px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
    },
    sectionTitle: {
      color: '#8B0000',
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '1.5rem',
    },
    fieldsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
    },
    field: {
      flex: '1 1 calc(50% - 10px)',
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '5px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '14px',
      backgroundColor: '#f9f9f9',
      width: '100%',
    },
    '@media (max-width: 768px)': {
      field: {
        flex: '1 1 100%',
      },
    },
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>{textContent.title}</h2>
      </div>
      <div style={styles.validBadge}>{textContent.validText}</div>
      <div style={styles.content}>
        <h1 style={styles.sectionTitle}>{textContent.licenseTitle}</h1>
        <div style={styles.fieldsContainer}>
          {textContent.fields.map((row, i) => (
            <div key={i} style={styles.row}>
              {row.map((field, j) => (
                <div key={j} style={styles.field}>
                  <label style={styles.label}>{field.label}</label>
                  <input type="text" value={field.value} readOnly style={styles.input} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




// import React from 'react';
// import logo from '../../assets/images/gsmbLogo.jpg';

// const Dashboard = () => {
//   const fields = [
//     [
//       { label: 'License Number', value: 'TN/JN/P/B/2024/03/005' },
//       { label: 'Location (District)', value: 'Colombo' },
//     ],
//     [
//       { label: 'Expires', value: '2024-01-19' },
//       { label: 'Limited Share/Time', value: 'USD' },
//     ],
//     [
//       { label: 'Quantity', value: '100' },
//       { label: 'Due Share/Time', value: '9456' },
//     ],
//     [
//       { label: 'Load Number', value: '8456' },
//       { label: 'Destination', value: 'Kandy' },
//     ],
//     [{ label: 'License Holder', value: 'Kamal' }],
//   ];

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <img src={logo} alt="Logo" style={styles.logo} />
//         <h2 style={styles.title}>Geological Survey & Mines Bureau</h2>
//       </div>
//       <div style={styles.validBadge}>Valid</div>
//       <div style={styles.content}>
//         <h1 style={styles.sectionTitle}>Sand Mining License</h1>
//         <div style={styles.fieldsContainer}>
//           {fields.map((row, i) => (
//             <div key={i} style={styles.row}>
//               {row.map((field, j) => (
//                 <div key={j} style={styles.field}>
//                   <label style={styles.label}>{field.label}</label>
//                   <input
//                     type="text"
//                     value={field.value}
//                     readOnly
//                     style={styles.input}
//                   />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '70vh',
//     padding: '20px',
//     backgroundColor: 'white',
//     color: '#333',
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: '20px',
//   },
//   logo: {
//     width: '100px',
//     height: 'auto',
//     marginRight: '20px',
//   },
//   title: {
//     fontSize: '1.75rem',
//     fontWeight: 'bold',
//     color: '#800000',
//     textAlign: 'center',
//   },
//   validBadge: {
//     backgroundColor: 'green',
//     color: '#fff',
//     padding: '10px 30px',
//     borderRadius: '20px',
//     fontSize: '1.25rem',
//     marginBottom: '20px',
//     textAlign: 'center',
//   },
//   content: {
//     width: '100%',
//     maxWidth: '1000px',
//     backgroundColor: '#fff',
//     borderRadius: '10px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     padding: '20px',
//   },
//   sectionTitle: {
//     color: '#8B0000',
//     textAlign: 'center',
//     marginBottom: '30px',
//     fontSize: '1.5rem',
//   },
//   fieldsContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px',
//   },
//   row: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '20px',
//   },
//   field: {
//     flex: '1 1 calc(50% - 10px)',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   label: {
//     fontSize: '14px',
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: '5px',
//   },
//   input: {
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     fontSize: '14px',
//     backgroundColor: '#f9f9f9',
//     width: '100%',
//   },
//   '@media (max-width: 768px)': {
//     field: {
//       flex: '1 1 100%',
//     },
//   },
// };

// export default Dashboard;
