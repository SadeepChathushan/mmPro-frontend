import React from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";

const NewLicenseFormSinhala = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values: ", values);
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} ගොනුව සාර්ථකව උඩුගත කරා`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} ගොනුව උඩුගත කිරීමට අසාර්ථක විය`);
    }
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
      ></Button>

      <h2 style={{ textAlign: "center", fontWeight: "bold", color: "#1a1a1a" }}>
        නව බලපත්‍ර හිමිකරු ලියාපදිංචි කරන්න
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ gap: "16px" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="හිමිකරුගේ නම"
              name="ownerName"
              rules={[{ required: true, message: "කරුණාකර හිමිකරුගේ නම ඇතුළත් කරන්න!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="ජංගම දුරකථන අංකය"
              name="mobile"
              rules={[{ required: true, message: "කරුණාකර ජංගම දුරකථන අංකය ඇතුළත් කරන්න!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="වාහන අංකය"
              name="vehicleNumber"
              rules={[{ required: true, message: "කරුණාකර වාහන අංකය ඇතුළත් කරන්න!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="ධාරිතාවය (කියුබ්)"
              name="capacity"
              rules={[{ required: true, message: "කරුණාකර ධාරිතාවය ඇතුළත් කරන්න!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="ලොරි පොත"
              name="lorryBook"
              rules={[{ required: true, message: "කරුණාකර ලොරි පොතේ රූපය උඩුගත කරන්න!" }]}
            >
              <Upload
                name="lorryBook"
                showUploadList={false}
                action="/upload.do"
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />}>ලොරි පොත උඩුගත කරන්න</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="ලොරි රූපය"
              name="lorry"
              rules={[{ required: true, message: "කරුණාකර ලොරි රූපය උඩුගත කරන්න!" }]}
            >
              <Upload
                name="lorry"
                showUploadList={false}
                action="/upload.do"
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />}>ලොරි රූපය උඩුගත කරන්න</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#950C33",
                    borderColor: "#950C33",
                    width: "48%",
                  }}
                >
                  බලපත්‍රය නිර්මාණය කරන්න
                </Button>

                <Button
                  type="default"
                  onClick={handleCancel}
                  style={{
                    width: "48%",
                    borderColor: "#950C33",
                  }}
                >
                  අවලංගු කරන්න
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewLicenseFormSinhala;
