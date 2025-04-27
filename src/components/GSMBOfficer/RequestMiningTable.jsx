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
  DatePicker,
  TimePicker,
} from "antd";
import { getMlRequest, physicalMeeting } from "../../services/officerService";
//import { physicalMeeting } from '../../services/officerService';
import { notification } from "antd";

const { Link } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const RequestMiningTable = () => {
  // --- State Variables ---
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

  // New states for appointment scheduling
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] =
    useState(false);
  const [appointmentForm] = Form.useForm();
  const [appointmentLoading, setAppointmentLoading] = useState(false);

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
  const renderAction = (_, record) => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Button
        type="primary"
        size="small"
        icon={<span>👁️</span>}
        onClick={() => handleViewClick(record)}
      >
        View
      </Button>
      <Button
        type="default"
        size="small"
        icon={<span>🗓️</span>}
        onClick={() => handleScheduleAppointment(record)}
      >
        Schedule
      </Button>
    </div>
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80, fixed: "left" },
    {
      title: "Request Subject",
      dataIndex: "subject",
      key: "subject",
      width: 200,
    },
    {
      title: "Assigned To",
      dataIndex: "assigned_to",
      key: "assigned_to",
      width: 150,
      render: (text) => text || "-",
    },
    {
      title: "Mobile",
      dataIndex: "mobile_number",
      key: "mobile_number",
      width: 150,
      render: (text) => text || "-",
    },
    {
      title: "District",
      dataIndex: "administrative_district",
      key: "administrative_district",
      width: 150,
      render: (text) => text || "-",
    },
    {
      title: "Date Created",
      dataIndex: "created_on",
      key: "created_on",
      width: 120,
      render: (text) => (text ? text.split("T")[0] : "-"),
    },
    { title: "Status", dataIndex: "status", key: "status", width: 100 },
    {
      title: "Action",
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
                placeholder="Filter by status"
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
                Reset Filters
              </Button>
            </Col>
          </Row>
        </div>
      <Table
        dataSource={filteredData}
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
                Cancel
              </Button>
              <Button
                key="update"
                type="primary"
                onClick={handleUpdate}
                loading={updateLoading}
              >
                Update Details
              </Button>
            </Col>
          </Row>
        }
        width="60%"
        styles={{
          header: {
            padding: 0,
            margin: 0,
            borderBottom: "none",
            borderRadius: "8px 8px 0 0",
            overflow: "hidden",
          },
          body: { padding: "24px", maxHeight: "70vh", overflowY: "auto" },
          footer: {
            padding: "10px 24px",
            borderTop: "1px solid #f0f0f0",
            margin: 0,
          },
          mask: { backgroundColor: "rgba(0, 0, 0, 0.45)" },
          content: { padding: 0, borderRadius: "8px" },
        }}
        destroyOnClose
        maskClosable={!updateLoading}
        keyboard={!updateLoading}
        style={{ top: "5vh", borderRadius: "8px", overflow: "hidden" }}
      >
        {renderModalContent()}
      </Modal>

      {/* Appointment Scheduling Modal */}
      <Modal
        title={
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#404040",
              backgroundColor: "#ece4e4",
              padding: "16px 24px",
              marginTop: "5px",
              marginLeft: "5px",
              marginRight: "5px",
              borderBottom: "2px solid #810202",
              margin: "-16px -24px 0",
              textAlign: "center",
            }}
          >
            {`Schedule Appointment - ${
              currentRecord?.subject || currentRecord?.id || "N/A"
            }`}
          </div>
        }
        open={isAppointmentModalVisible}
        onCancel={() => setIsAppointmentModalVisible(false)}
        footer={
          <Row justify="center" style={{ padding: "10px 0" }}>
            <Col>
              <Button
                key="submit"
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                style={{
                  background: "#a30000",
                  background:
                    "linear-gradient(181deg, rgba(163,0,0,1) 0%, rgba(199,87,87,1) 50%, rgb(188, 0, 0) 100%)",
                  border: "none",
                  color: "white",
                  fontWeight: 500,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  width: "200px", // Optional: Set a fixed width
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "inear-gradient(181deg, rgba(163,0,0,1) 0%, rgba(199,87,87,1) 50%, rgb(188, 0, 0) 100%),150,83,1) 100%)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                }}
              >
                Schedule Appointment
              </Button>
            </Col>
          </Row>
        }
        width={600}
        styles={{
          header: {
            padding: 0,
            margin: 0,
            borderBottom: "none",
            borderRadius: "8px 8px 0 0",
            overflow: "hidden",
          },
          body: { padding: "24px", maxHeight: "70vh", overflowY: "auto" },
          footer: {
            padding: "10px 24px",
            borderTop: "1px solid #f0f0f0",
            margin: 0,
          },
          mask: { backgroundColor: "rgba(0, 0, 0, 0.45)" },
          content: { padding: 0, borderRadius: "8px" },
        }}
        destroyOnClose
        maskClosable={!appointmentLoading}
        keyboard={!appointmentLoading}
      >
        <Form
          form={appointmentForm}
          layout="vertical"
          style={{ marginTop: 16 }}
        >
          <Form.Item
            label="Appointment Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter the location" }]}
          >
            <Input placeholder="Enter meeting location" />
          </Form.Item>

          <Form.Item label="Purpose/Notes" name="notes">
            <TextArea
              rows={4}
              placeholder="Enter any additional notes or purpose of the meeting"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RequestMiningTable;
