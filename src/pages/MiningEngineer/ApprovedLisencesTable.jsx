import { Table, Tag, Space } from 'antd';
import PropTypes from 'prop-types';

const ApprovedLicensesTable = ({ data, onViewDetails, language }) => {
  const columns = [
    {
      title: language === "en" ? "License No" : "அனுமதி எண்",
      dataIndex: 'licenseNumber',
      key: 'licenseNo',
      render: (text) => <Tag color="green">{text}</Tag>
    },
    {
      title: language === "en" ? "ML Owner" : "உரிமையாளர்",
      dataIndex: 'owner',
      key: 'owner'
    },
    {
      title: language === "en" ? "Location" : "இடம்",
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: language === "en" ? "Approved Date" : "அங்கீகரிக்கப்பட்ட தேதி",
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: language === "en" ? "Status" : "நிலை",
      key: 'status',
      render: () => (
        <Tag color="success">
          {language === "en" ? "Approved" : "அங்கீகரிக்கப்பட்டது"}
        </Tag>
      )
    },
    {
      title: language === "en" ? "Actions" : "செயல்கள்",
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onViewDetails(record)}>
            {language === "en" ? "View Details" : "விவரங்களைக் காட்டு"}
          </a>
        </Space>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

ApprovedLicensesTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      licenseNumber: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
  onViewDetails: PropTypes.func.isRequired,
  language: PropTypes.oneOf(['en', 'ta']).isRequired
};

export default ApprovedLicensesTable;