import React, { useState, useEffect } from "react";
import { Table, Row, Col, DatePicker, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { useLanguage } from "../../contexts/LanguageContext";
import { fetchDispatchHistoryData } from "../../services/MLOService"; // Import the service
import '../../styles/MLOwner/History.css'; // Import the CSS file

const History = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dispatchHistory, setDispatchHistory] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [clickCounts, setClickCounts] = useState({});
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    DateTime: "",
    licenseNumber: "",
    destination: "",
    lorryNumber: "",
    driverContact: "",
    dueDate: "",
    cubes: 1,
  });
  const [l_number, setl_number] = useState();

  const apiKey = localStorage.getItem("API_Key");

  const go_home = () => {
    navigate("/mlowner/home");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extractedLicenseNumber = queryParams.get("licenseNumber");
    if (extractedLicenseNumber) {
      setLicenseNumber(extractedLicenseNumber);
      setl_number(extractedLicenseNumber);
    }

    const fetchData = async () => {
      try {
        const data = await fetchDispatchHistoryData(apiKey); // Call the service function
        setDispatchHistory(data);
      } catch (error) {
        console.error("Error fetching dispatch history:", error);
      }
    };

    fetchData();
  }, [location.search, apiKey]);

  const filteredDispatchHistory = dispatchHistory.filter((dispatch) => {
    let isLicenseMatch = true;
    if (licenseNumber) {
      isLicenseMatch = dispatch.licenseNumber === licenseNumber;
    }

    if (startDate && endDate) {
      const dispatchDate = new Date(dispatch.dispatchDate);
      return (
        dispatchDate >= new Date(startDate) &&
        dispatchDate <= new Date(endDate) &&
        isLicenseMatch
      );
    } else {
      return isLicenseMatch;
    }
  });

  const handleButtonClick = (record) => {
    setClickCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[record.licenseNumber] =
        (newCounts[record.licenseNumber] || 0) + 1;
      return newCounts;
    });

    navigate("/mlowner/home/dispatchload/receipt", {
      state: { formData, l_number },
    });
  };

  const columns = [
    { title: language === "en" ? "License Number" : "බලපත්‍ර අංකය", dataIndex: "licenseNumber", key: "licenseNumber" },
    { title: language === "en" ? "Driver Contact" : "රියදුරුගේ දුරකථනය", dataIndex: "lorryDriverContact", key: "lorryDriverContact" },
    { title: language === "en" ? "Owner" : "අයිතිකරු", dataIndex: "owner", key: "owner" },
    { title: language === "en" ? "Location" : "ස්ථානය", dataIndex: "location", key: "location" },
    { title: language === "en" ? "Lorry Number" : "ලොරි අංකය", dataIndex: "lorryNumber", key: "lorryNumber" },
    { title: language === "en" ? "Destination" : "ගමනාන්තය", dataIndex: "Destination", key: "Destination" },
    { title: language === "en" ? "Cubes" : "කියුබ් ගණන", dataIndex: "cubes", key: "cubes" },
    { title: language === "en" ? "Dispatched Date" : "යවන ලද දිනය", dataIndex: "dispatchDate", key: "dispatchDate", render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span> },
    { title: language === "en" ? "Due Date" : "අවසන් ලද දිනය", dataIndex: "due_date", key: "due_date", render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span> },
    {
      title: language === "en" ? "Action" : "ක්‍රියාමාර්ග",
      key: "action",
      render: (_, record) => {
        const buttonDisabled = (clickCounts[record.licenseNumber] || 0) >= 3;
        return (
          <Button
            className={`history-action-button ${buttonDisabled ? 'history-action-button-disabled' : 'history-action-button-enabled'}`}
            onClick={() => !buttonDisabled && handleButtonClick(record)}
            disabled={buttonDisabled}
          >
            {buttonDisabled
              ? language === "en" ? "Max Clicks Reached" : "උපරිම ක්ලික් ගණන අවසන්"
              : language === "en" ? "Print Your Missed Receipts" : "රිසිට්පත මුද්‍රණය කරගන්න"
            }
          </Button>
        );
      },
    },
  ];

  return (
    <div className="history-container">
      <h1 className="history-title">
        {language === "en" ? "Dispatch History" : "යවන ලද ප්‍රමාණ"}
      </h1>

      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={(date) => setStartDate(moment(date).format("YYYY-MM-DD"))}
            placeholder={language === "en" ? "Start Date" : "ආරම්භක දිනය"}
            className="history-datepicker"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={(date) => setEndDate(moment(date).format("YYYY-MM-DD"))}
            placeholder={language === "en" ? "End Date" : "අවසන් දිනය"}
            className="history-datepicker"
          />
        </Col>
      </Row>

      <Table
        dataSource={filteredDispatchHistory}
        columns={columns}
        className="history-table"
        pagination={false}
      />

      <div className="history-button-container">
        <Button className="history-back-button" onClick={() => go_home()}>
          {language === "en" ? "Back to Home" : "ආපසු"}
        </Button>
      </div>
    </div>
  );
};

export default History;
