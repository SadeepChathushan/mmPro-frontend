import React, { useState } from 'react';
import logo from '../../../assets/images/gsmbLogo.jpg';

const Invalid = () => {
  const [input, setInput] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <img
          src={logo}
          alt="Logo"
          style={{ marginBottom: 0, width: 350 }}
        />
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#800000', marginBottom: '2rem', marginTop: '2rem' }}>භූ විග්‍රහ හා පතල් කාර්යාලය</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            backgroundColor: 'red',
            color: '#fff',
            padding: '0.75rem 2rem',
            border: 'none',
            borderRadius: '1.5rem',
            fontSize: '1rem',
            width: '16rem'
          }}>
            නොවලංගු
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', maxWidth: '400px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

            <button
              style={{
                backgroundColor: 'white',
                color: '#FF0000',
                border: '1px solid #FF0000',
                padding: '0.75rem 2rem',
                borderRadius: '1.5rem',
                fontSize: '1rem',
                width: '16rem',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#FFF0F0')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
            >
              GSMB වෙත වාර්තා කරන්න
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value="+94-11-2886289"
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
              <span style={{ position: 'absolute', right: '8px', fontSize: '16px' }}>📞</span>
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value="+94-11-2886290"
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
              <span style={{ position: 'absolute', right: '8px', fontSize: '16px' }}>📞</span>
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value="901"
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
              <span style={{ position: 'absolute', right: '8px', fontSize: '16px' }}>📞</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Invalid;
