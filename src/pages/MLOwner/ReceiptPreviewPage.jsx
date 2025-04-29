import React, { useState, useEffect } from "react";
import { Button, Typography, Layout, Row, Col, notification, Spin } from "antd"; // Added Spin for loading
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../../styles/MLOwner/ReceiptPage.css"; // Ensure this path is correct
// Assuming fetchMLData is correctly imported from your services
import { fetchMLData } from "../../services/MLOService";
import { useLanguage } from "../../contexts/LanguageContext";

const { Content } = Layout;
const { Title } = Typography;

const ReceiptPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, l_number } = location.state || {}; // Get data passed via navigation state

  const [mldata, setmlData] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    if (l_number) {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      fetchMLData(l_number)
        .then((data) => {
          setmlData(data);
          setLoading(false); // Stop loading on success
        })
        .catch((err) => {
          console.error("Error fetching ML data:", err);
          setError(
            "Failed to fetch ML data. Please check the ML number or try again later."
          );
          setLoading(false); // Stop loading on error
          notification.error({
             message: "Fetch Error",
             description: "Could not fetch ML data. Please try again.",
          });
        });
    } else {
      // Handle case where l_number is missing (e.g., direct navigation without state)
      console.error("ML number (l_number) not provided in location state.");
      setError("ML number is missing. Cannot generate receipt.");
      setLoading(false);
       notification.warning({
         message: "Missing Information",
         description: "ML number was not provided to generate the receipt.",
       });
       // Optionally navigate back or show a more prominent error message
       // navigate('/mlowner/home');
    }
  }, [l_number]); // Dependency array includes l_number

  // --- Data Processing (with safety checks) ---

  // Safely access custom fields only if mldata and mldata.custom_fields exist
  const mlcontactData = mldata?.custom_fields?.find(
    (field) => field.name === "Mobile Number"
  );
  const mllocationData = mldata?.custom_fields?.find(
    (field) => field.name === "Grama Niladhari Division"
  );
  const mlnumber = mldata?.custom_fields?.find(
    (field) => field.name === "Mining License Number"
  );

  const currentDate = new Date();
  const printedDate = currentDate.toISOString().split("T")[0];

  // Use default values if formData is missing (though it shouldn't be if navigation is correct)
  const safeFormData = formData || {
      lorryNumber: "N/A",
      driverContact: "N/A",
      cubes: "N/A",
      destination: "N/A",
      dueDate: "N/A", // Use a sensible default or handle missing dueDate
      DateTime: null,
  };

  // Calculate range only if dates are available
  let range = "N/A";
  if (safeFormData.dueDate) {
    const startDate = safeFormData.DateTime ? safeFormData.DateTime : printedDate;
    range = `${startDate} to ${safeFormData.dueDate}`;
  }


  const receiptData = {
    lorryNumber: safeFormData.lorryNumber,
    mlNumber: mlnumber?.value || "N/A", // ML Number from fetched data
    mlOwner: mldata?.assigned_to?.name || "N/A", // ML Owner from fetched data
    mlContact: mlcontactData?.value || "N/A", // ML Contact from fetched data
    startLocation: mllocationData?.value || "N/A", // Start location from fetched data
    mineralType: "Sand", // Hardcoded - change if dynamic
    lorryContact: safeFormData.driverContact, // From form
    loadCube: safeFormData.cubes, // From form
    destination: safeFormData.destination, // From form
    // validity: range, // Calculated validity range - uncomment if needed
    printedDate: printedDate, // Date receipt was generated/printed
  };

  // --- PDF Generation Function ---
  const handlePrintReceipt = () => {
    if (!mldata || !formData) {
         notification.error({
              message: "Cannot Print",
              description: "Receipt data is incomplete. Cannot generate PDF.",
         });
         return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const marginLeft = 20;
    const lineHeight = 8; // Compact line height

    // Helper function to add text
    const addText = (text, x, y, size = 12, bold = false, align = "left") => {
      const validText = text != null ? String(text) : ""; // Ensure text is string or empty string
      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.text(validText, x, y, { align });
    };

    // Logo (replace with your actual logo URL or import)
    const logoUrl =
      "https://th.bing.com/th/id/OIP.lXqWzX4gCjamrXtOz172qAHaHa?rs=1&pid=ImgDetMain"; // Example logo
    const logoSize = 30; // Adjusted size
    const logoX = (pageWidth - logoSize) / 2;
    try {
        // Add image only if URL is valid. Consider adding error handling for image loading.
        doc.addImage(logoUrl, "JPEG", logoX, 15, logoSize, logoSize);
    } catch (imgError) {
        console.error("Error adding image to PDF:", imgError);
        addText("[Logo]", logoX + logoSize / 2, 30, 10, false, "center"); // Placeholder if image fails
    }


    // Titles
    addText(
      "Geological Survey and Mines Bureau",
      pageWidth / 2,
      55, // Adjusted Y position
      16,
      true,
      "center"
    );
    addText(
      "Contact: 1921 / 011-288 7680",
      pageWidth / 2,
      65, // Adjusted Y position
      12,
      false,
      "center"
    );

    // Line separator
    doc.setDrawColor(0, 0, 0);
    doc.line(marginLeft, 75, pageWidth - marginLeft, 75); // Adjusted Y position

    // Receipt Title
    addText("License Owner's Receipt", pageWidth / 2, 85, 14, true, "center"); // Adjusted Y position

    // Receipt Details
    const startY = 95; // Adjusted Y position
    const details = [
      { label: "Lorry Number", value: receiptData.lorryNumber },
      // { label: "Reference", value: receiptData.reference }, // Add if you have a reference number
      { label: "ML Number", value: receiptData.mlNumber },
      { label: "ML Owner", value: receiptData.mlOwner },
       { label: "ML Contact", value: receiptData.mlContact }, // Uncommented
      { label: "Start Location", value: receiptData.startLocation },
      { label: "Mineral Type", value: receiptData.mineralType },
      { label: "Driver Contact", value: receiptData.lorryContact }, // Changed label for clarity
      { label: "Load (Cube)", value: receiptData.loadCube },
      { label: "Destination", value: receiptData.destination },
      // { label: "Validity", value: receiptData.validity }, // Uncomment if needed
      { label: "Printed Date", value: receiptData.printedDate },
    ];

    details.forEach((item, index) => {
      const yPosition = startY + index * (lineHeight + 5); // Adjusted spacing
      addText(`${item.label}:`, marginLeft, yPosition, 12, true);
      // Ensure value is not null/undefined before passing to addText
      addText(item.value, marginLeft + 60, yPosition, 12);
    });

    // Footer
    const footerY = doc.internal.pageSize.height - 30; // Adjusted footer position
    doc.line(marginLeft, footerY - 5, pageWidth - marginLeft, footerY - 5);
    addText(
      "Thank you for using our services!",
      pageWidth / 2,
      footerY,
      10,
      true,
      "center"
    );
    addText(
      "© " + new Date().getFullYear() + " Geological Survey and Mines Bureau. All rights reserved.",
      pageWidth / 2,
      footerY + 5,
      8,
      false,
      "center"
    );

    // Print or Save
    try {
        // Attempt to auto-print
        doc.autoPrint();
        doc.output("dataurlnewwindow"); // Open in new window for printing
    } catch (e) {
        console.warn("AutoPrint is not supported in this environment or failed.", e);
        // Fallback to saving
        doc.save(`Receipt_${receiptData.lorryNumber}_${receiptData.printedDate}.pdf`);
        notification.info({
            message: "Print Action",
            description: "The print dialog could not be opened automatically. The receipt PDF has been downloaded.",
        });
    }
  };

  // --- Navigation Handler ---
  const handleBackToHome = () => {
    navigate("/mlowner/home"); // Ensure this route is correct
  };

  // --- Render Logic ---
  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" tip="Loading Receipt Data..." />
      </Layout>
    );
  }

  if (error) {
     return (
       <Layout style={{ minHeight: "100vh", padding: "24px" }}>
         <Content style={{ textAlign: "center" }}>
           <Title level={3} style={{ color: "red" }}>
             Error
           </Title>
           <p>{error}</p>
           <Button type="primary" onClick={handleBackToHome}>
             Go Back
           </Button>
         </Content>
       </Layout>
     );
   }

  // Render receipt only if data is loaded and no error
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={20} md={16} lg={12} xl={10}> {/* Slightly wider for content */}
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
            sm={20}
            md={16}
            lg={12}
            xl={10} // Slightly wider for content
            style={{ border: "1px solid #d9d9d9", padding: "25px", borderRadius: "8px", backgroundColor: "#fff" }} // Added background and radius
          >
            {/* Header Section */}
            <div style={{ textAlign: "center", marginBottom: "20px", borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' }}>
              <img
                src="https://th.bing.com/th/id/OIP.lXqWzX4gCjamrXtOz172qAHaHa?rs=1&pid=ImgDetMain" // Replace with your logo URL
                alt="GSMB Logo"
                style={{ width: "60px", height: "60px", marginBottom: '10px' }} // Adjusted styling
              />
              <Typography.Title level={4} style={{ margin: 0 }}>
                Geological Survey and Mines Bureau
              </Typography.Title>
              <Typography.Text type="secondary">
                 Receipt
              </Typography.Text>
            </div>

            {/* Receipt Details Section */}
            <Row gutter={[16, 16]}> {/* Added gutter for spacing */}
                 <Col xs={24} sm={12}>
                    <p><strong>{language === "en" ? "Lorry Number:" : language === "si" ? "ලොරි අංකය:" : "லாரி எண்:"}</strong></p>
                    <p>{receiptData.lorryNumber}</p>
                 </Col>
                 <Col xs={24} sm={12}>
                    <p><strong>{language === "en" ? "ML Number:" : language === "si" ? "ML අංකය:" : "ML எண்:"}</strong></p>
                    <p>{receiptData.mlNumber}</p>
                 </Col>
                 <Col xs={24} sm={12}>
                    <p><strong>{language === "en" ? "ML Owner:" : language === "si" ? "ML හිමිකරු:" : "ML உரிமையாளர்:"}</strong></p>
                    <p>{receiptData.mlOwner}</p>
                 </Col>
                 <Col xs={24} sm={12}>
                    <p><strong>{language === "en" ? "ML Contact:" : language === "si" ? "ML සම්බන්ධතා:" : "ML தொடர்பு:"}</strong></p> {/* Uncommented */}
                    <p>{receiptData.mlContact}</p>
                 </Col>
                 <Col xs={24} sm={12}>
                    <p><strong>{language === "en" ? "Start Location:" : language === "si" ? "ආරම්භක ස්ථානය:" : "தொடக்க இடம்:"}</strong></p>
                    <p>{receiptData.startLocation}</p>
                 </Col>
                 <Col xs={24} sm={12}>
                    <p><strong>{language === "en" ? "Mineral Type:" : language === "si" ? "ඛනිජ වර්ගය:" : "கனிம வகை:"}</strong></p>
                    <p>{receiptData.mineralType}</p>
                 </Col>
                 <Col xs={24} sm={12}>
                    <p><strong>{language === "en" ? "Driver Contact:" : language === "si" ? "රියදුරු සම්බන්ධතා:" : "ஓட்டுனர் தொடர்பு:"}</strong></p>
                    <p>{receiptData.lorryContact}</p>
                 </Col>
                 <Col xs={24} sm={12}>
                    <p><strong>{language === "en" ? "Load (Cube):" : language === "si" ? "පැටවීම (කියුබ්):" : "சுமை (கியூப்):"}</strong></p> {/* Adjusted SI/TA translation */}
                    <p>{receiptData.loadCube}</p>
                 </Col>
                 <Col xs={24} sm={12}>
                    <p><strong>{language === "en" ? "Destination:" : language === "si" ? "ගමනාන්තය:" : "சேருமிடம்:"}</strong></p>
                    <p>{receiptData.destination}</p>
                 </Col>
                 {/*
                 <Col xs={24} sm={12}>
                    <p><strong>{language === "en" ? "Validity:" : language === "si" ? "වලංගුභාවය:" : "செல்லுபடியாகும்:"}</strong></p>
                    <p>{receiptData.validity}</p>
                 </Col>
                 */}
                 <Col xs={24} sm={12}>
                    <p><strong>{language === "en" ? "Printed Date:" : language === "si" ? "මුද්‍රිත දිනය:" : "அச்சிடப்பட்ட தேதி:"}</strong></p>
                    <p>{receiptData.printedDate}</p>
                 </Col>
            </Row>
          </Col>
        </Row>

        {/* Action Buttons Section */}
        <Row justify="center" style={{ marginTop: "30px" }}> {/* Increased margin */}
          <Col>
            <Button
              onClick={handleBackToHome}
              style={{
                marginRight: "15px", // Increased spacing
                // Standard button style - removed specific color unless desired
              }}
              size="large" // Larger button
            >
              {language === "en"
                ? "Back to Home"
                : language === "si"
                ? "මුල් පිටුවට" // Corrected SI translation
                : "முகப்புக்குத் திரும்பு"}
            </Button>
            <Button
              type="primary"
              onClick={handlePrintReceipt}
              className="glitter-button" // Keep glitter if CSS is defined
              size="large" // Larger button
            >
              {language === "en"
                ? "Print / Save Receipt" // Clarified action
                : language === "si"
                ? "රිසිට්පත මුද්‍රණය / සුරකින්න" // Corrected SI translation
                : "ரசீதை அச்சிடுக / சேமிக்க"}
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ReceiptPage;
