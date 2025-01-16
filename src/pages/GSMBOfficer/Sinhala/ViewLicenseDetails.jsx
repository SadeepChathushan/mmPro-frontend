import React from "react";
import { Card, Row, Col, Form, Input, DatePicker, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const ViewLicenseDetailsSinhala = () => {
  // Hardcoded dummy data
  const initialData = {
    licenseNumber: "IML/B/TEST/1578/LRS",
    ownerName: "ජයන්ත පෙරේරා",
    location: "රත්නපුර",
    capacity: 100,
    issueDate: dayjs("2024-07-05"),
    expiryDate: dayjs("2025-07-04"),
    mobile: "0711234567",
  };

  const [form] = Form.useForm();

  const handleUpdate = (values) => {
    console.log("Updated values: ", values);
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        background: "#f0f2f5",
        borderRadius: "10px",
      }}
    >
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: "16px", paddingLeft: 0, color: "#000000" }}
        href="/gsmb/dashboard"
      >
        ආපසු
      </Button>
      <Card
        title={<h3 style={{ margin: 0 }}>බලපත්‍ර විස්තර සංස්කරණය</h3>}
        style={{ borderRadius: "10px" }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={initialData}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="බලපත්‍ර අංකය"
                name="licenseNumber"
                rules={[{ required: true, message: "කරුණාකර බලපත්‍ර අංකය ඇතුළත් කරන්න!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="හිමිකරුගේ නම"
                name="ownerName"
                rules={[{ required: true, message: "කරුණාකර හිමිකරුගේ නම ඇතුළත් කරන්න!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="ස්ථානය"
                name="location"
                rules={[{ required: true, message: "කරුණාකර ස්ථානය ඇතුළත් කරන්න!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="ජංගම දුරකථන අංකය"
                name="mobile"
                rules={[{ required: true, message: "කරුණාකර ජංගම දුරකථන අංකය ඇතුළත් කරන්න!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="ධාරිතාවය (කියුබ්)"
                name="capacity"
                rules={[{ required: true, message: "කරුණාකර ධාරිතාවය ඇතුළත් කරන්න!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="නිකුත් කරන දිනය"
                name="issueDate"
                rules={[{ required: true, message: "කරුණාකර නිකුත් කරන දිනය තෝරන්න!" }]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="කල් ඉකුත් වන දිනය"
                name="expiryDate"
                rules={[{ required: true, message: "කරුණාකර කල් ඉකුත් වන දිනය තෝරන්න!" }]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col xs={12}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#950C33",
                  borderColor: "#950C33",
                  width: "100%",
                }}
              >
                යාවත්කාලීන කරන්න
              </Button>
            </Col>
            <Col xs={12}>
              <Button
                type="default"
                onClick={handleCancel}
                style={{ width: "100%", borderColor: "#950C33" }}
              >
                අවලංගු කරන්න
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default ViewLicenseDetailsSinhala;