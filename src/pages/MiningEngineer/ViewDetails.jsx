import React, { useState, useEffect } from "react";
import { Modal, Descriptions, Tag, Button, Space, Spin, Alert } from "antd";
import {
  CloseCircleOutlined,
  FilePdfOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"; // Added CheckCircleOutlined, ClockCircleOutlined
import { getMeApproveSingleMiningLicense } from "../../services/miningEngineerService";

const ViewLicenseModal = ({ visible, onClose, selectedLicense, language }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [licenseDetails, setLicenseDetails] = useState(null);

  // Fallback text based on language
  const naText = language === "en" ? "N/A" : "கிடைக்கவில்லை";

  useEffect(() => {
    const fetchDetails = async () => {
      if (!selectedLicense) {
        setLicenseDetails(null);
        setError(null); // Clear error if no ID
        return;
      }
      setLoading(true);
      setError(null);
      setLicenseDetails(null); // Clear previous details
      try {
        const result = await getMeApproveSingleMiningLicense(selectedLicense);
        if (result.success && result.data) {
          setLicenseDetails(result.data);
        } else {
          setError(
            result.message ||
              (language === "en"
                ? "Failed to load license details."
                : "உரிம விவரங்களை ஏற்ற முடியவில்லை.")
          );
        }
      } catch (err) {
        setError(
          err.message ||
            (language === "en"
              ? "An unexpected error occurred while fetching details."
              : "விவரங்களைப் பெறும்போது எதிர்பாராத பிழை ஏற்பட்டது.")
        );
      } finally {
        setLoading(false);
      }
    };

    if (visible && selectedLicense) {
      fetchDetails();
    } else if (!visible) {
      // Clear state when modal is hidden
      setLicenseDetails(null);
      setError(null);
      setLoading(false);
    }
    // Add selectedLicense to dependency array
  }, [visible, selectedLicense, language]); // Added language to re-fetch if language changes (for error messages)

  // Early return if no ID is provided (though parent component MEDashboard seems to handle this)
  if (!selectedLicense && visible) {
    // Check visible to avoid rendering empty modal briefly if !selectedLicense
    return (
      <Modal
        title={language === "en" ? "License Details" : "உரிம விவரங்கள்"}
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="close" onClick={onClose}>
            {language === "en" ? "Close" : "மூடுக"}
          </Button>,
        ]}
      >
        <Alert
          message={language === "en" ? "Information" : "தகவல்"}
          description={
            language === "en"
              ? "No license selected to view details."
              : "விவரங்களைக் காண உரிமம் தேர்ந்தெடுக்கப்படவில்லை."
          }
          type="info"
          showIcon
        />
      </Modal>
    );
  }

  const renderStatusTag = (status) => {
    if (!status)
      return <Tag>{language === "en" ? "Unknown" : "தெரியவில்லை"}</Tag>;
    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
      case "approved":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {language === "en" ? "Approved" : "அங்கீகரிக்கப்பட்டது"}
          </Tag>
        );
      case "rejected":
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {language === "en" ? "Rejected" : "நிராகரிக்கப்பட்டது"}
          </Tag>
        );
      case "pending":
        return (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            {language === "en" ? "Pending" : "நிலுவையில்"}
          </Tag>
        );
      default:
        return <Tag>{status}</Tag>;
    }
  };

  return (
    <Modal
      title={language === "en" ? "License Details" : "உரிம விவரங்கள்"}
      visible={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="close" onClick={onClose}>
          {language === "en" ? "Close" : "மூடுக"}
        </Button>,
      ]}
    >
      {loading && (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
          <p>
            {language === "en"
              ? "Loading details..."
              : "விவரங்கள் ஏற்றப்படுகின்ற..."}
          </p>
        </div>
      )}
      {error && !loading && (
        <Alert
          message={language === "en" ? "Error" : "பிழை"}
          description={error}
          type="error"
          showIcon
        />
      )}
      {!loading &&
        !error &&
        !licenseDetails &&
        selectedLicense && ( // If an ID was provided but no details found
          <Alert
            message={language === "en" ? "Not Found" : "காணப்படவில்லை"}
            description={
              language === "en"
                ? "License details could not be loaded or found."
                : "உரிம விவரங்கள் ஏற்றப்படவில்லை அல்லது காணப்படவில்லை."
            }
            type="warning"
            showIcon
          />
        )}
      {!loading && !error && licenseDetails && (
        <>
          <Descriptions bordered column={1}>
            <Descriptions.Item
              label={language === "en" ? "License Number" : "உரிம எண்"}
            >
              <Tag color="blue">{licenseDetails?.licenseNumber || naText}</Tag>
            </Descriptions.Item>
            <Descriptions.Item
              label={language === "en" ? "Owner Name" : "உரிமையாளர் பெயர்"}
            >
              {licenseDetails?.owner || naText}
            </Descriptions.Item>
            <Descriptions.Item label={language === "en" ? "Location" : "இடம்"}>
              {licenseDetails?.location ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    licenseDetails.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {licenseDetails.location}
                </a>
              ) : (
                naText
              )}
            </Descriptions.Item>
            {/* <Descriptions.Item
              label={language === "en" ? "License Type" : "உரிம வகை"}
            >
              {licenseDetails?.type || naText}
            </Descriptions.Item> */}
            {/* <Descriptions.Item
              label={language === "en" ? "Applied Date" : "விண்ணப்பித்த தேதி"}
            >
              {licenseDetails?.appliedDate ? new Date(licenseDetails.appliedDate).toLocaleDateString() : naText}
            </Descriptions.Item> */}

            {/* <Descriptions.Item // Field from service: 'date' (Interpreted as Approved/Relevant Date)
              label={language === "en" ? "Approval/Relevant Date" : "அங்கீகாரம்/தொடர்புடைய தேதி"}
            >
              {licenseDetails?.date || naText}
            </Descriptions.Item> */}

            <Descriptions.Item
              label={language === "en" ? "Name of Land" : "நிலத்தின் பெயர்"}
            >
              {licenseDetails?.Land_Name || naText}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                language === "en" ? "Land Owner's Name" : "நில உரிமையாளர் பெயர்"
              }
            >
              {licenseDetails?.Land_owner_name || naText}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                language === "en" ? "Name of Village" : "கிராமத்தின் பெயர்"
              }
            >
              {licenseDetails?.Name_of_village || naText}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                language === "en"
                  ? "Grama Niladhari Division"
                  : "கிராம நிர்வாக பிரிவு"
              }
            >
              {licenseDetails?.Grama_Niladhari || naText}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                language === "en"
                  ? "Administrative District"
                  : "நிர்வாக மாவட்டம்"
              }
            >
              {licenseDetails?.administrative_district || naText}
            </Descriptions.Item>
            <Descriptions.Item label={language === "en" ? "Status" : "நிலை"}>
              {renderStatusTag(licenseDetails?.status)}
            </Descriptions.Item>
            {licenseDetails?.status?.toLowerCase() === "rejected" && (
              <Descriptions.Item
                label={
                  language === "en"
                    ? "Rejection Reason"
                    : "நிராகரிப்பதற்கான காரணம்"
                }
              >
                {licenseDetails?.rejectionReason ||
                  (language === "en" ? "Not specified" : "குறிப்பிடப்படவில்லை")}
              </Descriptions.Item>
            )}
          </Descriptions>

          <div style={{ marginTop: 20 }}>
            <h4>
              {language === "en"
                ? "Attached Documents:"
                : "இணைக்கப்பட்ட ஆவணங்கள்:"}
            </h4>
            {licenseDetails?.documents ? (
              <Space size="large" wrap>
                <Button
                  type="link"
                  icon={<FilePdfOutlined />}
                  href={licenseDetails.documents.deedAndSurveyPlan || "#"}
                  target="_blank"
                  disabled={!licenseDetails.documents.deedAndSurveyPlan}
                >
                  {language === "en"
                    ? "Deed and Survey Plan"
                    : "உரிமம் மற்றும் கணக்கீட்டு திட்டம்"}
                </Button>
                <Button
                  type="link"
                  icon={<FilePdfOutlined />}
                  href={licenseDetails.documents.mineRestorationPlan || "#"}
                  target="_blank"
                  disabled={!licenseDetails.documents.mineRestorationPlan}
                >
                  {language === "en"
                    ? "Detailed Plan"
                    : "பாதுகாப்பு திட்டம்"}
                </Button>
              </Space>
            ) : (
              <p>
                {language === "en"
                  ? "No documents attached or available."
                  : "ஆவணங்கள் இணைக்கப்படவில்லை அல்லது கிடைக்கவில்லை."}
              </p>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default ViewLicenseModal;
