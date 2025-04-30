import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  message,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Spin,
  Select,
  Typography,
  Tag,
} from "antd";
import { getMlRequest, physicalMeeting } from "../../services/officerService";
import { notification } from "antd";
import ScheduleAppointmentModal from '../GSMBOfficer/ML Req/ScheduleAppointmentModal';
import PhysicalMeetingModal from '../GSMBOfficer/ML Req/PhysicalMeetingModal';
import ValidateModal from '../GSMBOfficer/ML Req/ValidateModal';
import { useLanguage } from "../../contexts/LanguageContext";


const { Link } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const RequestMiningTable = () => {
  // --- State Variables ---
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [mlRequestData, setMlRequestData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [form] = Form.useForm();
  const [statusFilter, setStatusFilter] = useState(null);
  const [searchText, setSearchText] = useState("");

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Physical document", label: "Physical Document" },
    { value: "awaiting_scheduling", label: "Awaiting ME Scheduling" },
    { value: "ME Approved", label: "ME Approved" },
    { value: "Valid", label: "Valid" },
    { value: "Rejected", label: "Rejected" },
  ];

  const filteredData = mlRequestData.filter((item) => {    
    const matchesStatus =
      !statusFilter ||
      item.status === statusFilter;
      
    return matchesStatus;
  });

  // States for appointment scheduling
const [isAppointmentModalVisible, setIsAppointmentModalVisible] = useState(false);
const [appointmentForm] = Form.useForm();
const [appointmentLoading, setAppointmentLoading] = useState(false);
  // States for physical meeting Schedule
const [isPhysicalMeetingModalVisible, setIsPhysicalMeetingModalVisible] = useState(false);
const [physicalMeetingForm] = Form.useForm();
const [physicalMeetingLoading, setPhysicalMeetingLoading] = useState(false);
// States for validation
const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);
const [validateForm] = Form.useForm();
const [validateLoading, setValidateLoading] = useState(false);

  const [editableFields] = useState({
    mobile_number: true,
  });

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchMlRequestData = async () => {
      setLoading(true);
      try {
        const response = await getMlRequest();
        console.log("ML Request Data from service:", response);
        const fetchedData = response?.data || response;
        setMlRequestData(Array.isArray(fetchedData) ? fetchedData : []);
      } catch (error) {
        console.error("Error fetching ML request data:", error);
        message.error("Failed to fetch Mining License Requests.");
        setMlRequestData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMlRequestData();
  }, []);

  // --- Event Handlers ---
  const handleViewClick = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleScheduleAppointment = (record) => {
    setCurrentRecord(record);
    appointmentForm.resetFields();
    setIsAppointmentModalVisible(true);
  };

  const handleUpdatePhysicalMeetingStatus = (record) => {
    setCurrentRecord(record);
    setIsPhysicalMeetingModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      setAppointmentLoading(true);
      const values = await appointmentForm.validateFields();

      const payload = {
        assigned_to_id: currentRecord?.assigned_to_details?.id || "",
        physical_meeting_location: values.location,
        start_date: values.date.format("YYYY-MM-DD"),
        description: values.notes || "",
      };
      console.log("physical meeting ", payload);
      await physicalMeeting(payload);

      notification.success({
        message: "Success",
        description: "Appointment scheduled successfully!",
      });

      setIsAppointmentModalVisible(false);
      appointmentForm.resetFields();
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      notification.error({
        message: "Error",
        description:
          error.response?.data?.error ||
          error.message ||
          "Failed to schedule appointment",
      });
    } finally {
      setAppointmentLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setUpdateLoading(true);
      message.loading({
        content: "Updating details...",
        key: "updateStatus",
        duration: 0,
      });
  
      const payload = {};
      let hasChanges = false;
      Object.keys(editableFields).forEach((key) => {
        if (editableFields[key] && values[key] !== currentRecord?.[key]) {
          payload[key] = values[key];
          hasChanges = true;
        }
      });
  
      if (!hasChanges) {
        message.info({
          content: "No changes detected.",
          key: "updateStatus",
          duration: 2,
        });
        setIsModalVisible(false);
        setUpdateLoading(false);
        return;
      }
  
      console.log("Update Payload:", payload);
      // Here you would typically call your API to update the record
      // For example: await updateMlRequest(currentRecord.id, payload);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
  
      message.success({
        content: "Details updated successfully!",
        key: "updateStatus",
        duration: 3,
      });
  
      setMlRequestData((prevData) =>
        prevData.map((item) =>
          item.id === currentRecord.id ? { ...item, ...payload } : item
        )
      );
  
      setIsModalVisible(false);
    } catch (error) {
      console.error("Update error:", error);
      message.error({
        content: `Update failed: ${
          error.errorFields ? "Validation failed." : "Please try again."
        }`,
        key: "updateStatus",
        duration: 5,
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  // --- Render Functions ---
  const renderAction = (_, record) => {
    const restrictedStatuses = [
      "Awaiting ME Scheduling",
      "ME Appointment Scheduled",
      "Hold",
      "Rejected"
    ];
    
    const isRestrictedStatus = restrictedStatuses.includes(record.status);
    const isMEApproved = record.status === "ME Approved";
    const isPhysicalDocument = record.status?.toLowerCase() === "physical document";
    
    return (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          type="primary"
          size="small"
          icon={<span>👁️</span>}
          onClick={() => handleViewClick(record)}
        >
          {language === "en"
    ? "View"
    : language === "si"
    ? ""
    : "பார்க்க"}
        </Button>
        
        {isMEApproved ? (
          <Button
            type="primary"
            size="small"
            icon={<span>✅</span>}
            onClick={() => handleValidateLicense(record)}
            style={{ backgroundColor: '#ffffff', borderColor: '#52c41a', color:'#52c41a'}}
          >
              {language === "en"
    ? "Validate the license"
    : language === "si"
    ? ""
    : "அனுமதி உரிமத்தை சரிபார்க்கவும்"}

          </Button>
        ) : !isRestrictedStatus && (
          isPhysicalDocument ? (
            <Button
              type="default"
              size="small"
              icon={<span>📝</span>}
              onClick={() => handleUpdatePhysicalMeetingStatus(record)}
              style={{ backgroundColor: '#f0f0f0', borderColor: '#d9d9d9' }}
            >
              {language === "en"
    ? "Physical Meeting Status"
    : language === "si"
    ? ""
    : "நிகழ்நிலை சந்திப்பு நிலை"}
            </Button>
          ) : (          
            <Button
              type="default"
              size="small"
              icon={<span>🗓️</span>}
              onClick={() => handleScheduleAppointment(record)}
            >
                {language === "en"
    ? "Schedule"
    : language === "si"
    ? ""
    : "திட்டமிடு"}
            </Button>
          )
        )}
      </div>
    );
  };

  const handleValidateLicense = (record) => {
    setCurrentRecord(record);
    validateForm.resetFields();
    setIsValidateModalVisible(true);
  };

  const handleApprovePhysicalMeeting = async (values) => {
    try {
      setPhysicalMeetingLoading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('id', currentRecord.id);
      formData.append('receipt', values.receipt[0].originFileObj);
      formData.append('comments', values.comments);
      formData.append('status', 'approved');
  
      // Call your API here
      // Example: await updatePhysicalMeetingStatus(formData);
      console.log('Approval payload:', {
        id: currentRecord.id,
        receipt: values.receipt[0].originFileObj.name,
        comments: values.comments,
      });
  
      message.success('Physical meeting approved successfully');
      setIsPhysicalMeetingModalVisible(false);
      
      // Refresh the table data
      // await fetchMlRequestData();
    } catch (error) {
      console.error('Approval error:', error);
      message.error(error.response?.data?.message || 'Failed to approve physical meeting');
    } finally {
      setPhysicalMeetingLoading(false);
    }
  };
  
  const handleRejectPhysicalMeeting = async (values) => {
    try {
      setPhysicalMeetingLoading(true);
      
      const formData = new FormData();
      formData.append('id', currentRecord.id);
      if (values.receipt && values.receipt[0]) {
        formData.append('receipt', values.receipt[0].originFileObj);
      }
      formData.append('comments', values.comments);
      formData.append('status', 'rejected');
  
      // Call your API here
      // Example: await updatePhysicalMeetingStatus(formData);
      console.log('Rejection payload:', {
        id: currentRecord.id,
        receipt: values.receipt?.[0]?.originFileObj?.name,
        comments: values.comments,
      });
  
      message.success('Physical meeting rejected');
      setIsPhysicalMeetingModalVisible(false);
      
      // Refresh the table data
      // await fetchMlRequestData();
    } catch (error) {
      console.error('Rejection error:', error);
      message.error(error.response?.data?.message || 'Failed to reject physical meeting');
    } finally {
      setPhysicalMeetingLoading(false);
    }
  };

  const handleValidateLicenseSubmit = async (values) => {
    try {
      setValidateLoading(true);
      
      // Prepare payload for validation
      const payload = {
        id: currentRecord.id,
        comments: values.comments,
        status: 'valid' // or whatever status indicates validation
      };
  
      // Call your API here
      // Example: await validateLicense(payload);
      console.log('Validation payload:', payload);
  
      message.success('License validated successfully');
      setIsValidateModalVisible(false);
      
      // Refresh the table data
      // await fetchMlRequestData();
    } catch (error) {
      console.error('Validation error:', error);
      message.error(error.response?.data?.message || 'Failed to validate license');
    } finally {
      setValidateLoading(false);
    }
  };
  
  const handleRejectLicense = async (values) => {
    try {
      setValidateLoading(true);
      
      const payload = {
        id: currentRecord.id,
        comments: values.comments,
        status: 'rejected'
      };
  
      // Call your API here
      // Example: await rejectLicense(payload);
      console.log('Rejection payload:', payload);
  
      message.success('License rejected');
      setIsValidateModalVisible(false);
      
      // Refresh the table data
      // await fetchMlRequestData();
    } catch (error) {
      console.error('Rejection error:', error);
      message.error(error.response?.data?.message || 'Failed to reject license');
    } finally {
      setValidateLoading(false);
    }
  };

  const renderStatus = (status) => {
    if (!status) {
      return <Tag color="default">Unknown</Tag>;
    }
  
    const lowerStatus = status.toLowerCase();
    const statusColors = {
      'pending': 'orange',
      'rejected': 'red',
      'physical document': 'blue',
      'valid': 'green',
      'me approved': 'green',
      'awaiting me scheduling': 'yellow',
      'me appointment scheduled': 'yellow',
      'hold': 'yellow',
    };
  
    const color = statusColors[lowerStatus] || 'default';
  
    return (
      <Tag color={color} style={{ textTransform: 'capitalize' }}>
        {status}
      </Tag>
    );
  };
  
  const columns = [
    { title:
      language === "en"
        ? "ID"
        : language === "si"
        ? ""
        : "அடையாள எண்", dataIndex: "id", key: "id", width: 80, fixed: "left" },
    {
      title:
  language === "en"
    ? "Request Subject"
    : language === "si"
    ? " "
    : "கோரிக்கையின் தலைப்பு",
      dataIndex: "subject",
      key: "subject",
      width: 200,
    },
    {
      title:
  language === "en"
    ? "Assigned To"
    : language === "si"
    ? " "
    : "ஒதுக்கப்பட்டவர்",
      dataIndex: "assigned_to",
      key: "assigned_to",
      width: 150,
      render: (text) => text || "-",
    },
    {
      title:
  language === "en"
    ? "Mobile"
    : language === "si"
    ? ""
    : "தொலைபேசி",
      dataIndex: "mobile_number",
      key: "mobile_number",
      width: 150,
      render: (text) => text || "-",
    },
    {
      title:
  language === "en"
    ? "District"
    : language === "si"
    ? ""
    : "மாவட்டம்",
      dataIndex: "administrative_district",
      key: "administrative_district",
      width: 150,
      render: (text) => text || "-",
    },
    {
      title:
  language === "en"
    ? "Date Created"
    : language === "si"
    ? ""
    : "உருவாக்கப்பட்ட திகதி",
      dataIndex: "created_on",
      key: "created_on",
      width: 120,
      render: (text) => (text ? text.split("T")[0] : "-"),
    },
    { 
      title:
  language === "en"
    ? "Status"
    : language === "si"
    ? ""
    : "நிலை", 
      dataIndex: "status", 
      key: "status", 
      width: 100,
      render: renderStatus 
    },
    {
      title:
  language === "en"
    ? "Action"
    : language === "si"
    ? ""
    : "நடவடிக்கை",
      key: "action",
      width: 150,
      fixed: "right",
      render: renderAction,
    },
  ];

  const excludedFields = ["assigned_to_details"];

  const fieldOrder = [
    "id",
    "subject",
    "status",
    "assigned_to",
    "created_on",
    "mobile_number",
    "land_name",
    "land_owner_name",
    "village_name",
    "grama_niladhari_division",
    "divisional_secretary_division",
    "administrative_district",
    "google_location",
    "exploration_licence_no",
    "detailed_mine_restoration_plan",
    "deed_and_survey_plan",
    "payment_receipt",
  ];

  const urlFields = [
    "detailed_mine_restoration_plan",
    "deed_and_survey_plan",
    "payment_receipt",
    "google_location",
  ];


  const renderModalContent = () => {
    if (!currentRecord) return <Spin tip="Loading details..." />;

    const recordEntries = Object.entries(currentRecord);

    const filteredAndSortedEntries = recordEntries
      .filter(
        ([key, value]) =>
          !excludedFields.includes(key) && value !== null && value !== undefined
      )
      .sort(([a], [b]) => {
        const indexA = fieldOrder.indexOf(a);
        const indexB = fieldOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });

    return (
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        labelAlign="left"
      >
        {filteredAndSortedEntries.map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            console.warn(`Skipping rendering object field in modal: ${key}`);
            return null;
          }

          const isEditable = !!editableFields[key];
          const isUrl =
            urlFields.includes(key) &&
            typeof value === "string" &&
            value.trim().startsWith("http");
          const displayValue =
            key === "created_on" && typeof value === "string"
              ? value.split("T")[0]
              : String(value ?? "");

          const label = key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <Form.Item
              label={<span style={{ fontWeight: 500 }}>{label}</span>}
              name={key}
              key={key}
              style={{ marginBottom: 12 }}
            >
              {isUrl ? (
                <Link
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  ellipsis
                >
                  {value}
                </Link>
              ) : (
                <Input
                  readOnly={!isEditable}
                  style={{
                    backgroundColor: isEditable ? "#fff" : "#f5f5f5",
                    color: isEditable ? "inherit" : "rgba(0, 0, 0, 0.85)",
                    cursor: isEditable ? "auto" : "default",
                  }}
                />
              )}
            </Form.Item>
          );
        })}
      </Form>
    );
  };

  // --- Component Return ---
 return (
    <>
    <div style={{ marginBottom: 16 }}>
          <Row gutter={16} align="middle">
            <Col>
              <Select
                placeholder={
                  language === "en"
                    ? "Filter by status"
                    : language === "si"
                    ? ""
                    : "நிலையின் அடிப்படையில் வடிகட்டவும்"
                }
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 200 }}
                allowClear
              >
                {statusOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Col>
            
            <Col>
              <Button
                type="default"
                onClick={() => {
                  setSearchText("");
                  setStatusFilter(null);
                }}
              >
                 {language === "en"
    ? "Reset Filters"
    : language === "si"
    ? ""
    : "வடிகட்டிகளை மீட்டமைக்கவும்"}
              </Button>
            </Col>
          </Row>
        </div>
      <Table
        dataSource={mlRequestData.filter(item => item.status?.toLowerCase() !== "valid")}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        scroll={{ x: "max-content" }}
        sticky
        bordered
        size="middle"
        loading={loading}
      />

      {/* Details Modal */}
      <Modal
        title={
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1677ff",
              padding: "16px 24px",
              borderBottom: "1px solid #f0f0f0",
              margin: "-16px -24px 0",
            }}
          >
            {`Mining Request Details - ${
              currentRecord?.subject || currentRecord?.id || "N/A"
            }`}
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <Row justify="end" style={{ padding: "10px 0" }}>
            <Col>
              <Button
                key="cancel"
                onClick={() => setIsModalVisible(false)}
                style={{ marginRight: 8 }}
                disabled={updateLoading}
              >
                {language === "en"
    ? "Cancel"
    : language === "si"
    ? " "
    : "ரத்து செய்க"}
              </Button>
              <Button
                key="update"
                type="primary"
                onClick={handleUpdate}
                loading={updateLoading}
              >
                {language === "en"
    ? "Update Details"
    : language === "si"
    ? ""
    : "விவரங்களைப் புதுப்பிக்கவும்"}
              </Button>
            </Col>
          </Row>
        }
        width="60%"
        destroyOnClose
        maskClosable={!updateLoading}
        keyboard={!updateLoading}
      >
        {renderModalContent()}
      </Modal>

      {/* Appointment Scheduling Modal */}
        <ScheduleAppointmentModal
         visible={isAppointmentModalVisible}
         onCancel={() => setIsAppointmentModalVisible(false)}
         onSubmit={handleSubmit}
         loading={appointmentLoading}
         form={appointmentForm}
        />

      {/* physical meting update Modal */}
      <PhysicalMeetingModal
      visible={isPhysicalMeetingModalVisible}
      onCancel={() => {
        setIsPhysicalMeetingModalVisible(false);
        physicalMeetingForm.resetFields();
      }}
      onApprove={handleApprovePhysicalMeeting}
      onReject={handleRejectPhysicalMeeting}
      loading={physicalMeetingLoading}
      form={physicalMeetingForm}
    />

    {/* Add this with your other modals */}
<ValidateModal
  visible={isValidateModalVisible}
  onCancel={() => {
    setIsValidateModalVisible(false);
    validateForm.resetFields();
  }}
  onValidate={handleValidateLicenseSubmit}
  onReject={handleRejectLicense}
  loading={validateLoading}
  form={validateForm}
/>
    
    </>
  );
};

export default RequestMiningTable;