import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import uploadMediaToSupabase from "../../utils/imageUpload";

const NewLicenseForm = () => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState({
    lorryBook: false,
    lorry: false,
  });

  // Function to upload the first image (lorryBook)
const uploadLorryBook = async (file) => {
  setUploading((prev) => ({ ...prev, lorryBook: true }));
  try {
    const publicUrl = await uploadMediaToSupabase(file); // Get public URL for lorryBook
    form.setFieldsValue({ lorryBook: publicUrl }); // Set the public URL in the form
    console.log("Lorry Book URL:", publicUrl); // Log the URL for debugging
    message.success(`${file.name} uploaded successfully!`);
  } catch (err) {
    message.error(`Upload failed: ${err}`);
  } finally {
    setUploading((prev) => ({ ...prev, lorryBook: false }));
  }
};

// Function to upload the second image (lorry)
const uploadLorry = async (file) => {
  setUploading((prev) => ({ ...prev, lorry: true }));
  try {
    const publicUrl = await uploadMediaToSupabase(file); // Get public URL for lorry
    form.setFieldsValue({ lorry: publicUrl }); // Set the public URL in the form
    console.log("Lorry URL:", publicUrl); // Log the URL for debugging
    message.success(`${file.name} uploaded successfully!`);
  } catch (err) {
    message.error(`Upload failed: ${err}`);
  } finally {
    setUploading((prev) => ({ ...prev, lorry: false }));
  }
};


  // Handling the file upload sequence
  const beforeUpload = (file, fieldName) => {
    if (fieldName === "lorryBook") {
      uploadLorryBook(file); // Upload lorryBook first
    } else if (fieldName === "lorry") {
      uploadLorry(file); // Upload lorry image second
    }
    return false; // Prevent default upload behavior
  };

  const onFinish = async (values) => {
    console.log("Form Values on Submit:", values); // Check form values before submitting
  
    try {
      const payload = {
        issue: {
          project_id: 17,
          tracker_id: 1,
          subject: "New License Owner",
          custom_fields: [
            { id: 2, name: "Owner Name", value: values.ownerName },
            { id: 3, name: "Mobile Number", value: values.mobile },
            { id: 4, name: "Vehicle Number", value: values.vehicleNumber },
            { id: 5, name: "Capacity", value: values.capacity },
            { id: 17, name: "Lorry Book(image)", value: values.lorryBook }, // Correct lorryBook URL
            { id: 18, name: "Lorry(image)", value: values.lorry }, // Correct lorry URL
          ],
        },
      };
  
      const username = "@achinthamihiran"; // Replace with actual username
      const password = "Ab2#*De#"; // Replace with actual password
  
      const response = await axios.post(
        "/api/projects/add-new-license-owner/issues.json",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username,
            password,
          },
        }
      );
  
      message.success("License owner created successfully!");
      form.resetFields();
      console.log("API response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
      message.error("Failed to create license owner. Please try again.");
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
      >
        Back
      </Button>

      <h2 style={{ textAlign: "center", fontWeight: "bold", color: "#1a1a1a" }}>
        Register New License Owner
      </h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Owner Name"
              name="ownerName"
              rules={[{ required: true, message: "Please input the owner name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Mobile Number"
              name="mobile"
              rules={[{ required: true, message: "Please input the mobile number!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Vehicle Number"
              name="vehicleNumber"
              rules={[{ required: true, message: "Please input the vehicle number!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Capacity (Cubes)"
              name="capacity"
              rules={[{ required: true, message: "Please input the capacity!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Lorry Book"
              name="lorryBook"
              rules={[{ required: true, message: "Please upload the lorry book image!" }]}
            >
              <Upload
                beforeUpload={(file) => beforeUpload(file, "lorryBook")}
                showUploadList={false}
                disabled={uploading.lorryBook}
              >
                <Button icon={<UploadOutlined />} loading={uploading.lorryBook}>
                  Upload Lorry Book
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Lorry"
              name="lorry"
              rules={[{ required: true, message: "Please upload the lorry image!" }]}
            >
              <Upload
                beforeUpload={(file) => beforeUpload(file, "lorry")}
                showUploadList={false}
                disabled={uploading.lorry}
              >
                <Button icon={<UploadOutlined />} loading={uploading.lorry}>
                  Upload Lorry Image
                </Button>
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
                    width: "48%",
                    backgroundColor: "#950C33",
                    borderColor: "#950C33",
                  }}
                >
                  Create License
                </Button>
                <Button
                  type="default"
                  onClick={handleCancel}
                  style={{ width: "48%", borderColor: "#950C33" }}
                >
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewLicenseForm;
