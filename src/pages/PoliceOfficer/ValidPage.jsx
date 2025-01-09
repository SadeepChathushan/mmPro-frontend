import React, { useState } from 'react';
import logo from '../../assets/images/gsmbLogo.jpg';

const Dashboard = () => {
  const [input, setInput] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
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
        <img
          src={logo}
          alt="Logo"
          style={{
            marginBottom: '0',
            width: '350px',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#800000',
            margin: '2rem 0',
            textAlign: 'center',
          }}
        >
          Geological Survey & Mines Bureau
        </h2>

        <div
          style={{
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'green',
              color: '#fff',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '1.5rem',
              fontSize: '1rem',
              width: '16rem',
              maxWidth: '100%',
              margin: '0 auto',
            }}
          >
            Valid
          </div>
        </div>

        <div
          style={{
            maxWidth: '800px',
            width: '100%',
            margin: '40px auto',
            padding: '20px',
          }}
        >
          <h1
            style={{
              color: '#8B0000',
              textAlign: 'center',
              marginBottom: '30px',
              fontSize: '24px',
            }}
          >
            Sand Mining License
          </h1>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {[
              [
                { label: 'License Number', value: 'TN/JN/P/B/2024/03/005' },
                { label: 'Location (District)', value: 'Colombo' },
              ],
              [
                { label: 'Expires', value: '2024-01-19' },
                { label: 'Limited Share/Time', value: 'USD' },
              ],
              [
                { label: 'Quantity', value: '100' },
                { label: 'Due Share/Time', value: '9456' },
              ],
              [
                { label: 'Load Number', value: '8456' },
                { label: 'Destination', value: 'Kandy' },
              ],
              [{ label: 'License Holder', value: 'Kamal' }],
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: '20px',
                }}
              >
                {row.map((field, j) => (
                  <div
                    key={j}
                    style={{
                      flex: '1 1 calc(50% - 10px)', // Two in a row on desktop
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    <label
                      style={{
                        fontSize: '14px',
                        color: '#333',
                        textAlign: 'left',
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={field.value}
                      readOnly
                      style={{
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                        backgroundColor: '#f9f9f9',
                        width: '100%',
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
 
  );
};

export default Dashboard;

// Add media queries for responsive design
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '2rem',
  },
  licenseDetails: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '20px',
  },
  field: {
    flex: '1 1 calc(50% - 10px)', // Two in a row on desktop
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  '@media (max-width: 768px)': {
    field: {
      flex: '1 1 100%', // One in a row on mobile
    },
  },
};