import { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Input,
  Row,
  Col,
  Typography,
  AutoComplete,
  DatePicker,
  Grid,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import "../../styles/MLOwner/DispatchLoadPage.css";
import {
  fetchIssues,
  updateIssue,
  createIssue,
  get_user,
} from "../../services/MLOService";
import Modals from "./Modals";
import {
  handleDriverContactChange,
  handleLorryNumberChange,
} from "../../utils/MLOUtils/DispatchValidation";
import { message } from "antd";
const { Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const DispatchLoadPage = () => {
  const screens = useBreakpoint();
  const uRLlocation = useLocation();
  const [l_number, setl_number] = useState("");

  useEffect(() => {
    const pathSegments = uRLlocation.pathname.split("/");
    const licenseNumber = pathSegments.slice(-3).join("/");
    setl_number(licenseNumber);

    // Log l_number and related data
    console.log("License Number (l_number):", licenseNumber);
    console.log("Form Data:", formData);
  }, [uRLlocation]);

  const resetFormdata = () => {
    setIsModalVisible(false);
    setFormData({
      DateTime: "",
      licenseNumber: l_number,
      destination: "",
      lorryNumber: "",
      driverContact: "",
      dueDate: "",
      Root1: "",
      Root2: "",
      Root3: "",
      cubes: 1,
    });
  };
  const [driverContactError, setDriverContactError] = useState("");
  const [lorryNumberError, setLorryNumberError] = useState("");
  // const user_Details = JSON.parse(localStorage.getItem("USER")) || {};
  // const userf_name = user_Details.firstname;
  // const userl_name = user_Details.lastname;
  // const user_name = userf_name + " " + userl_name;
  // console.log("User Name", user_name);

  const [number, setLNumber] = useState("");
  const { language } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isErrModalVisible, setIsErrModalVisible] = useState(false);
  const [isProErrModalVisible, setIsProErrModalVisible] = useState(false);
  const [isContErrModalVisible, setIsContErrModalVisible] = useState(false);
  const [isLoyalErrModalVisible, setIsLoyalErrModalVisible] = useState(false);
  const [location, setLocation] = useState([6.9271, 79.8612]); // Default to Colombo coordinates
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [mLId, setmId] = useState("");
  const [formData, setFormData] = useState({
    mining_license_number: "",
    destination: "",
    lorry_number: "",
    driver_contact: "",
    route_01: "",
    route_02: "",
    route_03: "",
    cubes: 1,
  });
  const [previousSearches, setPreviousSearches] = useState([]);
  const navigate = useNavigate();

  // Fetch location suggestions from Nominatim API, restricted to Sri Lanka
  const fetchLocationSuggestions = async (value) => {
    if (!value.trim()) {
      setLocationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}&addressdetails=1&countrycodes=LK&limit=5`
      );

      const validSuggestions = response.data
        .filter((item) => {
          const lat = parseFloat(item.lat);
          const lon = parseFloat(item.lon);
          return !isNaN(lat) && !isNaN(lon); // Only keep valid lat/lon values
        })
        .map((item) => ({
          value: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
        }));

      setLocationSuggestions(validSuggestions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setLocationSuggestions([]);
    }
  };

  // Handle selection of a location suggestion
  const handleLocationSelect = (value, option) => {
    const { lat, lon } = option;

    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      console.error("Invalid lat/lon selected:", lat, lon);
      return;
    }

    setLocation([lat, lon]); // Update the location state
    setFormData((prev) => ({ ...prev, destination: value })); // Update form data

    // Update the previous searches in localStorage
    const updatedSearches = [
      value,
      ...previousSearches.filter((search) => search !== value),
    ].slice(0, 5); // Keep only the last 5 searches

    setPreviousSearches(updatedSearches);
    localStorage.setItem("previousSearches", JSON.stringify(updatedSearches));
  };

  const handleDatetime = (e) => {
    setFormData({ ...formData, DateTime: e.target.value });
  };

  const handleCubesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setFormData({ ...formData, cubes: value });
    }
  };

  const incrementCubes = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      cubes: prevFormData.cubes + 1,
    }));
  };

  const decrementCubes = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      cubes: prevFormData.cubes > 1 ? prevFormData.cubes - 1 : 1,
    }));
  };

  const handleDueDateChange = (date, dateString) => {
    setFormData({ ...formData, dueDate: dateString });
    setIssueData((prevState) => ({
      ...prevState,
      due_date: dateString,
    }));
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      licenseNumber: l_number,
    }));
  }, [l_number]);

  const handleSubmit = async () => {
    try {
      const USER_TOKEN = localStorage.getItem("USER_TOKEN"); // Retrieve the token from localStorage
      if (!USER_TOKEN) {
        console.error("User token not found in localStorage");
        return;
      }

      // Send the POST request with token in the authorization header
      const response = await axios.post(
        "http://127.0.0.1:5000/mining-owner/create-tpl",
        {
          mining_license_number: l_number,
          destination: formData.destination,
          lorry_number: formData.lorryNumber,
          driver_contact: formData.driverContact,
          route_01: formData.Root1,
          route_02: formData.Root2,
          route_03: formData.Root3,
          cubes: formData.cubes,
        },
        {
          headers: {
            Authorization: `Bearer ${USER_TOKEN}`,
          },
        }
      );

      console.log("Response:", response.data);

      setIsModalVisible(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Insufficient remaining cubes"
      ) {
        setIsContErrModalVisible(true);
      } else {
        message.error("Failed to submit data.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrintReceipt = () => {
    navigate("/mlowner/home/dispatchload/receipt", {
      state: { formData, l_number },
    });
  };

  const handleBackToHome = () => {
    navigate("/mlowner/home");
  };

  const handleCancel = () => {
    navigate("/mlowner/home");
  };

  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString(); // Formats: "MM/DD/YYYY, HH:MM:SS AM/PM"
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime(); // Call initially

    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  //validations for dispatch load form
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Use a regular expression to allow only alphanumeric characters and '/'
    const isValid = /^[a-zA-Z0-9/]*$/.test(value);
    if (isValid) {
      setLNumber(value);
    }
  };

  return (
    <Layout className="dispatch-load-container">
      <Content style={{ padding: screens.xs ? "16px" : "24px" }}>
        <Title
          level={3}
          className="page-title"
          style={{ fontSize: screens.xs ? "1.5rem" : "1.75rem" }}
        >
          {language === "en"
            ? "Dispatch Your Load Here"
            : language === "si"
            ? "යැවිය යුතු ප්‍රමාණ පිළිබඳ මෙහි සටහන් කරන්න"
            : "உங்கள் சுமையை இங்கே அனுப்பவும்"}
        </Title>

        {/* Date and Time Input */}
        <Row gutter={screens.xs ? [16, 8] : [16, 16]}>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="form-field">
              <span className="field-label">
                {language === "en"
                  ? "DATE & TIME:"
                  : language === "si"
                  ? "දිනය සහ වේලාව:"
                  : "தேதி & நேரம்:"}
              </span>
              <Input
                value={currentDateTime}
                onChange={handleDatetime}
                disabled
                className={screens.xs ? "mobile-input" : ""}
              />
            </div>
          </Col>

          {/* License Number Input */}
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="form-field">
              <span className="field-label">
                {language === "en"
                  ? "LICENSE NUMBER:"
                  : language === "si"
                  ? "බලපත්‍ර අංකය:"
                  : "உரிம எண்:"}
              </span>
              <Input
                value={l_number}
                onChange={handleInputChange}
                className={`text-input ${screens.xs ? "mobile-input" : ""}`}
                required
              />
            </div>
          </Col>

          {/* Destination Input with Search Options */}
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="form-field">
              <span className="field-label">
                {language === "en"
                  ? "DESTINATION:"
                  : language === "si"
                  ? "ගමනාන්තය:"
                  : "சேருமிடம்:"}
              </span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <SearchOutlined
                  style={{
                    marginRight: screens.xs ? "4px" : "8px",
                    fontSize: screens.xs ? "14px" : "16px",
                  }}
                />
                <AutoComplete
                  value={formData.destination}
                  onChange={(value) => {
                    setFormData({ ...formData, destination: value });
                    fetchLocationSuggestions(value); // Fetch suggestions on change
                  }}
                  onSelect={handleLocationSelect}
                  style={{ width: "100%" }}
                  options={locationSuggestions.map((item) => ({
                    value: item.value,
                    label: item.value,
                  }))}
                  className={screens.xs ? "mobile-input" : ""}
                >
                  <AutoComplete.Option
                    value={formData.destination}
                    key={formData.destination}
                  >
                    {formData.destination}
                  </AutoComplete.Option>
                </AutoComplete>
              </div>
            </div>
          </Col>

          {/* Lorry Number Input */}
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="form-field">
              <span className="field-label">
                {language === "en"
                  ? "LORRY NUMBER:"
                  : language === "si"
                  ? "ලොරිය අංකය:"
                  : "லொறி எண்:"}
              </span>
              <Input
                value={formData.lorryNumber}
                onChange={(e) =>
                  handleLorryNumberChange(
                    e,
                    formData,
                    setFormData,
                    setLorryNumberError
                  )
                }
                required
                className={screens.xs ? "mobile-input" : ""}
              />
              {lorryNumberError && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {lorryNumberError}
                </div>
              )}
            </div>
          </Col>

          {/* Driver Contact Input */}
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="form-field">
              <span className="field-label">
                {language === "en"
                  ? "DRIVER CONTACT:"
                  : language === "si"
                  ? "රියදුරු සම්බන්ධතා:"
                  : "இயக்குநர் தொடர்பு:"}
              </span>
              <Input
                value={formData.driverContact}
                onChange={(e) =>
                  handleDriverContactChange(
                    e,
                    formData,
                    setFormData,
                    setDriverContactError
                  )
                }
                required
                className={screens.xs ? "mobile-input" : ""}
              />
              {driverContactError && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {driverContactError}
                </div>
              )}
            </div>
          </Col>

          {/* Routes */}
          {[1, 2, 3].map((routeNum) => (
            <Col xs={24} sm={24} md={16} lg={16} key={`route-${routeNum}`}>
              <div className="form-field">
                <span className="field-label">
                  {language === "en"
                    ? `ROUTE ${routeNum}:`
                    : language === "si"
                    ? `මාර්ගය ${routeNum}:`
                    : `வழி ${routeNum}:`}
                </span>
                <Input
                  value={formData[`Root${routeNum}`]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [`Root${routeNum}`]: e.target.value,
                    })
                  }
                  className={screens.xs ? "mobile-input" : ""}
                />
              </div>
            </Col>
          ))}

          {/* Cubes Input with Increment and Decrement Buttons */}
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="form-field">
              <span className="field-label">
                {language === "en"
                  ? "CUBES:"
                  : language === "si"
                  ? "කියුබ් ගණන:"
                  : "க்யூப்ஸ்:"}
              </span>
              <div className="cubes-input-container">
                <Button
                  onClick={decrementCubes}
                  style={{
                    marginRight: screens.xs ? "4px" : "8px",
                    minWidth: screens.xs ? "32px" : "auto",
                  }}
                  disabled={formData.cubes <= 1}
                >
                  -
                </Button>
                <Input
                  value={formData.cubes}
                  onChange={handleCubesChange}
                  className={`cubes-input ${screens.xs ? "mobile-input" : ""}`}
                  style={{ width: screens.xs ? "50px" : "60px" }}
                />
                <Button
                  onClick={incrementCubes}
                  style={{
                    marginLeft: screens.xs ? "4px" : "8px",
                    minWidth: screens.xs ? "32px" : "auto",
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Submit and Cancel Buttons */}
        {/* Submit and Cancel Buttons */}
        <Row
          gutter={screens.xs ? 8 : 16}
          justify="center"
          align="middle"
          style={{
            marginTop: screens.xs ? "16px" : "24px",
            width: "100%",
          }}
        >
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={8}
            style={{
              padding: screens.xs ? "0 4px" : "0 8px",
              marginBottom: screens.xs ? "8px" : "0",
            }}
          >
            <Button
              type="primary"
              onClick={handleCancel}
              className="form-action-button cancel-button"
              size="large"
              block
              style={{
                height: "40px",
                fontSize: "16px",
                borderRadius: "4px",
              }}
            >
              {language === "en"
                ? "Cancel"
                : language === "si"
                ? "අවලංගු කරන්න"
                : "ரத்து செய்"}
            </Button>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={8}
            style={{
              padding: screens.xs ? "0 4px" : "0 8px",
              marginBottom: screens.xs ? "8px" : "0",
            }}
          >
            <Button
              type="primary"
              onClick={handleSubmit}
              className="form-action-button submit-button"
              size="large"
              block
              style={{
                height: "40px",
                fontSize: "16px",
                borderRadius: "4px",
              }}
            >
              {language === "en"
                ? "Submit"
                : language === "si"
                ? "සටහන් කරන්න"
                : "சமர்ப்பிக்கவும்"}
            </Button>
          </Col>
        </Row>
        <div>
          <Modals
            isModalVisible={isModalVisible}
            resetFormdata={resetFormdata}
            handleBackToHome={handleBackToHome}
            handlePrintReceipt={handlePrintReceipt}
            language={language}
            isProErrModalVisible={isProErrModalVisible}
            setIsProErrModalVisible={setIsProErrModalVisible}
            isErrModalVisible={isErrModalVisible}
            setIsErrModalVisible={setIsErrModalVisible}
            isContErrModalVisible={isContErrModalVisible}
            setIsContErrModalVisible={setIsContErrModalVisible}
            isLoyalErrModalVisible={isLoyalErrModalVisible}
            setIsLoyalErrModalVisible={setIsLoyalErrModalVisible}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default DispatchLoadPage;
