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
  Empty, // Import the Empty component
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import moment from "moment";
import { fetchLicenses } from "../../services/MLOService";
import "../../styles/MLOwner/Licenses.css";

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
    borderColor: "#fff2f2", // Light red border
    color: "darkred", // Dark red text
  };

  const searchBarStyle = {
    borderColor: "rgb(195, 195, 195)", // Gray border
    color: "darkred", // Dark red text
  };

  return (
    <div className="container">
      <h2 className="title1">Licenses of Mining License Owner</h2>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <AutoComplete
            value={searchText}
            onSearch={handleSearch}
            options={licenses.map(({ licenseNumber }) => ({ value: licenseNumber }))}
            style={{ width: "100%" }}
          >
            <Input
              prefix={<SearchOutlined style={{ color: "darkred" }} />} // Red icon
              placeholder="Search by License Number"
              style={{ ...searchBarStyle, width: "100%" }}
            />
          </AutoComplete>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <DatePicker
            onChange={(date) => setStartDate(date)}
            placeholder="Start Date"
            style={{ ...datePickerStyle, width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <DatePicker
            onChange={(date) => setEndDate(date)}
            placeholder="End Date"
            style={{ ...datePickerStyle, width: "100%" }}
          />
        </Col>
      </Row>

      {/* Display "No Data" if filteredLicensesByDate is empty */}
      {filteredLicensesByDate.length === 0 ? (
        <div className="no-data-container">
          <Empty
            description="No Data Available" // Custom message
            image={Empty.PRESENTED_IMAGE_SIMPLE} // Simple icon
          />
        </div>
      ) : (
        <div className="card-container">
          {filteredLicensesByDate.map((license) => (
            <Card key={license.licenseNumber} title={`License Number: ${license.licenseNumber}`} className="license-card">
              <p><strong>Owner:</strong> {license.owner}</p>
              <p><strong>Location:</strong> {license.location}</p>
              <p><strong>Start Date:</strong> {moment(license.startDate).format("YYYY-MM-DD")}</p>
              <p><strong>Due Date:</strong> {moment(license.endDate).format("YYYY-MM-DD")}</p>
              <Space>
                <Link to={`/mlowner/home/dispatchload/${license.licenseNumber}`}>
                  <Button className="dispatch-load-button">Dispatch Load</Button>
                </Link>
                <Link to={`/mlowner/history?licenseNumber=${license.licenseNumber}`}>
                  <Button className="history-button1">History</Button>
                </Link>
              </Space>
            </Card>
          ))}
        </div>
      )}

      <div className="back_button_container">
        <Button className="back_button" onClick={go_home}>Back to Home</Button>
      </div>
    </div>
  );
};

export default Licenses;