import React from "react";
import { Form, Input, Button, DatePicker, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const SNewLicenseFormSinhala = () => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Form values: ", values);
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
        {" "}
      </Button>

      <h2 style={{ textAlign: "center", fontWeight: "bold", color: "#1a1a1a" }}>
        නව බලපත්‍රය
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
              label="බලපත්‍ර අංකය"
              name="licenseNumber"
              rules={[
                { required: true, message: "කරුණාකර බලපත්‍ර අංකය ඇතුළත් කරන්න!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="අයිතිකරුගේ නම"
              name="ownerName"
              rules={[
                { required: true, message: "කරුණාකර අයිතිකරුගේ නම ඇතුළත් කරන්න!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="වලංගුකම් ආරම්භය"
              name="validityStart"
              rules={[
                { required: true, message: "කරුණාකර ආරම්භක දිනය තෝරන්න!" },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="වලංගු දිනය දක්වා"
              name="endDate"
              rules={[
                { required: true, message: "කරුණාකර අවසාන දිනය තෝරන්න!" },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="ධාරිතාවය (කියුබ්)"
              name="capacity"
              rules={[
                { required: true, message: "කරුණාකර ධාරිතාවය ඇතුළත් කරන්න!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="ජංගම දුරකථන අංකය"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "කරුණාකර ජංගම දුරකථන අංකය ඇතුළත් කරන්න!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="ස්ථානය"
              name="location"
              rules={[
                { required: true, message: "කරුණාකර ස්ථානය ඇතුළත් කරන්න!" },
              ]}
            >
              <Input />
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

export default SNewLicenseFormSinhala;
