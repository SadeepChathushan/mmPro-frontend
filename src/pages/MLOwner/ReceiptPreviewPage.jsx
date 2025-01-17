import React from "react";
import { Button, Typography, Layout, Row, Col, notification } from "antd";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './ReceiptPage.css';  // Add this line at the top of your file


const { Content } = Layout;
const { Title } = Typography;

const ReceiptPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const formData = location.state?.formData || []; 
  console.log("re",formData);

  const receiptData = {
    lorryNumber: formData.lorryNumber,
    reference: "892426242",
    mlNumber: "IML/01/TEST/5178/LRS",
    mlOwner: "Jayantha",
    mlContact: "0777173789",
    startLocation: "Rathnapura",
    mineralType: "Sand",
    lorryContact: formData.lorryNumber,
    loadCube: formData.cubes,
    destination: formData.destination,
    validity: "01/01/2025 @ 12:55 pm to 01/05/2025 12:55 pm",
    printedDate: "06/01/2025 @ 3:35 pm",
  };

  const handlePrintReceipt = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const marginLeft = 20;
    const lineHeight = 8; // Reduced line height for compact spacing
  
    // Mock data or fallback values for missing fields
    const receiptData = {
      lorryNumber: formData.lorryNumber,
      reference: "892426242",
      mlNumber: "IML/01/TEST/5178/LRS",
      mlOwner: "Jayantha",
      mlContact: "0777173789",
      startLocation: "Rathnapura",
      mineralType: "Sand",
      lorryContact: formData.lorryNumber,
      loadCube: formData.cubes,
      destination: formData.destination,
      validity: "01/01/2025 @ 12:55 pm to 01/05/2025 12:55 pm",
      printedDate: "06/01/2025 @ 3:35 pm",
    };
  
    // Helper function to add text with proper alignment
    const addText = (text, x, y, size = 12, bold = false, align = 'left') => {
      doc.setFontSize(size);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.text(text, x, y, { align });
    };
  
    // Add Logo
    const logoUrl = "https://th.bing.com/th/id/OIP.lXqWzX4gCjamrXtOz172qAHaHa?rs=1&pid=ImgDetMain";
    const logoSize = 40;
    const logoX = (pageWidth - logoSize) / 2;
    doc.addImage(logoUrl, 'JPEG', logoX, 10, logoSize, logoSize);
  
    // Title and Contact Info
    addText("Geological Survey and Mines Bureau", pageWidth / 2, 55, 16, true, 'center');
    addText("Contact: 1921 / 011-288 7680", pageWidth / 2, 65, 12, false, 'center');
  
    // Line separator after contact info
    doc.setDrawColor(0, 0, 0);
    doc.line(marginLeft, 70, pageWidth - marginLeft, 70);
  
    // Receipt Title
    addText("License Owner's Receipt", pageWidth / 2, 80, 14, true, 'center');
  
    // Receipt Details
    const startY = 90;
    const details = [
      { label: "Lorry Number", value: receiptData.lorryNumber },
      { label: "Reference", value: receiptData.reference },
      { label: "ML Number", value: receiptData.mlNumber },
      { label: "ML Owner", value: receiptData.mlOwner },
      { label: "ML Contact", value: receiptData.mlContact },
      { label: "Start Location", value: receiptData.startLocation },
      { label: "Mineral Type", value: receiptData.mineralType },
      { label: "Lorry Contact", value: receiptData.lorryContact },
      { label: "Load (Cube)", value: receiptData.loadCube },
      { label: "Destination", value: receiptData.destination },
      { label: "Validity", value: receiptData.validity },
      { label: "Printed Date", value: receiptData.printedDate },
    ];
  
    details.forEach((item, index) => {
      const yPosition = startY + index * (lineHeight + 5); // Adjusted spacing
      addText(`${item.label}:`, marginLeft, yPosition, 12, true);
      addText(item.value, marginLeft + 60, yPosition, 12);
    });
  
    // Footer Content
    const footerY = doc.internal.pageSize.height - 20; // Adjusted footer position
    addText("Thank you for using our services!", pageWidth / 2, footerY, 10, true, 'center');
    doc.line(marginLeft, footerY - 5, pageWidth - marginLeft, footerY - 5);
  
    // Copyright Text
    addText("© 2025 Geological Survey and Mines Bureau. All rights reserved.", pageWidth / 2, footerY + 5, 8, false, 'center');
  
    // Check if printer is available
    const isPrinterAvailable = () => window.matchMedia('print').matches;
  
    if (isPrinterAvailable()) {
      doc.autoPrint(); // Automatically open print dialog
      doc.output("dataurlnewwindow");
    } else {
      doc.save(`${receiptData.lorryContact}.pdf`);

      notification.info({
        message: 'No printer detected',
        description: 'The receipt will be downloaded as a PDF.',
      });
    }
  };
  
  const handleBackToHome = () => {
    navigate("/mlowner/home");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={18} md={12} lg={10} xl={8}>
            <Title level={3} style={{ textAlign: "center" }}>
              Print or Save Your Receipt
            </Title>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24} sm={18} md={12} lg={10} xl={8} style={{ border: "1px solid #d9d9d9", padding: "20px" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src="https://th.bing.com/th/id/OIP.lXqWzX4gCjamrXtOz172qAHaHa?rs=1&pid=ImgDetMain"
                alt="Logo"
                style={{ borderRadius: "50%", width: "60px", height: "60px" }} // Set the image size to 60x60px
              />
            </div>

            <p><strong>Lorry Number:</strong> {formData.lorryNumber}</p>
            <p><strong>Reference:</strong> {receiptData.reference}</p>
            <p><strong>ML Number:</strong> {receiptData.mlNumber}</p>
            <p><strong>ML Owner:</strong> {receiptData.mlOwner}</p>
            <p><strong>ML Contact:</strong> {receiptData.mlContact}</p>
            <p><strong>Start Location:</strong> {receiptData.startLocation}</p>
            <p><strong>Mineral Type:</strong> {receiptData.mineralType}</p>
            <p><strong>Lorry Contact:</strong> {receiptData.lorryContact}</p>
            <p><strong>Load (Cube):</strong> {receiptData.loadCube}</p>
            <p><strong>Destination:</strong> {receiptData.destination}</p>
            <p><strong>Validity:</strong> {receiptData.validity}</p>
            <p><strong>Printed Date:</strong> {receiptData.printedDate}</p>
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col>
            <Button
              onClick={handleBackToHome}
              style={{ marginRight: "10px", backgroundColor: "#FFA500", borderColor: "#FFA500" }}
            >
              Back to Home
            </Button>
            <Button
  type="primary"
  onClick={handlePrintReceipt}
  className="glitter-button"  // Apply the glitter button class
>
  Print Receipt
</Button>

          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ReceiptPage;
