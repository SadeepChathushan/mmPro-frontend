import React, { useState } from 'react';
import { Layout, Button, Input, Row, Col, Typography, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { jsPDF } from 'jspdf';  // Import jsPDF

const { Content } = Layout; // Import Content from Layout
const { Title } = Typography;

const DispatchLoadPage = () => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [destination, setDestination] = useState('');
  const [lorryNumber, setLorryNumber] = useState('');
  const [driverContact, setDriverContact] = useState('');
  const [cubes, setCubes] = useState(1);  // Default cubes value set to 1

  // State for controlling modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLicenseNumberChange = (e) => {
    setLicenseNumber(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
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
    setCubes(prevCubes => prevCubes + 1);  // Increment cubes by 1
  };

  const decrementCubes = () => {
    setCubes(prevCubes => (prevCubes > 1 ? prevCubes - 1 : 1));  // Decrement cubes but not below 1
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log({ licenseNumber, destination, lorryNumber, driverContact, cubes });

    // Clear form fields after submission
    setLicenseNumber('');
    setDestination('');
    setLorryNumber('');
    setDriverContact('');
    setCubes(1);  // Reset cubes to 1 after submission

    // Open the success modal after submission
    setIsModalVisible(true);
  };

  const handlePrintReceipt = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set up the content of the receipt
    doc.setFontSize(16);
    doc.text('Dispatch Receipt', 20, 20);

    doc.setFontSize(12);
    doc.text(`License Number: ${licenseNumber}`, 20, 40);
    doc.text(`Destination: ${destination}`, 20, 50);
    doc.text(`Lorry Number: ${lorryNumber}`, 20, 60);
    doc.text(`Driver Contact: ${driverContact}`, 20, 70);
    doc.text(`Cubes: ${cubes}`, 20, 80);

    // Save the generated PDF with the name "receipt.pdf"
    doc.save('receipt.pdf');
  };

  const handleBackToHome = () => {
    navigate('/mlowner/home'); // Absolute path to the correct route
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px' }}>
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

        {/* Destination Input */}
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>DESTINATION:</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SearchOutlined style={{ marginRight: '8px' }} />
                <Input
                  value={destination}
                  onChange={handleDestinationChange}
                  style={{ width: '100%' }}
                />
              </div>
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
                  disabled={cubes <= 1}  // Disable decrement if cubes <= 1
                >
                  -
                </Button>
                <Input
                  value={cubes}
                  onChange={handleCubesChange}
                  style={{ width: '60px', textAlign: 'center' }}  // Adjust width for better display
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
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Button type="primary" danger style={{ marginRight: '16px' }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>

        {/* Success Modal */}
        <Modal
          title="Success"
          visible={isModalVisible}  // Controls visibility of the modal
          onCancel={() => setIsModalVisible(false)}  // Close the modal when the user clicks outside
          footer={null}  // Remove default footer buttons
          style={{ textAlign: 'center' }}
          bodyStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}  // Faded background effect
        >
          <p>Dispatched Successfully!</p>
          <Button type="default" onClick={handlePrintReceipt} style={{ marginRight: '10px' }}>
            Print Receipt
          </Button>
          <Button type="primary" onClick={handleBackToHome}>
            Back to Home
          </Button>
        </Modal>

      </Content>
    </Layout>
  );
};

export default DispatchLoadPage;
