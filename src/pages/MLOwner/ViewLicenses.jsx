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
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import moment from "moment";
import { fetchLicenses } from "../../services/MLOService";
import "../../styles/MLOwner/Licenses.css";
import "../../styles/MLOwner/History.css";

const Licenses = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [licenses, setLicenses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredLicenses, setFilteredLicenses] = useState([]);

  useEffect(() => {
    const loadLicenses = async () => {
      const data = await fetchLicenses();
      console.log(data);
      setLicenses(data);
      setFilteredLicenses(data);
    };

    loadLicenses();
  }, []);

  const handleDateChange = (setDate) => (date) => {
    setDate(date ? moment(date).format("YYYY-MM-DD") : null);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setFilteredLicenses(
      value
        ? licenses.filter((item) =>
            item.licenseNumber.toLowerCase().includes(value.toLowerCase())
          )
        : licenses
    );
  };

  const go_home = () => {
    navigate("/mlowner/home");
  };

  const filteredLicensesByDate = filteredLicenses.filter((license) => {
    if (startDate && endDate) {
      return (
        new Date(license.startDate) >= new Date(startDate) &&
        new Date(license.endDate) <= new Date(endDate)
      );
    }
    return true;
  });

  const columns = [
    {
      title: language === "en" ? "License Number" : language === "si" ? "බලපත්‍ර අංකය" : "உரிம எண்",
      dataIndex: "licenseNumber",
      key: "licenseNumber",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: language === "en" ? "Owner" : language === "si" ? "අයිතිකරු" : "உரிமையாளர்",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: language === "en" ? "Location" : language === "si" ? "ස්ථානය" : "இடம்",
      dataIndex: "location",
      key: "location",
    },
    {
      title: language === "en" ? "Start Date" : language === "si" ? "ආරම්භක දිනය" : "தொடக்க தேதி",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: language === "en" ? "Due Date" : language === "si" ? "අවසාන දිනය" : "இறுதி தேதி",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: language === "en" ? "Status" : language === "si" ? "තත්වය" : "நிலை",
      key: "status",
      render: (_, record) => {
        const isActive = new Date() <= new Date(record.endDate);
        const statusText = isActive
          ? language === "en"
            ? "Active"
            : language === "si"
            ? "සක්‍රිය"
            : "செயலில்"
          : language === "en"
          ? "Inactive"
          : language === "si"
          ? "අසක්‍රිය"
          : "செயலற்ற";

        return (
          <span className={isActive ? "valid-status" : "expired-status"}>
            {statusText}
          </span>
        );
      },
    },
    {
      title: language === "en" ? "Action" : language === "si" ? "ක්‍රියාමාර්ග" : "செயல்",
      key: "action",
      render: (_, record) => {
        const isActive = new Date() <= new Date(record.endDate);
        return (
          <Space size="middle">
            <Link to={`/mlowner/home/dispatchload/${record.licenseNumber}`}>
              <Button
                className={isActive ? "dispatch-button" : "dispatch-button-disabled"}
                disabled={!isActive} // Disable button if the status is "Inactive"
              >
                {language === "en" ? "Dispatch Load" : language === "si" ? "යවන ලද ප්‍රමාණ" : "அனுப்புதல் சுமை"}
              </Button>
            </Link>

            <Link to={`/mlowner/history?licenseNumber=${record.licenseNumber}`}>
              <Button className="history-button">
                {language === "en" ? "History" : language === "si" ? "ඉතිහාසය" : "வரலாறு"}
              </Button>
            </Link>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="container">
      <h1 className="title">
        {language === "en"
          ? "Licenses of Mining License Owner"
          : language === "si"
          ? "පතල් අයිතිකරුගේ බලපත්‍ර"
          : "ML உரிமையாளரின் உரிமங்கள்"}
      </h1>

      <Row className="filter-row" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <DatePicker
            className="large-input"
            onChange={(date) => setStartDate(date)}
            placeholder="Start Date"
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <DatePicker
            className="large-input"
            onChange={(date) => setEndDate(date)}
            placeholder="End Date"
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <AutoComplete
            value={searchText}
            onSearch={handleSearch}
            options={licenses.map(({ licenseNumber }) => ({ value: licenseNumber }))}
            style={{ width: "100%" }}
          >
            <Input
              className="large-input"
              prefix={<SearchOutlined />}
              placeholder="Search by License Number"
            />
          </AutoComplete>
        </Col>
      </Row>

      <Table
        dataSource={filteredLicensesByDate}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={false}
      />
      <div className="history-button-container">
        <Button className="history-back-button" onClick={() => go_home()}>
          {language === "en" ? "Back to Home" : language === "si" ? "ආපසු" : "வீட்டிற்குத் திரும்பு"}
        </Button>
      </div>
    </div>
  );
};

export default Licenses;
