import PropTypes from "prop-types";
import { Button, Space } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import RejectConfirmation from "./RejectConfirmation";
import HoldConfirmation from "./HoldConfirmation";

const StatusActions = ({ record, onApprove, onHold, onReject }) => {
  const { language } = useLanguage();

  return (
    <Space>
      <Button
        type="primary"
        icon={<CheckOutlined />}
        ghost
        onClick={() => onApprove(record.id)}
      >
        {language === "en"
          ? "Approve"
          : language === "si"
          ? "අනුමත කරන්න"
          : "உடன்படல்"}
      </Button>

      <HoldConfirmation onHold={onHold} recordId={record.id} />
      <RejectConfirmation
        onReject={onReject}
        recordId={record.id}
        mining_number={record.mining_number}
      />
    </Space>
  );
};

StatusActions.propTypes = {
  record: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onApprove: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default StatusActions;
