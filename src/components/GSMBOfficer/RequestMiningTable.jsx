import React, { useState } from "react";
import {
  Table,
  Button,
  message,
  Modal,
  Form,
  Input,
  Row,
  Col,
} from "antd";

// Hardcoded data with only the requested fields
const hardcodedData = [
  {
    id: "MR-2023-0045",
    applicantName: "Eastern Minerals Ltd.",
    requestNumber: "REQ-23-786",
    mobile_number: "+250789123456",
    mineralType: "Limestone",
    district: "Rulindo",
    province: "Northern",
    quantity: "5000 tons",
    requestedDate: "2023-05-12",
    estimatedEndDate: "2023-11-12"
  }
];

const RequestMiningTable = () => {
  const [fetchingId, setFetchingId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [editableFields] = useState({
    mobile_number: true,
  });

  const handleViewClick = (e, record) => {
    e.preventDefault();
    setFetchingId(record.id);
    
    // Mock loading message
    message.loading({ content: "Fetching details...", key: "fetchDetails" });
    
    // Set current record without fetching
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
    
    // Success message
    message.success({
      content: "Details loaded!",
      key: "fetchDetails",
      duration: 2,
    });
    
    setFetchingId(null);
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
      // Mock update - just show success message
      setTimeout(() => {
        message.success({
          content: "Details updated successfully!",
          key: "updateStatus",
          duration: 3,
        });
        setIsModalVisible(false);
      }, 1000);
    } catch (error) {
      console.error("Update error:", error);
      message.error({
        content: "Failed to update. Please try again.",
        key: "updateStatus",
        duration: 5,
      });
    }
  };

  const renderAction = (record) => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Button
        type="primary"
        size="small"
        loading={fetchingId === record.id}
        icon={fetchingId !== record.id && <span>👁️</span>}
        onClick={(e) => handleViewClick(e, record)}
      >
        View
      </Button>
    </div>
  );

  const columns = [
    { title: "ID", dataIndex: "id", width: 80, fixed: "left" },
    { title: "Owner", dataIndex: "applicantName", ellipsis: true },
    { title: "Request No.", dataIndex: "requestNumber", width: 120 },
    { title: "Mobile", dataIndex: "mobile_number", width: 120 },
    { title: "Mineral Type", dataIndex: "mineralType", width: 100 },
    { title: "Location", dataIndex: "district", width: 120 },
    { title: "Quantity", dataIndex: "quantity", width: 80 },
    {
      title: "Request Period",
      width: 200,
      render: (_, record) => (
        <span className="text-nowrap">
          {record.requestedDate} - {record.estimatedEndDate}
        </span>
      ),
    },
    {
      title: "Action",
      width: 100,
      fixed: "right",
      render: (_, record) => renderAction(record),
    },
  ];

  const excludedFields = [
    "tracker",
    "payment_receipt",
    "professional",
    "assigned_to",
    "author",
    "detailed_mine_restoration_plan",
    "economic_viability_report",
    "license_fee_receipt",
    "licensed_boundary_survey",
  ];

  const fieldOrder = [
    "id",
    "applicantName",
    "requestNumber",
    "mobile_number",
    "mineralType",
    "district",
    "province",
    "quantity",
    "requestedDate",
    "estimatedEndDate",
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
      <Table
        dataSource={hardcodedData}
        columns={columns}
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
        loading={false}
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
            {`Mining Request Details - ${currentRecord?.id || ""}`}
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
                Update
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

export default RequestMiningTable;