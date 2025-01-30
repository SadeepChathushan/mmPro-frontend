// src/components/VehicleInput.js
import React from 'react';

const VehicleInput = ({ input, setInput, language }) => (
  <div style={{ marginBottom: '1.5rem', width: '100%', maxWidth: '20rem', color: 'black' }}>
    <input
      type="text"
      placeholder={language === 'en' ? 'e.g : LA1234' : language === 'si' ? 'උදා : LA1234':  'எ.கா : LA1234'}
      style={{
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ccc',
        borderRadius: '1.5rem',
        fontSize: '1rem',
      }}
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  </div>
);

export default VehicleInput;
