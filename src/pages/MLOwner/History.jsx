import React, { useState, useEffect } from "react";
import { Table, Row, Col, DatePicker, Button, notification } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { useLanguage } from "../../contexts/LanguageContext";
import { fetchDispatchHistoryData } from "../../services/MLOService";
import "../../styles/MLOwner/History.css";

const History = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State declarations
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dispatchHistory, setDispatchHistory] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [clickCounts, setClickCounts] = useState({});
  const [l_number, setl_number] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const { language } = useLanguage();

  const go_home = () => {
    navigate("/mlowner/home");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams(location.search);
        const licenseNumber = queryParams.get("licenseNumber");

        if (!licenseNumber) {
          setError("No license number provided");
          return;
        }

        setLicenseNumber(licenseNumber);
        setl_number(licenseNumber);

        const apiResponse = await fetchDispatchHistoryData(licenseNumber);
        console.log("API Response:", apiResponse);

        // Ensure we have valid data
        if (!apiResponse) {
          setError("No data received from server");
          return;
        }

        // Convert to array if needed
        const responseData = Array.isArray(apiResponse)
          ? apiResponse
          : [apiResponse];

        if (responseData.length === 0) {
          setError("No TPL history found for this license");
          return;
        }

        // Transform data with proper fallbacks
        const transformedData = responseData.map((item) => ({
          licenseNumber: item.license_number,
          lorryDriverContact: item.driver_contact,
          lorryNumber: item.lorry_number,
          cubes: item.cubes,
          destination: item.destination,
          Route_01: item.Route_01,
          Route_02: item.Route_02,
          Route_03: item.Route_03,
          startDate: item.start_date,
          dueDate: item.due_date,
          status: item.status,
          dispatchDate: item.start_date, // Using start_date as dispatch date
          tpl_id: item.tpl_id, // Including the ID if needed
          created_on: item["Create Date"], // Handling the Create Date field
        }));

        setDispatchHistory(transformedData);
      } catch (error) {
        console.error("Error in fetchData:", error);
        setError(error.message || "Failed to load TPL history");
        notification.error({
          message: "Error",
          description: error.message || "Failed to fetch TPL history",
          duration: 5,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  const filteredDispatchHistory = dispatchHistory.filter((dispatch) => {
    if (startDate && endDate) {
      const dispatchDate = new Date(dispatch.dispatchDate);
      return (
        dispatchDate >= new Date(startDate) && dispatchDate <= new Date(endDate)
      );
    }
    return true;
  });

  const handleButtonClick = (record) => {
    setClickCounts((prevCounts) => ({
      ...prevCounts,
      [record.licenseNumber]: (prevCounts[record.licenseNumber] || 0) + 1,
    }));

    navigate("/mlowner/home/dispatchload/receipt", {
      state: {
        formData: {
          DateTime: record.startDate,
          licenseNumber: record.licenseNumber,
          destination: record.destination,
          lorryNumber: record.lorryNumber,
          driverContact: record.lorryDriverContact,
          dueDate: record.dueDate,
          cubes: record.cubes,
        },
        l_number,
      },
    });
  };

  const columns = [
    {
      title:
        language === "en"
          ? "License Number"
          : language === "si"
          ? "බලපත්‍ර අංකය"
          : "உரிம எண்",
      dataIndex: "licenseNumber",
      key: "licenseNumber",
    },
    {
      title:
        language === "en"
          ? "Driver Contact"
          : language === "si"
          ? "රියදුරුගේ දුරකථනය"
          : "ஓட்டுநர் தொடர்பு",
      dataIndex: "lorryDriverContact",
      key: "lorryDriverContact",
    },
    {
      title:
        language === "en"
          ? "Lorry Number"
          : language === "si"
          ? "ලොරි අංකය"
          : "லாரி எண்",
      dataIndex: "lorryNumber",
      key: "lorryNumber",
    },
    {
      title:
        language === "en"
          ? "Cubes"
          : language === "si"
          ? "කියුබ් ගණන"
          : "கனசதுரங்கள்",
      dataIndex: "cubes",
      key: "cubes",
    },
    {
      title:
        language === "en"
          ? "Destination"
          : language === "si"
          ? "ගමනාන්තය"
          : "சேருமிடம்",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title:
        language === "en"
          ? "Route 01"
          : language === "si"
          ? "මාර්ගය 01"
          : "வழி 01",
      dataIndex: "Route_01",
      key: "Route_01",
    },
    {
      title:
        language === "en"
          ? "Route 02"
          : language === "si"
          ? "මාර්ගය 02"
          : "வழி 02",
      dataIndex: "Route_02",
      key: "Route_02",
    },
    {
      title:
        language === "en"
          ? "Route 03"
          : language === "si"
          ? "මාර්ගය 03"
          : "வழி 03",
      dataIndex: "Route_03",
      key: "Route_03",
    },
    {
      title:
        language === "en"
          ? "Create Date"
          : language === "si"
          ? "යවන ලද දිනය"
          : "அனுப்பப்பட்ட தேதி",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title:
        language === "en"
          ? "Status"
          : language === "si"
          ? "ක්‍රියාමාර්ග"
          : "செயல்",
      dataIndex: "status",
      key: "status",
    },
    {
      key: "action",
      render: (_, record) => {
        const buttonDisabled = (clickCounts[record.licenseNumber] || 0) >= 3;
        return (
          <Button
            className={`history-action-button ${
              buttonDisabled
                ? "history-action-button-disabled"
                : "history-action-button-enabled"
            }`}
            onClick={() => !buttonDisabled && handleButtonClick(record)}
            disabled={buttonDisabled}
          >
            {buttonDisabled
              ? language === "en"
                ? "Max Clicks Reached"
                : language === "si"
                ? "උපරිම ක්ලික් ගණන අවසන්"
                : "அதிகபட்ச கிளிக்குகள்"
              : language === "en"
              ? "Print Receipt"
              : language === "si"
              ? "රිසිට්පත මුද්‍රණය කරන්න"
              : "ரசீதை அச்சிடுக"}
          </Button>
        );
      },
    },
  ];

  return (
    <div className="history-container">
      <h1 className="history-title">
        {language === "en"
          ? "Dispatch History"
          : language === "si"
          ? "යවන ලද ප්‍රමාණ"
          : "அனுப்புதல் வரலாறு"}
      </h1>

      {error && <div className="error-message">{error}</div>}

      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={(date) =>
              setStartDate(date ? moment(date).format("YYYY-MM-DD") : null)
            }
            placeholder={
              language === "en"
                ? "Start Date"
                : language === "si"
                ? "ආරම්භක දිනය"
                : "தொடக்க தேதி"
            }
            className="history-datepicker"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={(date) =>
              setEndDate(date ? moment(date).format("YYYY-MM-DD") : null)
            }
            placeholder={
              language === "en"
                ? "End Date"
                : language === "si"
                ? "අවසන් දිනය"
                : "முடிவு தேதி"
            }
            className="history-datepicker"
          />
        </Col>
      </Row>

      <Table
        dataSource={filteredDispatchHistory}
        columns={columns}
        className="history-table"
        pagination={false}
        loading={loading}
        rowKey="licenseNumber"
      />

      <div className="history-button-container">
        <Button className="history-back-button" onClick={go_home}>
          {language === "en"
            ? "Back to Home"
            : language === "si"
            ? "ආපසු"
            : "வீட்டிற்குத் திரும்பு"}
        </Button>
      </div>
    </div>
  );
};

export default History;
