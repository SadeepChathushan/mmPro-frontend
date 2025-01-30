// src/components/ReportButton.js
import React from 'react';

const ReportButton = ({ language, handleReport }) => (
  <button
    style={{
      backgroundColor: '#800000',
      color: '#fff',
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '1.5rem',
      cursor: 'pointer',
      fontSize: '1rem',
      marginBottom: '1rem',
    }}
    onClick={handleReport}
  >
    {language === 'en' ? 'Report to GSMB' : 'GSMB වෙත පැමිණිලි කරන්න'}
  </button>
);

export default ReportButton;
