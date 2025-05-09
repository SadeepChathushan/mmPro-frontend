import React, { useState, useEffect } from "react";
import { Button, Typography, Layout, Row, Col, notification, Spin } from "antd";
import { jsPDF } from "jspdf";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/MLOwner/ReceiptPage.css";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  fetchMLData,
  fetchDispatchHistoryData,
} from "../../services/MLOService"; // Import fetchTPLData

const { Content } = Layout;
const { Title } = Typography;

const TPLReceiptPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [mldata, setmlData] = useState(null);
  const [tpldata, setTplData] = useState(null); // State for TPL data
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { tpl_id, l_number, lorryNumber, driverContact, cubes, destination } =
    location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch TPL data first
        const tplResponse = await fetchDispatchHistoryData(tpl_id, lorryNumber);
        console.log("tpl_id12345", tplResponse);
        setTplData(tplResponse);

        // Then fetch ML data if we have the license number
        if (l_number) {
          const mlResponse = await fetchMLData(l_number);
          setmlData(mlResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        notification.error({
          message: "Error",
          description: "Failed to load receipt data",
        });
      } finally {
        setLoading(false);
      }
    };

    if (tpl_id) {
      fetchData();
    } else {
      notification.error({
        message: "Error",
        description: "No TPL ID provided",
      });
      navigate("/mlowner/home");
    }
  }, [
    tpl_id,
    l_number,
    lorryNumber,
    driverContact,
    cubes,
    destination,
    navigate,
  ]);

  // Extract ML contact and location from custom fields
  const mlcontact = mldata?.custom_fields?.find(
    (field) => field.name === "Mobile Number"
  ) || { value: "N/A" };

  const mllocation = mldata?.custom_fields?.find(
    (field) => field.name === "Grama Niladhari Division"
  ) || { value: "N/A" };

  const currentDate = new Date();
  const printedDate = currentDate.toISOString().split("T")[0];

  // Prepare receipt data from TPL and ML data
  const receiptData = {
    //lorryNumber: tpldata?.lorry_number || "N/A",
    mlNumber: mldata?.subject || "N/A",
    mlOwner: mldata?.assigned_to?.name || "N/A",
    startLocation: mllocation.value,
    mineralType: "Sand",
    lorryContact:  driverContact ||tpldata?.driver_contact || "N/A",
    // loadCube: tpldata?.cubes || "N/A",
    //destination: tpldata?.destination || "N/A",
    printedDate: printedDate,
    tplId: tpl_id, //lorryNumber
    lorryNumber: lorryNumber,
    loadCube: cubes,
    // lorryContact: driverContact,
    destination: destination,
  };

  const handlePrintReceipt = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const marginLeft = 20;
    const lineHeight = 8;

    const addText = (text, x, y, size = 12, bold = false, align = "left") => {
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

    // Line separator
    doc.setDrawColor(0, 0, 0);
    doc.line(marginLeft, 70, pageWidth - marginLeft, 70);

    // Receipt Title
    addText("License Owner's Receipt", pageWidth / 2, 80, 14, true, "center");
    addText(
      `TPL ID: ${receiptData.tplId}`,
      pageWidth / 2,
      90,
      12,
      true,
      "center"
    );

    // Receipt Details
    const startY = 100;
    const details = [
      { label: "Lorry Number", value: receiptData.lorryNumber },
      { label: "ML Number", value: receiptData.mlNumber },
      { label: "ML Owner", value: receiptData.mlOwner },
      { label: "Start Location", value: receiptData.startLocation },
      { label: "Mineral Type", value: receiptData.mineralType },
      { label: "Driver Contact", value: receiptData.lorryContact },
      { label: "Load (Cube)", value: receiptData.loadCube },
      { label: "Destination", value: receiptData.destination },
      { label: "Printed Date", value: receiptData.printedDate },
    ];

    details.forEach((item, index) => {
      const yPosition = startY + index * (lineHeight + 5);
      addText(`${item.label}:`, marginLeft, yPosition, 12, true);
      addText(item.value || "", marginLeft + 60, yPosition, 12);
    });

    // Footer
    const footerY = doc.internal.pageSize.height - 20;
    addText(
      "Thank you for using our services!",
      pageWidth / 2,
      footerY,
      10,
      true,
      "center"
    );
    doc.line(marginLeft, footerY - 5, pageWidth - marginLeft, footerY - 5);
    addText(
      "© 2025 Geological Survey and Mines Bureau. All rights reserved.",
      pageWidth / 2,
      footerY + 5,
      8,
      false,
      "center"
    );

    if (window.matchMedia("print").matches) {
      doc.autoPrint();
      doc.output("dataurlnewwindow");
    } else {
      doc.save(`TPL_${receiptData.tplId}.pdf`);
      notification.info({
        message: "No printer detected",
        description: "The receipt will be downloaded as a PDF.",
      });
    }
  };

  const handleBackToHome = () => {
    navigate("/mlowner/home");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={18} md={12} lg={10} xl={8}>
            <Title level={3} style={{ textAlign: "center" }}>
              {language === "en"
                ? "Print or Save Your Receipt"
                : language === "si"
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
                style={{ borderRadius: "50%", width: "60px", height: "60px" }}
              />
            </div>
            <p>
              <strong>
                {language === "en"
                  ? "Lorry Number:"
                  : language === "si"
                  ? "ලොරි අංකය:"
                  : "லாரி எண்:"}
              </strong>{" "}
              {receiptData.lorryNumber}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "ML Number:"
                  : language === "si"
                  ? "ML අංකය:"
                  : "ML எண்:"}
              </strong>{" "}
              {receiptData.mlNumber}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "ML Owner:"
                  : language === "si"
                  ? "ML හිමිකරු:"
                  : "ML உரிமையாளர்:"}
              </strong>{" "}
              {receiptData.mlOwner}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "Start Location:"
                  : language === "si"
                  ? "ආරම්භක ස්ථානය:"
                  : "தொடக்க இடம்:"}
              </strong>{" "}
              {receiptData.startLocation}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "Mineral Type:"
                  : language === "si"
                  ? "ඛනිජ වර්ගය:"
                  : "கனிம வகை:"}
              </strong>{" "}
              {receiptData.mineralType}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "Driver Contact:"
                  : language === "si"
                  ? "රියදුරු සම්බන්ධතා:"
                  : "சாரதி தொடர்பு:"}
              </strong>{" "}
              {receiptData.lorryContact}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "Load (Cube):"
                  : language === "si"
                  ? "පැටවීම (Cube):"
                  : "சுமை (Cube):"}
              </strong>{" "}
              {receiptData.loadCube}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "Destination:"
                  : language === "si"
                  ? "ගමනාන්තය:"
                  : "சேருமிடம்:"}
              </strong>{" "}
              {receiptData.destination}
            </p>
            <p>
              <strong>
                {language === "en"
                  ? "Printed Date:"
                  : language === "si"
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
                : language === "si"
                ? "ආපසු"
                : "முகப்புக்குத் திரும்பு"}
            </Button>
            <Button
              type="primary"
              onClick={handlePrintReceipt}
              className="glitter-button"
            >
              {language === "en"
                ? "Print Receipt"
                : language === "si"
                ? "මුද්‍රණ ලදුපත"
                : "ரசீதை அச்சிடுக"}
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default TPLReceiptPage;
