import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Import Tailwind CSS
import App from './App'; // Import the main App component
import { LanguageProvider } from './contexts/LanguageContext';

// Render the App component into the root element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
    <App />
    </LanguageProvider>
  </React.StrictMode>
);