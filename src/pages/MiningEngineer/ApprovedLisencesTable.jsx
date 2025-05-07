import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Spin, Alert } from "antd";
import { getMeApproveMiningLicense } from "../../services/miningEngineerService";
import PropTypes from "prop-types";
import { EnvironmentOutlined } from "@ant-design/icons";

const ApprovedLicensesTable = ({ onViewDetails, language }) => {
  const [loading, setLoading] = useState(false);
  const [approvedLicenses, setApprovedLicenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedLicenses = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getMeApproveMiningLicense();
        if (result.success && result.data) {
          console.log("Approved Licenses:", result.data);
          setApprovedLicenses(Array.isArray(result.data) ? result.data : []);
        } else {
          const errorMessage =
            result.message || "Failed to fetch approved licenses.";
          setError(errorMessage);
          console.error("API Error:", errorMessage);
          setApprovedLicenses([]);
        }
      } catch (err) {
        const errorMessage =
          err.message || "An unexpected error occurred during fetch.";
        setError(errorMessage);
        console.error("Fetch Error:", err);
        setApprovedLicenses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedLicenses();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString();
    } catch (e) {
      console.error("Date formatting error:", e);
      return dateString;
    }
  };

  const columns = [
    {
      title: language === "en" ? "License No" : "அனுமதி எண்",
      dataIndex: "licenseNumber",
      key: "licenseNo",
      render: (text) => (text ? <Tag color="green">{text}</Tag> : "N/A"),
    },
    {
      title: language === "en" ? "ML Owner" : "உரிமையாளர்",
      dataIndex: "owner", // Corrected dataIndex based on sample data
      key: "owner",
      render: (text) => text || "N/A", // Handle cases where owner might be null/undefined
    },
    {
      title: language === "en" ? "Location" : "இடம்",
      dataIndex: "location",
      key: "location",
      render: (location) => (
        <Space>
          <EnvironmentOutlined
            style={{
              color: "#52c41a",
              fontSize: "18px",
              background: "#f6ffed",
              padding: "4px",
              borderRadius: "50%",
            }}
          />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#389e0d" }}
          >
            {language === "en"
              ? "View on Map"
              : language === "si"
              ? "සිතියමේ පෙන්වන්න"
              : "வரைபடத்தில் காண்க"}
          </a>
        </Space>
      ),
    },
    {
      title: language === "en" ? "Approved Date" : "அங்கீகரிக்கப்பட்ட தேதி",
      dataIndex: "date",
      key: "date",
      render: (text) => formatDate(text), // Use the formatting function
    },
    {
      title: language === "en" ? "Status" : "நிலை",
      key: "status",
      render: () => (
        // Status is always 'Approved' for this table
        <Tag color="success">
          {language === "en" ? "Approved" : "அங்கீகரிக்கப்பட்டது"}
        </Tag>
      ),
    },
    {
      title: language === "en" ? "Actions" : "செயல்கள்",
      key: "actions",
      render: (
        _,
        record // Pass the whole record to onViewDetails
      ) => (
        <Space size="middle">
          <a onClick={() => onViewDetails(record.id)}>
            {language === "en" ? "View Details" : "விவரங்களைக் காட்டு"}
          </a>
          {/* You could add other actions here, e.g., view PDF */}
          {/* <a href={record.pdfUrl} target="_blank" rel="noopener noreferrer">
             <FilePdfOutlined /> {language === 'en' ? 'View PDF' : 'PDF ஐக் காட்டு'}
          </a> */}
        </Space>
      ),
    },
  ];

  // Render error state
  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  // Render the table
  return (
    <Table
      columns={columns}
      dataSource={approvedLicenses} // Use the state variable holding the fetched data
      rowKey="id" // Make sure each license object has a unique 'id' property
      loading={loading} // Use Antd's built-in loading indicator
      pagination={{ pageSize: 5 }} // Set desired page size
      scroll={{ x: "max-content" }} // Optional: improve horizontal scrolling on small screens
    />
  );
};

ApprovedLicensesTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      licenseNumber: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  onViewDetails: PropTypes.func.isRequired,
  language: PropTypes.oneOf(["en", "ta"]).isRequired,
};

export default ApprovedLicensesTable;
