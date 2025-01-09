import React from "react";
import { Button, Typography, Layout, Row, Col, notification } from "antd";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const ReceiptPage = () => {
  const navigate = useNavigate();

  const receiptData = {
    lorryNumber: "LE-8595",
    reference: "892426242",
    mlNumber: "IML/01/TEST/5178/LRS",
    mlOwner: "Jayantha",
    mlContact: "0777173789",
    startLocation: "Rathnapura",
    mineralType: "Sand",
    lorryContact: "077723456",
    loadCube: 10,
    destination: "Madampe",
    validity: "01/01/2025 @ 12:55 pm to 01/05/2025 12:55 pm",
    printedDate: "06/01/2025 @ 3:35 pm",
  };

  const handlePrintReceipt = () => {
    const doc = new jsPDF();

    // Set font style for the header
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);

    // Add the logo - center the image on top of the page
    const imageUrl = "https://th.bing.com/th/id/OIP.lXqWzX4gCjamrXtOz172qAHaHa?rs=1&pid=ImgDetMain";
    const imageWidth = 60;
    const imageHeight = 60;
    const pageWidth = doc.internal.pageSize.width;
    const imageX = (pageWidth - imageWidth) / 2; // Center image horizontally
    doc.addImage(imageUrl, 'JPEG', imageX, 10, imageWidth, imageHeight);

    // Add title and contact information
    doc.setFontSize(20);
    doc.text("Geological Survey and Mines Bureau", pageWidth / 2, 80, { align: "center" });
    doc.setFontSize(12);
    doc.text("Contact: 1921 / 011-288 7680", pageWidth / 2, 90, { align: "center" });

    // Add receipt title
    doc.setFontSize(14);
    doc.text("License Owner's Receipt", pageWidth / 2, 100, { align: "center" });

    // Add some space
    doc.setFontSize(12);
    const marginLeft = 20;
    const lineHeight = 10;
    const startY = 110;

    // Receipt details
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

    // Loop through each detail and add it to the PDF
    details.forEach((item, index) => {
      const yPosition = startY + index * (lineHeight + 6);
      doc.text(`${item.label}:`, marginLeft, yPosition);
      doc.setFont('helvetica', 'bold');
      doc.text(`${item.value}`, marginLeft + 80, yPosition);
      doc.setFont('helvetica', 'normal'); // Reset font for the next label
    });

    // Add footer (Optional)
    doc.setFontSize(10);
    doc.text("Thank you for using our services!", pageWidth / 2, 280, { align: "center" });

    // Check if a printer is available
    const isPrinterAvailable = () => {
      return window.matchMedia('print').matches;
    };

    if (isPrinterAvailable()) {
      // Printer detected: open the print dialog
      doc.autoPrint();
      doc.output("dataurlnewwindow"); // Opens the print dialog
    } else {
      // No printer detected: download the PDF
      doc.save("Receipt.pdf");

      // Show a notification that PDF is being downloaded
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

            <p><strong>Lorry Number:</strong> {receiptData.lorryNumber}</p>
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
              style={{ backgroundColor: "#781424", borderColor: "#781424" }}
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
