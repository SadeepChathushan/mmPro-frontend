import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import axios from "axios";
import config from "../../services/config";

const ValidPage = () => {
  const { language } = useLanguage();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [responsiveStyles, setResponsiveStyles] = useState({});
  const vehicleNumber = state?.vehicleNumber;
  const isSinhala = language === "si";
  const isTamil = language === "ta";

  const { licenseDetails } = state || {};

  useEffect(() => {
    setData(licenseDetails);
  }, [licenseDetails]);

  console.log(licenseDetails);

  const textContent = {
    licenseTitle: isSinhala
      ? "වැලි පතල් බලපත්‍රය"
      : isTamil
      ? "மணல் சுரங்க உரிமம்"
      : "Sand Mining License",
    validText: isSinhala ? "වලංගුයි" : isTamil ? "செல்லுபடியாகும்" : "Valid",
    fields: [
      [
        {
          label: isSinhala
            ? "බලපත්‍ර අංකය"
            : isTamil
            ? "உரிம எண்"
            : "License Number",
          dataIndex: "licenseNumber",
        },
        {
          label: isSinhala
            ? "ආරම්භක ස්ථානය"
            : isTamil
            ? "இடம் தொடங்கியது"
            : "Location Started",
          dataIndex: "location",
        },
      ],
      [
        {
          label: isSinhala
            ? "කල් ඉකුත්වන දිනය"
            : isTamil
            ? "காலாவதியாகிறது"
            : "Expires",
          dataIndex: "expires",
        },
        {
          label: isSinhala
            ? "පැටවූ දිනය / වේලාව"
            : isTamil
            ? "ஏற்றப்பட்ட தேதி/நேரம்"
            : "Loaded date/time",
          dataIndex: "start",
        },
      ],
      [
        {
          label: isSinhala
            ? "කියුබ් ගණන"
            : isTamil
            ? "கொள்ளளவு (கனசதுரங்கள்)"
            : "Capacity(Cubes)",
          dataIndex: "capacity",
        },
        {
          label: isSinhala
            ? "අවලංගු දිනය/ වේලාව"
            : isTamil
            ? "நிலுவைத் தேதி/நேரம்"
            : "Due date/Time",
          dataIndex: "dueDate",
        },
      ],
      [
        {
          label: isSinhala
            ? "පැටවුම් අංකය"
            : isTamil
            ? "சுமை எண்"
            : "Load Number",
          dataIndex: "loadNumber",
        },
        {
          label: isSinhala ? "ගමනාන්තය" : isTamil ? "சேருமிடம்" : "Destination",
          dataIndex: "destination",
        },
      ],
      [
        {
          label: isSinhala
            ? "බලපත්‍ර හිමිකරු"
            : isTamil
            ? "உரிமம் வைத்திருப்பவர்"
            : "License Holder",
          dataIndex: "owner",
        },
      ],
    ],
  };

  const styles = {
    headerSection: {
      width: "100%",
      maxWidth: "1200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    validBadge: {
      backgroundColor: "#009833",
      color: "#fff",
      padding: "12px 70px",
      width: "115%",
      // borderRadius: '30px',
      fontSize: "24px",
      textAlign: "center",
      marginBottom: "20px",
      marginLeft: "230px",
      boxShadow: "0 2px 4px rgba(0,0,0,0)",
    },
    sectionTitle: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#000000",

      marginBottom: "10px",
      marginLeft: "270px",
    },
    content: {
      width: "100%",
      maxWidth: "1200px",
      backgroundColor: "#fff",
      // borderRadius: '15px',
      // boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
      padding: "15px",
    },
    fieldsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "350px",
    },
    field: {
      display: "flex",
      flexDirection: "column",
      width: "160%",
      border: "1px solid #fff",
      borderRadius: "10px",
      padding: "10px",
      backgroundColor: "#ffff",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0)",
    },
    label: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#555",
      marginBottom: "8px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
      backgroundColor: "#f9f9f9",
      color: "#333",
      fontWeight: "bold",
      textAlign: "center",
      width: "100%",
      pointerEvents: "none",
    },
    fieldRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      borderBottom: "1px solid #eee",
      margin: "5px 0",
    },
    fieldValue: {
      textAlign: "right",
      fontWeight: "bold",
    },
  };

  // Get responsive styles
  const getResponsiveStyles = () => {
    if (window.innerWidth <= 768) {
      return {
        headerSection: {
          ...styles.headerSection,
          flexDirection: "column",
          alignItems: "center",
          padding: "0 10px",
        },
        validBadge: {
          ...styles.validBadge,
          padding: "10px 15px",
          fontSize: "1rem",
          marginLeft: "0", // Center align
          textAlign: "center",
          width: "100%",
        },
        sectionTitle: {
          ...styles.sectionTitle,
          fontSize: "18px",
          marginLeft: "0", // Remove extra left margin
          marginBottom: "10px",
          textAlign: "center",
        },
        content: {
          ...styles.content,
          padding: "10px",
          width: "100%", // Ensure full width
        },
        fieldsContainer: {
          display: "flex", // Horizontal layout
          flexDirection: "row", // All fields in one row
          gap: "10px", // Add spacing between fields
          overflowX: "auto", // Enable horizontal scrolling
          width: "100%", // Ensure container spans full width
        },
        field: {
          flex: "0 0 0%", // Prevent fields from shrinking
          width: "100%", // Set a minimum width for each field
          // padding: '10px',
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Align text to the left
        },
        label: {
          fontSize: "10px", // Adjust font size for small screens
          marginBottom: "5px", // Add a smaller gap
        },
        input: {
          fontSize: "10px",
          width: "100%", // Ensure input spans full field width
          textAlign: "left",
        },
        fieldRow: {
          display: "flex",
          flexDirection: "row", // Ensure horizontal layout
          justifyContent: "space-between",
          padding: "10px 0",
        },
        fieldValue: {
          fontSize: "14px",
        },
      };
    }
    return {};
  };

  if (!licenseDetails) {
    return (
      <div style={styles.container}>
        {language === "en"
          ? "No vehicle number provided"
          : language === "si"
          ? "වාහන අංකයක් සපයා නැත"
          : "வாகன எண் எதுவும் வழங்கப்படவில்லை."}
      </div>
    );
  }

  if (!data) {
    return (
      <div style={styles.container}>
        {language === "en"
          ? "Loading..."
          : language === "si"
          ? "පූරණය වෙමින්..."
          : "ஏற்றுகிறது..."}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <div style={styles.validBadge}>{textContent.validText}</div>
        <h1 style={styles.sectionTitle}>{textContent.licenseTitle}</h1>
      </div>

      <div style={styles.content}>
        {textContent.fields.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.fieldsContainer}>
            {row.map((field, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} style={styles.field}>
                <div style={styles.label}>{field.label}</div>
                <input
                  style={styles.input}
                  type="text"
                  value={data[field.dataIndex] || "N/A"}
                  readOnly
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValidPage;
