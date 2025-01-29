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
import '../../styles/MLOwner/Licenses.css';

const { Title } = Typography;

const Licenses = () => {
  const { language } = useLanguage();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [licenses, setLicenses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredLicenses, setFilteredLicenses] = useState([]);

  const fetchLicenses = async () => {
    try {
      const apiKey = localStorage.getItem("API_Key");
      const response = await axios.get("/api/projects/gsmb/issues.json", {
        headers: {
          "Content-Type": "application/json",
          "X-Redmine-API-Key": apiKey,
        },
      });

      if (response.data && response.data.issues) {
        const issues = response.data.issues;

        const formattedLicenses = issues
          .filter((issue) => {
            if (!issue.tracker || !issue.custom_fields || !issue.assigned_to) {
              return false;
            }

            const capacityField = issue.custom_fields.find(
              (field) => field.name === "Capacity"
            );
            const capacity = capacityField ? parseInt(capacityField.value, 10) : NaN;

            return (
              issue.tracker.name === "ML" &&
              !isNaN(capacity) &&
              capacity >= 0 &&
              issue.assigned_to.id === 58
            );
          })
          .map((issue) => {
            const customFields = Array.isArray(issue.custom_fields)
              ? issue.custom_fields.reduce((acc, field) => {
                  if (field.name) {
                    acc[field.name] = field.value || null;
                  }
                  return acc;
                }, {})
              : {};

            const startDate =
              customFields["Start Date"] || issue.start_date || "";
            const endDate = customFields["End Date"] || issue.due_date || "";
            const dueDate = issue.due_date || endDate;

            const currentDate = new Date();
            const isActive = dueDate ? currentDate <= new Date(dueDate) : false;

            return {
              licenseNumber: customFields["License Number"] || "",
              owner: customFields["Owner Name"] || "",
              location: customFields["Location"] || "",
              startDate: startDate,
              endDate: endDate,
              capacity: customFields["Capacity"] || "",
              dispatchedCubes: customFields["Used"] || "",
              remainingCubes: customFields["Remaining"] || "",
              royalty: customFields["Royalty(sand)due"] || "",
              status: issue.status.name,
            };
          });

        setLicenses(formattedLicenses);
        setFilteredLicenses(formattedLicenses);
      } else {
        console.error("No issues found in the response");
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date ? moment(date).format("YYYY-MM-DD") : null);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date ? moment(date).format("YYYY-MM-DD") : null);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filteredResults = licenses.filter((item) =>
        item.licenseNumber.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLicenses(filteredResults);
    } else {
      setFilteredLicenses(licenses);
    }
  };

  const filteredLicensesByDate = filteredLicenses.filter((license) => {
    if (startDate && endDate) {
      const licenseStartDate = new Date(license.startDate);
      const licenseEndDate = new Date(license.endDate);
      return (
        licenseStartDate >= new Date(startDate) &&
        licenseEndDate <= new Date(endDate)
      );
    } else {
      return true;
    }
  });

  const columns = [
    {
      title: `${
        language === "en"
          ? "License Number"
          : language == "si"
          ? "බලපත්‍ර අංකය"
          : "உரிம எண்"
      }`,
      dataIndex: "licenseNumber",
      key: "licenseNumber",
      render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
    },
    {
      title: `${
        language === "en"
          ? "Owner"
          : language == "si"
          ? "අයිතිකරු"
          : "உரிமையாளர்"
      }`,
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: `${
        language === "en" ? "Location" : language == "si" ? "ස්ථානය" : "இடம்"
      }`,
      dataIndex: "location",
      key: "location",
    },
    {
      title: `${
        language === "en"
          ? "Start Date"
          : language == "si"
          ? "ආරම්භක දිනය"
          : "தொடக்க தேதி"
      }`,
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: `${
        language === "en"
          ? "Due Date"
          : language == "si"
          ? "අවලංගු වන දිනය"
          : "இறுதி தேதி"
      }`,
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: `${
        language === "en" ? "Status" : language == "si" ? "තත්වය" : "நிலை"
      }`,
      key: "status",
      render: (text, record) => (
        <span
          className={
            record.status === "Valid"
              ? "valid-status"
              : record.status === "Expired"
              ? "expired-status"
              : "rejected-status"
          }
        >
          {record.status === "Valid"
            ? "Active"
            : record.status === "Expired"
            ? "Inactive"
            : "Rejected"}
        </span>
      ),
    },
    {
      title: `${
        language === "en"
          ? "Action"
          : language == "si"
          ? "ක්‍රියාමාර්ග"
          : "செயல்"
      }`,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/mlowner/home/dispatchload/${record.licenseNumber}`}>
            <Button
              className={`button ${
                record.status === "Expired" || record.status === "Rejected"
                  ? "dispatch-button-disabled"
                  : "dispatch-button"
              }`}
              disabled={
                record.status === "Expired" || record.status === "Rejected"
              }
            >
              {language === "en"
                ? "Dispatch Load"
                : language == "si"
                ? "යවන ලද ප්‍රමාණ"
                : "அனுப்புதல் சுமை"}
            </Button>
          </Link>

          <Link to={`/mlowner/history?licenseNumber=${record.licenseNumber}`}>
            <Button className="history-button">{language === "en" ? "History" : language === "si" ? "ඉතිහාසය" : "வரலாறு"}</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <h1 className="title">
        {language === "en"
          ? "Licenses of MLOwner"
          : language === "si"
          ? "පතල් අයිතිකරුගේ බලපත්‍ර"
          : "ML உரிமையாளரின் உரிமங்கள்"}
      </h1>

      <Row className="filter-row" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={handleStartDateChange}
            placeholder={
              language === "en" ? "Start Date" : language === "si" ? "ආරම්භක දිනය" : "தொடக்க தேதி"
            }
            className="date-picker-col"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={handleEndDateChange}
            placeholder={
              language === "en" ? "Due Date" : language === "si" ? "අවසාන දිනය" : "இறுதி தேதி"
            }
            className="date-picker-col"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <AutoComplete
            value={searchText}
            onSearch={handleSearch}
            className="auto-complete-col"
            options={filteredLicenses.map((result) => ({
              value: result.licenseNumber,
            }))}
          >
            <Input
              prefix={<SearchOutlined />}
              placeholder={
                language === "en"
                  ? "Search by License Number"
                  : language === "si"
                  ? "බලපත්‍ර අංකය අනුව සොයන්න"
                  : "உரிம எண் மூலம் தேடவும்"
              }
            />
          </AutoComplete>
        </Col>
      </Row>

      <Table
        dataSource={filteredLicensesByDate}
        columns={columns}
        scroll={{ x: "max-content" }}
        className="table-container"
        pagination={false}
      />

     {/* Back to Home Button */}
<div className="back-to-home-button">
  <Link to="/mlowner/home/">
    <Button
      type="primary"
      className="home-button"
    >
      {language === "en"
        ? "Back to Home"
        : language === "si"
        ? "ආපසු"
        : "முகப்புக்குத் திரும்பு"}
    </Button>
  </Link>
</div>
    </div>
  );
};

export default Licenses;
