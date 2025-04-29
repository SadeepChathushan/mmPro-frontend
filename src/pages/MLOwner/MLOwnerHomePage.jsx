import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Space,
  Row,
  Col,
  Spin,
  Empty,
  notification,
  Modal,
} from "antd";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { fetchHomeLicense } from "../../services/MLOService";
import "../../styles/MLOwner/MLOwnerHomePage.css";
//fetchMLRequests
const MLOwnerHomePage = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestedLicenses, setRequestedLicenses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const translations = {
    en: {
      title: "Mining Licenses Overview",
      subtitle:
        "As a Mining License Owner, you can view currently active licenses here.",
      searchPlaceholder: "Search License Number",
      viewLicensesButton: "View All Licenses",
      noDataMessage: "No Data Available",
      owner: "Owner",
      location: "Location",
      startDate: "Start Date",
      dueDate: "Expire Date",
      remainingCubes: "Remaining",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      dispatchLoad: "Dispatch Load",
      history: "History",
      mlRequest: "Request a Mining License",
      requestedLicensesTitle: "Requested Licenses Status",
      requestedLicensesButton: "View Requested Licenses",
      statusApprovedByGSMB: "Approved by GSMB Officer",
      statusAppointmentFixed: "Appointment Date Fixed",
      statusApprovedByEngineer: "Approved by Mining Engineer",
      statusReadyForCollection: "Please collect your mining license",
      noPendingRequests: "No pending license requests",
      close: "Close",
      royaltyAmount: "Royalty Amount",
    },
    si: {
      title: " කැණීමේ බලපත්‍ර",
      subtitle:
        "කැණීමේ බලපත්‍ර හිමිකරු ලෙස, ඔබට දැන් ක්‍රියාත්මක වන බලපත්‍රයන් මෙහි බලන්න පුළුවන්.",
      searchPlaceholder: "බලපත්‍ර අංකය සොයන්න",
      viewLicensesButton: "සියලුම බලපත්‍ර බලන්න",
      noDataMessage: "දත්ත නොමැත",
      owner: "හිමිකරු",
      location: "ස්ථානය",
      startDate: "ආරම්භක දිනය",
      dueDate: "කල්පිරෙන දිනය",
      remainingCubes: "ඉතිරිව ඇති කැට",
      status: "තත්වය",
      active: "සක්‍රීයයි",
      inactive: "අක්‍රීයයි",
      dispatchLoad: "නව ප්‍රවාහන බලපත්‍රයක්",
      history: "ඉතිහාසය",
      mlRequest: "කැණීමේ බලපත්‍රයක් ඉල්ලන්න",
      requestedLicensesTitle: "ඉල්ලූ බලපත්‍ර තත්ත්වය",
      requestedLicensesButton: "ඉල්ලූ බලපත්‍ර බලන්න",
      statusApprovedByGSMB: "GSMB නිලධාරියා අනුමත කර ඇත",
      statusAppointmentFixed: "නියමිත දිනය සකසා ඇත",
      statusApprovedByEngineer: "පතල් ඉංජිනේරු අනුමත කර ඇත",
      statusReadyForCollection: "කරුණාකර ඔබේ කැණීමේ බලපත්‍රය රැගෙන යන්න",
      noPendingRequests: "පොරොත්තු බලපත්‍ර ඉල්ලීම් නොමැත",
      close: "වසන්න",
    },
    ta: {
      title: "சுரங்க அனுமதிகள் மேலோட்டம்",
      subtitle:
        "சுரங்க அனுமதி உரிமையாளராக, நீங்கள் தற்போதைய செயல்படும் அனுமதிகளை இங்கு காணலாம்.",
      searchPlaceholder: "லائسன்ஸ் எண் தேடல்",
      viewLicensesButton: "லையசன்ஸ் பார்வை",
      noDataMessage: "தரவு இல்லை",
      owner: "உரிமையாளர்",
      location: "இடம்",
      startDate: "தொடக்க தேதி",
      dueDate: "காலக்கெடு",
      remainingCubes: "மீதமுள்ள கன சதுரங்கள்",
      status: "நிலை",
      active: "செயலில்",
      inactive: "செயலற்றது",
      dispatchLoad: "சரக்கு அனுப்பு",
      history: "வரலாறு",
      mlRequest: "சுரங்க உரிமம் கோருக",
      requestedLicensesTitle: "கோரப்பட்ட உரிமைகளின் நிலை",
      requestedLicensesButton: "கோரப்பட்ட உரிமைகளை காண்க",
      statusApprovedByGSMB: "GSMB அதிகாரியால் அங்கீகரிக்கப்பட்டது",
      statusAppointmentFixed: "நியமன தேதி நிர்ணயிக்கப்பட்டது",
      statusApprovedByEngineer: "சுரங்க பொறியாளரால் அங்கீகரிக்கப்பட்டது",
      statusReadyForCollection: "உங்கள் சுரங்க உரிமத்தைப் பெறவும்",
      noPendingRequests: "நிலுவையில் உள்ள உரிமை கோரிக்கைகள் இல்லை",
      close: "மூடு",
    },
  };

  const currentTranslations = translations[language] || translations["en"];

  // Hardcoded requested license data
  const hardcodedRequestedLicenses = [
    {
      id: 1,
      licenseNumber: "ML-REQ-2023-001",
      status: "approved_by_gsmb",
      requestDate: "2023-10-15",
      lastUpdated: "2023-10-20",
    },
    {
      id: 2,
      licenseNumber: "ML-REQ-2023-002",
      status: "appointment_fixed",
      requestDate: "2023-10-18",
      lastUpdated: "2023-10-22",
      appointmentDate: "2023-11-05",
    },
    {
      id: 3,
      licenseNumber: "ML-REQ-2023-003",
      status: "approved_by_engineer",
      requestDate: "2023-10-20",
      lastUpdated: "2023-10-25",
    },
    {
      id: 4,
      licenseNumber: "ML-REQ-2023-004",
      status: "ready_for_collection",
      requestDate: "2023-10-22",
      lastUpdated: "2023-10-28",
    },
  ];

  useEffect(() => {
    // Set the hardcoded requested licenses
    setRequestedLicenses(hardcodedRequestedLicenses);

    // Check for status updates to show notifications
    showStatusNotifications(hardcodedRequestedLicenses);

    const fetchData = async () => {
      try {
        console.log("Fetching home licenses...");
        const homeLicenses = await fetchHomeLicense();
        console.log("API Response - Home Licenses:", homeLicenses);

        if (homeLicenses.length === 0) {
          console.log("No home licenses found");
          return;
        }

        const mappedData = homeLicenses.map((license) => ({
          licenseNumber: license["License Number"],
          divisionalSecretary: license["Divisional Secretary Division"],
          owner: localStorage.getItem("USERNAME") || "Unknown Owner",
          location: license["Location"],
          startDate: license["Start Date"],
          dueDate: license["Due Date"],
          remainingCubes: license["Remaining Cubes"],
          status: license["Status"],
          royalty: license["Royalty"],
        }));

        console.log("Mapped Data:", mappedData);

        setData(mappedData);
        setFilteredData(mappedData);
      } catch (error) {
        console.error("Error fetching home licenses:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch home licenses. Please try again later.",
        });
      } finally {
        setLoading(false);
        console.log("Loading set to false");
      }
    };

    fetchData();
  }, []);

  const showStatusNotifications = (licenses) => {
    licenses.forEach((license) => {
      if (
        new Date(license.lastUpdated).toDateString() ===
        new Date().toDateString()
      ) {
        let message = "";
        let description = "";

        switch (license.status) {
          case "approved_by_gsmb":
            message = currentTranslations.statusApprovedByGSMB;
            description = `${license.licenseNumber} - ${currentTranslations.statusApprovedByGSMB}`;
            break;
          case "appointment_fixed":
            message = currentTranslations.statusAppointmentFixed;
            description = `${license.licenseNumber} - ${currentTranslations.statusAppointmentFixed}: ${license.appointmentDate}`;
            break;
          case "approved_by_engineer":
            message = currentTranslations.statusApprovedByEngineer;
            description = `${license.licenseNumber} - ${currentTranslations.statusApprovedByEngineer}`;
            break;
          case "ready_for_collection":
            message = currentTranslations.statusReadyForCollection;
            description = `${license.licenseNumber} - ${currentTranslations.statusReadyForCollection}`;
            break;
          default:
            return;
        }

        notification.info({
          message: message,
          description: description,
          duration: 8,
        });
      }
    });
  };

  const getStatusTranslation = (status) => {
    switch (status) {
      case "approved_by_gsmb":
        return currentTranslations.statusApprovedByGSMB;
      case "appointment_fixed":
        return currentTranslations.statusAppointmentFixed;
      case "approved_by_engineer":
        return currentTranslations.statusApprovedByEngineer;
      case "ready_for_collection":
        return currentTranslations.statusReadyForCollection;
      default:
        return status;
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="page-container1">
      <h1 className="title1">{currentTranslations.title}</h1>
      <p className="subtitle1">{currentTranslations.subtitle}</p>

      <Row gutter={[16, 16]} className="action-buttons-row">
        <Col>
          <Link to="/mlowner/home/viewlicenses">
            <Button className="view-licenses-button">
              {currentTranslations.viewLicensesButton}
            </Button>
          </Link>
        </Col>

        <Col>
          <Link to="/mlowner/home/mlrequest">
            <Button className="ml-request-button">
              {currentTranslations.mlRequest}
            </Button>
          </Link>
        </Col>

        <Col>
          <Button className="requested-licenses-button" onClick={showModal}>
            {currentTranslations.requestedLicensesButton}
          </Button>
        </Col>
      </Row>

      {/* Requested Licenses Modal */}
      <Modal
        title={currentTranslations.requestedLicensesTitle}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            {currentTranslations.close}
          </Button>,
        ]}
        width={800}
      >
        {requestedLicenses.length === 0 ? (
          <p>{currentTranslations.noPendingRequests}</p>
        ) : (
          <Row gutter={[16, 16]} className="card-container">
            {requestedLicenses.map((request) => (
              <Col xs={24} sm={24} md={24} lg={24} key={request.id}>
                <Card title={request.licenseNumber} className="request-card">
                  <p>
                    <strong>Request Date:</strong> {request.requestDate}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <span
                      className={`status-${request.status.replace(/_/g, "-")}`}
                    >
                      {getStatusTranslation(request.status)}
                    </span>
                  </p>
                  {request.appointmentDate && (
                    <p>
                      <strong>Appointment Date:</strong>{" "}
                      {request.appointmentDate}
                    </p>
                  )}
                  <p>
                    <small>Last Updated: {request.lastUpdated}</small>
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Modal>

      {/* Active Licenses Section */}
      <div className="page-content1">
        {loading ? (
          <div className="loading-container">
            <Spin size="large" className="loading-icon" />
          </div>
        ) : (
          <>
            {filteredData.length === 0 ? (
              <div className="no-data-container">
                <Empty
                  description={currentTranslations.noDataMessage}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            ) : (
              <Row
                gutter={[16, 16]}
                className="card-container"
                justify="center"
              >
                {filteredData.map((record) => (
                  <Col xs={24} sm={12} md={8} lg={8} key={record.licenseNumber}>
                    <Card title={record.licenseNumber} className="license-card">
                      <p>
                        <strong>{currentTranslations.owner}:</strong>{" "}
                        {record.owner}
                      </p>
                      <p>
                        <strong>{currentTranslations.location}:</strong>{" "}
                        {record.location}
                      </p>
                      <p>
                        <strong>{currentTranslations.startDate}:</strong>{" "}
                        {record.startDate}
                      </p>
                      <p>
                        <strong>{currentTranslations.dueDate}:</strong>{" "}
                        {record.dueDate}
                      </p>
                      <p>
                        <strong>{currentTranslations.remainingCubes}:</strong>{" "} 
                        {record.remainingCubes} cubes
                      </p>
                      <p>
                        <strong>{currentTranslations.royaltyAmount}:</strong>{" "}
                        {record.royalty}
                      </p>
                      <p>
                        <strong>{currentTranslations.status}:</strong>
                        <span
                          className={
                            new Date() <= new Date(record.dueDate)
                              ? "valid-status"
                              : "expired-status"
                          }
                        >
                          {new Date() <= new Date(record.dueDate)
                            ? currentTranslations.active
                            : currentTranslations.inactive}
                        </span>
                      </p>
                      <Space
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Link
                          to={`/mlowner/home/dispatchload/${record.licenseNumber}`}
                          state={{
                            divisionalSecretary: record.divisionalSecretary,
                          }} // Pass divisionalSecretary in state
                        >
                          <Button
                            className="dispatch-load-button"
                            disabled={
                              parseInt(record.remainingCubes, 10) === 0 ||
                              new Date(record.dueDate) < new Date()
                            }
                          >
                            {currentTranslations.dispatchLoad}
                          </Button>
                        </Link>
                      </Space>
                      <Space
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Link
                          to={{
                            pathname: "/mlowner/history",
                            search: `?licenseNumber=${record.licenseNumber}`,
                          }}
                        >
                          <Button className="history-button1">
                            {currentTranslations.history}
                          </Button>
                        </Link>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MLOwnerHomePage;
