import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Input,
  Row,
  Col,
  Typography,
  Modal,
  AutoComplete,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { IoIosDoneAll } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "../../contexts/LanguageContext";

const { Content } = Layout;
const { Title } = Typography;

const DispatchLoadPage = () => {
  const { language } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isErrModalVisible, setIsErrModalVisible] = useState(false);
  const [location, setLocation] = useState([6.9271, 79.8612]); // Default to Colombo coordinates
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    DateTime: "",
    licenseNumber: "",
    destination: "",
    lorryNumber: "",
    driverContact: "",
    cubes: 1,
  });

  const navigate = useNavigate();

  // Fetch location suggestions from Nominatim API, restricted to Sri Lanka
  const fetchLocationSuggestions = async (value) => {
    if (!value) {
      setLocationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&countrycodes=LK&limit=5`
      );

      // Check the API response and ensure lat/lon are valid numbers
      const validSuggestions = response.data.filter((item) => {
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);
        return !isNaN(lat) && !isNaN(lon); // Only keep valid lat/lon values
      });

      setLocationSuggestions(
        validSuggestions.map((item) => ({
          value: item.display_name,
          lat: parseFloat(item.lat), // Ensure lat is a number
          lon: parseFloat(item.lon), // Ensure lon is a number
        }))
      );
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setLocationSuggestions([]);
    }
  };

  // Handle selection of a location suggestion
  const handleLocationSelect = (value, option) => {
    const { lat, lon } = option;

    if (isNaN(lat) || isNaN(lon)) {
      console.error("Invalid lat/lon selected:", lat, lon);
      return;
    }

    setLocation([lat, lon]); // Update the map center
    setFormData({ ...formData, destination: value }); // Set the destination field with the selected location
  };

  const handleLicenseNumberChange = (e) => {
    setFormData({ ...formData, licenseNumber: e.target.value });
  };

  const handleLorryNumberChange = (e) => {
    setFormData({ ...formData, lorryNumber: e.target.value });
  };

  const handleDriverContactChange = (e) => {
    setFormData({ ...formData, driverContact: e.target.value });
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

  const handleSubmit = () => {
    if (
      !formData.licenseNumber.trim() ||
      !formData.destination.trim() ||
      !formData.lorryNumber.trim() ||
      !formData.driverContact.trim()
    ) {
      setIsErrModalVisible(true);
    } else {
      setFormData({ ...formData, DateTime: currentDateTime });
      setFormData({ ...formData }); // Store form data
      console.log(formData);

      setIsModalVisible(true);
    }
  };

  const handlePrintReceipt = () => {
    // Navigate to the "Receipt" page
    navigate("/mlowner/home/dispatchload/receipt", { state: { formData } });
  };

  const handleBackToHome = () => {
    navigate("/mlowner/home");
  };
  const handleCancel = () => {
    navigate("/mlowner/home");
  };

  const MapViewUpdater = () => {
    const map = useMap();
    map.setView(location, map.getZoom()); // Update the map view to the new location
    return null;
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          {language === "en"
            ? "Dispatch Your Load Here"
            : language === "si"
            ? "යැවිය යුතු ප්‍රමාණ පිළිබඳ මෙහි සටහන් කරන්න"
            : "உங்கள் சுமையை இங்கே அனுப்பவும்"}
        </Title>

        {/* Current Date%Time (Read-Only) */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
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
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
                {language === "en"
                  ? "LICENSE NUMBER:"
                  : language === "si"
                  ? "බලපත්‍ර අංකය:"
                  : "உரிம எண்:"}
              </span>
              <Input
                value={formData.licenseNumber}
                onChange={handleLicenseNumberChange}
                style={{ width: "100%" }}
                required
              />
            </div>
          </Col>
        </Row>

        {/* Destination Input with Map Search */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
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
                ></AutoComplete>
              </div>
            </div>
          </Col>
        </Row>

        {/* Map Display */}
        <Row gutter={16}>
          <Col span={24}>
            <div style={{ height: "300px", width: "100%" }}>
              <MapContainer
                center={location}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
              >
                <MapViewUpdater />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={location}>
                  <Popup>Selected Location: {formData.destination}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </Col>
        </Row>

        {/* Lorry Number Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
                {language === "en"
                  ? "LORRY NUMBER:"
                  : language === "si"
                  ? "ලොරි අංකය:"
                  : "லாரி எண்:"}
              </span>
              <Input
                value={formData.lorryNumber}
                onChange={handleLorryNumberChange}
                style={{ width: "100%" }}
              />
            </div>
          </Col>
        </Row>

        {/* Driver Contact Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
                {language === "en"
                  ? "DRIVER CONTACT:"
                  : language === "si"
                  ? "රියදුරුගේ දුරකථන අංකය:"
                  : "ஓட்டுனர் தொடர்பு:"}
              </span>
              <Input
                value={formData.driverContact}
                onChange={handleDriverContactChange}
                style={{ width: "100%" }}
              />
            </div>
          </Col>
        </Row>

        {/* Cubes Input with Increment and Decrement Buttons */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
                {language === "en"
                  ? "CUBES:"
                  : language === "si"
                  ? "කියුබ් ගණන:"
                  : "க்யூப்ஸ்:"}
              </span>
              <div style={{ display: "flex", alignItems: "center" }}>
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
                  style={{ width: "60px", textAlign: "center" }}
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
            md={12}
            lg={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              type="primary"
              onClick={handleCancel}
              danger
              style={{
                marginRight: "16px",
                fontSize: "16px",
                padding: "10px 20px",
                backgroundColor: "#FFA500", // Cancel button color (orange)
                borderColor: "#FFA500",
                color: "white",
              }}
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
              style={{
                fontSize: "16px",
                padding: "10px 20px",
                backgroundColor: "#781424", // Submit button color (dark red)
                borderColor: "#781424",
                color: "white",
              }}
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

        {/* Success Modal */}
        <Modal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          style={{ textAlign: "center" }}
          bodyStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <div style={{ fontSize: "40px", color: "brown" }}>
            <IoIosDoneAll />
          </div>
          <p>
            {language === "en"
              ? "Dispatched Successfully!"
              : language === "si"
              ? "සාර්ථකයි!"
              : "வெற்றிகரமாக அனுப்பப்பட்டது!"}
          </p>
          <Button
            type="primary"
            onClick={handleBackToHome}
            style={{
              backgroundColor: "#FFA500",
              color: "white",
              borderColor: "#FFA500",
              marginRight: "20px",
            }}
          >
            {language === "en"
              ? "Back to Home"
              : language === "si"
              ? "ආපසු"
              : "முகப்புக்குத் திரும்பு"}
          </Button>

          <Button
            type="default"
            onClick={handlePrintReceipt}
            style={{
              backgroundColor: "#781424",
              color: "white",
              marginLeft: "20px",
            }}
          >
            {language === "en"
              ? "Print Receipt"
              : language === "si"
              ? "රිසිට් පත මුද්‍රණය කරන්න"
              : "அச்சு ரசீது"}
          </Button>
        </Modal>

        {/* Error Modal */}
        <Modal
          visible={isErrModalVisible}
          onCancel={() => setIsErrModalVisible(false)}
          footer={null}
          style={{ textAlign: "center" }}
          bodyStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <div style={{ fontSize: "40px", color: "brown" }}>
            <IoIosCloseCircle />
          </div>
          <h3>
            {language === "en"
              ? "All field are required !"
              : language === "si"
              ? "සියලුම ක්ෂේත්ර අවශ්ය වේ !"
              : "அனைத்து துறைகளும் தேவை!"}
          </h3>
        </Modal>
      </Content>
    </Layout>
  );
};

export default DispatchLoadPage;
