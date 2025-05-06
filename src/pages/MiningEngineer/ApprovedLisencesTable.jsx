import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Spin, Alert } from "antd"; // Added Spin and Alert
// import { FilePdfOutlined } from "@ant-design/icons"; // This import is unused in the current logic
import { getMeApproveMiningLicense } from "../../services/miningEngineerService";

// Removed the 'data' prop as the component fetches its own data
const ApprovedLicensesTable = ({ onViewDetails, language }) => {
  const [loading, setLoading] = useState(false);
  const [approvedLicenses, setApprovedLicenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedLicenses = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const result = await getMeApproveMiningLicense();
        if (result.success && result.data) {
          console.log("Approved Licenses:", result.data);
          // Ensure the data is an array before setting state
          setApprovedLicenses(Array.isArray(result.data) ? result.data : []);
        } else {
          // Use result.message or a default error message
          const errorMessage = result.message || "Failed to fetch approved licenses.";
          setError(errorMessage);
          console.error("API Error:", errorMessage);
          setApprovedLicenses([]); // Clear data on error
        }
      } catch (err) {
        const errorMessage = err.message || "An unexpected error occurred during fetch.";
        setError(errorMessage);
        console.error("Fetch Error:", err);
        setApprovedLicenses([]); // Clear data on error
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedLicenses();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to safely format date or return 'N/A'
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      // Assuming date format is 'M/D/YYYY' - adjust if needed
      // For robustness, consider using a date library like dayjs or moment
      const date = new Date(dateString);
      if (isNaN(date.getTime())) { // Check if date is valid
         return dateString; // Return original string if parsing fails
      }
      // Return date in a locale-friendly format
      return date.toLocaleDateString();
    } catch (e) {
      console.error("Date formatting error:", e);
      return dateString; // Return original string on error
    }
  };

  const columns = [
    {
      title: language === "en" ? "License No" : "அனுமதி எண்",
      dataIndex: "licenseNumber",
      key: "licenseNo",
      render: (text) => text ? <Tag color="green">{text}</Tag> : 'N/A',
    },
    {
      title: language === "en" ? "ML Owner" : "உரிமையாளர்",
      dataIndex: "owner", // Corrected dataIndex based on sample data
      key: "owner",
      render: (text) => text || 'N/A', // Handle cases where owner might be null/undefined
    },
    {
      title: language === "en" ? "Location" : "இடம்",
      dataIndex: "location",
      key: "location",
      render: (text) => text || 'N/A',
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
      render: () => ( // Status is always 'Approved' for this table
        <Tag color="success">
          {language === "en" ? "Approved" : "அங்கீகரிக்கப்பட்டது"}
        </Tag>
      ),
    },
    {
      title: language === "en" ? "Actions" : "செயல்கள்",
      key: "actions",
      render: (_, record) => ( // Pass the whole record to onViewDetails
        <Space size="middle">
          <a onClick={() => onViewDetails(record)}>
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

  // Render loading state
  // Note: Antd Table has a built-in `loading` prop which is generally preferred
  // if (loading) {
  //   return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
  // }

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
      scroll={{ x: 'max-content' }} // Optional: improve horizontal scrolling on small screens
    />
  );
};

export default ApprovedLicensesTable;