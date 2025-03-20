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
      const allLicenses = await fetchAllLicense();

      const mappedData = allLicenses.map((license) => ({
        licenseNumber: license["License Number"],
        owner: license["Owner Name"],
        location: license["Location"],
        startDate: license["Start Date"],
        dueDate: license["Due Date"],
        remainingCubes: license["Remaining Cubes"],
        status: license["Status"],
      }));

      setLicenses(mappedData);
      setFilteredLicenses(mappedData); // Initialize filteredLicenses with all licenses
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
        const licenseStartDate = new Date(item.startDate);
        const licenseDueDate = new Date(item.dueDate);

        // Check if the license falls within the selected date range
        const isAfterStartDate = startDate
          ? licenseStartDate >= new Date(startDate)
          : true; // If no start date is selected, include all licenses
        const isBeforeEndDate = endDate
          ? licenseDueDate <= new Date(endDate)
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
            options={licenses.map(({ licenseNumber }) => ({
              value: licenseNumber,
            }))}
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
            onChange={handleStartDateChange}
            placeholder="Start Date"
            style={{ ...datePickerStyle, width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <DatePicker
            onChange={handleEndDateChange}
            placeholder="End Date"
            style={{ ...datePickerStyle, width: "100%" }}
          />
        </Col>
      </Row>

      {/* Display "No Data" if filteredLicenses is empty */}
      {filteredLicenses.length === 0 ? (
        <div className="no-data-container">
          <Empty
            description="No Data Available" // Custom message
            image={Empty.PRESENTED_IMAGE_SIMPLE} // Simple icon
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
                <strong>Owner:</strong> {license.owner}
              </p>
              <p>
                <strong>Location:</strong> {license.location}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {moment(license.startDate).format("YYYY-MM-DD")}
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {moment(license.dueDate).format("YYYY-MM-DD")}
              </p>
              <Space>
                <Link to={`/mlowner/home/dispatchload/${license.licenseNumber}`}>
                  <Button className="dispatch-load-button">Dispatch Load</Button>
                </Link>
                <Link
                  to={`/mlowner/history?licenseNumber=${license.licenseNumber}`}
                >
                  <Button className="history-button1">History</Button>
                </Link>
              </Space>
            </Card>
          ))}
        </div>
      )}

      <div className="back_button_container">
        <Button className="back_button" onClick={go_home}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Licenses;