import React, { useState } from 'react';
import logo from '../../assets/images/gsmbLogo.jpg';
import { useLanguage } from '../../contexts/LanguageContext'; // Language context for dynamic switching

const Dashboard = () => {
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <img src={logo} alt="Logo" style={{ marginBottom: 0, width: 350 }} />
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#800000',
            marginBottom: '2rem',
            marginTop: '2rem',
          }}
        >
          {textContent.title}
        </h2>
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              backgroundColor: 'red',
              color: '#fff',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '1.5rem',
              fontSize: '1rem',
              width: '16rem',
            }}
          >
            {textContent.invalidText}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '20px',
            maxWidth: '400px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              style={{
                backgroundColor: 'white',
                color: '#FF0000',
                border: '1px solid #FF0000',
                padding: '0.75rem 2rem',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                width: '16rem',
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
                    padding: '8px',
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

export default Dashboard;

// import React, { useState } from 'react';
// import logo from '../../assets/images/gsmbLogo.jpg';

// const Dashboard = () => {
//   const [input, setInput] = useState('');

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
//         <img
//           src={logo}
//           alt="Logo"
//           style={{ marginBottom: 0, width: 350 }}
//         />
//         <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#800000', marginBottom: '2rem', marginTop: '2rem' }}>Geological Survey & Mines Bureau</h2>
//         <div style={{ marginBottom: '1.5rem' }}>
//         <div style={{
//         backgroundColor: 'red', 
//         color: '#fff',
//         padding: '0.75rem 2rem',
//         border: 'none',
//         borderRadius: '1.5rem',
//         fontSize: '1rem',
//         width: '16rem'
//         }}>
//         Invalid
//         </div>


//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', maxWidth: '400px' }}>
//   <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

//     <button
//       style={{
//         backgroundColor: 'white',
//         color: '#FF0000',
//         border: '1px solid #FF0000',
//         // padding: '10px',
//         padding: '0.75rem 2rem',
//         // borderRadius: '5px',
//         cursor: 'pointer',
//         // fontSize: '16px',
//         borderRadius: '1.5rem',
//         fontSize: '1rem',
//         width: '16rem'
//       }}
//       onMouseOver={(e) => (e.target.style.backgroundColor = '#FFF0F0')}
//       onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
//     >
//       Report to GSMB
//     </button>
//   </div>

//   <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//     <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//       <input
//         type="text"
//         value="+94-11-2886289"
//         readOnly
//         style={{
//           width: '100%',
//           padding: '8px',
//           paddingRight: '30px',
//           border: '1px solid #ccc',
//           borderRadius: '4px',
//           fontSize: '14px',
//           backgroundColor: 'white',
//           cursor: 'default',
//         }}
//       />
//       <span style={{ position: 'absolute', right: '8px', fontSize: '16px' }}>📞</span>
//     </div>
//     <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//       <input
//         type="text"
//         value="+94-11-2886290"
//         readOnly
//         style={{
//           width: '100%',
//           padding: '8px',
//           paddingRight: '30px',
//           border: '1px solid #ccc',
//           borderRadius: '4px',
//           fontSize: '14px',
//           backgroundColor: 'white',
//           cursor: 'default',
//         }}
//       />
//       <span style={{ position: 'absolute', right: '8px', fontSize: '16px' }}>📞</span>
//     </div>
//     <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//       <input
//         type="text"
//         value="901"
//         readOnly
//         style={{
//           width: '100%',
//           padding: '8px',
//           paddingRight: '30px',
//           border: '1px solid #ccc',
//           borderRadius: '4px',
//           fontSize: '14px',
//           backgroundColor: 'white',
//           cursor: 'default',
//         }}
//       />
//       <span style={{ position: 'absolute', right: '8px', fontSize: '16px' }}>📞</span>
//     </div>
//   </div>
// </div>

//         </main>
//     </div>
//   );
// };

// export default Dashboard;
