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
  mining_number,
  appointmentId,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  const beforeUpload = (file) => {
    const isPdfOrImage =
      file.type === "application/pdf" ||
      file.type === "image/jpeg" ||
      file.type === "image/png";
    if (!isPdfOrImage) {
      message.error("ඔබට පමණක් PDF, JPG, හෝ PNG ගොනු උඩුගත කළ හැකිය!");
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("ගොනුව 5MB ට වඩා කුඩා විය යුතුය!");
    }
    return isPdfOrImage && isLt5M;
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleRemove = (file) => {
    setFileList((prevList) => prevList.filter((f) => f.uid !== file.uid));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setUploading(true);

      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("me_report", file.originFileObj);
      });

      formData.append("Capacity", values.totalCapacity);
      formData.append("month_capacity", values.monthlyCapacity);
      formData.append("start_date", values.startDate.format("YYYY-MM-DD"));
      formData.append("due_date", values.dueDate.format("YYYY-MM-DD"));
      formData.append("me_comment", values.comments);
      formData.append("ml_number", mining_number);

      const result = await miningEngineerApprovedLicense(appointmentId, formData);

      if (result.success) {
        message.success("පතල් බලපත්‍රය සාර්ථකව අනුමත කරන ලදී!");
        onOk(appointmentId, formData);
      } else {
        message.error(result.message || "පතල් බලපත්‍රය අනුමත කිරීමට අසමත් විය.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      message.error("ඉදිරිපත් කිරීමේදී දෝෂයක් ඇතිවිය.");
    } finally {
      setUploading(false);
      form.resetFields();
      setFileList([]);
    }
  };

  return (
    <Modal
      title="පතල් බලපත්‍රය අනුමත කරන්න"
      visible={visible}
      onCancel={onCancel}
      width={600}
      footer={
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            loading={uploading}
            onClick={handleSubmit}
            style={{ minWidth: 120 }}
          >
            {uploading ? "උඩුගත කරමින්..." : "ඉදිරිපත් කරන්න"}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="සම්පූර්ණ ධාරිතාව (m³)"
          name="totalCapacity"
          rules={[{ required: true, message: "කරුණාකර සම්පූර්ණ ධාරිතාව ඇතුළත් කරන්න" }]}
        >
          <InputNumber style={{ width: "100%" }} min={1} placeholder="කියුබික් මීටර වලින් සම්පූර්ණ ධාරිතාව ඇතුළත් කරන්න" />
        </Form.Item>

        <Form.Item
          label="මාසික උපරිම ධාරිතාව (m³)"
          name="monthlyCapacity"
          rules={[{ required: true, message: "කරුණාකර මාසික ධාරිතාව ඇතුළත් කරන්න" }]}
        >
          <InputNumber style={{ width: "100%" }} min={1} placeholder="මාසික උපරිම ධාරිතාව ඇතුළත් කරන්න" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="ආරම්භක දිනය"
              name="startDate"
              rules={[{ required: true, message: "කරුණාකර ආරම්භක දිනය තෝරන්න" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="කල් ඉකුත් වන දිනය"
              name="dueDate"
              rules={[{ required: true, message: "කරුණාකර කල් ඉකුත් වන දිනය තෝරන්න" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="වාර්තාව උඩුගත කරන්න"
          name="attachments"
          extra="PDF, JPG, PNG (උපරිම 5MB) සහාය දක්වයි"
          rules={[{ required: true, message: "කරුණාකර වාර්තාව උඩුගත කරන්න" }]}
        >
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            onRemove={handleRemove}
            fileList={fileList}
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
          >
            <Button icon={<UploadOutlined />}>ගොනු තෝරන්න</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="අදහස්" name="comments">
          <Input.TextArea rows={4} placeholder="අමතර අදහස් ඇතුළත් කරන්න" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

ApprovalModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  appointmentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  mining_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ApprovalModal;