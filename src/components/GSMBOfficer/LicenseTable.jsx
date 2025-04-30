import React, { useState, useEffect } from "react";
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
  Progress
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
  ExclamationCircleOutlined
} from "@ant-design/icons";
import officerService from "../../services/officerService";
import dayjs from "dayjs";

const { Option } = Select;
const { Text } = Typography;

const LicenseTable = ({ data, tracker, loading }) => {
  const navigate = useNavigate();
  const [fetchingId, setFetchingId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  // const [statusFilter, setStatusFilter] = useState(null);
  const { language } = useLanguage();
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [relatedTpls, setRelatedTpls] = useState([]);

  const [editableFields] = useState({
    mobile_number: true,
  });

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
      } 
      catch (error) {
        // console.error("Error fetching data:", error);
        // message.error("Failed to fetch data");
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
      {/* <Button
        type="primary"
        size="small"
        loading={fetchingId === record.id}
        icon={fetchingId !== record.id && <EyeOutlined />}
        onClick={(e) => handleViewClick(e, record)}
      >
        View
      </Button> */}
      <Button
        type="primary"
        size="small"
        icon={<span>👁️</span>}
        onClick={(e) => handleViewClick(e, record)}
      >
         {language === "en"
    ? "View"
    : language === "si"
    ? ""
    : "பார்க்க"}
      </Button>
    </div>
  );

  const renderComplaintAction = (record) => (
    <Checkbox
      onChange={(e) => {
        message.info(
          `Complaint ${record.id} ${e.target.checked ? "marked" : "unmarked"}`
        );
      }}
    />
  );

  const columns = {
    ML: [
<<<<<<< HEAD
      { title: "ID", dataIndex: "id", width: 80, fixed: "left" },
      { title: "Owner", dataIndex: "assigned_to", ellipsis: true },
      { title: "License No.", dataIndex: "license_number", width: 120 },
      { title: "Mobile", dataIndex: "mobile_number", width: 120 },
      { title: "Capacity", dataIndex: "capacity", width: 100 },
      { title: "Used", dataIndex: "used", width: 80 },
      { title: "Remaining", dataIndex: "remaining", width: 100 },
      { title: "Royalty", dataIndex: "royalty", width: 100 },
=======

      { title: language === "en" ? "ID" : language === "si" ? "" : "அடையாள எண்", dataIndex: "id", width: 80, fixed: "left" },
      { title: language === "en" ? "Owner" : language === "si" ? "" : "உரிமையாளர்", dataIndex: "assigned_to", ellipsis: true },
      { title: language === "en" ? "License No." : language === "si" ? "" : "உரிம எண்", dataIndex: "subject", width: 120 },
      { title: language === "en" ? "Mobile" : language === "si" ? "" : "தொலைபேசி", dataIndex: "mobile_number", width: 120 },
      { title: language === "en" ? "Capacity" : language === "si" ? "" : "கொள்ளளவு", dataIndex: "capacity", width: 100 },
      { title: language === "en" ? "Used" : language === "si" ? "" : "பயன்படுத்தப்பட்டது", dataIndex: "used", width: 80 },
      { title: language === "en" ? "Remaining" : language === "si" ? "" : "மீதமுள்ளது", dataIndex: "remaining", width: 100 },
      { title: language === "en" ? "Royalty" : language === "si" ? "" : "உரிமத் தொகை", dataIndex: "royalty", width: 100 },

>>>>>>> 2c64d2a33a8d37f0082e7adb280cacb6ec3b6463
      {
        title: language === "en" ? "Valid Period" : language === "si" ? "" : "செல்லுபடியாகும் காலம்",
        width: 200,
        render: (_, record) => (
          <span className="text-nowrap">
            {record.start_date} - {record.due_date}
          </span>
        ),
      },
      {
        title: language === "en" ? "Status" : language === "si" ? "" : "நிலை",
        dataIndex: "status",
        width: 150,
        render: (status) => (
          <span style={{
            color: status === 'valid' ? 'green' : 
                  status === 'me_approved' ? 'blue' : 
                  status === 'pending' ? 'orange' : '#333',
            fontWeight: 500
          }}>
            {status ? status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '-'}
          </span>
        ),
      },
      {
        title: language === "en" ? "Action" : language === "si" ? "" : "நடவடிக்கை",
        width: 100,
        render: (_, record) => renderAction(record),
      },
    ],
    TPL: [

      { title: language === "en" ? "License No." : language === "si" ? "" : "உரிம எண்", dataIndex: "mining_license_number", width: 120 },
      { title: language === "en" ? "Mining Owner" : language === "si" ? "" : "சுரங்க உரிமையாளர்", dataIndex: "author", ellipsis: true },
      // { title: "Driver Name", dataIndex: "lorry_driver_name", width: 150 },
      { title: language === "en" ? "Lorry No." : language === "si" ? "" : "லாரி எண்.", dataIndex: "lorry_number", width: 120 },
      { title: language === "en" ? "Driver Contact" : language === "si" ? "" : "சாரதி தொடர்பு", dataIndex: "driver_contact", width: 140 },
      { title: language === "en" ? "Cubes" : language === "si" ? "" : "கனசதுரங்கள்", dataIndex: "cubes", width: 80 },
      { title: language === "en" ? "Destination" : language === "si" ? "" : "பயண இலக்கு", dataIndex: "destination", ellipsis: true },

      {
        title: language === "en" ? "Action" : language === "si" ? "" : "நடவடிக்கை",
        width: 100,
        // fixed: "right",
        render: (_, record) => renderAction(record),
      },
    ],
    CMPLN: [
<<<<<<< HEAD
      { title: "ID", dataIndex: "id", width: 80, fixed: "left" },
      { title: "Mobile", dataIndex: "mobile_number", width: 120 },
      { title: "Lorry No.", dataIndex: "lorry_number", width: 120 },
=======


      { title: language === "en" ? "ID" : language === "si" ? "" : "அடையாள எண்", dataIndex: "id", width: 80, fixed: "left" },
      { title: language === "en" ? "Mobile" : language === "si" ? "" : "தொலைபேசி", dataIndex: "mobile_number", width: 120 },
      { title: language === "en" ? "Lorry No." : language === "si" ? "" : "லாரி எண்.", dataIndex: "lorry_number", width: 120 },
      { title: language === "en" ? "Complaint Date" : language === "si" ? "" : "புகார் திகதி", dataIndex: "complaint_date", width: 150 },
>>>>>>> 2c64d2a33a8d37f0082e7adb280cacb6ec3b6463
      { title: "Role", dataIndex: "role", width: 120 },

      {
        title: language === "en" ? "Resolved" : language === "si" ? "" : "தீர்க்கப்பட்டது",
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
    deed_survey_plan: "Deed And Survey Plan",
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
    professional: "Professional",
    lorry_number: "Lorry Number",
    driver_contact: "Driver Contact",
    cubes: "Cubes",
    mining_license_number: "Mining License Number",
    destination: "Destination"
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
    
    const fileName = fileUrl?.split('/').pop() || 'No file';
    const fileType = fileName.split('.').pop();
    
    return (
      <Form.Item
        label={<span style={{ fontWeight: 500, fontSize: "16px" }}>{displayName}</span>}
        name={fieldName}
        style={{ marginBottom: "18px" }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
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
                marginLeft: '8px',
                color: '#1890ff',
                fontWeight: 500
              }}
              ellipsis={{ tooltip: fileUrl }}
            >
              {fileName}
            </Text>
          </div>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(fileUrl, `${displayName.replace(/\s+/g, '_')}_${currentRecord.id}`)}
          >
            Download
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
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>License ID</span>}
            name="id"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Mining License Number</span>}
            name="license_number"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Valid From</span>}
            name="start_date"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Valid To</span>}
            name="due_date"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Exploration Licence No</span>}
            name="exploration_licence_no"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Land Name</span>}
            name="land_name"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Land Owner Name</span>}
            name="land_owner_name"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Village Name</span>}
            name="village_name"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Grama Niladhari Division</span>}
            name="grama_niladhari_division"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Divisional Secretary Division</span>}
            name="divisional_secretary_division"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Administrative District</span>}
            name="administrative_district"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Mobile Number</span>}
            name="mobile_number"
            style={{ marginBottom: "18px" }}
          >
            <Input
              disabled={!editableFields.mobile_number}
              style={{
                backgroundColor: editableFields.mobile_number ? "#fff" : "#f9f9f9",
              }}
            />
          </Form.Item>

          {/* Capacity Information */}
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Capacity</span>}
            name="capacity"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Used</span>}
            name="used"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Remaining</span>}
            name="remaining"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Royalty</span>}
            name="royalty"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Mining License Number</span>}
            name="license_number"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          {/* Document files with download options */}
          {renderFileField("economic_viability_report", "Economic Viability Report", currentRecord.economic_viability_report)}
          {renderFileField("license_fee_receipt", "License Fee Receipt", currentRecord.license_fee_receipt)}
          {renderFileField("detailed_mine_restoration_plan", "Mine Restoration Plan", currentRecord.detailed_mine_restoration_plan)}
          {renderFileField("professional", "Professional", currentRecord.professional)}
          {renderFileField("deed_survey_plan", "Deed and Survey Plan", currentRecord.deed_survey_plan)}
          {renderFileField("payment_receipt", "Payment Receipt", currentRecord.payment_receipt)}
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
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>ID</span>}
            name="id"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Status</span>}
            name="status"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Owner</span>}
            name="author"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          {/* <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Start Date</span>}
            name="start_date"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Due Date</span>}
            name="due_date"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item> */}
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Lorry Number</span>}
            name="lorry_number"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Driver Contact</span>}
            name="driver_contact"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Cubes</span>}
            name="cubes"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Mining License Number</span>}
            name="mining_license_number"
            style={{ marginBottom: "18px" }}
          >
            <Input disabled style={{ backgroundColor: "#f9f9f9" }} />
          </Form.Item>
          
          <Form.Item
            label={<span style={{ fontWeight: 500, fontSize: "16px" }}>Destination</span>}
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
        dataSource={data}
        columns={columns[tracker]}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
        }}
        // scroll={{ x: 1500 }}
        // sticky
        bordered
        size="middle"
        className="license-table"
        loading={loading}
      />

      <Modal
        title={`${tracker === "ML" ? "Mining License" : tracker === "TPL" ? "Transport License" : "License"} Details - ${currentRecord?.id || ""}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}

//         footer={
//           <Row justify="center">
//             <Col>
//               <Button
//                 key="update"
//                 type="primary"
//                 onClick={handleUpdate}
//                 style={{
//                   padding: "8px 24px",
//                   height: "auto",
//                   fontSize: "16px",
//                   fontWeight: "500",
//                 }}
//               >
//                 { language === "en" ? "Update" : language === "si" ? "" : "புதுப்பிக்கவும்" }

//               </Button>
//             </Col>
//           </Row>
//         }

        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
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