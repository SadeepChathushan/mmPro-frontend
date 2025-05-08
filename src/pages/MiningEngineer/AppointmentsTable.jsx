import { useState, useEffect } from "react";
import { Table, Space, Button, Popover, DatePicker, message, Tag } from "antd";
import { CalendarOutlined, EnvironmentOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import PropTypes from "prop-types";
import StatusActions from "./StatusActions";
import {
  getMeAwatingList,
  scheduleMiningEngineerAppointmentDate,
} from "../../services/miningEngineerService";
import ViewLicenseModal from './ViewDetails'; 
import "../../styles/MiningEngineer/AppointmentsTable.css";

const AppointmentsTable = ({
  activeTab,
  onViewDetails,
  onShowApproval,
  onHold,
  onReject,
  onDateChange,
  onConfirmScheduleDate,
  language,
}) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await getMeAwatingList();
        setAppointments(
          data.map((item) => ({ ...item, tempDateString: null }))
        );
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [activeTab]);

  const handleTempDateChange = (id, dateString) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, tempDateString: dateString } : item
      )
    );
  };

  const handleConfirmDate = async (mining_number, dateString) => {
    if (dateString) {
      try {
        const result = await scheduleMiningEngineerAppointmentDate(
          mining_number,
          dateString
        );

        if (result.success) {
          setAppointments((prev) =>
            prev.map((item) =>
              item.mining_number === mining_number
                ? {
                    ...item,
                    status: "ME Appointment Scheduled",
                    date: dateString,
                    tempDateString: null,
                  }
                : item
            )
          );

          message.success(
            language === "en"
              ? "Date confirmed and appointment scheduled!"
              : language === "si"
              ? "දිනය තහවුරු කර නියමිත දිනය නියම කරන ලදී!"
              : "தேதி உறுதி செய்யப்பட்டு சந்திப்பு திட்டமிடப்பட்டது!"
          );

          onConfirmScheduleDate(mining_number, dateString);
          onDateChange && onDateChange(mining_number, null, dateString);
        } else {
          message.error(
            result.message ||
              (language === "en"
                ? "Failed to schedule appointment"
                : language === "si"
                ? "සාදරයෙන් පිළිගැනීමට අසමත් විය"
                : "சந்திப்பை திட்டமிடுவதில் தோல்வி")
          );
        }
      } catch (error) {
        console.error("Error scheduling appointment:", error);
        message.error(
          language === "en"
            ? "Error scheduling appointment"
            : language === "si"
            ? "සාදරයෙන් පිළිගැනීමේ දෝෂයක්"
            : "சந்திப்பு திட்டமிடுவதில் பிழை"
        );
      }
    } else {
      message.error(
        language === "en"
          ? "Please select a date first!"
          : language === "si"
          ? "පළමුව දිනය තෝරන්න!"
          : "முதலில் தேதியைத் தேர்ந்தெடுக்கவும்!"
      );
    }
  };

  const disabledPastDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const filteredAppointments = appointments.filter((item) => {
    if (activeTab === "pending") {
      return item.status === "Awaiting ME Scheduling";
    } else if (activeTab === "approved") {
      return item.status === "ME Appointment Scheduled";
    }
    return true;
  });

  const baseColumns = [
    {
      title: language === "en" ? "ML Owner" : language === "si" ? "ඇමතුම් හිමිකරු" : "ML உரிமையாளர்",
      dataIndex: "assigned_to",
      key: "mlOwner",
    },
    {
      title: language === "en" ? "GSMB Officer" : language === "si" ? "ගොඩනැගිලි නිලධාරියා" : "GSMB அதிகாரி",
      dataIndex: "gsmbOfficer",
      key: "gsmbOfficer",
    },
    {
      title: language === "en" ? "Location" : language === "si" ? "ස්ථානය" : "இடம்",
      dataIndex: "Google_location",
      key: "location",
      render: (location) => (
        <Space>
          <EnvironmentOutlined
            style={{
              color: "#52c41a",
              fontSize: "18px",
              background: "#f6ffed",
              padding: "4px",
              borderRadius: "50%",
            }}
          />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#389e0d" }}
          >
            {language === "en" ? "View on Map" : language === "si" ? "සිතියමේ පෙන්වන්න" : "வரைபடத்தில் காண்க"}
          </a>
        </Space>
      ),
    },
  ];

  let columns = [...baseColumns];

  if (activeTab === "pending") {
    columns.push({
      title: language === "en" ? "Set Date" : language === "si" ? "දිනය සකසන්න" : "திகதி அமைக்கவும்",
      key: "setDate",
      render: (_, record) => (
        <Popover
          content={
            <Space>
              <DatePicker
                disabledDate={disabledPastDate}
                defaultValue={
                  record.date ? moment(record.date, "YYYY-MM-DD") : null
                }
                onChange={(date, dateString) =>
                  handleTempDateChange(record.id, dateString)
                }
                style={{ marginRight: 8 }}
              />
              <Button
                type="primary"
                onClick={() =>
                  handleConfirmDate(record.mining_number, record.tempDateString)
                }
              >
                {language === "en" ? "Confirm" : language === "si" ? "තහවුරු කරන්න" : "உறுதிப்படுத்தவும்"}
              </Button>
            </Space>
          }
          title={language === "en" ? "Select Appointment Date" : language === "si" ? "දිනය තෝරන්න" : "சந்திப்பு தேதியைத் தேர்ந்தெடுக்கவும்"}
          trigger="click"
        >
          <Button icon={<CalendarOutlined />}>
            {language === "en" ? "Set Date" : language === "si" ? "දිනය සකසන්න" : "திகதி அமைக்கவும்"}
          </Button>
        </Popover>
      ),
    });
  }

  if (activeTab === "approved") {
    // Add Scheduled Date column before the Actions column
    columns.push({
      title:
        language === "en"
          ? "Mining License No."
          : language === "si"
          ? "පතල් බලපත්‍ර අංකය"
          : "சுரங்க உரிம எண்",
      dataIndex: "mining_number", // Assuming 'mining_number' holds the license number
      key: "mining_number",
    });
    columns.push({
      title: language === "en" ? "Scheduled Date" : language === "si" ? "සැලසුම් කළ දිනය" : "திட்டமிடப்பட்ட தேதி",
      dataIndex: "date",
      key: "scheduledDate",
      render: (date) => (
        <Tag color="blue" style={{ padding: "4px 8px", borderRadius: "4px" }}>
          {moment(date).format("YYYY-MM-DD")}
        </Tag>
      ),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    });
  }

    columns.push({
      title:
        language === "en"
          ? "Action"
          : language === "si"
          ? "ක්‍රියාව"
          : "நடவடிக்கை",
      key: "statusActions",
      render: (_, record) => (
        <StatusActions
          record={record}
          onApprove={() => {
            console.log("AppointmentsTable: Approving record:", record.mining_number,record.id); // Log mining_number here
            onShowApproval(record.mining_number,record.id); // Pass mining_number to parent
          }}
          onHold={onHold}
          onReject={onReject}
        />
      ),
    });
  

  return (
    <Table
      columns={columns}
      dataSource={filteredAppointments}
      rowKey={(record) => record.id || record.mining_number}
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
};

AppointmentsTable.propTypes = {
  activeTab: PropTypes.oneOf(["pending", "approved"]).isRequired,
  onViewDetails: PropTypes.func.isRequired,
  onShowApproval: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onDateChange: PropTypes.func,
  onConfirmScheduleDate: PropTypes.func.isRequired,
  language: PropTypes.oneOf(["en", "si", "ta"]).isRequired,
};

export default AppointmentsTable;
