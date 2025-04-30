import React, { useState } from "react";
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
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";


const { Option } = Select;

const LicenseTable = ({ data, tracker, loading }) => {
  const navigate = useNavigate();
  const [fetchingId, setFetchingId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  // const [statusFilter, setStatusFilter] = useState(null);
  const { language } = useLanguage();

  const [editableFields] = useState({
    mobile_number: true,
  });

  // const statusOptions = [
  //   { value: "pending", label: "Pending" },
  //   { value: "physical_document", label: "Physical Document" },
  //   { value: "awaiting_scheduling", label: "Awaiting ME Scheduling" },
  //   { value: "me_approved", label: "ME Approved" },
  //   { value: "valid", label: "Valid" },
  // ];

  const handleViewClick = async (e, record) => {
    e.preventDefault();
    setFetchingId(record.id);
    setCurrentRecord(record);

    try {
      message.loading({ content: "Fetching details...", key: "fetchDetails" });

      const response = await fetch(
        `http://gsmb.aasait.lk/issues/${record.id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const freshData = await response.json();
      setCurrentRecord(freshData);
      form.setFieldsValue(freshData);
      setIsModalVisible(true);

      message.success({
        content: "Details loaded!",
        key: "fetchDetails",
        duration: 2,
      });
    } catch (error) {
      console.error("Fetch error:", error);
      form.setFieldsValue(record);
      setIsModalVisible(true);
      message.error({
        key: "fetchDetails",
        duration: 3,
      });
    } finally {
      setFetchingId(null);
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      message.loading({
        content: "Updating details...",
        key: "updateStatus",
        duration: 0,
      });

      // Create the payload with only editable fields
      const payload = {};
      Object.keys(editableFields).forEach((key) => {
        if (values[key] !== undefined) {
          payload[key] = values[key];
        }
      });

      const response = await fetch(`/api/issues/${currentRecord.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Handle 422 validation errors specifically
        if (response.status === 422 && errorData.errors) {
          const errorMessages = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("; ");

          throw new Error(`Validation failed: ${errorMessages}`);
        }

        throw new Error(
          errorData.message || `Server responded with status ${response.status}`
        );
      }

      const updatedData = await response.json();

      setCurrentRecord(updatedData);
      form.setFieldsValue(updatedData);

      message.success({
        content: "Details updated successfully!",
        key: "updateStatus",
        duration: 3,
      });

      setIsModalVisible(false);
    } catch (error) {
      console.error("Update error:", error);
      message.error({
        content: error.message.startsWith("Validation failed")
          ? error.message
          : "Failed to update. Please try again.",
        key: "updateStatus",
        duration: 5,
      });
    }
  };

  // const filteredData = data.filter((item) => {
  //   const matchesSearch =
  //     !searchText ||
  //     Object.values(item).some(
  //       (val) =>
  //         val &&
  //         val.toString().toLowerCase().includes(searchText.toLowerCase())
  //     );
      
  //   const matchesStatus =
  //     !statusFilter ||
  //     item.status === statusFilter;
      
  //   return matchesSearch && matchesStatus;
  // });

  const renderAction = (record) => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Button
        type="primary"
        size="small"
        loading={fetchingId === record.id}
        icon={fetchingId !== record.id && <span>👁️</span>}
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
      { title: language === "en" ? "ID" : language === "si" ? "" : "அடையாள எண்", dataIndex: "id", width: 80, fixed: "left" },
      { title: language === "en" ? "Owner" : language === "si" ? "" : "உரிமையாளர்", dataIndex: "assigned_to", ellipsis: true },
      { title: language === "en" ? "License No." : language === "si" ? "" : "உரிம எண்", dataIndex: "subject", width: 120 },
      { title: language === "en" ? "Mobile" : language === "si" ? "" : "தொலைபேசி", dataIndex: "mobile_number", width: 120 },
      { title: language === "en" ? "Capacity" : language === "si" ? "" : "கொள்ளளவு", dataIndex: "capacity", width: 100 },
      { title: language === "en" ? "Used" : language === "si" ? "" : "பயன்படுத்தப்பட்டது", dataIndex: "used", width: 80 },
      { title: language === "en" ? "Remaining" : language === "si" ? "" : "மீதமுள்ளது", dataIndex: "remaining", width: 100 },
      { title: language === "en" ? "Royalty" : language === "si" ? "" : "உரிமத் தொகை", dataIndex: "royalty", width: 100 },
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
        fixed: "right",
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
        fixed: "right",
        render: (_, record) => renderAction(record),
      },
    ],
    CMPLN: [
      { title: language === "en" ? "ID" : language === "si" ? "" : "அடையாள எண்", dataIndex: "id", width: 80, fixed: "left" },
      { title: language === "en" ? "Mobile" : language === "si" ? "" : "தொலைபேசி", dataIndex: "mobile_number", width: 120 },
      { title: language === "en" ? "Lorry No." : language === "si" ? "" : "லாரி எண்.", dataIndex: "lorry_number", width: 120 },
      { title: language === "en" ? "Complaint Date" : language === "si" ? "" : "புகார் திகதி", dataIndex: "complaint_date", width: 150 },
      {
        title: language === "en" ? "Resolved" : language === "si" ? "" : "தீர்க்கப்பட்டது",
        width: 100,
        fixed: "right",
        render: (_, record) => renderComplaintAction(record),
      },
    ],
    MEA: [
      { title: "ID", dataIndex: "id", width: 80, fixed: "left" },
      { title: "Owner", dataIndex: "author", ellipsis: true },
      { title: "License No.", dataIndex: "subject", width: 120 },
      { title: "Mobile", dataIndex: "mobile_number", width: 120 },
      {
        title: "Action",
        width: 100,
        fixed: "right",
        render: (_, record) => renderAction(record),
      },
    ],
  };

  const excludedFields = [
    "tracker",
    "payment_receipt",
    "professional",
    "assigned_to",
    "author",
    "applicant_or_company_name",
    "detailed_mine_restoration_plan",
    "economic_viability_report",
    "license_fee_receipt",
    "licensed_boundary_survey",
  ];

  const fieldOrder = [
    "id",
    "subject",
    "mining_license_number",
    "assigned_to",
    "author",
    "mobile_number",
    "driver_contact",
    "lorry_number",
    "lorry_driver_name",
    "capacity",
    "used",
    "remaining",
    "royalty",
    "start_date",
    "due_date",
    "startDate",
    "destination",
  ];

  const renderModalContent = () => {
    if (!currentRecord) return null;

    const orderedEntries = Object.entries(currentRecord)
      .filter(([key]) => !excludedFields.includes(key))
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
        initialValues={currentRecord}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        style={{ fontSize: "16px" }}
      >
        {orderedEntries.map(([key]) => (
          <Form.Item
            label={
              <span style={{ fontWeight: 500, fontSize: "16px" }}>
                {key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            }
            name={key}
            key={key}
            style={{ marginBottom: "18px" }}
          >
            <Input
              disabled={!editableFields[key]} // Only enable fields marked as editable
              style={{
                fontSize: "16px",
                height: "40px",
                backgroundColor: editableFields[key] ? "#fff" : "#f9f9f9",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                color: "#333",
              }}
            />
          </Form.Item>
        ))}
      </Form>
    );
  };

  return (
    <>
          {/* {tracker === "ML" && (
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
      )} */}

      <Table
        dataSource={data}
        columns={columns[tracker]}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
        }}
        scroll={{ x: 1500 }}
        sticky
        bordered
        size="middle"
        className="license-table"
        loading={loading}
      />

      <Modal
        title={
          <div
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#8B0000", // Dark red color
              padding: "16px 24px",
              borderBottom: "1px solid #000", // Black border bottom
              background: "#FFF5F5", // Very light red background
              borderRadius: "2px 2px 0 0",
              margin: 0,
            }}
          >
            {`License Details - ${currentRecord?.id || ""}`}
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <Row justify="center">
            <Col>
              <Button
                key="update"
                type="primary"
                onClick={handleUpdate}
                style={{
                  padding: "8px 24px",
                  height: "auto",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                { language === "en" ? "Update" : language === "si" ? "" : "புதுப்பிக்கவும்" }

              </Button>
            </Col>
          </Row>
        }
        width="70%"
        bodyStyle={{
          padding: "24px",
          maxHeight: "70vh",
          overflowY: "auto",
        }}
        style={{
          top: "20px",
          borderRadius: "8px",
          overflow: "hidden",
          padding: 0,
        }}
        maskStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        }}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default LicenseTable;
