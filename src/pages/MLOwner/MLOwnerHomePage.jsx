import { useState, useEffect } from 'react';
import { Button, Card, Space, Row, Col, Spin, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { useLanguage } from "../../contexts/LanguageContext";
import {fetchHomeLicense} from '../../services/MLOService';
import "../../styles/MLOwner/MLOwnerHomePage.css";

const MLOwnerHomePage = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const translations = {
    en: {
      title: "Mining Licenses Overview",
      subtitle: "As a Mining License Owner, you can view currently active licenses here.",
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
      mlRequest: "Request a Mining License"
    },
    si: {
      title: " කැණීමේ බලපත්‍ර",
      subtitle: "කැණීමේ බලපත්‍ර හිමිකරු ලෙස, ඔබට දැන් ක්‍රියාත්මක වන බලපත්‍රයන් මෙහි බලන්න පුළුවන්.",
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
      mlRequest: ""
    },
    ta: {
      title: "சுரங்க அனுமதிகள் மேலோட்டம்",
      subtitle: "சுரங்க அனுமதி உரிமையாளராக, நீங்கள் தற்போதைய செயல்படும் அனுமதிகளை இங்கு காணலாம்.",
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
      mlRequest: ""
    }
  };

  const currentTranslations = translations[language] || translations['en'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching home licenses...");
        const homeLicenses = await fetchHomeLicense(); 
        console.log("API Response - Home Licenses:", homeLicenses);
  
        if (homeLicenses.length === 0) {
          console.log("No home licenses found");
          return;
        }
  
        const mappedData = homeLicenses.map(license => ({
          licenseNumber: license["License Number"],
          owner: license["Owner Name"],
          location: license["Location"],
          startDate: license["Start Date"],
          dueDate: license["Due Date"],
          remainingCubes: license["Remaining Cubes"],
          status: license["Status"]
        }));
  
        console.log("Mapped Data:", mappedData);
  
        setData(mappedData);
        setFilteredData(mappedData);
      } catch (error) {
        console.error('Error fetching home licenses:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch home licenses. Please try again later.',
        });
      } finally {
        setLoading(false);
        console.log("Loading set to false"); // Debug loading state
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div className="page-container1">
       <h1 className="title1">{currentTranslations.title}</h1>
       <p className="subtitle1">{currentTranslations.subtitle}</p>
       <Row>
                <Link to="/mlowner/home/viewlicenses">
                  <Button className="view-licenses-button">
                    {currentTranslations.viewLicensesButton}
                  </Button>
                </Link>

                <Link to="/mlowner/home/mlrequest">
                  <Button className="ml-request-button">
                    {currentTranslations.mlRequest}
                  </Button>
                </Link>
       </Row>
      <div className="page-content1">
        {loading ? (
          <div className="loading-container">
            <Spin size="large" className="loading-icon" />
          </div>
        ) : (
          <>
            {/* Show "No Data" if filteredData is empty */}
            {filteredData.length === 0 ? (
              <div className="no-data-container">
                <Empty
                  description={currentTranslations.noDataMessage} 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                />
              </div>
            ) : (
              <Row gutter={[16, 16]} className="card-container" justify="center">
                {filteredData.map(record => (
                  <Col xs={24} sm={12} md={8} lg={8} key={record.licenseNumber}>
                    <Card title={record.licenseNumber} className="license-card">
                      <p><strong>{currentTranslations.owner}:</strong> {record.owner}</p>
                      <p><strong>{currentTranslations.location}:</strong> {record.location}</p>
                      <p><strong>{currentTranslations.startDate}:</strong> {record.startDate}</p>
                      <p><strong>{currentTranslations.dueDate}:</strong> {record.dueDate}</p>
                      <p><strong>{currentTranslations.remainingCubes}:</strong> {record.remainingCubes} cubes</p>
                      <p>
                        <strong>{currentTranslations.status}:</strong>
                        <span className={new Date() <= new Date(record.dueDate) ? "valid-status" : "expired-status"}>
                          {new Date() <= new Date(record.dueDate) ? currentTranslations.active : currentTranslations.inactive}
                        </span>
                      </p>
                      <Space style={{ width: "100%", display: "flex", justifyContent: "center"}}>
                        <Link to={`/mlowner/home/dispatchload/${record.licenseNumber}`}>
                          <Button className="dispatch-load-button" disabled={parseInt(record.remainingCubes, 10) === 0 || new Date(record.dueDate) < new Date()}>
                            {currentTranslations.dispatchLoad}
                          </Button>
                        </Link>
                      </Space>
                      <Space style={{ width: "100%", display: "flex", justifyContent: "center"}}>
                      <Link to={{ pathname: "/mlowner/history", search: `?licenseNumber=${record.licenseNumber}` }}>
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
