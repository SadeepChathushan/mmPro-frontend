import { useState, useEffect } from "react";
import {
  Row,
  Col,
  DatePicker,
  Button,
  Input,
  AutoComplete,
  Space,
  Card,
  Empty,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import moment from "moment";
import { fetchLicenses } from "../../services/MLOService";
import "../../styles/MLOwner/Licenses.css";
import { FaArrowLeft } from "react-icons/fa";

const Licenses = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [licenses, setLicenses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredLicenses, setFilteredLicenses] = useState([]);

  // Translations
  const translations = {
    en: {
      title: "Licenses of Mining License Owner",
      searchPlaceholder: "Search by License Number",
      startDatePlaceholder: "Start Date",
      endDatePlaceholder: "End Date",
      noDataMessage: "No Data Available",
      owner: "Owner",
      location: "Location",
      startDate: "Start Date",
      dueDate: "Due Date",
      dispatchLoad: "Dispatch Load",
      history: "History",
      backToHome: "Back to Home",
    },
    si: {
      title: "කැණීමේ බලපත්‍ර හිමිකරුගේ බලපත්‍ර",
      searchPlaceholder: "බලපත්‍ර අංකය අනුව සොයන්න",
      startDatePlaceholder: "ආරම්භක දිනය",
      endDatePlaceholder: "අවසන් දිනය",
      noDataMessage: "දත්ත නොමැත",
      owner: "හිමිකරු",
      location: "ස්ථානය",
      startDate: "ආරම්භක දිනය",
      dueDate: "කල්පිරෙන දිනය",
      dispatchLoad: "ප්‍රවාහන බලපත්‍රය",
      history: "ඉතිහාසය",
      backToHome: "නැවත මුල් පිටුවට",
    },
    ta: {
      title: "சுரங்க உரிமம் உரிமையாளரின் உரிமங்கள்",
      searchPlaceholder: "உரிமம் எண் மூலம் தேடு",
      startDatePlaceholder: "தொடக்க தேதி",
      endDatePlaceholder: "முடிவு தேதி",
      noDataMessage: "தரவு இல்லை",
      owner: "உரிமையாளர்",
      location: "இடம்",
      startDate: "தொடக்க தேதி",
      dueDate: "காலக்கெடு",
      dispatchLoad: "சரக்கு அனுப்பு",
      history: "வரலாறு",
      backToHome: "முகப்பு பக்கத்திற்கு திரும்பு",
    },
  };

  const currentTranslations = translations[language] || translations["en"];

  useEffect(() => {
    const loadLicenses = async () => {
      const data = await fetchLicenses();
      setLicenses(data);
      setFilteredLicenses(data);
    };
    loadLicenses();
  }, []);

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

  const datePickerStyle = {
    borderColor: "#fff2f2",
    color: "darkred",
  };

  return (
    <div className="container">
      <h2 className="title1">{currentTranslations.title}</h2>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <div className="search-box">
            <AutoComplete
              value={searchText}
              onSearch={handleSearch}
              options={licenses.map(({ licenseNumber }) => ({ value: licenseNumber }))}
              style={{ width: "100%" }}
            >
              <Input
                className="search-input"
                placeholder={currentTranslations.searchPlaceholder}
              />
            </AutoComplete>
            <SearchOutlined className="search-btn" />
          </div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <DatePicker
            onChange={(date) => setStartDate(date)}
            placeholder={currentTranslations.startDatePlaceholder}
            style={{ ...datePickerStyle, width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <DatePicker
            onChange={(date) => setEndDate(date)}
            placeholder={currentTranslations.endDatePlaceholder}
            style={{ ...datePickerStyle, width: "100%" }}
          />
        </Col>
      </Row>

      {filteredLicensesByDate.length === 0 ? (
        <div className="no-data-container">
          <Empty
            description={currentTranslations.noDataMessage}
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
          />
        </div>
      ) : (
        <div className="card-container">
          {filteredLicensesByDate.map((license) => (
            <Card key={license.licenseNumber} title={`License Number: ${license.licenseNumber}`} className="license-card">
              <p><strong>{currentTranslations.owner}:</strong> {license.owner}</p>
              <p><strong>{currentTranslations.location}:</strong> {license.location}</p>
              <p><strong>{currentTranslations.startDate}:</strong> {moment(license.startDate).format("YYYY-MM-DD")}</p>
              <p><strong>{currentTranslations.dueDate}:</strong> {moment(license.endDate).format("YYYY-MM-DD")}</p>
              <Space>
                <Link to={`/mlowner/home/dispatchload/${license.licenseNumber}`}>
                  <Button className="dispatch-load-button">{currentTranslations.dispatchLoad}</Button>
                </Link>
                <Link to={`/mlowner/history?licenseNumber=${license.licenseNumber}`}>
                  <Button className="history-button1">{currentTranslations.history}</Button>
                </Link>
              </Space>
            </Card>
          ))}
        </div>
      )}

      <div className="back_button_container">
        <Button className="back_button" onClick={go_home}>
          {currentTranslations.backToHome}
          <FaArrowLeft className="mr-2" />
        </Button>
      </div>
    </div>
  );
};

export default Licenses;