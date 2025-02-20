import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import axios from 'axios';
import config from '../../services/config';
import '../../styles/PoliceOfficer/ValidPage.css';


const ValidPage = () => {
  const { language } = useLanguage();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  // const [responsiveStyles, setResponsiveStyles] = useState({});
  const vehicleNumber = state?.vehicleNumber;
  const isSinhala = language === 'si';
  const isTamil = language === 'ta';

  const textContent = {
    licenseTitle: isSinhala ? 'වැලි පතල් බලපත්‍රය' : isTamil ? 'மணல் சுரங்க உரிமம்' : 'Sand Mining License',
    validText: isSinhala ? 'වලංගුයි' : isTamil ? 'செல்லுபடியாகும்' : 'Valid',
    fields: [
      [
        { label: isSinhala ? 'බලපත්‍ර අංකය' : isTamil ? 'உரிம எண்' : 'License Number', dataIndex: 'licenseNumber' },
        { label: isSinhala ? 'ආරම්භක ස්ථානය' : isTamil ? 'இடம் தொடங்கியது' : 'Location Started', dataIndex: 'location' },
      ],
      [

        { label: isSinhala ? 'කල් ඉකුත්වන දිනය' : isTamil ? 'காலாவதியாகிறது' : 'Expires', dataIndex: 'expires' },
        { label: isSinhala ? 'පැටවූ දිනය / වේලාව' : isTamil ? 'ஏற்றப்பட்ட தேதி/நேரம்' : 'Loaded date/time', dataIndex: 'start' },

      ],
      [
        { label: isSinhala ? 'කියුබ් ගණන' : isTamil ? 'கொள்ளளவு (கனசதுரங்கள்)' : 'Capacity(Cubes)', dataIndex: 'capacity' },
        { label: isSinhala ? 'අවලංගු දිනය/ වේලාව' : isTamil ? 'நிலுவைத் தேதி/நேரம்' : 'Due date/Time', dataIndex: 'dueDate' },
      ],
      [

        { label: isSinhala ? 'පැටවුම් අංකය' : isTamil ? 'சுமை எண்' : 'Load Number', dataIndex: 'loadNumber' },
        { label: isSinhala ? 'ගමනාන්තය' : isTamil ? 'சேருமிடம்' : 'Destination', dataIndex: 'destination' },

      ],
      [{ label: isSinhala ? 'බලපත්‍ර හිමිකරු' : isTamil ? 'உரிமம் வைத்திருப்பவர்' : 'License Holder', dataIndex: 'owner' }],
    ],
  };

  const fetchData = async () => {
    try {
      const apiKey = config.getPoliceOfficerApiKey();
      const response = await axios.get('/api/projects/gsmb/issues.json', {
        headers: {
          'Content-Type': 'application/json',
          'X-Redmine-API-Key': apiKey,
        },
      });

      const issues = response.data.issues;

      const tplIssue = issues.find(
        (issue) =>
          issue.tracker.name === 'TPL' &&
          issue.custom_fields.find((field) => field.name === 'Lorry Number')?.value === vehicleNumber
      );

      if (tplIssue) {
        const licenseNumber = tplIssue.custom_fields.find((field) => field.name === 'License Number')?.value;

        const mlIssue = issues.find(
          (issue) =>
            issue.tracker.name === 'ML' &&
            issue.custom_fields.find((field) => field.name === 'License Number')?.value === licenseNumber
        );

        const expires = mlIssue ? mlIssue.due_date || 'N/A' : 'N/A';

        setData({
          licenseNumber,
          location: tplIssue.custom_fields.find((field) => field.name === 'Location')?.value || 'N/A',
          start: tplIssue.start_date,
          dueDate: tplIssue.due_date,
          capacity: tplIssue.custom_fields.find((field) => field.name === 'Cubes')?.value || 'N/A',
          destination: tplIssue.custom_fields.find((field) => field.name === 'Destination')?.value || 'N/A',
          loadNumber: tplIssue.id.toString(),
          owner: tplIssue.custom_fields.find((field) => field.name === 'Owner Name')?.value || 'N/A',
          expires, 
        });
      } else {
        console.warn('No TPL issue found for the given vehicle number.');
        setData(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    if (vehicleNumber) {
      fetchData();
    }
  }, [vehicleNumber]);

  if (!vehicleNumber) {
    return (
      <div className="pov-container">
        {language === 'en'
          ? 'No vehicle number provided'
          : language === 'si'
            ? 'වාහන අංකයක් සපයා නැත'
            : 'வாகன எண் எதுவும் வழங்கப்படவில்லை.'}
      </div>
    );
  }

  if (!data) {
    return <div className="pov-container">{language === 'en' ? 'Loading...' : language === 'si' ? 'පූරණය වෙමින්...' : 'ஏற்றுகிறது...'}</div>;
  }

  return (
    <div className="pov-container">
      <div className="pov-header">
        <div className="pov-validBadge">{textContent.validText}</div>
        <h1 className="pov-sectionTitle">{textContent.licenseTitle}</h1>
      </div>

      <div className="pov-content">
        {textContent.fields.map((row, rowIndex) => (
          <div key={rowIndex} className="pov-fieldsContainer">
            {row.map((field, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="pov-field">
                <div className="pov-label">{field.label}</div>
                <input className="pov-input" type="text" value={data[field.dataIndex] || 'N/A'} readOnly />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValidPage;