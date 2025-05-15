import { useState } from "react";
import { Row, Col, Card, Typography, message } from "antd";
import PropTypes from "prop-types";
import AppointmentsTable from "./AppointmentsTable";
import ApprovalModal from "./ApprovalModal";
import { useLanguage } from "../../contexts/LanguageContext";
import AppointmentDetailsModal from "./AppointmentDetailsModal";

const { Title } = Typography;

const Appointments = ({ activeTab }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [approvingAppointmentId, setApprovingAppointmentId] = useState(null);
  const [approvingAppointmentIssuesId, setApprovingAppointmentIssuesId] = useState(null);
  const { language } = useLanguage(); 

  const [appointments, setAppointments] = useState([
    {
      id: 2,
      mlOwner: "Another Owner",
      gsmbOfficer: "Jane Doe",
      location: "Colombo",
      cubeCount: 2000,
      status: "approved",
      date: "2023-06-20",
      licenseDetails: {
        status: "Scheduled",
        explorationLicenseNo: "EX-2025-0002",
        landName: "Blue Hills",
        landOwner: "Kamal",
        royalty: 2000,
      },
      locationDetails: {
        village: "Colombo",
        gramaNiladhariDivision: "GN Division 02",
        divisionalSecretaryDivision: "Colombo",
        district: "Colombo",
      },
      capacity: {
        total: 3000,
        used: 1000,
        remaining: 2000,
        monthCapacity: "Not specified",
      },
      timeline: {
        startDate: "21/04/2025",
        dueDate: "25/04/2025",
        status: "On time",
      },
      contact: {
        mobile: "771234568",
      },
      documents: {
        restorationPlan: "/sample-docs/restoration-plan.jpg",
        paymentReceipt: "/sample-docs/payment-receipt.jpg",
        deedAndSurvey: "/sample-docs/deed-survey.jpg",
        googleLocation: "https://maps.google.com/maps?q=6.2633...",
      },
    },
  ]);

  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter((app) => {
    if (activeTab === "pending") {
      return app.status === "pending";
    } else {
      // Show both scheduled and approved appointments in the Scheduled tab
      return app.status === "scheduled";
    }
  });

  // Handle confirming a scheduled date
  const handleConfirmScheduleDate = (id, dateString) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id
          ? {
              ...app,
              date: dateString,
              status: "scheduled", 
              licenseDetails: {
                ...app.licenseDetails,
                status: "Scheduled", 
              },
            }
          : app
      )
    );
    message.success(
      language === "en"
        ? "Appointment scheduled successfully"
        : "சந்திப்பு வெற்றிகரமாக திட்டமிடப்பட்டது"
    );
  };

  // View appointment details
  const viewAppointmentDetails = (record) => {
    setSelectedAppointment(record);
    setIsModalVisible(true);
  };

  // Show approval modal
  const showApprovalModal = (mining_number, id) => {
    setApprovingAppointmentId(id); // Set the id
    setApprovingAppointmentIssuesId(mining_number); // Set the mining_number
    setIsApprovalModalVisible(true); // Open the modal
  };
  // Handle approval
  const handleApprovalOk = (id, values) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "completed",
              capacity: {
                total: values.totalCapacity,
                used: 0,
                remaining: values.totalCapacity,
                monthCapacity: values.monthlyCapacity,
              },
              timeline: {
                startDate: values.startDate.format("DD/MM/YYYY"),
                dueDate: values.dueDate.format("DD/MM/YYYY"),
                status: "Not started",
              },
              approvalComments: values.comments,
              licenseDetails: {
                ...app.licenseDetails,
                status: "Completed",
              },
            }
          : app
      )
    );
    setIsApprovalModalVisible(false);
    message.success(
      language === "en"
        ? "Appointment approved successfully"
        : "சந்திப்பு அங்கீகரிக்கப்பட்டது"
    );
  };

  // Put appointment on hold
  const handleHold = (id) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "hold",
              licenseDetails: {
                ...app.licenseDetails,
                status: "On Hold",
              },
            }
          : app
      )
    );
    message.warning(
      language === "en"
        ? "Appointment put on hold"
        : "சந்திப்பு பிடித்து வைக்கப்பட்டது"
    );
  };

  // Reject appointment
  const handleReject = (id) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "rejected",
              licenseDetails: {
                ...app.licenseDetails,
                status: "Rejected",
              },
            }
          : app
      )
    );
    message.success(
      language === "en"
        ? "Appointment rejected"
        : "சந்திப்பு நிராகரிக்கப்பட்டது"
    );
  };

  // Handle date change (without confirmation)
  const handleDateChange = (id, date, dateString) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, date: dateString } : app
      )
    );
  };

  return (
    <div className="appointments-page">
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3}>
            {activeTab === "pending"
              ? language === "en"
                ? "Pending Scheduling"
                : "நிலுவையிலுள்ள திட்டமிடல்"
              : language === "en"
              ? "Scheduled"
              : "திட்டமிடப்பட்ட"}{" "}
            {language === "en" ? "Appointments" : "சந்திப்புகள்"}
          </Title>
        </Col>
      </Row>

      <Card>
        <AppointmentsTable
          appointments={filteredAppointments}
          activeTab={activeTab}
          onViewDetails={viewAppointmentDetails}
          onShowApproval={showApprovalModal}
          onHold={handleHold}
          onReject={handleReject}
          onDateChange={handleDateChange}
          onConfirmScheduleDate={handleConfirmScheduleDate}
          language={language}
        />
      </Card>

      <AppointmentDetailsModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        appointment={selectedAppointment}
        language={language}
      />

      <ApprovalModal
        visible={isApprovalModalVisible}
        onCancel={() => setIsApprovalModalVisible(false)}
        onOk={handleApprovalOk}
        id={approvingAppointmentId} // Pass the id
        mining_number={approvingAppointmentIssuesId}
        language={language}
      />
    </div>
  );
};

Appointments.propTypes = {
  activeTab: PropTypes.oneOf(["pending", "scheduled"]).isRequired,
};

export default Appointments;
