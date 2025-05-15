import React, { useState, useEffect } from "react";
import { Table, Tag, Space , Alert } from 'antd';
import { getMeAwatingList } from "../../services/miningEngineerService";
import PropTypes from "prop-types";
import { FilePdfOutlined, CloseCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

const RejectedLicensesTable = ({  onViewDetails, language }) => {
    const [loading, setLoading] = useState(false);
    // const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [rejectedLicenses, setRejectedLicenses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchRejectedLicenses = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await getMeAwatingList();
          console.log("API Raw Response:", result);
      
          // Handle the case where the response is a plain array
          if (Array.isArray(result)) {
            const rejected = result.filter(
              (item) => item.status?.toLowerCase() === "rejected"
            );
            setRejectedLicenses(rejected);
          } else {
            console.error("Unexpected API response structure:", result);
          }
        } catch (error) {
          console.error("API Error: Failed to fetch Rejected licenses.", error);
        }finally {
          setLoading(false);
        }
      };
      
      fetchRejectedLicenses();
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
      dataIndex: "mining_number",
      key: "licenseNo",
      render: (text) => (text ? <Tag color="red">{text}</Tag> : "N/A"),
    },
    {
      title: language === "en" ? "ML Owner" : "உரிமையாளர்",
      dataIndex: "assigned_to",
      key: "owner",
      render: (text) => text || "N/A",
    },
    {
      title: language === "en" ? "Location" : "இடம்",
      dataIndex:  "location",
      key:  "location",
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
      title: language === "en" ? "Rejected Date" : "நிராகரிக்கப்பட்ட தேதி",
      dataIndex: "date",
      key: "date",
      render: (text) => formatDate(text),
    },
    {
      title: language === "en" ? "Status" : "நிலை",
      key: "status",
      render: () => (
        <Tag icon={<CloseCircleOutlined />} color="error">
          {language === "en" ? "Rejected" : "நிராகரிக்கப்பட்டது"}
        </Tag>
      )
    },
    {
      title: language === "en" ? "Actions" : "செயல்கள்",
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onViewDetails(record.id)}>
            {language === "en" ? "View Details" : "விவரங்களைக் காட்டு"}
          </a>
        </Space>
      )
    }
  ];

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }


  return (
    <Table
      columns={columns}
      dataSource={rejectedLicenses}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 5 }}
      scroll={{ x: "max-content" }}
    />
  );
};

// RejectedLicensesTable.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       licenseNumber: PropTypes.string.isRequired,
//       owner: PropTypes.string.isRequired,
//       location: PropTypes.string.isRequired,
//       date: PropTypes.string.isRequired,
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     })
//   ).isRequired,
//   onViewDetails: PropTypes.func.isRequired,
//   language: PropTypes.oneOf(["en", "ta"]).isRequired,
// };
RejectedLicensesTable.propTypes = {
  onViewDetails: PropTypes.func.isRequired,
  language: PropTypes.oneOf(["en", "ta"]).isRequired,
};


export default RejectedLicensesTable;