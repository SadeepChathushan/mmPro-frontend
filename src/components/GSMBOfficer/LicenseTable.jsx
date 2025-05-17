import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Checkbox,
  message,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  Space,
  Typography,
  Tooltip,
  Progress,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  SearchOutlined,
  FileWordOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FileZipOutlined,
  FileUnknownOutlined,
  EyeOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import officerService from "../../services/officerService";
// import { updateResolvedStatus } from "../../services/MLOService";

import dayjs from "dayjs";

const { Option } = Select;
const { Text } = Typography;

const LicenseTable = ({ data, tracker, loading, searchText }) => {
  const navigate = useNavigate();
  const [fetchingId, setFetchingId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const { language } = useLanguage();
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] =
    useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [relatedTpls, setRelatedTpls] = useState([]);

  const [editableFields] = useState({
    mobile_number: true,
  });
  const [complaints, setComplaints] = useState([]);
  


  const updateResolvedStatus = async (complaintId, newResolvedStatus) => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
  message.error("User not authenticated. Please log in again.");
  return;
}
    console.log("Token being sent:", token);

    const payload = {
      resolved: newResolvedStatus ? "1" : "0",
    };

    const response = await axios.put(
      `http://127.0.0.1:5000/gsmb-officer/complaint/${complaintId}/resolve`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Add this explicitly
        },
      }
    );

    if (response.data.success) {
      message.success(`Complaint ${complaintId} marked as resolved`);

      setComplaints((prevComplaints) =>
        prevComplaints.map((c) =>
          c.id === complaintId ? { ...c, resolved: newResolvedStatus ? "1" : "0" } : c
        )
      );
    } else {
      message.error(response.data.message || "Failed to update complaint status.");
    }
  } catch (err) {
    message.error(`Failed to update complaint ${complaintId}`);
    console.error(err);
  }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (tracker) {
          case "ML":
            response = await officerService.getMiningLicenses();
            break;
          case "TPL":
            response = await officerService.getAllTpls();
            break;
          case "CMPLN":
            response = await officerService.getAllComplaints();
            break;
          default:
            response = [];
        }
      } catch (error) {

      }
    };

    fetchData();
  }, [tracker]);

  

  const handleViewClick = async (e, record) => {
    e.preventDefault();
    setFetchingId(record.id);
    setCurrentRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDownload = (url, filename) => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;

    // Extract filename from URL or use a default
    const downloadName = filename || url.split("/").pop() || "document";
    link.download = downloadName;

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success(`Downloading ${downloadName}`);
  };

  const renderAction = (record) => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Button
        type="primary"
        size="small"
        icon={<span>👁️</span>}
        onClick={(e) => handleViewClick(e, record)}
      >
        {language === "en"
          ? "View"
          : language === "si"
            ? "බලන්න"
            : "பார்க்க"}
      </Button>
    </div>
  );

  const renderComplaintAction = (record) => (
  <Checkbox
    checked={record.resolved === "1"}
    onChange={(e) => updateResolvedStatus(record.id, e.target.checked)}
  />
);

  const columns = {
    ML: [


      { title: language === "en" ? "ID" : language === "si" ? "අංකය" : "அடையாள எண்", dataIndex: "id", width: 80, fixed: "left" },
      { title: language === "en" ? "Owner" : language === "si" ? "අයිතිකරු" : "உரிமையாளர்", dataIndex: "assigned_to", ellipsis: true },
      { title: language === "en" ? "License No." : language === "si" ? "බලපත්‍ර අංකය" : "உரிம எண்", dataIndex: "subject", width: 120 },
      { title: language === "en" ? "Mobile" : language === "si" ? "ජංගම දුරකථන අංකය" : "தொலைபேசி", dataIndex: "mobile_number", width: 120 },
      { title: language === "en" ? "Capacity" : language === "si" ? "ධාරිතාවය" : "கொள்ளளவு", dataIndex: "capacity", width: 100 },
      { title: language === "en" ? "Used" : language === "si" ? "භාවිතා කල ප්‍රමාණය" : "பயன்படுத்தப்பட்டது", dataIndex: "used", width: 80 },
      { title: language === "en" ? "Remaining" : language === "si" ? "ඉතිරිව ඇති ප්‍රමාණය" : "மீதமுள்ளது", dataIndex: "remaining", width: 100 },
      { title: language === "en" ? "Royalty" : language === "si" ? "Royalty ගාස්තුව" : "உரிமத் தொகை", dataIndex: "royalty", width: 100 },

      {
        title: language === "en" ? "Valid Period" : language === "si" ? "වලංගු කාලය" : "செல்லுபடியாகும் காலம்",

        width: 200,
        render: (_, record) => (
          <span className="text-nowrap">
            {record.start_date} - {record.due_date}
          </span>
        ),
      },
      {
        title: language === "en" ? "Status" : language === "si" ? "තත්වය" : "நிலை",
        dataIndex: "status",
        width: 150,
        render: (status) => (
          <span
            style={{
              color:
                status === "valid"
                  ? "green"
                  : status === "me_approved"
                    ? "blue"
                    : status === "pending"
                      ? "orange"
                      : "#333",
              fontWeight: 500,
            }}
          >
            {status
              ? status
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())
              : "-"}
          </span>
        ),
      },
      {

        title: language === "en" ? "Action" : language === "si" ? "ක්‍රියාව" : "நடவடிக்கை",

        width: 100,
        render: (_, record) => renderAction(record),
      },
    ],
    TPL: [


      { title: language === "en" ? "License No." : language === "si" ? "බලපත්‍ර අංකය" : "உரிம எண்", dataIndex: "mining_license_number", width: 120 },
      { title: language === "en" ? "Mining Owner" : language === "si" ? "අයිතිකරු" : "சுரங்க உரிமையாளர்", dataIndex: "author", ellipsis: true },
      // { title: "Driver Name", dataIndex: "lorry_driver_name", width: 150 },
      { title: language === "en" ? "Lorry No." : language === "si" ? "ලොරි අංකය" : "லாரி எண்.", dataIndex: "lorry_number", width: 120 },
      { title: language === "en" ? "Driver Contact" : language === "si" ? "රියදුරුගේ දුරකථන අංකය" : "சாரதி தொடர்பு", dataIndex: "driver_contact", width: 140 },
      { title: language === "en" ? "Cubes" : language === "si" ? "ධාරිතාවය" : "கனசதுரங்கள்", dataIndex: "cubes", width: 80 },
      { title: language === "en" ? "Destination" : language === "si" ? "ගමනාන්තය" : "பயண இலக்கு", dataIndex: "destination", ellipsis: true },

      {
        title: language === "en" ? "Action" : language === "si" ? "ක්‍රියාව" : "நடவடிக்கை",
        width: 100,
        // fixed: "right",
        render: (_, record) => renderAction(record),
      },
    ],
    CMPLN: [

      { title: language === "en" ? "ID" : language === "si" ? "අංකය" : "அடையாள எண்", dataIndex: "id", width: 80, fixed: "left" },
      { title: language === "en" ? "Mobile" : language === "si" ? "දුරකථන අංකය" : "தொலைபேசி", dataIndex: "mobile_number", width: 120 },
      { title: language === "en" ? "Lorry No." : language === "si" ? "ලොරි අංකය" : "லாரி எண்.", dataIndex: "lorry_number", width: 120 },
      { title: language === "en" ? "Complaint Date" : language === "si" ? "පැමිණිලි දිනය" : "புகார் திகதி", dataIndex: "complaint_date", width: 150 },
      { title: language === "en" ? "Role" : language === "si" ? "භූමිකාව" : "பங்கு", dataIndex: "role", width: 120 },

      {
    title: language === "en" ? "Resolved" : language === "si" ? "විසඳා ඇත" : "தீர்க்கப்பட்டது",
        width: 100,
        // fixed: "right",
    render: (_, record) => renderComplaintAction(record),
  },
    ],
    MEA: [
      { title: "ID", dataIndex: "id", width: 80 },
      { title: "Owner", dataIndex: "author", ellipsis: true },
      { title: "License No.", dataIndex: "subject", width: 120 },
      { title: "Mobile", dataIndex: "mobile_number", width: 120 },
      {
        title: "Action",
        width: 100,
        // fixed: "right",
        render: (_, record) => renderAction(record),
      },
    ],
  };

  // Custom field labels mapping
  const fieldLabels = {
    mobile_number: "Contact Number",
    subject: "License Number",
    author: "License Owner",
    due_date: "Expiry Date",
    status: "License Status",
    deed_and_survey_plan: "Deed and Survey Plan",
    detailed_mine_restoration_plan: "Detailed Mine Restoration Plan",
    economic_viability_report: "Economic Viability Report",
    payment_receipt: "Payment Receipt",
    exploration_licence_no: "Exploration Licence No",
    applicant_or_company_name: "Applicant/Company Name",
    land_name: "Land Name",
    land_owner_name: "Land Owner's Name",
    village_name: "Village Name",
    grama_niladhari_division: "Grama Niladhari Division",
    divisional_secretary_division: "Divisional Secretary Division",
    administrative_district: "Administrative District",
    license_number: "Mining License Number",
    license_fee_receipt: "License Fee Receipt",
    lorry_number: "Lorry Number",
    driver_contact: "Driver Contact",
    cubes: "Cubes",
    mining_license_number: "Mining License Number",
    destination: "Destination",

    license_boundary_survey: "License Boundary Survey"

  };

  const getFileIcon = (key, fileType) => {
    if (!fileType) return <FileUnknownOutlined />;

    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FilePdfOutlined style={{ color: "#ff4d4f" }} />;
      case "doc":
      case "docx":
        return <FileWordOutlined style={{ color: "#1890ff" }} />;
      case "xls":
      case "xlsx":
        return <FileExcelOutlined style={{ color: "#52c41a" }} />;
      case "jpg":
      case "jpeg":
      case "png":
        return <FileImageOutlined style={{ color: "#722ed1" }} />;
      case "zip":
      case "rar":
        return <FileZipOutlined style={{ color: "#faad14" }} />;
      default:
        return <FileUnknownOutlined />;
    }
  };

  const renderFileField = (fieldName, displayName, fileUrl) => {
    if (!fileUrl) return null;

    const fileName = fileUrl?.split("/").pop() || "No file";
    const fileType = fileName.split(".").pop();

    return (
      <Form.Item
        label={
          <span style={{ fontWeight: 500, fontSize: "16px" }}>
            {displayName}
          </span>
        }
        name={fieldName}
        style={{ marginBottom: "18px" }}
      >

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5',
              flexGrow: 1

            }}
          >
            {getFileIcon(fieldName, fileType)}
            <Text
              style={{
                marginLeft: "8px",
                color: "#1890ff",
                fontWeight: 500,
              }}
              ellipsis={{ tooltip: fileUrl }}
            >
              {fileName}
            </Text>
          </div> */}
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() =>
              handleDownload(
                fileUrl,
                `${displayName.replace(/\s+/g, "_")}_${currentRecord.id}`
              )
            }
          >
            {language === "en" ? "Download" : language === "si" ? "බාගත කරන්න" : "பதிவிறக்க"}
          </Button>
        </div>
      </Form.Item>
    );
  };

  const renderModalContent = () => {
    if (!currentRecord) return null;

    // Get ML fields to render
    const renderMLFields = () => {
      return (
        <Form
          form={form}
          layout="horizontal"
          initialValues={currentRecord}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
          style={{ fontSize: "16px" }}
        >
          {/* Basic Information */}

          {/* <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>License ID</span>}
            name="id"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item> */}

          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Mining License Number" : language === "si" ? "ඛණිජ බලපත්‍ර අංකය" : "சுரங்க அனுமதி இலக்கம்" }</span>}
            name="license_number"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Valid From" : language === "si" ? "ආරම්භක දිනය" : " செல்லுபடியாகும் தொடக்க திகதி"}</span>}
            name="start_date"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Valid To" : language === "si" ? "අවසන් දිනය" : "செல்லுபடியாகும் இறுதி திகதி "}</span>}
            name="due_date"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Exploration Licence No" : language === "si" ? "ගවේෂණ බලපත්‍ර අංකය" : "ஆய்வு உரிம எண்"}</span>}
            name="exploration_licence_no"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Land Name" : language === "si" ? "ඉඩම් නාමය" : "நிலத்தின் பெயர்"}</span>}
            name="land_name"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Land Owner Name" : language === "si" ? "ඉඩම් හිමිකරු" : "நில உரிமையாளர் பெயர்"}</span>}
            name="land_owner_name"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Village Name" : language === "si" ? "ගම" : "கிராமத்தின் பெயர்"}</span>}
            name="village_name"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Grama Niladhari Division" : language === "si" ? "ග්‍රාම නිලධාරී වසම" : "கிராம அலுவலர் பிரிவு"}</span>}
            name="grama_niladhari_division"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Divisional Secretary Division" : language === "si" ? "ප්‍රාදේශීය ලේකම් කොට්ඨාසය" : "பிரதேச செயலாளர் பிரிவு"}</span>}
            name="divisional_secretary_division"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Administrative District" : language === "si" ? "පරිපාලන දිස්ත්‍රික්කය" : "நிர்வாக மாவட்டம்"}</span>}
            name="administrative_district"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Mobile Number" : language === "si" ? "ජංගම දුරකථන අංකය" : "தொலைபேசி எண்"}</span>}
            name="mobile_number"
            style={{ marginBottom: "18px" }}
          >
            <Input
              disabled={!editableFields.mobile_number}
              style={{
                backgroundColor: editableFields.mobile_number
                  ? "#fff"
                  : "#f9f9f9",
              }}
            />
          </Form.Item>

          {/* Capacity Information */}
          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Capacity" : language === "si" ? "ධාරිතාවය" : "கொள்ளளவு"}</span>}
            name="capacity"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Used" : language === "si" ? "භාවිතා කල ප්‍රමාණය" : "பயன்படுத்தப்பட்டது"}</span>}
            name="used"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Remaining" : language === "si" ? "ඉතිරිව ඇති ප්‍රමාණය" : "மீதமுள்ளவை"}</span>}
            name="remaining"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Royalty" : language === "si" ? "Royalty ගාස්තුව" : "Royalty கட்டணம்"}</span>}
            name="royalty"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Mining License Number" : language === "si" ? "ඛණිජ බලපත්‍ර අංකය" : "சுரங்க உரிம எண்"}</span>}
            name="license_number"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          {/* Document files with download options */}
          {renderFileField("deed_and_survey_plan", language === "en" ? "Deed and Survey Plan" : language === "si" ? "ඔප්පුව සහ මැනුම් සැලැස්ම" : "பத்திரம் மற்றும் கணக்கெடுப்பு திட்டம்", currentRecord.deed_and_survey_plan)}
          {renderFileField("economic_viability_report", language === "en" ? "Economic Viability Report" : language === "si" ? "ආර්ථික ප්‍රතිඵල වාර්තාව" : "பொருளாதார நம்பகத்தன்மை அறிக்கை", currentRecord.economic_viability_report)}
          {renderFileField("detailed_mine_restoration_plan", language === "en" ? "Mine Restoration Plan" : language === "si" ? "ඛණිජ ප්‍රතිසංස්කරණ සැලැස්ම" : "சுரங்க மறுசீரமைப்பு திட்டம்", currentRecord.detailed_mine_restoration_plan)}
          {renderFileField("payment_receipt", language === "en" ? "Payment Receipt" : language === "si" ? "බලපත්‍ර ගාස්තු ගෙවීම් රිසිට්පත" : "பணம் செலுத்திய ரசீது", currentRecord.payment_receipt)}
          {renderFileField("license_boundary_survey", language === "en" ? "License Boundary Survey" : language === "si" ? "බලපත්‍ර සීමා සමීක්ෂණය" : "உரிம எல்லை ஆய்வு", currentRecord.license_boundary_survey)}
        </Form>
      );
    };

    // Get TPL fields to render
    const renderTPLFields = () => {
      return (
        <Form
          form={form}
          layout="horizontal"
          initialValues={currentRecord}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
          style={{ fontSize: "16px" }}
        >

          {/* <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>ID</span>}

            name="id"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />

          </Form.Item> */}

          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Status" : language === "si" ? "තත්වය" : "நிலை"}</span>}

            name="status"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Owner" : language === "si" ? "අයිතිකරු" : "உரிமையாளர்"}</span>}
            name="author"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Due Date" : language === "si" ? "" : "நிலுவைத் திகதி"}</span>}
            name="due_date"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Lorry Number" : language === "si" ? "ලොරි අංකය" : "லாரி எண்"}</span>}

            name="lorry_number"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Driver Contact" : language === "si" ? "රියදුරුගේ දුරකථන අංකය" : "சாரதி தொடர்பு எண்"}</span>}
            name="driver_contact"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Cubes" : language === "si" ? "ධාරිතාවය" : "கனசதுரம்"}</span>}
            name="cubes"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Mining License Number" : language === "si" ? "බලපත්‍ර අංකය" : "சுரங்க உரிம எண்"}</span>}
            name="mining_license_number"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>

          <Form.Item

            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{language === "en" ? "Destination" : language === "si" ? "ගමනාන්තය" : "பயண இலக்கு"}</span>}
            name="destination"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
        </Form>
      );
    };

    return tracker === "ML" ? renderMLFields() : renderTPLFields();
  };

  return (
    <>
      <Table
        dataSource={data.filter((item) => {
          const search = searchText.toLowerCase();
          return (
            item.id?.toString().toLowerCase().includes(search) ||
            item.subject?.toLowerCase().includes(search) ||
            item.assigned_to?.toLowerCase().includes(search) ||
            item.mobile_number?.toLowerCase().includes(search) ||
            item.administrative_district?.toLowerCase().includes(search) ||
            item.status?.toLowerCase().includes(search) ||
            item.royalty?.toLowerCase().includes(search) ||
            item.capacity?.toLowerCase().includes(search) ||
            item.used?.toLowerCase().includes(search) ||
            item.remaining?.toLowerCase().includes(search) ||
            item.mining_license_number?.toLowerCase().includes(search) ||
            item.author?.toLowerCase().includes(search) ||
            item.lorry_number?.toLowerCase().includes(search) ||
            item.driver_contact?.toLowerCase().includes(search) ||
            item.cubes?.toLowerCase().includes(search) ||
            item.destination?.toLowerCase().includes(search) ||
            item.complaint_date?.toLowerCase().includes(search)
          );
        })}
        columns={columns[tracker]}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
        }}
        bordered
        size="middle"
        className="license-table"
        loading={loading}
      />

      <Modal

        title={`${tracker === "ML" ? (language === "en" ? "Mining License Details" : language === "si" ? "ඛනිජ බලපත්‍රය විස්තර" : "சுரங்க உரிம விவரங்கள்")
          : tracker === "TPL" ? (language === "en" ? "Transport License Details" : language === "si" ? "ප්‍රවාහන බලපත්‍රය විස්තර" : "போக்குவரத்து உரிம விவரங்கள்")
            : "License"} - ${currentRecord?.id || ""}`}

        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>

            {language === "en" ? "Close" : language === "si" ? "වසන්න" : " "}
          </Button>

        ]}
        width="70%"
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default LicenseTable;
