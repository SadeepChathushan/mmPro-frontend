import React, { useState, useEffect } from "react";
import { Table, Row, Col, DatePicker, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { useLanguage } from "../../contexts/LanguageContext";
import { fetchDispatchHistoryData } from "../../services/MLOService"; // Import the service
import "../../styles/MLOwner/History.css"; // Import the CSS file

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
    cubes: "",
  });
  const [l_number, setl_number] = useState();

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
        // Fetch dispatch history data from the service, passing the extracted license number
        const data = await fetchDispatchHistoryData(extractedLicenseNumber);

        if (!data || data.length === 0) {
          console.log("No dispatch history data found");
          return;
        }
        console.log("date", data);

        // Set the dispatch history state
        setDispatchHistory(data);
      } catch (error) {
        console.error("Error fetching dispatch history:", error);
      }
    };

    fetchData();
  }, []);
  // Empty dependency array ensures it runs once when the component mounts

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
    // Assign formData with correct tpl data
    const updatedFormData = {
      DateTime: record.startDate,
      licenseNumber: record.licenseNumber,
      destination: record.destination,
      lorryNumber: record.lorryNumber,
      driverContact: record.lorryDriverContact,
      dueDate: record.dueDate,
      cubes: record.cubes,
       // Corrected validity assignment
    };

    setFormData(updatedFormData);

    navigate("/mlowner/home/dispatchload/receipt", {
      state: { formData:updatedFormData, l_number },
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
          ? "Owner"
          : language === "si"
          ? "අයිතිකරු"
          : "உரிமையாளர்",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title:
        language === "en" ? "Location" : language === "si" ? "ස්ථානය" : "இடம்",
      dataIndex: "location",
      key: "location",
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
          ? "Destination"
          : language === "si"
          ? "ගමනාන්තය"
          : "சேருமிடம்",
      dataIndex: "Destination",
      key: "Destination",
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
          ? "Dispatched Date"
          : language === "si"
          ? "යවන ලද දිනය"
          : "அனுப்பப்பட்ட தேதி",
      dataIndex: "startDate",
      key: "dispatchDate",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title:
        language === "en"
          ? "Due Date"
          : language === "si"
          ? "අවසන් ලද දිනය"
          : "நிலுவைத் தேதி",
      dataIndex: "due_date",
      key: "due_date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title:
        language === "en"
          ? "Action"
          : language === "si"
          ? "ක්‍රියාමාර්ග"
          : "செயல்",
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
                : "ரசீதை அச்சிடுங்கள்"
              : language === "en"
              ? "Print Your Missed Receipts"
              : language === "si"
              ? "රිසිට්පත මුද්‍රණය කරගන්න"
              : "ரசீதை அச்சிடுங்கள்"}
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

      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={(date) => setStartDate(moment(date).format("YYYY-MM-DD"))}
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
            onChange={(date) => setEndDate(moment(date).format("YYYY-MM-DD"))}
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
      />

      <div className="history-button-container">
        <Button className="history-back-button" onClick={() => go_home()}>
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
