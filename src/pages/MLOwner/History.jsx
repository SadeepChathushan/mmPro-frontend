import { useState, useEffect } from "react";
import { Card, Row, Col, DatePicker, Button, notification, Empty, Spin } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { useLanguage } from "../../contexts/LanguageContext";
import { fetchDispatchHistoryData } from "../../services/MLOService";
import "../../styles/MLOwner/History.css";

const { Meta } = Card;

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

        if (!apiResponse) {
          setError("No data received from server");
          return;
        }

        const responseData = Array.isArray(apiResponse)
          ? apiResponse
          : [apiResponse];

        if (responseData.length === 0) {
          setError("No TPL history found for this license");
          return;
        }

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
          dispatchDate: item.start_date,
          tpl_id: item.tpl_id,
          created_on: item["Create Date"],
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

  const getButtonText = (record) => {
    const buttonDisabled = (clickCounts[record.licenseNumber] || 0) >= 3;
    return buttonDisabled
      ? language === "en"
        ? "Max Clicks Reached"
        : language === "si"
        ? "උපරිම ක්ලික් ගණන අවසන්"
        : "அதிகபட்ச கிளிக்குகள்"
      : language === "en"
      ? "Print Receipt"
      : language === "si"
      ? "රිසිට්පත මුද්‍රණය කරන්න"
      : "ரசீதை அச்சிடுக";
  };

  const getFieldLabel = (fieldName) => {
    const labels = {
      licenseNumber: {
        en: "License Number",
        si: "බලපත්‍ර අංකය",
        ta: "உரிம எண்"
      },
      lorryDriverContact: {
        en: "Driver Contact",
        si: "රියදුරුගේ දුරකථනය",
        ta: "ஓட்டுநர் தொடர்பு"
      },
      lorryNumber: {
        en: "Lorry Number",
        si: "ලොරි අංකය",
        ta: "லாரி எண்"
      },
      cubes: {
        en: "Cubes",
        si: "කියුබ් ගණන",
        ta: "கனசதுரங்கள்"
      },
      destination: {
        en: "Destination",
        si: "ගමනාන්තය",
        ta: "சேருமிடம்"
      },
      Route_01: {
        en: "Route 01",
        si: "මාර්ගය 01",
        ta: "வழி 01"
      },
      Route_02: {
        en: "Route 02",
        si: "මාර්ගය 02",
        ta: "வழி 02"
      },
      Route_03: {
        en: "Route 03",
        si: "මාර්ගය 03",
        ta: "வழி 03"
      },
      startDate: {
        en: "Create Date",
        si: "යවන ලද දිනය",
        ta: "அனுப்பப்பட்ட தேதி"
      },
      status: {
        en: "Status",
        si: "ක්‍රියාමාර්ග",
        ta: "செயல்"
      }
    };

    return labels[fieldName] ? labels[fieldName][language] || labels[fieldName].en : fieldName;
  };

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

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : filteredDispatchHistory.length === 0 ? (
        <Empty description={
          language === "en" 
            ? "No dispatch history found" 
            : language === "si" 
            ? "යවන ලද ප්‍රමාණ නොමැත" 
            : "அனுப்புதல் வரலாறு இல்லை"
        } />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredDispatchHistory.map((record) => {
            const buttonDisabled = (clickCounts[record.licenseNumber] || 0) >= 3;
            
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={record.licenseNumber}>
                <Card
                  className="history-card"
                  hoverable
                  actions={[
                    <Button 
  className={`history-action-button ${buttonDisabled ? "disabled" : "enabled"}`}
  onClick={handleButtonClick}
  disabled={buttonDisabled}
  block
>
  {getButtonText(record)}
</Button>

                  ]}
                >
                  <Meta
                    title={`${getFieldLabel("licenseNumber")}: ${record.licenseNumber}`}
                    description={
                      <div className="card-content">
                        <div className="card-field">
                          <span className="field-label">{getFieldLabel("lorryDriverContact")}:</span>
                          <span>{record.lorryDriverContact}</span>
                        </div>
                        <div className="card-field">
                          <span className="field-label">{getFieldLabel("lorryNumber")}:</span>
                          <span>{record.lorryNumber}</span>
                        </div>
                        <div className="card-field">
                          <span className="field-label">{getFieldLabel("cubes")}:</span>
                          <span>{record.cubes}</span>
                        </div>
                        <div className="card-field">
                          <span className="field-label">{getFieldLabel("destination")}:</span>
                          <span>{record.destination}</span>
                        </div>
                        <div className="card-field">
                          <span className="field-label">{getFieldLabel("startDate")}:</span>
                          <span>{moment(record.startDate).format("YYYY-MM-DD")}</span>
                        </div>
                        <div className="card-field">
                          <span className="field-label">{getFieldLabel("status")}:</span>
                          <span>{record.status}</span>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

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