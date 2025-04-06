import React, { useState } from "react";
import { Table, Button, Checkbox, message, Modal, Form, Input, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";

const LicenseTable = ({ data, tracker, loading }) => {
  const navigate = useNavigate();
  const [fetchingId, setFetchingId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const [editableFields] = useState({
    mobile_number: true,
  });

  const handleViewClick = async (e, record) => {
    e.preventDefault();
    setFetchingId(record.id);
    setCurrentRecord(record);

    try {
      message.loading({ content: 'Fetching details...', key: 'fetchDetails' });

      const response = await fetch(`http://gsmb.aasait.lk/issues/${record.id}`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const freshData = await response.json();
      setCurrentRecord(freshData);
      form.setFieldsValue(freshData);
      setIsModalVisible(true);

      message.success({ content: 'Details loaded!', key: 'fetchDetails', duration: 2 });
    } catch (error) {
      console.error("Fetch error:", error);
      form.setFieldsValue(record);
      setIsModalVisible(true);
      message.error({
        key: 'fetchDetails',
        duration: 3,
      });
    } finally {
      setFetchingId(null);
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      
      message.loading({ content: 'Updating details...', key: 'updateStatus', duration: 0 });
      
      // Create the payload with only editable fields
      const payload = {};
      Object.keys(editableFields).forEach(key => {
        if (values[key] !== undefined) {
          payload[key] = values[key];
        }
      });
  
      const response = await fetch(`/api/issues/${currentRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle 422 validation errors specifically
        if (response.status === 422 && errorData.errors) {
          const errorMessages = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('; ');
          
          throw new Error(`Validation failed: ${errorMessages}`);
        }
        
        throw new Error(errorData.message || `Server responded with status ${response.status}`);
      }
  
      const updatedData = await response.json();
      
      setCurrentRecord(updatedData);
      form.setFieldsValue(updatedData);
      
      message.success({ 
        content: 'Details updated successfully!', 
        key: 'updateStatus', 
        duration: 3 
      });
      
      setIsModalVisible(false);
      
    } catch (error) {
      console.error("Update error:", error);
      message.error({
        content: error.message.startsWith('Validation failed') 
          ? error.message 
          : 'Failed to update. Please try again.',
        key: 'updateStatus',
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

  const renderComplaintAction = (record) => (
    <Checkbox
      onChange={(e) => {
        message.info(`Complaint ${record.id} ${e.target.checked ? 'marked' : 'unmarked'}`);
      }}
    />
  );

  const columns = {
    ML: [
      { title: "ID", dataIndex: "id", width: 80, fixed: 'left' },
      { title: "Owner", dataIndex: "assigned_to", ellipsis: true },
      { title: "License No.", dataIndex: "subject", width: 120 },
      { title: "Mobile", dataIndex: "mobile_number", width: 120 },
      { title: "Capacity", dataIndex: "capacity", width: 100 },
      { title: "Used", dataIndex: "used", width: 80 },
      { title: "Remaining", dataIndex: "remaining", width: 100 },
      { title: "Royalty", dataIndex: "royalty", width: 100 },
      {
        title: "Valid Period",
        width: 200,
        render: (_, record) => (
          <span className="text-nowrap">
            {record.start_date} - {record.due_date}
          </span>
        ),
      },
      {
        title: "Action",
        width: 100,
        fixed: 'right',
        render: (_, record) => renderAction(record),
      },
    ],
    TPL: [
      { title: "License No.", dataIndex: "mining_license_number", width: 120 },
      { title: "Mining Owner", dataIndex: "author", ellipsis: true },
      { title: "Driver Name", dataIndex: "lorry_driver_name", width: 150 },
      { title: "Lorry No.", dataIndex: "lorry_number", width: 120 },
      { title: "Driver Contact", dataIndex: "driver_contact", width: 140 },
      { title: "Cubes", dataIndex: "cubes", width: 80 },
      { title: "Destination", dataIndex: "destination", ellipsis: true },
      {
        title: "Action",
        width: 100,
        fixed: 'right',
        render: (_, record) => renderAction(record),
      },
    ],
    CMPLN: [
      { title: "ID", dataIndex: "id", width: 80, fixed: 'left' },
      { title: "Mobile", dataIndex: "mobileNumber", width: 120 },
      { title: "Lorry No.", dataIndex: "lorryNumber", width: 120 },
      { title: "Complaint Date", dataIndex: "start_date", width: 150 },
      {
        title: "Resolved",
        width: 100,
        fixed: 'right',
        render: (_, record) => renderComplaintAction(record),
      },
    ],
    MEA: [
      { title: "ID", dataIndex: "id", width: 80, fixed: 'left' },
      { title: "Owner", dataIndex: "author", ellipsis: true },
      { title: "License No.", dataIndex: "subject", width: 120 },
      { title: "Mobile", dataIndex: "mobile_number", width: 120 },
      {
        title: "Action",
        width: 100,
        fixed: 'right',
        render: (_, record) => renderAction(record),
      },
    ],
  };

  const excludedFields = [
    "tracker", "payment_receipt", "professional", "assigned_to",
    "author", "applicant_or_company_name", "detailed_mine_restoration_plan",
    "economic_viability_report", "license_fee_receipt", "licensed_boundary_survey"
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
        style={{ fontSize: '16px' }}
      >
        {orderedEntries.map(([key]) => (
          <Form.Item
            label={
              <span style={{ fontWeight: 500, fontSize: '16px' }}>
                {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            }
            name={key}
            key={key}
            style={{ marginBottom: '18px' }}
          >
            <Input
              disabled={!editableFields[key]} // Only enable fields marked as editable
              style={{ 
                fontSize: '16px', 
                height: '40px',
                backgroundColor: editableFields[key] ? '#fff' : '#f9f9f9',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                color: '#333'
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
        dataSource={data}
        columns={columns[tracker]}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50', '100'],
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
          <div style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#8B0000', // Dark red color
            padding: '16px 24px',
            borderBottom: '1px solid #000', // Black border bottom
            background: '#FFF5F5', // Very light red background
            borderRadius: '2px 2px 0 0',
            margin: 0
          }}>
            {`License Details - ${currentRecord?.id || ''}`}
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
                  padding: '8px 24px',
                  height: 'auto',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Update
              </Button>
            </Col>
          </Row>
        }
        width="70%"
        bodyStyle={{
          padding: '24px',
          maxHeight: '70vh',
          overflowY: 'auto'
        }}
        style={{
          top: '20px',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: 0
        }}
        maskStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.45)'
        }}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default LicenseTable;