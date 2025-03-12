import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Form, Input, DatePicker, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import officerService from "../../services/officerService"; // Import the updated officerService
import { useLanguage } from "../../contexts/LanguageContext";



const ViewLicenseDetails = () => {
  const { licenseId } = useParams(); // Get the license ID from the URL
  const [licenseData, setLicenseData] = useState(null); // State for license data
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { language } = useLanguage();
  // const navigate = useNavigate(); // Hook for navigation


  // Handle form submission and update data
  const onFinish = async (values) => {
    try {

      // Check tracker name to define payload structure
      const trackerName = licenseData?.trackerName;
      let customFields = [];

      if (trackerName === "ML") {
        customFields = [
          { id: 8, name: "License Number", value: values.licenseNumber },
          { id: 2, name: "Owner Name", value: values.ownerName },
          { id: 3, name: "Mobile Number", value: values.mobile },
          { id: 5, name: "Capacity", value: values.capacity },
          { id: 9, name: "Start Date", value: values.issueDate.format("YYYY-MM-DD") },
          { id: 10, name: "End Date", value: values.expiryDate.format("YYYY-MM-DD") },
          { id: 11, name: "Location", value: values.location },
          { id: 37, name: "NIC", value: values.nic },
          { id: 84, name: "Used", value: values.used },
          { id: 85, name: "Remaining", value: values.remaining },
        ];
      } else if (trackerName === "TPL") {
        customFields = [
          { id: 8, name: "License Number", value: values.licenseNumber },
          { id: 2, name: "Owner Name", value: values.ownerName },
          { id: 3, name: "Mobile Number", value: values.mobile },
          { id: 5, name: "Capacity", value: values.capacity },
          { id: 9, name: "Start Date", value: values.issueDate.format("YYYY-MM-DD") },
          { id: 10, name: "End Date", value: values.expiryDate.format("YYYY-MM-DD") },
          { id: 11, name: "Location", value: values.location },
          { id: 86, name: "Royalty(sand)due", value: values.royaltyDue },
        ];
      }

      const payload = {
        issue: { custom_fields: customFields },
      };

      
      // Use the officerService to update the license
      const response = await officerService.updateLicense(licenseId, payload);

      if (response) {
        console.log("Data updated successfully:", response);
        alert("License details updated successfully!");
        // Optionally, navigate back to the dashboard or another page
        navigate("/gsmb/dashboard");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update license details. Please try again.");
    }
  };


  // Fetch license data from the API
  useEffect(() => {
    const fetchLicenseData = async () => {
      try {
         const issue = await officerService.getLicenseById(licenseId);

        if (!issue) {
          console.error("License data not found.");
          setLoading(false);
          return;
        }

        // Extract tracker name
        const trackerName = issue.tracker?.name;

        // Check tracker name and map custom fields accordingly
        let transformedData = { trackerName };

        if (trackerName === "ML") {
          transformedData = {
            ...transformedData,
            licenseNumber: issue.custom_fields.find((field) => field.name === "License Number")?.value || "",
            ownerName: issue.custom_fields.find((field) => field.name === "Owner Name")?.value || "",
            location: issue.custom_fields.find((field) => field.name === "Location")?.value || "",
            capacity: issue.custom_fields.find((field) => field.name === "Capacity")?.value || "",
            issueDate: dayjs(issue.custom_fields.find((field) => field.name === "Start Date")?.value),
            expiryDate: dayjs(issue.custom_fields.find((field) => field.name === "End Date")?.value),
            mobile: issue.custom_fields.find((field) => field.name === "Mobile Number")?.value || "",
            nic: issue.custom_fields.find((field) => field.name === "NIC")?.value || "",
            used: issue.custom_fields.find((field) => field.name === "Used")?.value || "",
            remaining: issue.custom_fields.find((field) => field.name === "Remaining")?.value || "",
          };
        } else if (trackerName === "TPL") {
          transformedData = {
            ...transformedData,
            licenseNumber: issue.custom_fields.find((field) => field.name === "License Number")?.value || "",
            ownerName: issue.custom_fields.find((field) => field.name === "Owner Name")?.value || "",
            location: issue.custom_fields.find((field) => field.name === "Location")?.value || "",
            capacity: issue.custom_fields.find((field) => field.name === "Capacity")?.value || "",
            issueDate: dayjs(issue.custom_fields.find((field) => field.name === "Start Date")?.value),
            expiryDate: dayjs(issue.custom_fields.find((field) => field.name === "End Date")?.value),
            mobile: issue.custom_fields.find((field) => field.name === "Mobile Number")?.value || "",
            royaltyDue: issue.custom_fields.find((field) => field.name === "Royalty(sand)due")?.value || "",
          };
        }

        setLicenseData(transformedData);
        setLoading(false);
        form.setFieldsValue(transformedData);
      } catch (error) {
        console.error("Error fetching license data:", error);
        setLoading(false);
      }
    };

    fetchLicenseData();
  }, [licenseId, form]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!licenseData) {
    return <div>No data available</div>;
  }

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <div
      style={{
        
        margin: "0 auto",
        // padding: "20px",
        background: "#fff",
        // borderRadius: "10px",
      }}
    >
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: "16px", paddingLeft: 0, color: "#000000" ,backgroundColor:'#FFE143'}}
        href="/gsmb/dashboard"
      >
        {language === "en" ? "Back" : language === "si" ? "ආපසු" : "மீண்டும்"}
      </Button>

      <Card
        title={<h3 style={{ margin: 0 }}>{language === "en" ? "Edit License Details" : language === "si" ? "බලපත්‍ර විස්තර සංස්කරණය" : "உரிமம் விவரங்களைத் திருத்துக"}</h3>}
        style={{textAlign:'center',fontSize:'20px', fontWeight:'bold' }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
              style={{fontSize:'24px'}}
                label={language === "en" ? "License Number" : language === "si" ? "බලපත්‍රය අංකය" : "அனுமதி எண்"}
                name="licenseNumber"
                rules={[{ required: true, message: language === "en" ? "Please input the license number!" : language === "si" ? "කරුණාකර බලපත්‍රය අංකය ඇතුළත් කරන්න!" : "தயவுசெய்து அனுமதி எண் உள்ளிடவும்!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={language === "en" ? "Owner Name" : language === "si" ? "අයිතිකරුගේ නම" : "உரிமையாளர் பெயர்"}
                name="ownerName"
                rules={[{ required: true, message: language === "en" ? "Please input the owner name!" : language === "si" ? "කරුණාකර අයිතිකරුගේ නම ඇතුළත් කරන්න!" : "தயவுசெய்து உரிமையாளர் பெயர் உள்ளிடவும்!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={language === "en" ? "Location" : language === "si" ? "ස්ථානය" : "இடம்"}
                name="location"
                rules={[{ required: true, message: language === "en" ? "Please input the location!" : language === "si" ? "කරුණාකර ස්ථානය ඇතුළත් කරන්න!" : "தயவுசெய்து இடம் உள்ளிடவும்!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={language === "en" ? "Mobile" : language === "si" ? "ජංගම දුරකථන අංකය" : "மொபைல் எண்"}
                name="mobile"
                rules={[{ required: true, message: language === "en" ? "Please input the mobile number!" : language === "si" ? "කරුණාකර ජංගම දුරකථන අංකය ඇතුළත් කරන්න!" : "தயவுசெய்து மொபைல் எண் உள்ளிடவும்!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={language === "en" ? "Capacity (Cubes)" : language === "si" ? "කියුබ් ගණන" : "கொள்ளளவு (கனசதுரங்கள்)"}
                name="capacity"
                rules={[{ required: true, message: "Please input the capacity!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={language === "en" ? "Issue Date" : language === "si" ? "නිකුත් කළ දිනය" : "வெளியீட்டு தேதி"}
                name="issueDate"
                rules={[{ required: true, message: language === "en" ? "Please select the issue date!" : language === "si" ? "කරුණාකර නිකුත් කළ දිනය තෝරන්න!" : "தயவுசெய்து வெளியீட்டு தேதியை தேர்ந்தெடுக்கவும்!" }]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={language === "en" ? "Expiry Date" : language === "si" ? "කල් ඉකුත් වන දිනය" : "காலாவதி தேதி"}
                name="expiryDate"
                rules={[{ required: true, message: language === "en" ? "Please select the expiry date!" : language === "si" ? "කරුණාකර කල් ඉකුත් වන දිනය තෝරන්න!" : "தயவுசெய்து காலாவதி தேதியை தேர்ந்தெடுக்கவும்!" }]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            {licenseData.trackerName === "ML" && (
              <>
                <Col xs={24} sm={12}>
                <Form.Item label={language === "en" ? "NIC" : language === "si" ? "ජාතික හැඳුනුම්පත් අංකය" : "தேசிய அடையாள அட்டை எண்"} name="nic">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                <Form.Item label={language === "en" ? "Used" : language === "si" ? "භාවිත කළ ප්‍රමාණය" : "பயன்படுத்திய அளவு"} name="used">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                <Form.Item label={language === "en" ? "Remaining" : language === "si" ? "ඉතිරි ප්‍රමාණය" : "மீதமுள்ள கியூப்ஸ்"} name="remaining">
                    <Input />
                  </Form.Item>
                </Col>
              </>
            )}
            {licenseData.trackerName === "TPL" && (
              <Col xs={24} sm={12}>
                <Form.Item label={language === "en" ? "Royalty Due" : language === "si" ? "කර්තෘ භාගය" : "இளவரசர் கட்டணம்"} name="royaltyDue">
                  <Input />
                </Form.Item>
              </Col>
            )}
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col xs={12}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#950C33",
                  borderColor: "#950C33",
                  width: "100%",
                  
                }}
              >
                {language === "en" ? "Update" : language === "si" ? "යාවත්කාලීන කරන්න" : "புதுப்பிக்கவும்"}
              </Button>
            </Col>
            <Col xs={12}>
              <Button
                type="default"
                onClick={handleCancel}
                style={{ width: "100%", borderColor: "#950C33" }}
              >
                {language === "en" ? "Cancel" : language === "si" ? "අවලංගු කරන්න" : "ரத்து செய்"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default ViewLicenseDetails;


























// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Card, Row, Col, Form, Input, DatePicker, Button } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";
// import axios from "axios";

// const ViewLicenseDetails = () => {
//   const { licenseId } = useParams(); // Get the license ID from the URL
//   const [licenseData, setLicenseData] = useState(null); // State for license data
//   const [loading, setLoading] = useState(true);
//   const [form] = Form.useForm();

//   // Handle form submission and update data
//   const onFinish = async (values) => {
//     try {
//       const payload = {
//         issue: {
//           custom_fields: [
//             { id: 8, name: "License Number", value: values.licenseNumber },
//             { id: 2, name: "Owner Name", value: values.ownerName },
//             { id: 3, name: "Mobile Number", value: values.mobile },
//             { id: 5, name: "Capacity", value: values.capacity },
//             { id: 9, name: "Start Date", value: values.issueDate.format("YYYY-MM-DD") },
//             { id: 10, name: "End Date", value: values.expiryDate.format("YYYY-MM-DD") },
//             { id: 11, name: "Location", value: values.location },
//           ],
//         },
//       };

//       // Retrieve API Key from localStorage
//       const apiKey = localStorage.getItem("API_Key");

//       console.log("API Key from localStorage:", apiKey);

//       if (!apiKey) {
//         console.error("API Key not found in localStorage");
//         return;
//       }

//       const response = await axios.put( `/api/issues/${licenseId}.json`,{
       
//           headers: {
//             "Content-Type": "application/json",
//             "X-Redmine-API-Key": apiKey,
//           },
          
        
//       });

//       console.log("Data updated successfully:", response.data);
//       alert("License details updated successfully!");
//     } catch (error) {
//       console.error("Error updating data:", error);
//       alert("Failed to update license details. Please try again.");
//     }
//   };

//   // Fetch license data from the API
//   useEffect(() => {
//     const fetchLicenseData = async () => {
//       try {
//         // Retrieve API Key from localStorage
//       const apiKey = localStorage.getItem("API_Key");

//       console.log("API Key from localStorage:", apiKey);

//       if (!apiKey) {
//         console.error("API Key not found in localStorage");
//         return;
//       }

//         const response = await axios.get(
//           `/api/issues/${licenseId}.json`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "X-Redmine-API-Key": apiKey,
//             },
//           }
//         );
//         console.log("Data11 come successfully:", response.data);
//         const issue = response.data.issue;
//         const transformedData = {
//           licenseNumber: issue.custom_fields.find((field) => field.name === "License Number")?.value || "",
//           ownerName: issue.custom_fields.find((field) => field.name === "Owner Name")?.value || "",
//           location: issue.custom_fields.find((field) => field.name === "Location")?.value || "",
//           capacity: issue.custom_fields.find((field) => field.name === "Capacity")?.value || "",
//           issueDate: dayjs(issue.custom_fields.find((field) => field.name === "Start Date")?.value),
//           expiryDate: dayjs(issue.custom_fields.find((field) => field.name === "End Date")?.value),
//           mobile: issue.custom_fields.find((field) => field.name === "Mobile Number")?.value || "",
//         };

//         setLicenseData(transformedData);
//         setLoading(false);
//         form.setFieldsValue(transformedData); // Set initial values in the form
//       } catch (error) {
//         console.error("Error fetching license data:", error);
//         setLoading(false);
//       }
//     };

//     fetchLicenseData();
//   }, [licenseId, form]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!licenseData) {
//     return <div>No data available</div>;
//   }

//   const handleCancel = () => {
//     form.resetFields();
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "800px",
//         margin: "0 auto",
//         padding: "20px",
//         background: "#f0f2f5",
//         borderRadius: "10px",
//       }}
//     >
//       <Button
//         type="link"
//         icon={<ArrowLeftOutlined />}
//         style={{ marginBottom: "16px", paddingLeft: 0, color: "#000000" }}
//         href="/gsmb/dashboard"
//       >
//         Back
//       </Button>
//       <Card
//         title={<h3 style={{ margin: 0 }}>Edit License Details</h3>}
//         style={{ borderRadius: "10px" }}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//         >
//           <Row gutter={[16, 16]}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 label="License Number"
//                 name="licenseNumber"
//                 rules={[{ required: true, message: "Please input the license number!" }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 label="Owner Name"
//                 name="ownerName"
//                 rules={[{ required: true, message: "Please input the owner name!" }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 label="Location"
//                 name="location"
//                 rules={[{ required: true, message: "Please input the location!" }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 label="Mobile"
//                 name="mobile"
//                 rules={[{ required: true, message: "Please input the mobile number!" }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 label="Capacity (Cubes)"
//                 name="capacity"
//                 rules={[{ required: true, message: "Please input the capacity!" }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 label="Issue Date"
//                 name="issueDate"
//                 rules={[{ required: true, message: "Please select the issue date!" }]}
//               >
//                 <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 label="Expiry Date"
//                 name="expiryDate"
//                 rules={[{ required: true, message: "Please select the expiry date!" }]}
//               >
//                 <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
//             <Col xs={12}>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 style={{
//                   backgroundColor: "#950C33",
//                   borderColor: "#950C33",
//                   width: "100%",
//                 }}
//               >
//                 Update
//               </Button>
//             </Col>
//             <Col xs={12}>
//               <Button
//                 type="default"
//                 onClick={handleCancel}
//                 style={{ width: "100%", borderColor: "#950C33" }}
//               >
//                 Cancel
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default ViewLicenseDetails;
