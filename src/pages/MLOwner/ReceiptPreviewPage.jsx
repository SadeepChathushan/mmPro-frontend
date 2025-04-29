import React, { useState, useEffect } from "react";
import { Button, Typography, Layout, Row, Col, notification } from "antd";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../../styles/MLOwner/ReceiptPage.css"; // Add this line at the top of your file
import axios from "axios";
import { useLanguage } from "../../contexts/LanguageContext";
import { fetchMLData } from "../../services/MLOService";

const { Content } = Layout;
const { Title } = Typography;

const ReceiptPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [mldata, setmlData] = useState(null);
  const location = useLocation();
  const { formData, l_number } = location.state || {}; // Ensure fallback to avoid undefined errors

  useEffect(() => {
    if (l_number) {
      fetchMLData(l_number)
        .then((data) => setmlData(data))
        .catch((error) => console.error("Error fetching ML data:", error));
    }
  }, [l_number]);

  /**
   useEffect(() => {
    if (l_number) {
      fetchMLData(l_number)
        .then((data) => setmlData(data))
        .catch((error) => console.error("Error fetching ML data:", error));
    }
  }, [l_number]);
   */

  // Ensure mldata and mldata.custom_fields exist before accessing
  console.log("dataaaa", mldata);
  const mlcontact = mldata?.custom_fields?.find(
    (field) => field.name === "Mobile Number"
  ) || { value: "N/A" }; // Provide a default value if not found
  const mllocation = mldata?.custom_fields?.find(
    (field) => field.name === "Grama Niladhari Division"
  ) || { value: "N/A" }; // Provide a default value if not found // Provide a default value if not found

  const currentDate = new Date();
  const printedDate = currentDate.toISOString().split("T")[0];
  let range;
  if (formData.DateTime) {
    range = formData.DateTime + " to " + formData.dueDate;
  } else {
    range = printedDate + " to " + formData.dueDate;
  }

  const receiptData = {
    lorryNumber: formData.lorryNumber,
    mlNumber: mldata?.subject,
    mlOwner: mldata?.assigned_to?.name,
    //mlContact: mlcontact.value,
    startLocation: mllocation.value,
    mineralType: "Sand",
    lorryContact: formData.driverContact,
    loadCube: formData.cubes,
    destination: formData.destination,
    validity: range,
    printedDate: printedDate,
  };

  const handlePrintReceipt = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const marginLeft = 20;
    const lineHeight = 8; // Reduced line height for compact spacing

    // Helper function to add text with proper alignment
    const addText = (text, x, y, size = 12, bold = false, align = "left") => {
      // Ensure the text is a valid string, or fall back to an empty string
      const validText = text ? String(text) : "";

      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.text(validText, x, y, { align });
    };

    // Add Logo
    const logoUrl =
      "https://th.bing.com/th/id/OIP.lXqWzX4gCjamrXtOz172qAHaHa?rs=1&pid=ImgDetMain";
    const logoSize = 40;
    const logoX = (pageWidth - logoSize) / 2;
    doc.addImage(logoUrl, "JPEG", logoX, 10, logoSize, logoSize);

    // Title and Contact Info
    addText(
      "Geological Survey and Mines Bureau",
      pageWidth / 2,
      55,
      16,
      true,
      "center"
    );
    addText(
      "Contact: 1921 / 011-288 7680",
      pageWidth / 2,
      65,
      12,
      false,
      "center"
    );

    // Line separator after contact info
    doc.setDrawColor(0, 0, 0);
    doc.line(marginLeft, 70, pageWidth - marginLeft, 70);

    // Receipt Title
    addText("License Owner's Receipt", pageWidth / 2, 80, 14, true, "center");

    // Receipt Details
    const startY = 90;
    const details = [
      { label: "Lorry Number", value: receiptData.lorryNumber },
      { label: "Reference", value: receiptData.reference },
      { label: "ML Number", value: receiptData.mlNumber },
      { label: "ML Owner", value: receiptData.mlOwner },
      // { label: "ML Contact", value: receiptData.mlContact },
      { label: "Start Location", value: receiptData.startLocation },
      { label: "Mineral Type", value: receiptData.mineralType },
      { label: "Lorry Contact", value: receiptData.lorryContact },
      { label: "Load (Cube)", value: receiptData.loadCube },
      { label: "Destination", value: receiptData.destination },
      // { label: "Validity", value: receiptData.validity },
      { label: "Printed Date", value: receiptData.printedDate },
    ];

    details.forEach((item, index) => {
      const yPosition = startY + index * (lineHeight + 5); // Adjusted spacing
      addText(`${item.label}:`, marginLeft, yPosition, 12, true);
      addText(item.value || "", marginLeft + 60, yPosition, 12); // Ensuring there's no undefined value
    });

    // Footer Content
    const footerY = doc.internal.pageSize.height - 20; // Adjusted footer position
    addText(
      "Thank you for using our services!",
      pageWidth / 2,
      footerY,
      10,
      true,
      "center"
    );
    doc.line(marginLeft, footerY - 5, pageWidth - marginLeft, footerY - 5);

    // Copyright Text
    addText(
      "© 2025 Geological Survey and Mines Bureau. All rights reserved.",
      pageWidth / 2,
      footerY + 5,
      8,
      false,
      "center"
    );

    // Check if printer is available
    const isPrinterAvailable = () => window.matchMedia("print").matches;

    if (isPrinterAvailable()) {
      doc.autoPrint(); // Automatically open print dialog
      doc.output("dataurlnewwindow");
    } else {
      doc.save(`${receiptData.lorryContact}.pdf`);

      notification.info({
        message: "No printer detected",
        description: "The receipt will be downloaded as a PDF.",
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
              {language === "en"
                ? "Print or Save Your Receipt"
                : language == "si"
                ? "ඔබේ රිසිට්පත මුද්‍රණය කරන්න හෝ සුරකින්න"
                : "உங்கள் ரசீதை அச்சிடவும் அல்லது சேமிக்கவும்"}
            </Title>
          </Col>
        </Row>
        <Row justify="center">
          <Col
            xs={24}
            sm={18}
            md={12}
            lg={10}
            xl={8}
            style={{ border: "1px solid #d9d9d9", padding: "20px" }}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src="https://th.bing.com/th/id/OIP.lXqWzX4gCjamrXtOz172qAHaHa?rs=1&pid=ImgDetMain"
                alt="Logo"
                style={{ borderRadius: "50%", width: "60px", height: "60px" }} // Set the image size to 60x60px
              />
            </div>

            <p>
              <strong>
                {language === "en"
                  ? "Lorry Number:"
                  : language == "si"
                  ? "ලොරි අංකය:"
                  : "லாரி எண்:"}
              </strong>{" "}
              {formData.lorryNumber}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "ML Number:"
                  : language == "si"
                  ? "ML අංකය:"
                  : "ML எண்:"}
              </strong>{" "}
              {receiptData.mlNumber}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "ML Owner:"
                  : language == "si"
                  ? "ML හිමිකරු:"
                  : "ML உரிமையாளர்:"}
              </strong>{" "}
              {receiptData.mlOwner}
            </p>
            {/* <p><strong>{language === "en" ? "ML Contact:" : language == 'si' ? "ML සම්බන්ධතා:" : "ML தொடர்பு:"}</strong> {receiptData.mlContact}</p> */}
            <p>
              <strong>
                {language === "en"
                  ? "Start Location:"
                  : language == "si"
                  ? "ආරම්භක ස්ථානය:"
                  : "தொடக்க இடம்:"}
              </strong>{" "}
              {receiptData.startLocation}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "Mineral Type:"
                  : language == "si"
                  ? "ඛනිජ වර්ගය:"
                  : "கனிம வகை:"}
              </strong>{" "}
              {receiptData.mineralType}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "Driver Contact:"
                  : language == "si"
                  ? "රියදුරු සම්බන්ධතා:"
                  : "சாரதி தொடர்பு:"}
              </strong>{" "}
              {receiptData.lorryContact}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "Load (Cube):"
                  : language == "si"
                  ? "පැටවීම (Cube):"
                  : "சுமை (Cube):"}
              </strong>{" "}
              {receiptData.loadCube}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "Destination:"
                  : language == "si"
                  ? "ගමනාන්තය:"
                  : "சேருமிடம்:"}
              </strong>{" "}
              {receiptData.destination}
            </p>

            {/* <p>
              <strong>
                {language === "en"
                  ? "Validity:"
                  : language == "si"
                  ? "වලංගුභාවය:"
                  : "செல்லுபடியாகும்:"}
              </strong>{" "}
              {receiptData.validity}
            </p> */}
            <p>
              <strong>
                {language === "en"
                  ? "Printed Date:"
                  : language == "si"
                  ? "මුද්‍රිත දිනය:"
                  : "அச்சிடப்பட்ட திகதி:"}
              </strong>{" "}
              {receiptData.printedDate}
            </p>
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col>
            <Button
              onClick={handleBackToHome}
              style={{
                marginRight: "10px",
                backgroundColor: "#FFA500",
                borderColor: "#FFA500",
              }}
            >
              {language === "en"
                ? "Back to Home"
                : language == "si"
                ? "ආපසු"
                : "முகப்புக்குத் திரும்பு"}
            </Button>
            <Button
              type="primary"
              onClick={handlePrintReceipt}
              className="glitter-button" // Apply the glitter button class
            >
              {language === "en"
                ? "Print Receipt"
                : language == "si"
                ? "මුද්‍රණ ලදුපත"
                : "ரசீதை அச்சிடுக"}
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ReceiptPage;
