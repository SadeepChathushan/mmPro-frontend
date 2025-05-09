import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  DatePicker,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { miningEngineerApprovedLicense } from "../../services/miningEngineerService";

const ApprovalModal = ({
  visible,
  onCancel,
  onOk,
  appointmentId,
  mining_number,
  id,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  console.log("Mining Number in Modal:", mining_number); // Log the mining number

  const beforeUpload = (file) => {
    const isPdfOrImage =
      file.type === "application/pdf" ||
      file.type === "image/jpeg" ||
      file.type === "image/png";
    if (!isPdfOrImage) {
      message.error("You can only upload PDF, JPG, or PNG files!");
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("File must be smaller than 5MB!");
    }
    return isPdfOrImage && isLt5M;
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newFileList);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setUploading(true);

      // Prepare form data for submission
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("me_report", file.originFileObj);
      });

      // Add form values to formData
      formData.append("Capacity", values.totalCapacity);
      formData.append("month_capacity", values.monthlyCapacity);
      formData.append("start_date", values.startDate.format("YYYY-MM-DD"));
      formData.append("due_date", values.dueDate.format("YYYY-MM-DD"));
      formData.append("me_comment", values.comments);
      formData.append("ml_number", mining_number); // Include mining_number

      // Call the service function with the id and formData
      const result = await miningEngineerApprovedLicense(id, formData);

      if (result.success) {
        message.success("Mining license approved successfully!");
        onOk(id, formData); // Notify parent component
      } else {
        message.error(
          result.message || "Failed to approve the mining license."
        );
      }
    } catch (error) {
      console.error("Error during submission:", error);
      message.error("An error occurred during submission.");
    } finally {
      setUploading(false);
      form.resetFields();
      setFileList([]);
    }
  };

  return (
    <Modal
      title="Approve Mining License"
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      width={600}
      confirmLoading={uploading}
      okText={uploading ? "Uploading..." : "Submit"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Total Capacity (m³)"
          name="totalCapacity"
          rules={[{ required: true, message: "Please enter total capacity" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            placeholder="Enter total capacity in cubic meters"
          />
        </Form.Item>

        <Form.Item
          label="Monthly Maximum Capacity (m³)"
          name="monthlyCapacity"
          rules={[{ required: true, message: "Please enter monthly capacity" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            placeholder="Enter monthly maximum capacity"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[{ required: true, message: "Please select due date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Upload Report"
          name="attachments"
          extra="Supports PDF, JPG, PNG (max 5MB)"
        >
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            onRemove={handleRemove}
            fileList={fileList}
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
          >
            <Button icon={<UploadOutlined />}>Select Files</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Comments" name="comments">
          <Input.TextArea
            rows={4}
            placeholder="Enter any additional comments"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

ApprovalModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  appointmentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  mining_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Added mining_number
};

export default ApprovalModal;
