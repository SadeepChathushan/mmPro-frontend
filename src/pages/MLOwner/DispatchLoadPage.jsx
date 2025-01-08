  import React, { useState } from 'react';
  import { Layout, Button, Input, Row, Col, Typography, Modal, AutoComplete } from 'antd';
  import { SearchOutlined } from '@ant-design/icons';
  import { useNavigate } from 'react-router-dom';
  import { jsPDF } from 'jspdf';
  import { IoIosDoneAll } from 'react-icons/io';
  import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
  import axios from 'axios';
  import 'leaflet/dist/leaflet.css';

  const { Content } = Layout;
  const { Title } = Typography;

  const DispatchLoadPage = () => {
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
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text('Dispatch Receipt', 20, 20);

      doc.setFontSize(12);
      doc.text(`License Number: ${licenseNumber}`, 20, 40);
      doc.text(`Destination: ${destination}`, 20, 50);
      doc.text(`Lorry Number: ${lorryNumber}`, 20, 60);
      doc.text(`Driver Contact: ${driverContact}`, 20, 70);
      doc.text(`Cubes: ${cubes}`, 20, 80);

      doc.save('receipt.pdf');
    };

    const handleBackToHome = () => {
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
          {/* Image centered over the title */}
          <img 
            src="https://th.bing.com/th/id/OIP.lXqWzX4gCjamrXtOz172qAHaHa?rs=1&pid=ImgDetMain" 
            alt="Logo" 
            style={{
              width: '80px', 
              height: '80px', 
              borderRadius: '50%',  // Round effect for the image
              display: 'block', 
              margin: '0 auto',  // Center the image horizontally
              marginBottom: '20px'  // Add margin below for spacing
            }} 
          />

          <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Dispatch Your Load Here
          </Title>

          {/* License Number Input */}
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontWeight: 'bold' }}>LICENSE NUMBER:</span>
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
                <span style={{ fontWeight: 'bold' }}>DESTINATION:</span>
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
                <span style={{ fontWeight: 'bold' }}>LORRY NUMBER:</span>
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
                <span style={{ fontWeight: 'bold' }}>DRIVER CONTACT:</span>
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
                <span style={{ fontWeight: 'bold' }}>CUBES:</span>
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
        danger 
        style={{ marginRight: '16px', fontSize: '16px', padding: '10px 20px' }} 
        size="large"
      >
        Cancel
      </Button>
      <Button 
        type="primary" 
        onClick={handleSubmit} 
        style={{ fontSize: '16px', padding: '10px 20px' }} 
        size="large"
      >
        Submit
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
            <p>Dispatched Successfully!</p>
            <Button 
  type="primary" 
  onClick={handleBackToHome} 
  style={{ backgroundColor: '#FFA500', color: 'white', borderColor: '#FFA500', marginRight: '20px' }}
>
  Back to Home
</Button>

<Button 
  type="default" 
  onClick={handlePrintReceipt} 
  style={{ backgroundColor: '#781424', color: 'white', marginLeft: '20px' }}
>
  Print Receipt
</Button>


            
          </Modal>

        </Content>
      </Layout>
    );
  };

  export default DispatchLoadPage;
