import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  DatePicker,
  Button,
  Input,
  AutoComplete,
  Space,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "../../contexts/LanguageContext";
import moment from "moment";

const { Title } = Typography;

const Licenses = () => {
  const { language } = useLanguage();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [licenses, setLicenses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredLicenses, setFilteredLicenses] = useState([]);

  // Function to fetch licenses data
  // Function to fetch licenses data
  const fetchLicenses = async () => {
    try {
      const apiKey = localStorage.getItem("API_Key");
      // const username = "@achinthamihiran"; // Replace with actual username
      // const password = "Ab2#*De#"; // Replace with actual password

      const response = await axios.get("/api/projects/gsmb/issues.json", {
        headers: {
          "Content-Type": "application/json",
          "X-Redmine-API-Key": apiKey,
        },
        // auth: {
        //   username,
        //   password,
        // },
      });

      if (response.data && response.data.issues) {
        const issues = response.data.issues;
        console.log("iss", issues);

        // Map and filter the API data to the table format
        const formattedLicenses = issues
          .filter((issue) => {
            // Ensure required properties exist
            if (!issue.tracker || !issue.custom_fields || !issue.assigned_to) {
              return false;
            }

            // Find the "Capacity" field safely
            const capacityField = issue.custom_fields.find(
              (field) => field.name === "Capacity"
            );
            const capacity = capacityField
              ? parseInt(capacityField.value, 10)
              : NaN;

            // Check conditions: tracker name must be "ML", capacity must be a valid number >= 0, assigned_to ID must be 58
            return (
              issue.tracker.name === "ML" &&
              !isNaN(capacity) &&
              capacity >= 0 &&
              issue.assigned_to.id === 58
            );
          })
          .map((issue) => {
            // Ensure issue.custom_fields is an array before reducing
            const customFields = Array.isArray(issue.custom_fields)
              ? issue.custom_fields.reduce((acc, field) => {
                  if (field.name) {
                    acc[field.name] = field.value || null; // Handle missing field values
                  }
                  return acc;
                }, {})
              : {};

            // Extract field values safely
            const startDate =
              customFields["Start Date"] || issue.start_date || ""; // Defaulting to issue.start_date if missing
            const endDate = customFields["End Date"] || issue.due_date || ""; // Defaulting to issue.due_date if missing
            const dueDate = issue.due_date || endDate; // Using due_date directly if available

            // Check if the license is active based on the due date
            const currentDate = new Date();
            const isActive = dueDate ? currentDate <= new Date(dueDate) : false;

            return {
              licenseNumber: customFields["License Number"] || "", // Ensure fallback empty string
              owner: customFields["Owner Name"] || "",
              location: customFields["Address"] || "", // Using 'Address' field for location
              startDate: startDate,
              endDate: endDate,
              capacity: customFields["Capacity"] || "",
              dispatchedCubes: customFields["Used"] || "", // Mapped to 'Used' for dispatched cubes
              remainingCubes: customFields["Remaining"] || "", // Using 'Remaining' field for cubes
              royalty: customFields["Royalty(sand)due"] || "", // Added royalty mapping
              status: isActive ? "Active" : "Inactive", // License status based on due date
            };
          });

        // Debugging log moved outside the map function
        console.log("Formatted Licenses:", formattedLicenses);

        setLicenses(formattedLicenses);
        setFilteredLicenses(formattedLicenses);
      } else {
        console.error("No issues found in the response");
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  // Fetch licenses when the component mounts
  useEffect(() => {
    fetchLicenses();
  }, []);

  // Handle date changes
  const handleStartDateChange = (date) => {
    setStartDate(date ? moment(date).format("YYYY-MM-DD") : null);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date ? moment(date).format("YYYY-MM-DD") : null);
  };

  // Handle search input change
  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filteredResults = licenses.filter((item) =>
        item.licenseNumber.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLicenses(filteredResults);
    } else {
      setFilteredLicenses(licenses); // Reset to show all data if search text is empty
    }
  };

  // Filter the licenses based on the selected date range
  const filteredLicensesByDate = filteredLicenses.filter((license) => {
    if (startDate && endDate) {
      const licenseStartDate = new Date(license.startDate);
      const licenseEndDate = new Date(license.endDate);
      return (
        licenseStartDate >= new Date(startDate) &&
        licenseEndDate <= new Date(endDate)
      );
    } else {
      return true; // Show all licenses if no dates are selected
    }
  });

  // Define columns for the table
  const columns = [
    {
      title: `${language === "en" ? "License Number" : language == 'si' ? "බලපත්‍ර අංකය" : ""}`,
      dataIndex: "licenseNumber",
      key: "licenseNumber",
      render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
    },
    {
      title: `${language === "en" ? "Owner" : language == 'si' ? "අයිතිකරු" : ""}`,
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: `${language === "en" ? "Location" : language == 'si' ? "ස්ථානය" : ""}`,
      dataIndex: "location",
      key: "location",
    },
    {
      title: `${language === "en" ? "Start Date" : language == 'si' ? "ආරම්භක දිනය" : ""}`,
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: `${language === "en" ? "Due Date" : language == 'si' ? "අවලංගු වන දිනය" : ""}`,
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: `${language === "en" ? "Status" : language == 'si' ? "තත්වය" : ""}`,
      key: "status",
      render: (text, record) => (
        <span style={{ color: record.status === "Active" ? "green" : "red" }}>
          {record.status}
        </span>
      ),
    },
    {
      title: `${language === "en" ? "Action" : language == 'si' ? "ක්‍රියාමාර්ග" : ""}`,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* Dispatch Load Button */}
          <Link to={`/mlowner/home/dispatchload/${record.licenseNumber}`}>
            <Button
              type="primary"
              disabled={record.status === "Inactive"} // Disable if the license is inactive
              style={{
                backgroundColor:
                  record.status === "Inactive" ? "#d9d9d9" : "#FFA500", // Gray out the button if inactive
                borderColor: "#FFA500",
                color: record.status === "Inactive" ? "#888" : "white", // Adjust text color
                width: "200px",
                borderRadius: "8px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgb(211, 153, 61)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor =
                  record.status === "Inactive" ? "#d9d9d9" : "#FFA500")
              }
            >
              {language === "en" ? "Dispatch Load" : language == 'si' ? "යවන ලද ප්‍රමාණ" : ""}
            </Button>
          </Link>
    
          {/* History Button */}
          <Link to={`/mlowner/history?licenseNumber=${record.licenseNumber}`}>
            <Button
              type="default"
              style={{
                backgroundColor: '#0066cc',
                borderColor: '#0066cc',
                borderRadius: '10%',
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgb(46, 131, 214)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#007BFF")
              }
            >
              {language === "en" ? "History" : language == 'si' ? "ඉතිහාසය" : ""}
            </Button>
          </Link>
        </Space>
      ),
    },
    
  ];

  return (
    <div style={{ padding: "16px", backgroundColor: "#f0f2f5" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        {language === "en" ? "Licenses of MLOwner" : language == 'si' ? "පතල් අයිතිකරුගේ බලපත්‍රර" : ""}
      </h1>

      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={handleStartDateChange}
            placeholder={language === "en" ? "Start Date" : language == 'si' ? "ආරම්භක දිනය" : ""}
            style={{ width: "100%" }} // Ensures the width is consistent
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={handleEndDateChange}
            placeholder={language === "en" ? "Due Date" : language == 'si' ? "අවසාන දිනය" : ""}
            style={{ width: "100%" }} // Ensures the width is consistent
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <AutoComplete
            value={searchText}
            onSearch={handleSearch}
            style={{ width: "100%" }} // Ensures the width is consistent with DatePickers
            options={filteredLicenses.map((result) => ({
              value: result.licenseNumber,
            }))}
          >
            <Input
              prefix={<SearchOutlined />}
              placeholder={
                language === "en" ? "Search by License Number" : language == 'si' ? "සොයන්න" : ""
              }
              style={{ width: "100%" }} // Ensures the width is consistent with DatePickers
            />
          </AutoComplete>
        </Col>
      </Row>

      <Table
        dataSource={filteredLicensesByDate}
        columns={columns}
        scroll={{ x: "max-content" }} // Enable horizontal scroll for small screens
        style={{
          marginBottom: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
        pagination={false}
      />

      {/* Back to Home Button */}
      <div style={{ textAlign: "center" }}>
        <Link to="/mlowner/home/">
          <Button
            type="primary"
            style={{
              backgroundColor: "#FFA500",
              borderColor: "#FFA500",
              color: "white",
              width: "200px",
              borderRadius: "8px",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgb(211, 153, 61)")
            }
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFA500")}
          >
            {language === "en" ? "Back to Home" : language == 'si' ? "ආපසු" : ""}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Licenses;
