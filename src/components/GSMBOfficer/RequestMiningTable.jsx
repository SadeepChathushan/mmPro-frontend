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
    Typography, // Import Typography for links
} from "antd";
// Import the function directly
import { getMlRequest } from "../../services/officerService"; // Adjust path if needed

const { Link } = Typography; // Destructure Link for easier use

const RequestMiningTable = () => {
    // --- State Variables ---
    const [loading, setLoading] = useState(false);
    const [mlRequestData, setMlRequestData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [form] = Form.useForm();

    // Define which fields are editable in the modal - based on backend data
    const [editableFields] = useState({
        mobile_number: true, // Example: Allow editing mobile number
        // Add other keys from the Python ml_data if they should be editable
        // e.g., land_name: true,
    });

    // --- Data Fetching Effect ---
    useEffect(() => {
        const fetchMlRequestData = async () => {
            setLoading(true);
            try {
                // Assuming getMlRequest calls the backend endpoint and returns the data
                // It might return { data: [...] } or just [...]
                const response = await getMlRequest();
                console.log("ML Request Data from service:", response);

                // Adjust based on actual response structure from your service call
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
        form.setFieldsValue(record); // Populate form with the selected record's data
        setIsModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            setUpdateLoading(true);
            message.loading({ content: "Updating details...", key: "updateStatus", duration: 0 });

            const payload = {};
            let hasChanges = false;
            Object.keys(editableFields).forEach((key) => {
                if (editableFields[key] && values[key] !== currentRecord?.[key]) {
                    payload[key] = values[key];
                    hasChanges = true;
                }
            });

            if (!hasChanges) {
                message.info({ content: "No changes detected.", key: "updateStatus", duration: 2 });
                setIsModalVisible(false);
                setUpdateLoading(false);
                return;
            }

            console.log("Update Payload:", payload);
            // --- TODO: Implement actual update API call here ---
            // This requires a backend endpoint that accepts PUT/PATCH requests
            // Example: await updateMlRequestService(currentRecord.id, payload);

            // Mock update success for demonstration
            await new Promise((resolve) => setTimeout(resolve, 1000));

            message.success({ content: "Details updated successfully!", key: "updateStatus", duration: 3 });

            // Update local state optimistically
            setMlRequestData((prevData) =>
                prevData.map((item) =>
                    item.id === currentRecord.id ? { ...item, ...payload } : item
                )
            );

            setIsModalVisible(false);
        } catch (error) {
            console.error("Update error:", error);
            message.error({
                content: `Update failed: ${error.errorFields ? 'Validation failed.' : 'Please try again.'}`,
                key: "updateStatus",
                duration: 5,
            });
        } finally {
            setUpdateLoading(false);
        }
    };

    // --- Render Functions ---
    const renderAction = (_, record) => (
        <Button
            type="primary"
            size="small"
            icon={<span>👁️</span>}
            onClick={() => handleViewClick(record)} // Pass record directly
        >
            View
        </Button>
    );

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", width: 80, fixed: "left" },
        { title: "Request Subject", dataIndex: "subject", key: "subject", width: 200 },
        { title: "Assigned To", dataIndex: "assigned_to", key: "assigned_to", width: 150, render: (text) => text || "-" },
        { title: "Mobile", dataIndex: "mobile_number", key: "mobile_number", width: 150, render: (text) => text || "-" },
        { title: "District", dataIndex: "administrative_district", key: "administrative_district", width: 150, render: (text) => text || "-"},
        { title: "Date Created", dataIndex: "created_on", key: "created_on", width: 120, render: (text) => text ? text.split('T')[0] : '-' },
        { title: "Status", dataIndex: "status", key: "status", width: 100 },
        { title: "Action", key: "action", width: 100, fixed: "right", render: renderAction },
    ];

    // Fields to explicitly exclude from the modal form
    const excludedFields = [
        "assigned_to_details", // Exclude the complex object
        // Add any other fields from ml_data that should NEVER be shown in the modal
    ];

    // Define the desired *order* for fields in the modal. Use keys from the Python `ml_data`.
    const fieldOrder = [
        "id",
        "subject",
        "status",
        "assigned_to", // Name string is fine
        "created_on",
        "mobile_number", // Editable
        "land_name",
        "land_owner_name",
        "village_name",
        "grama_niladhari_division",
        "divisional_secretary_division",
        "administrative_district",
        "google_location",
        "exploration_licence_no",
        "detailed_mine_restoration_plan", // Attachment URL
        "deed_and_survey_plan",            // Attachment URL
        "payment_receipt",                 // Attachment URL
        // Add other fields from ml_data in desired order
    ];

    // List of fields known to contain URLs (from backend code)
    const urlFields = [
        "detailed_mine_restoration_plan",
        "deed_and_survey_plan",
        "payment_receipt",
        "google_location", // This might also be a URL
    ];


    const renderModalContent = () => {
        if (!currentRecord) return <Spin tip="Loading details..." />;

        const recordEntries = Object.entries(currentRecord);

        const filteredAndSortedEntries = recordEntries
            .filter(([key, value]) => !excludedFields.includes(key) && value !== null && value !== undefined) // Exclude specified fields and null/undefined
            .sort(([a], [b]) => {
                const indexA = fieldOrder.indexOf(a);
                const indexB = fieldOrder.indexOf(b);
                if (indexA === -1 && indexB === -1) return a.localeCompare(b);
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;
                return indexA - indexB;
            });

        return (
            <Form form={form} layout="horizontal" labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} labelAlign="left">
                {filteredAndSortedEntries.map(([key, value]) => {
                    // Skip rendering complex objects that might have slipped through exclusion
                    if (typeof value === 'object' && value !== null) {
                        console.warn(`Skipping rendering object field in modal: ${key}`);
                        return null;
                    }

                    const isEditable = !!editableFields[key];
                    // Check if the field is specifically marked as a URL field AND has a string value
                    const isUrl = urlFields.includes(key) && typeof value === 'string' && value.trim().startsWith('http');
                    // Format date string if it's the created_on field
                    const displayValue = key === 'created_on' && typeof value === 'string'
                        ? value.split('T')[0] // Show only date part
                        : String(value ?? ""); // Convert to string, handling null/undefined

                    // Generate a readable label
                    const label = key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

                    return (
                        <Form.Item label={<span style={{ fontWeight: 500 }}>{label}</span>} name={key} key={key} style={{ marginBottom: 12 }}>
                            {isUrl ? (
                                // Render as a clickable link if it's a URL
                                <Link href={value} target="_blank" rel="noopener noreferrer" ellipsis>
                                    {value} {/* Or show a generic "View File" text */}
                                    {/* View File */}
                                </Link>
                            ) : (
                                // Otherwise, render as Input (editable or readOnly)
                                <Input
                                    readOnly={!isEditable}
                                    style={{
                                        backgroundColor: isEditable ? "#fff" : "#f5f5f5",
                                        color: isEditable ? "inherit" : "rgba(0, 0, 0, 0.85)",
                                        cursor: isEditable ? 'auto' : 'default',
                                    }}
                                    // Form item controls the value via 'name' prop, no need for value={displayValue}
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
            <Table
                dataSource={mlRequestData}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ["10", "25", "50"], showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items` }}
                scroll={{ x: "max-content" }}
                sticky
                bordered
                size="middle"
                loading={loading}
            />
            <Modal
                title={
                    <div style={{ fontSize: "18px", fontWeight: "600", color: "#1677ff", padding: "16px 24px", borderBottom: "1px solid #f0f0f0", margin: "-16px -24px 0" }}>
                        {`Mining Request Details - ${currentRecord?.subject || currentRecord?.id || "N/A"}`}
                    </div>
                }
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={
                    <Row justify="end" style={{ padding: "10px 0" }}>
                        <Col>
                            <Button key="cancel" onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }} disabled={updateLoading}>Cancel</Button>
                            <Button key="update" type="primary" onClick={handleUpdate} loading={updateLoading}>Update Details</Button>
                        </Col>
                    </Row>
                }
                width="60%"
                styles={{
                    header: { padding: 0, margin: 0, borderBottom: 'none', borderRadius: '8px 8px 0 0', overflow: 'hidden' },
                    body: { padding: "24px", maxHeight: "70vh", overflowY: "auto" },
                    footer: { padding: "10px 24px", borderTop: "1px solid #f0f0f0", margin: 0 },
                    mask: { backgroundColor: "rgba(0, 0, 0, 0.45)" },
                    content: { padding: 0, borderRadius: '8px' },
                }}
                destroyOnClose
                maskClosable={!updateLoading}
                keyboard={!updateLoading}
                style={{ top: "5vh", borderRadius: "8px", overflow: "hidden" }}
            >
                {renderModalContent()}
            </Modal>
        </>
    );
};

export default RequestMiningTable;