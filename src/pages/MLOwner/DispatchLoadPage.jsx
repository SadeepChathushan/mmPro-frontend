import React, { useState } from 'react';
import { Layout, Button, Input, Row, Col, Typography, Modal, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { IoIosDoneAll } from 'react-icons/io';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from "../../contexts/LanguageContext";

const { Content } = Layout;
const { Title } = Typography;

const DispatchLoadPage = () => {
  const { language } = useLanguage();
  const [licenseNumber, setLicenseNumber] = useState('');
  const [destination, setDestination] = useState('');
  const [lorryNumber, setLorryNumber] = useState('');
  const [driverContact, setDriverContact] = useState('');
  const [cubes, setCubes] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [location, setLocation] = useState([6.9271, 79.8612]); // Default to Colombo coordinates
  const [locationSuggestions, setLocationSuggestions] = useState([]);

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
      const validSuggestions = response.data.filter(item => {
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);
        return !isNaN(lat) && !isNaN(lon);  // Only keep valid lat/lon values
      });

      setLocationSuggestions(validSuggestions.map(item => ({
        value: item.display_name,
        lat: parseFloat(item.lat),  // Ensure lat is a number
        lon: parseFloat(item.lon)   // Ensure lon is a number
      })));
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setLocationSuggestions([]);
    }
  };

  // Handle selection of a location suggestion
  const handleLocationSelect = (value, option) => {
    const { lat, lon } = option;

    if (isNaN(lat) || isNaN(lon)) {
      console.error('Invalid lat/lon selected:', lat, lon);
      return;
    }

    setLocation([lat, lon]);  // Update the map center
    setDestination(value);     // Set the destination field with the selected location
  };

  const handleLicenseNumberChange = (e) => {
    setLicenseNumber(e.target.value);
  };

  const handleLorryNumberChange = (e) => {
    setLorryNumber(e.target.value);
  };

  const handleDriverContactChange = (e) => {
    setDriverContact(e.target.value);
  };

  const handleCubesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setCubes(value);
    }
  };

  const incrementCubes = () => {
    setCubes(prevCubes => prevCubes + 1);
  };

  const decrementCubes = () => {
    setCubes(prevCubes => (prevCubes > 1 ? prevCubes - 1 : 1));
  };

  const handleSubmit = () => {
    console.log({ licenseNumber, destination, lorryNumber, driverContact, cubes });

    setLicenseNumber('');
    setDestination('');
    setLorryNumber('');
    setDriverContact('');
    setCubes(1);

    setIsModalVisible(true);
  };

  const handlePrintReceipt = () => {
    // Navigate to the "Receipt" page
    navigate('/mlowner/home/dispatchload/receipt');
  };

  const handleBackToHome = () => {
    navigate('/mlowner/home');
  };
  const handleCancel = () => {
    navigate('/mlowner/home');
  };

  const MapViewUpdater = () => {
    const map = useMap();
    map.setView(location, map.getZoom()); // Update the map view to the new location
    return null;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
          {language == "en" ? "Dispatch Your Load Here" : "යැවිය යුතු ප්‍රමාණ පිළිබඳ මෙහි සටහන් කරන්න"}
        </Title>

        {/* License Number Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>{language == "en" ? "LICENSE NUMBER:" : "බලපත්‍ර අංකය:"}</span>
              <Input
                value={licenseNumber}
                onChange={handleLicenseNumberChange}
                style={{ width: '100%' }}
              />
            </div>
          </Col>
        </Row>

        {/* Destination Input with Map Search */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>{language == "en" ? "DESTINATION:" : "ගමනාන්තය"} </span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SearchOutlined style={{ marginRight: '8px' }} />
                <AutoComplete
                  value={destination}
                  onChange={(value) => {
                    setDestination(value);
                    fetchLocationSuggestions(value); // Fetch suggestions on change
                  }}
                  onSelect={handleLocationSelect}
                  style={{ width: '100%' }}
                  options={locationSuggestions.map(item => ({
                    value: item.value,
                    label: item.value
                  }))}>
                </AutoComplete>
              </div>
            </div>
          </Col>
        </Row>

        {/* Map Display */}
        <Row gutter={16}>
          <Col span={24}>
            <div style={{ height: '300px', width: '100%' }}>
              <MapContainer center={location} zoom={10} style={{ height: '100%', width: '100%' }}>
                <MapViewUpdater />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={location}>
                  <Popup>
                    Selected Location: {destination}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </Col>
        </Row>

        {/* Lorry Number Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>{language == "en" ? "LORRY NUMBER:" : "ලොරි අංකය:" }</span>
              <Input
                value={lorryNumber}
                onChange={handleLorryNumberChange}
                style={{ width: '100%' }}
              />
            </div>
          </Col>
        </Row>

        {/* Driver Contact Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>{language == "en" ? "DRIVER CONTACT:" : "රියදුරුගේ දුරකථන අංකය:"}</span>
              <Input
                value={driverContact}
                onChange={handleDriverContactChange}
                style={{ width: '100%' }}
              />
            </div>
          </Col>
        </Row>

        {/* Cubes Input with Increment and Decrement Buttons */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>{language == "en" ? "CUBES:" : "කියුබ් ගණන"}</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  onClick={decrementCubes}
                  style={{ marginRight: '8px' }}
                  disabled={cubes <= 1}
                >
                  -
                </Button>
                <Input
                  value={cubes}
                  onChange={handleCubesChange}
                  style={{ width: '60px', textAlign: 'center' }}
                />
                <Button
                  onClick={incrementCubes}
                  style={{ marginLeft: '8px' }}
                >
                  +
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Submit and Cancel Buttons */}
        <Row gutter={16} justify="center">
          <Col xs={24} sm={24} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              type="primary" 
              onClick={handleCancel}
              danger 
              style={{ 
                marginRight: '16px', 
                fontSize: '16px', 
                padding: '10px 20px', 
                backgroundColor: '#FFA500',  // Cancel button color (orange)
                borderColor: '#FFA500',
                color: 'white' 
              }} 
              size="large"
            >
              {language == "en" ? "Cancel" : "අවලංගු කරන්න"}
            </Button>
            <Button 
              type="primary" 
              onClick={handleSubmit} 
              style={{ 
                fontSize: '16px', 
                padding: '10px 20px', 
                backgroundColor: '#781424',  // Submit button color (dark red)
                borderColor: '#781424',
                color: 'white' 
              }} 
              size="large"
            >
              {language == "en" ? "Submit" : "සටහන් කරන්න"}
            </Button>
          </Col>
        </Row>

        {/* Success Modal */}
        <Modal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          style={{ textAlign: 'center' }}
          bodyStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        >
          <div style={{ fontSize: '40px', color: 'brown' }}>
            <IoIosDoneAll />
          </div>
          <p>{language == "en" ? "Dispatched Successfully!" : "සාර්ථකයි!"}</p>
          <Button 
            type="primary" 
            onClick={handleBackToHome} 
            style={{ backgroundColor: '#FFA500', color: 'white', borderColor: '#FFA500', marginRight: '20px' }}
          >
            {language == "en" ? "Back to Home" : "ආපසු" }
          </Button>

          <Button 
            type="default" 
            onClick={handlePrintReceipt} 
            style={{ backgroundColor: '#781424', color: 'white', marginLeft: '20px' }}
          >
            {language == "en" ? "Print Receipt" : "රිසිට් පත මුද්‍රණය කරන්න"}
          </Button>
        </Modal>

      </Content>
    </Layout>
  );
};

export default DispatchLoadPage;
