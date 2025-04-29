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
import { fetchAllLicense } from "../../services/MLOService";
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
      title: "சுரங்க உரிம உரிமையாளரின் உரிமங்கள்",
      searchPlaceholder: "உரிம எண் மூலம் தேடு",
      startDatePlaceholder: "தொடக்க திகதி",
      endDatePlaceholder: "முடிவு திகதி",
      noDataMessage: "தரவு இல்லை",
      owner: "உரிமையாளர்",
      location: "இடம்",
      startDate: "தொடக்க திகதி",
      dueDate: "காலக்கெடு",
      dispatchLoad: "சரக்கு அனுப்பு",
      history: "வரலாறு",
      backToHome: "முகப்பு பக்கத்திற்கு திரும்பு",
    },
  };

  const currentTranslations = translations[language] || translations["en"];

  useEffect(() => {
    const loadLicenses = async () => {
      try {
        const allLicenses = await fetchAllLicense();

        const mappedData = allLicenses.map((license) => ({
          licenseNumber: license["License Number"],
          owner: localStorage.getItem("USERNAME") || "Unknown Owner",
          location: license["Location"],
          startDate: license["Start Date"],
          dueDate: license["Due Date"],
          remainingCubes: license["Remaining Cubes"],
          status: license["Status"],
        }));

        setLicenses(mappedData);
        setFilteredLicenses(mappedData); // Initialize filteredLicenses with all licenses
      } catch (error) {
        console.error("Failed to fetch licenses:", error);
      }
    };
    loadLicenses();
  }, []);

  // Handle search by license number
  const handleSearch = (value) => {
    setSearchText(value);
    filterLicenses(value, startDate, endDate);
  };

  // Handle start date change
  const handleStartDateChange = (date) => {
    setStartDate(date);
    filterLicenses(searchText, date, endDate);
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setEndDate(date);
    filterLicenses(searchText, startDate, date);
  };

  // Filter licenses based on search text and date range
  const filterLicenses = (searchText, startDate, endDate) => {
    let filtered = licenses;

    // Filter by license number
    if (searchText) {
      filtered = filtered.filter((item) =>
        item.licenseNumber.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by start date and end date
    if (startDate || endDate) {
      filtered = filtered.filter((item) => {
        const licenseStartDate = moment(item.startDate);
        const licenseDueDate = moment(item.dueDate);

        // Check if the license falls within the selected date range
        const isAfterStartDate = startDate
          ? licenseStartDate.isSameOrAfter(moment(startDate))
          : true; // If no start date is selected, include all licenses
        const isBeforeEndDate = endDate
          ? licenseDueDate.isSameOrBefore(moment(endDate))
          : true; // If no end date is selected, include all licenses

        return isAfterStartDate && isBeforeEndDate;
      });
    }

    setFilteredLicenses(filtered);
  };

  const go_home = () => {
    navigate("/mlowner/home");
  };

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
              options={filteredLicenses.map(({ licenseNumber }) => ({
                value: licenseNumber,
              }))}
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
            onChange={handleStartDateChange}
            placeholder={currentTranslations.startDatePlaceholder}
            style={{ ...datePickerStyle, width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <DatePicker
            onChange={handleEndDateChange}
            placeholder={currentTranslations.endDatePlaceholder}
            style={{ ...datePickerStyle, width: "100%" }}
          />
        </Col>
      </Row>

      {filteredLicenses.length === 0 ? (
        <div className="no-data-container">
          <Empty
            description={currentTranslations.noDataMessage}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      ) : (
        <div className="card-container">
          {filteredLicenses.map((license) => (
            <Card
              key={license.licenseNumber}
              title={`License Number: ${license.licenseNumber}`}
              className="license-card"
            >
              <p>
                <strong>{currentTranslations.owner}:</strong> {license.owner}
              </p>
              <p>
                <strong>{currentTranslations.location}:</strong>{" "}
                {license.location}
              </p>
              <p>
                <strong>{currentTranslations.startDate}:</strong>{" "}
                {moment(license.startDate).format("YYYY-MM-DD")}
              </p>
              <p>
                <strong>{currentTranslations.dueDate}:</strong>{" "}
                {moment(license.dueDate).format("YYYY-MM-DD")}
              </p>
              <Space>
                <Link
                  to={`/mlowner/home/dispatchload/${license.licenseNumber}`}
                >
                  <Button
                    className="dispatch-load-button"
                    disabled={
                      parseInt(license.remainingCubes, 10) === 0 ||
                      new Date(license.dueDate) < new Date()
                    }
                  >
                    {currentTranslations.dispatchLoad}
                  </Button>
                </Link>
                <Link
                  to={`/mlowner/history?licenseNumber=${license.licenseNumber}`}
                >
                  <Button className="history-button1">
                    {currentTranslations.history}
                  </Button>
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
