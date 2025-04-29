import React, { useState } from 'react';
import { Row, Col, Card, Typography, message } from 'antd';
import AppointmentsTable from './AppointmentsTable';
import NewAppointmentButton from './NewAppointmentButton';
import AppointmentDetailsModal from './AppointmentDetailsModal';
import ApprovalModal from './ApprovalModal';
import { useLanguage } from "../../contexts/LanguageContext";


const { Title } = Typography;

const Appointments = ({ activeTab }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [approvingAppointmentId, setApprovingAppointmentId] = useState(null);
  const { language } = useLanguage()
  
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      mlOwner: 'Pasindu Lakshan',
      gsmbOfficer: 'John Smith',
      location: 'Kaduwela',
      cubeCount: 1500,
      status: 'pending',
      date: '2023-06-15',
      licenseDetails: {
        status: 'Awaiting ME Scheduling',
        explorationLicenseNo: 'EX-2025-0001',
        landName: 'Green Hills',
        landOwner: 'Saman',
        royalty: 1500
      },
      locationDetails: {
        village: 'Kaduwela',
        gramaNiladhariDivision: 'GN Division 01',
        divisionalSecretaryDivision: 'Thimbirigasaya',
        district: 'Colombo'
      },
      capacity: {
        total: 2000,
        used: 500,
        remaining: 1500,
        monthCapacity: 'Not specified'
      },
      timeline: {
        startDate: '17/04/2025',
        dueDate: '20/04/2025',
        status: '2 days late'
      },
      contact: {
        mobile: '771234567'
      },
      documents: {
        restorationPlan: '/sample-docs/restoration-plan.jpg',
        paymentReceipt: '/sample-docs/payment-receipt.jpg',
        deedAndSurvey: '/sample-docs/deed-survey.jpg',
        googleLocation: 'https://maps.google.com/maps?q=6.2633...'
      }
    },
    {
      id: 2,
      mlOwner: 'Another Owner',
      gsmbOfficer: 'Jane Doe',
      location: 'Colombo',
      cubeCount: 2000,
      status: 'approved',
      date: '2023-06-20',
      licenseDetails: {
        status: 'Scheduled',
        explorationLicenseNo: 'EX-2025-0002',
        landName: 'Blue Hills',
        landOwner: 'Kamal',
        royalty: 2000
      },
      locationDetails: {
        village: 'Colombo',
        gramaNiladhariDivision: 'GN Division 02',
        divisionalSecretaryDivision: 'Colombo',
        district: 'Colombo'
      },
      capacity: {
        total: 3000,
        used: 1000,
        remaining: 2000,
        monthCapacity: 'Not specified'
      },
      timeline: {
        startDate: '21/04/2025',
        dueDate: '25/04/2025',
        status: 'On time'
      },
      contact: {
        mobile: '771234568'
      },
      documents: {
        restorationPlan: '/sample-docs/restoration-plan.jpg',
        paymentReceipt: '/sample-docs/payment-receipt.jpg',
        deedAndSurvey: '/sample-docs/deed-survey.jpg',
        googleLocation: 'https://maps.google.com/maps?q=6.2633...'
      }
    }
  ]);

  const filteredAppointments = appointments.filter(app => 
    activeTab === 'pending' ? app.status === 'pending' : app.status === 'approved'
  );

  const viewAppointmentDetails = (record) => {
    setSelectedAppointment(record);
    setIsModalVisible(true);
  };

  const showApprovalModal = (id) => {
    setApprovingAppointmentId(id);
    setIsApprovalModalVisible(true);
  };

  const handleApprovalOk = (id, values) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { 
        ...app, 
        status: 'completed',
        capacity: {
          total: values.totalCapacity,
          used: 0,
          remaining: values.totalCapacity,
          monthCapacity: values.monthlyCapacity
        },
        timeline: {
          startDate: values.startDate.format('DD/MM/YYYY'),
          dueDate: values.dueDate.format('DD/MM/YYYY'),
          status: 'Not started'
        },
        approvalComments: values.comments
      } : app
    ));
    setIsApprovalModalVisible(false);
    message.success('Appointment approved successfully');
  };

  const handleHold = (id) => {
    message.warning('Appointment put on hold');
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'hold' } : app
    ));
  };

  const handleReject = (id) => {
    message.success('Appointment rejected');
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'rejected' } : app
    ));
  };

  const handleDateChange = (id, date, dateString) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, date: dateString } : app
    ));
  };

  const createNewAppointment = () => {
    message.info('New appointment creation clicked');
    // Add your implementation here
  };

  return (
    <div className="appointments-page">
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3}>
          {activeTab === 'pending'
        ? language === "en"
          ? "Pending Scheduling"
          : language === "si"
          ? ""
          : "நிலுவையிலுள்ள திட்டமிடல்"
        : language === "en"
        ? "Scheduled"
        : language === "si"
        ? ""
        : "திட்டமிடப்பட்ட"}{" "}
      {language === "en"
        ? "Appointments"
        : language === "si"
        ? ""
        : "சந்திப்புகள்"}
          </Title>
        </Col>
        <Col>
          <NewAppointmentButton onCreate={createNewAppointment} />
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
        />
      </Card>

      <AppointmentDetailsModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        appointment={selectedAppointment}
      />

      <ApprovalModal
        visible={isApprovalModalVisible}
        onCancel={() => setIsApprovalModalVisible(false)}
        onOk={handleApprovalOk}
        appointmentId={approvingAppointmentId}
      />
    </div>
  );
};

export default Appointments;