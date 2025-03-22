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
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import "../../styles/MLOwner/DispatchLoadPage.css";
import { fetchIssues, updateIssue, createIssue, get_user } from '../../services/MLOService';
import Modals from "./Modals";
import { handleDriverContactChange, handleLorryNumberChange } from '../../utils//MLOUtils/DispatchValidation';
const { Content } = Layout;
const { Title } = Typography;

const DispatchLoadPage = () => {
  const uRLlocation = useLocation();
  const [l_number, setl_number] = useState("");

  useEffect(() => {
    const pathSegments = uRLlocation.pathname.split("/");
    setl_number(pathSegments.slice(-3).join("/"));
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
  const [driverContactError, setDriverContactError] = useState('');
  const [lorryNumberError, setLorryNumberError] = useState('');
  const user_Details = JSON.parse(localStorage.getItem("USER")) || {};
  const apiKey = localStorage.getItem("API_Key");
  console.log("user", user_Details.lastname);
  console.log("mee", apiKey);
  const userf_name = user_Details.firstname;
  const userl_name = user_Details.lastname;
  const user_name = userf_name + " " + userl_name;
  console.log("mee", user_name);

  const [number, setLNumber] = useState("");
  const { language } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isErrModalVisible, setIsErrModalVisible] = useState(false);
  const [isProErrModalVisible, setIsProErrModalVisible] = useState(false);
  const [isContErrModalVisible, setIsContErrModalVisible] = useState(false);
  const [isLoyalErrModalVisible, setIsLoyalErrModalVisible] = useState(false);
  const [location, setLocation] = useState([6.9271, 79.8612]); // Default to Colombo coordinates
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  // const [mLId, setmId] = useState("");
  const [formData, setFormData] = useState({
    DateTime: "",
    licenseNumber: "",
    destination: "",
    lorryNumber: "",
    driverContact: "",
    dueDate: "",
    cubes: 1,
  });
  const [previousSearches, setPreviousSearches] = useState([]);
  const [issueData, setIssueData] = useState({
    project_id: 31,
    tracker_id: 8,
    status_id: 47,
    assigned_to_id: "",
    subject: "TPL", //TPL0004
    due_date: "",
    estimated_hours: 24.0,
    custom_fields: [
      {
        id: 2,
        name: "Owner Name",
        value: "",
      },
      {
        id: 8,
        name: "License Number",
        value: "",
      },
      {
        id: 11,
        name: "Location",
        value: "",
      },
      {
        id: 12,
        name: "Destination",
        value: "",
      },
      {
        id: 13,
        name: "Lorry Number",
        value: "",
      },
      {
        id: 14,
        name: "Driver Contact",
        value: "",
      },
      {
        id: 15,
        name: "Cubes",
        value: "",
      },
      {
        id: 16,
        name: "Root1",
        value: "",
      },
      {
        id: 17,
        name: "Root2",
        value: "",
      },
      {
        id: 18,
        name: "Root3",
        value: "",
      },
    ],
  });

  const navigate = useNavigate();

  // Load previous searches from localStorage when component mounts
  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
    setPreviousSearches(savedSearches);
  }, []);

  // Fetch location suggestions from Nominatim API, restricted to Sri Lanka
  const fetchLocationSuggestions = async (value) => {
    if (!value.trim()) { // Ensure value is not empty or just spaces
      setLocationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&addressdetails=1&countrycodes=LK&limit=5`
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

  const handleSubmit = async (event) => {
    console.log("entered");
    event.preventDefault();

    // Trim the values before validation
    setIssueData({
      ...issueData,
      due_date: formData.dueDate, // Assign the new due_date value
    });

    // Log form data to check values
    console.log("Form data on submit:", formData);

    if (
      !formData.licenseNumber.trim() ||
      !formData.destination.trim() ||
      !formData.lorryNumber.trim() ||
      !formData.driverContact.trim() ||
      !formData.dueDate.trim()
    ) {
      // Log if validation fails
      console.log("One or more fields are empty!");
      setIsErrModalVisible(true);
      return;
    }

    try {
      // Fetch issues using the service
      const issues = await fetchIssues();
      console.log("Issues:", issues);

      const issueToUpdate = issues.find((issue) => issue.subject === formData.licenseNumber);
      console.log("Issue to update:", issueToUpdate);

      if (issueToUpdate) {
        // get user details
        const userData = await get_user();
        console.log("userdata", userData.id)

        // Find custom fields and perform necessary calculations
        const usedField = issueToUpdate.custom_fields.find((field) => field.name === "Used") || 0;
        const remainingField = issueToUpdate.custom_fields.find((field) => field.name === "Remaining");
        const royaltysanddueField = issueToUpdate.custom_fields.find((field) => field.name === "Royalty(sand)due");
        const locateField = issueToUpdate.custom_fields.find((field) => field.name === "Location");

        // Handle new field updates
        const cubesUsed = parseInt(formData.cubes, 10);
        const usedValue = parseInt(usedField ? usedField.value : "0", 10);
        const remainingValue = parseInt(remainingField ? remainingField.value : "0", 10);
        const royaltysanddueValue = parseInt(royaltysanddueField ? royaltysanddueField.value : "0", 10);

        // console.log("Cubes used:", cubesUsed);
        // console.log("Used value:", usedValue);
        // console.log("Remaining value:", remainingValue);

        // Update fields
        usedField.value = (usedValue + cubesUsed).toString();
        remainingField.value = (remainingValue - cubesUsed).toString();
        royaltysanddueField.value = (royaltysanddueValue - cubesUsed * 100).toString();

        console.log("Updated fields:", usedField, remainingField);

        // Create tpl details
        const tplLocationField = issueData.custom_fields.find((field) => field.name === "Location");
        const tplDestinationField = issueData.custom_fields.find((field) => field.name === "Destination") || 0;
        const tplLorrynumberField = issueData.custom_fields.find((field) => field.name === "Lorry Number");
        const tplDrivercontactField = issueData.custom_fields.find((field) => field.name === "Driver Contact");
        const tplCubeField = issueData.custom_fields.find((field) => field.name === "Cubes");
        const tplL_numberField = issueData.custom_fields.find((field) => field.name === "License Number");
        const tplO_nameField = issueData.custom_fields.find((field) => field.name === "Owner Name");
        const tplRoot1Field = issueData.custom_fields.find((field) => field.name === "Root1");
        const tplRoot2Field = issueData.custom_fields.find((field) => field.name === "Root2");
        const tplRoot3Field = issueData.custom_fields.find((field) => field.name === "Root3");


        // set data to Create tpl 
        tplLocationField.value = (locateField.value).toString();
        tplDestinationField.value = (formData.destination).toString();
        tplLorrynumberField.value = (formData.lorryNumber).toString();
        tplDrivercontactField.value = (formData.driverContact).toString();
        tplCubeField.value = (formData.cubes).toString();
        const userName = userData.firstname + " " + userData.lastname;
        tplO_nameField.value = (userName).toString();
        issueData.due_date = formData.dueDate;
        issueData.assigned_to_id = userData.id;
        tplL_numberField.value = (formData.licenseNumber).toString();
        tplRoot1Field.value = (formData.Root1).toString();
        tplRoot2Field.value = (formData.Root2).toString();
        tplRoot3Field.value = (formData.Root3).toString();

        console.log("issue:", issueData);

        // Check for errors before updating the issue
        if (royaltysanddueValue < 1000) {
          setIsLoyalErrModalVisible(true);
        } else if (cubesUsed > remainingValue) {
          setIsContErrModalVisible(true);
        } else {
          // Update the issue using the service function
          const updatedIssue = { ...issueToUpdate, custom_fields: issueToUpdate.custom_fields };
          console.log("Updated issue: id", issueToUpdate.id);
          await updateIssue(issueToUpdate.id, updatedIssue);

          // Create a new issue if necessary
          console.log("issueData", issueData);
          await createIssue(issueData);

          setIsModalVisible(true); // Show success modal if the issue is updated successfully
        }
      } else {
        console.error("Issue not found for license number", formData.licenseNumber);
        setIsProErrModalVisible(true); // Show error modal if the issue is not found
      }
    } catch (error) {
      console.error("Error processing issue:", error);
      setIsProErrModalVisible(true); // Show error modal on any API request failure
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

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const licenseNumber = queryParams.get("licenseNumber"); // Adjust the key if needed
  //   if (licenseNumber) {
  //     setFormData((prevData) => ({ ...prevData, licenseNumber }));
  //   }
  // }, [location.search]);

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
      <Content style={{ padding: "24px" }}>
        <Title level={3} className="page-title">
          {language === "en"
            ? "Dispatch Your Load Here"
            : language === "si"
            ? "යැවිය යුතු ප්‍රමාණ පිළිබඳ මෙහි සටහන් කරන්න"
            : "உங்கள் சுமையை இங்கே அனுப்பவும்"}
        </Title>

        {/* Date and Time Input */}
        <Row gutter={16}>
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
              />
            </div>
          </Col>
        </Row>

        {/* License Number Input */}
        <Row gutter={16}>
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
                style={{ width: "100%" }}
                required
              />
            </div>
          </Col>
        </Row>

        {/* Destination Input with Search Options */}
        <Row gutter={16}>
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
                <SearchOutlined style={{ marginRight: "8px" }} />
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
        </Row>

        {/* Lorry Number Input */}
        <Row gutter={16}>
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
                  handleLorryNumberChange(e, formData, setFormData, setLorryNumberError)
                }
                required
              />
              {lorryNumberError && (
                <div style={{ color: "red", fontSize: "12px" }}>{lorryNumberError}</div>
              )}
            </div>
          </Col>
        </Row>

        {/* Driver Contact Input */}
        <Row gutter={16}>
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
                  handleDriverContactChange(e, formData, setFormData, setDriverContactError)
                }
                required
              />
              {driverContactError && (
                <div style={{ color: "red", fontSize: "12px" }}>{driverContactError}</div>
              )}
            </div>
          </Col>
        </Row>

        {/* Due Date Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="form-field">
              <span className="field-label">
                {language === "en"
                  ? "DUE DATE:"
                  : language === "si"
                  ? "නියමිත දිනය:"
                  : "இறுதி தேதி:"}
              </span>
              <DatePicker
                value={formData.dueDate ? dayjs(formData.dueDate) : null}
                onChange={(date, dateString) => {
                  handleDueDateChange(date, dateString);
                }}
                style={{ width: "100%" }}
                required
              />
            </div>
          </Col>
        </Row>

        {/* Root1 Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="form-field">
              <span className="field-label">
                {language === "en"
                  ? "ROOT 1:"
                  : language === "si"
                  ? "මාර්ගය 1:"
                  : "வழி 1:"}
              </span>
              <Input
                value={formData.Root1}
                onChange={(e) => setFormData({ ...formData, Root1: e.target.value })}
              />
            </div>
          </Col>
        </Row>

        {/* Root2 Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="form-field">
              <span className="field-label">
                {language === "en"
                  ? "ROOT 2:"
                  : language === "si"
                  ? "මාර්ගය 2:"
                  : "வழி 2:"}
              </span>
              <Input
                value={formData.Root2}
                onChange={(e) => setFormData({ ...formData, Root2: e.target.value })}
              />
            </div>
          </Col>
        </Row>

        {/* Root3 Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="form-field">
              <span className="field-label">
                {language === "en"
                  ? "ROOT 3:"
                  : language === "si"
                  ? "මාර්ගය 3:"
                  : "வழி 3:"}
              </span>
              <Input
                value={formData.Root3}
                onChange={(e) => setFormData({ ...formData, Root3: e.target.value })}
              />
            </div>
          </Col>
        </Row>

        {/* Cubes Input with Increment and Decrement Buttons */}
        <Row gutter={16}>
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
                  style={{ marginRight: "8px" }}
                  disabled={formData.cubes <= 1}
                >
                  -
                </Button>
                <Input
                  value={formData.cubes}
                  onChange={handleCubesChange}
                  className="cubes-input"
                />
                <Button onClick={incrementCubes} style={{ marginLeft: "8px" }}>
                  +
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Submit and Cancel Buttons */}
        <Row gutter={16} justify="center">
          <Col
            xs={24}
            sm={24}
            md={16}
            lg={16}
            className="button-container"
          >
            <Button
              type="primary"
              onClick={handleCancel}
              danger
              className="cancel-button"
              size="large"
            >
              {language === "en"
                ? "Cancel"
                : language === "si"
                ? "අවලංගු කරන්න"
                : "ரத்து செய்"}
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              className="submit-button"
              size="large"
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