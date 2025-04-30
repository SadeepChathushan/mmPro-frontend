import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useLanguage } from "../../../contexts/LanguageContext";

const { TextArea } = Input;

const ValidateModal = ({
  visible,
  onCancel,
  onValidate,
  onReject,
  loading,
  form,
}) => {
  const [actionType, setActionType] = useState(null); // 'validate' or 'reject'
  const { language } = useLanguage();
  

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (actionType === "validate") {
          onValidate(values);
        } else {
          onReject(values);
        }
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <Modal
      title={
        language === "en"
          ? "License Validation"
          : language === "si"
          ? ""
          : "உரிமம் சரிபார்ப்பு"
      }
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          key="reject"
          type="danger"
          onClick={() => setActionType("reject")}
          disabled={loading}
          style={{ marginRight: 8 }}
        >
          {language === "en"
    ? "Reject"
    : language === "si"
    ? ""
    : "நிராகரிக்க"}
        </Button>,
        <Button
          key="validate"
          type="primary"
          onClick={() => setActionType("validate")}
          disabled={loading}
        >
          {
  language === "en"
    ? "Validate"
    : language === "si"
    ? ""
    : "சரிபார்க்க"
}

        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {actionType && (
          <>
            <Form.Item
              name="comments"
              label={`${
                actionType === "validate" ? "Validation" : "Rejection"
              } Comments`}
              rules={[
                {
                  required: true,
                  message: `Please provide ${
                    actionType === "validate" ? "validation" : "rejection"
                  } comments`,
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <div style={{ textAlign: "right", marginTop: 16 }}>
              <Button type="primary" onClick={handleSubmit} loading={loading}>
                Confirm {actionType === "validate" ? "Validation" : "Rejection"}
              </Button>
            </div>
          </>
        )}

        {!actionType && (

          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p>{language === "en"
    ? "Please select whether you want to validate or reject this license."
    : language === "si"
    ? "."
    : "இந்த உரிமத்தை சரிபார்க்க அல்லது நிராகரிக்க விரும்புகிறீர்களா என்பதைத் தேர்ந்தெடுக்கவும்."}
</p>

          </div>
        )}
      </Form>
    </Modal>
  );
};

export default ValidateModal;
