import { useState, useEffect } from "react";
import { Table, Space, Button, Popover, DatePicker, message } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import moment from "moment";
import PropTypes from "prop-types";
import StatusActions from "./StatusActions";
import {
  getMeAwatingList,
  scheduleMiningEngineerAppointmentDate,
  meAppointments,
} from "../../services/miningEngineerService";
import ViewLicenseModal from "./ViewDetails";
import "../../styles/MiningEngineer/AppointmentsTable.css";

const AppointmentsTable = ({
  activeTab,
  onShowApproval,
  onHold,
  onReject,
  onDateChange,
  onConfirmScheduleDate,
  language,
  onViewDetails,
}) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        let data = [];
        if (activeTab === "pending") {
          data = await getMeAwatingList();
        } else if (activeTab === "scheduled") {
          data = await meAppointments();
        }
        setAppointments(
          data.map((item) => ({ ...item, tempDateString: null }))
        );
      } catch (error) {
        console.error("Error fetching appointments:", error);
        message.error(
          language === "en"
            ? "Failed to load appointments"
            : language === "si"
            ? "ඇමතුම් පෑම බැහැර කිරීමට අසමත් විය"
            : "நியமனங்களை ஏற்றுவதில் தோல்வி"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [activeTab, language]);

  const handleTempDateChange = (id, dateString) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, tempDateString: dateString } : item
      )
    );
  };

  // Update the function signature to accept googleLocation
  const handleConfirmDate = async (
    mining_number,
    dateString,
    Google_location
  ) => {
    if (dateString) {
      try {
        const result = await scheduleMiningEngineerAppointmentDate(
          mining_number,
          dateString,
          Google_location
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
                    Google_location: Google_location, // Optional: update local state
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

          onConfirmScheduleDate(mining_number, dateString, Google_location);
          onDateChange &&
            onDateChange(mining_number, null, dateString, Google_location);
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

  // // Common columns for both tabs
  // const commonColumns = [

  // ];

  // Pending Tab Columns
  const pendingColumns = [
    // ...commonColumns,
    {
      title:
        language === "en"
          ? "ML Owner"
          : language === "si"
          ? "ඇමතුම් හිමිකරු"
          : "ML உரிமையாளர்",
      dataIndex: "assigned_to",
      key: "mlOwner",
    },

    {
      title:
        language === "en" ? "Location" : language === "si" ? "ස්ථානය" : "இடம்",
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
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#389e0d" }}
          >
            {language === "en"
              ? "View on Map"
              : language === "si"
              ? "සිතියමේ පෙන්වන්න"
              : "வரைபடத்தில் காண்க"}
          </a>
        </Space>
      ),
    },
    {
      title:
        language === "en"
          ? "Mining License No."
          : language === "si"
          ? "නියමිත දිනය"
          : "திட்டமிடப்பட்ட தேதி",
      dataIndex: "mining_number",
      key: "mining_number",
    },
    {
      title:
        language === "en"
          ? "Set Date"
          : language === "si"
          ? "දිනය සකසන්න"
          : "திகதி அமைக்கவும்",
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
                  handleConfirmDate(
                    record.mining_number,
                    record.tempDateString,
                    record.Google_location
                  )
                }
              >
                {language === "en"
                  ? "Confirm"
                  : language === "si"
                  ? "තහවුරු කරන්න"
                  : "உறுதிப்படுத்தவும்"}
              </Button>
            </Space>
          }
          title={
            language === "en"
              ? "Select Appointment Date"
              : language === "si"
              ? "දිනය තෝරන්න"
              : "சந்திப்பு தேதியைத் தேர்ந்தெடுக்கவும்"
          }
          trigger="click"
        >
          <Button icon={<CalendarOutlined />}>
            {language === "en"
              ? "Set Date"
              : language === "si"
              ? "දිනය සකසන්න"
              : "திகதி அமைக்கவும்"}
          </Button>
        </Popover>
      ),
    },
    {
      title:
        language === "en"
          ? "Actions"
          : language === "si"
          ? "ක්‍රියා"
          : "செயல்கள்",
      key: "actions",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedLicense(record.id);
            setIsViewModalVisible(true);
          }}
          className="view-details-btn"
        >
          {language === "en" ? "View" : language === "si" ? "බලන්න" : "காண்க"}
        </Button>
      ),
    },
  ];

  // Scheduled Tab Columns (with Scheduled Date)
  const scheduledColumns = [
    // ...commonColumns,

    {
      title:
        language === "en"
          ? "Mining Engineer"
          : language === "si"
          ? "ඇමතුම් හිමිකරු"
          : "ML உரிமையாளர்",
      dataIndex: "assigned_to",
      key: "mlOwner",
    },

    {
      title:
        language === "en" ? "Location" : language === "si" ? "ස්ථානය" : "இடம்",
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
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#389e0d" }}
          >
            {language === "en"
              ? "View on Map"
              : language === "si"
              ? "සිතියමේ පෙන්වන්න"
              : "வரைபடத்தில் காண்க"}
          </a>
        </Space>
      ),
    },
    {
      title:
        language === "en"
          ? "Mining License No."
          : language === "si"
          ? "නියමිත දිනය"
          : "திட்டமிடப்பட்ட தேதி",
      dataIndex: "mining_number",
      key: "mining_number",
    },
    {
      title:
        language === "en"
          ? "Scheduled Date"
          : language === "si"
          ? "නියමිත දිනය"
          : "திட்டமிடப்பட்ட தேதி",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) => (date ? moment(date).format("YYYY-MM-DD") : "-"),
    },
    {
      title:
        language === "en"
          ? "Actions"
          : language === "si"
          ? "ක්‍රියා"
          : "செயல்கள்",
      key: "actions",
      fixed: "right",
      width: 250,
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              // Extract last 3 digits from mining_number
              const last3 = record.mining_number
                ? record.mining_number.match(/\d{3}$/)?.[0]
                : "";
              setSelectedLicense(last3);
              setIsViewModalVisible(true);
              // Optional: log for debugging
              console.log("Selected mining number last 3:", last3);
            }}
            className="view-details-btn"
          >
            {language === "en" ? "View" : language === "si" ? "බලන්න" : "காண்க"}
          </Button>
          <StatusActions
            record={record}
            onApprove={() => {
              console.log("Approve clicked:", record.mining_number, record.id);
              onShowApproval(record.mining_number, record.id);
            }}
            onHold={(record) => {
              onHold(record.mining_number, record.id);
            }}
            onReject={(record) => {
              onReject(record.mining_number, record.id);
            }}
          />
        </Space>
      ),
    },
  ];

  // Filter appointments for each tab
  const filteredAppointments = appointments.filter((item) => {
    if (activeTab === "pending") {
      return item.status === "Awaiting ME Scheduling";
    } else if (activeTab === "scheduled") {
      return item.status === "ME Appointment Scheduled";
    }
    return true;
  });

  return (
    <>
      <Table
        columns={activeTab === "pending" ? pendingColumns : scheduledColumns}
        dataSource={filteredAppointments}
        rowKey={(record) => record.id || record.mining_number}
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
        className="appointments-table"
      />

      <ViewLicenseModal
        visible={isViewModalVisible}
        onClose={() => setIsViewModalVisible(false)}
        selectedLicense={selectedLicense}
        language={language}
      />
    </>
  );
};

AppointmentsTable.propTypes = {
  activeTab: PropTypes.oneOf(["pending", "scheduled"]).isRequired,
  onViewDetails: PropTypes.func.isRequired,
  onShowApproval: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onDateChange: PropTypes.func,
  onConfirmScheduleDate: PropTypes.func.isRequired,
  language: PropTypes.oneOf(["en", "si", "ta"]).isRequired,
};

export default AppointmentsTable;
