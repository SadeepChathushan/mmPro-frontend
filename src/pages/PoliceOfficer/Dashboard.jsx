import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/gsmbLogo.jpg';

const Dashboard = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();


  const handleCheck = async () => {
    try {
      const username = '@achinthamihiran';
      const password = 'Ab2#*De#';
      const credentials = btoa(`${username}:${password}`);

      const response = await fetch('/api/projects/new-license/issues.json', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch license data');
      }

      const data = await response.json();


      console.log('Fetched Data:', data);

      const licenses = data.issues || [];
      console.log('Licenses Array:', licenses);

      const licenseExists = licenses.some(issue =>
        issue.custom_fields.some(field => field.name === 'License Number' && field.value === input)
      );

      console.log('License Exists:', licenseExists);

      if (licenseExists) {
        navigate('/police-officer/valid');
       // navigate(`/police-officer/valid/${licenseId}`);
      } else {
        navigate('/police-officer/invalid');
      }                                                                   
    } catch (error) {
      console.error('Error checking license:', error);
      alert('An error occurred while checking the license number. Please try again.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    main: {
      // flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    },
    logo: {
      width: '12rem',
      height: '12rem',
      marginBottom: '1.5rem',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#800000',
      marginBottom: '2rem',
      marginTop: '2rem',
    },
    inputContainer: {
      marginBottom: '1.5rem',
    },
    inputBox: {
      width: '20rem',
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '1.5rem',
      fontSize: '1rem',
    },
    checkButton: {
      backgroundColor: '#800000',
      color: '#fff',
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '1.5rem',
      fontSize: '1rem',
      cursor: 'pointer',
      width: '20rem',
    },
    checkButtonHover: {
      backgroundColor: '#5a0000',
    },
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        {/* <img
          src="/gsmbLogo.png"
          alt="Geological Survey & Mines Bureau Logo"
          style={styles.logoImg}
        /> */}
        <img
          src={logo}
          alt="Logo"
          style={{ marginBottom: 0, width: 350 }}
        />
        <h2 style={styles.title}>Geological Survey & Mines Bureau</h2>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter License Number "
            style={styles.inputBox}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              console.log('Input Value:', e.target.value);
            }}
          />

        </div>
        <button
          style={styles.checkButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.checkButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.checkButton.backgroundColor)}
          onClick={handleCheck}
        >
          Check
        </button>
      </main>
    </div>
  );
};

export default Dashboard;