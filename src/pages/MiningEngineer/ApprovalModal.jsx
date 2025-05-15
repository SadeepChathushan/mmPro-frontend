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
import { useLanguage } from "../../contexts/LanguageContext";
import "../../styles/MiningEngineer/MEModals.css";

const ApprovalModal = ({ visible, onCancel, onOk, mining_number, id }) => {
  const { language } = useLanguage();
  const [form] = Form.useForm();
  const [fileList, setFileList] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  const translations = {
    en: {
      title: "Approve Mining License",
      totalCapacityLabel: "Total Capacity (m³)",
      totalCapacityPlaceholder: "Enter total capacity in cubic meters",
      monthlyCapacityLabel: "Monthly Maximum Capacity (m³)",
      monthlyCapacityPlaceholder: "Enter monthly maximum capacity",
      startDateLabel: "Start Date",
      dueDateLabel: "Expiry Date",
      uploadLabel: "Upload Report",
      uploadExtra: "PDF, JPG, PNG supported (Max 5MB)",
      commentsLabel: "Comments",
      commentsPlaceholder: "Enter additional comments",
      selectFiles: "Select Files",
      submit: "Submit",
      uploading: "Uploading...",
      success: "Mining license approved successfully!",
      error: "Failed to approve mining license.",
      submissionError: "Error occurred during submission.",
      fileTypeError: "You can only upload PDF, JPG, or PNG files!",
      fileSizeError: "File must be smaller than 5MB!",
      requiredTotalCapacity: "Please enter total capacity",
      requiredMonthlyCapacity: "Please enter monthly capacity",
      requiredStartDate: "Please select start date",
      requiredDueDate: "Please select expiry date",
      requiredUpload: "Please upload report",
    },
    si: {
      title: "පතල් බලපත්‍රය අනුමත කරන්න",
      totalCapacityLabel: "සම්පූර්ණ ධාරිතාව (m³)",
      totalCapacityPlaceholder:
        "කියුබික් මීටර වලින් සම්පූර්ණ ධාරිතාව ඇතුළත් කරන්න",
      monthlyCapacityLabel: "මාසික උපරිම ධාරිතාව (m³)",
      monthlyCapacityPlaceholder: "මාසික උපරිම ධාරිතාව ඇතුළත් කරන්න",
      startDateLabel: "ආරම්භක දිනය",
      dueDateLabel: "කල් ඉකුත් වන දිනය",
      uploadLabel: "වාර්තාව උඩුගත කරන්න",
      uploadExtra: "PDF, JPG, PNG සහාය දක්වයි (උපරිම 5MB)",
      commentsLabel: "අදහස්",
      commentsPlaceholder: "අමතර අදහස් ඇතුළත් කරන්න",
      selectFiles: "ගොනු තෝරන්න",
      submit: "ඉදිරිපත් කරන්න",
      uploading: "උඩුගත කරමින්...",
      success: "පතල් බලපත්‍රය සාර්ථකව අනුමත කරන ලදී!",
      error: "පතල් බලපත්‍රය අනුමත කිරීමට අසමත් විය.",
      submissionError: "ඉදිරිපත් කිරීමේදී දෝෂයක් ඇතිවිය.",
      fileTypeError: "ඔබට පමණක් PDF, JPG, හෝ PNG ගොනු උඩුගත කළ හැකිය!",
      fileSizeError: "ගොනුව 5MB ට වඩා කුඩා විය යුතුය!",
      requiredTotalCapacity: "කරුණාකර සම්පූර්ණ ධාරිතාව ඇතුළත් කරන්න",
      requiredMonthlyCapacity: "කරුණාකර මාසික ධාරිතාව ඇතුළත් කරන්න",
      requiredStartDate: "කරුණාකර ආරම්භක දිනය තෝරන්න",
      requiredDueDate: "කරුණාකර කල් ඉකුත් වන දිනය තෝරන්න",
      requiredUpload: "කරුණාකර වාර්තාව උඩුගත කරන්න",
    },
    ta: {
      title: "சுரங்க உரிமம் அங்கீகரிக்கவும்",
      totalCapacityLabel: "மொத்த திறன் (m³)",
      totalCapacityPlaceholder: "கன மீட்டரில் மொத்த திறனை உள்ளிடவும்",
      monthlyCapacityLabel: "மாதாந்திர அதிகபட்ச திறன் (m³)",
      monthlyCapacityPlaceholder: "மாதாந்திர அதிகபட்ச திறனை உள்ளிடவும்",
      startDateLabel: "தொடக்க தேதி",
      dueDateLabel: "காலாவதி தேதி",
      uploadLabel: "அறிக்கையை பதிவேற்றவும்",
      uploadExtra: "PDF, JPG, PNG ஆதரவு (அதிகபட்சம் 5MB)",
      commentsLabel: "கருத்துகள்",
      commentsPlaceholder: "கூடுதல் கருத்துகளை உள்ளிடவும்",
      selectFiles: "கோப்புகளைத் தேர்ந்தெடு",
      submit: "சமர்ப்பிக்கவும்",
      uploading: "பதிவேற்றுகிறது...",
      success: "சுரங்க உரிமம் வெற்றிகரமாக அங்கீகரிக்கப்பட்டது!",
      error: "சுரங்க உரிமத்தை அங்கீகரிக்க முடியவில்லை.",
      submissionError: "சமர்ப்பிக்கும் போது பிழை ஏற்பட்டது.",
      fileTypeError:
        "நீங்கள் PDF, JPG அல்லது PNG கோப்புகளை மட்டுமே பதிவேற்ற முடியும்!",
      fileSizeError: "கோப்பு 5MB ஐ விட சிறியதாக இருக்க வேண்டும்!",
      requiredTotalCapacity: "மொத்த திறனை உள்ளிடவும்",
      requiredMonthlyCapacity: "மாதாந்திர திறனை உள்ளிடவும்",
      requiredStartDate: "தொடக்க தேதியைத் தேர்ந்தெடுக்கவும்",
      requiredDueDate: "காலாவதி தேதியைத் தேர்ந்தெடுக்கவும்",
      requiredUpload: "அறிக்கையை பதிவேற்றவும்",
    },
  };

  const t = translations[language] || translations.en;

  const beforeUpload = (file) => {
    const isPdfOrImage =
      file.type === "application/pdf" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!isPdfOrImage) {
      message.error(t.fileTypeError);
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error(t.fileSizeError);
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

      // Format dates properly
      const formattedStartDate = values.startDate.format("YYYY-MM-DD");
      const formattedDueDate = values.dueDate.format("YYYY-MM-DD");

      formData.append("Capacity", values.totalCapacity);
      formData.append("month_capacity", values.monthlyCapacity);
      formData.append("start_date", formattedStartDate);
      formData.append("due_date", formattedDueDate);
      formData.append("me_comment", values.comments);
      formData.append("ml_number", mining_number);
      formData.append("status_id", 32); // Add status_id if required by backend

      const result = await miningEngineerApprovedLicense(id, formData);

      if (result.success) {
        message.success(t.success);
        onOk(id, formData);
      } else {
        message.error(result.message || t.error);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      message.error(error.message || t.submissionError);
    } finally {
      setUploading(false);
      form.resetFields();
      setFileList([]);
    }
  };

  return (
    <Modal
      title={t.title}
      visible={visible}
      onCancel={onCancel}
      width={600}
      footer={
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            className="approve-button"
            loading={uploading}
            onClick={handleSubmit}
          >
            {uploading ? t.uploading : t.submit}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={t.totalCapacityLabel}
          name="totalCapacity"
          rules={[{ required: true, message: t.requiredTotalCapacity }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            placeholder={t.totalCapacityPlaceholder}
          />
        </Form.Item>

        <Form.Item
          label={t.monthlyCapacityLabel}
          name="monthlyCapacity"
          rules={[{ required: true, message: t.requiredMonthlyCapacity }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            placeholder={t.monthlyCapacityPlaceholder}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={t.startDateLabel}
              name="startDate"
              rules={[{ required: true, message: t.requiredStartDate }]}
            >
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t.dueDateLabel}
              name="dueDate"
              rules={[{ required: true, message: t.requiredDueDate }]}
            >
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={t.uploadLabel}
          name="attachments"
          extra={t.uploadExtra}
          rules={[{ required: true, message: t.requiredUpload }]}
        >
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            onRemove={handleRemove}
            fileList={fileList}
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
          >
            <Button icon={<UploadOutlined />}>{t.selectFiles}</Button>
          </Upload>
        </Form.Item>

        <Form.Item label={t.commentsLabel} name="comments">
          <Input.TextArea rows={4} placeholder={t.commentsPlaceholder} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

ApprovalModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  mining_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ApprovalModal;
