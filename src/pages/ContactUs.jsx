import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { Button, Form, Input, message, Layout } from 'antd';
import background from "../assets/images/lake.avif"; 
import logo from "../assets/images/gsmbLogo.png";
import Navbar from "../components/layout/Navbar.jsx"; 
import "../styles/ContactUs.css";

const { Content } = Layout;
const { TextArea } = Input;

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success('Your message has been sent successfully!');
      formik.resetForm();
      setIsSubmitting(false);
    },
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content>
        <div style={{ height: "100vh", position: "relative" }}>
          <div
  className="background-container"
  style={{
    backgroundImage: `url(${background})`,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(5px)',
    zIndex: 0
  }}
></div>
          <div className="overlay"></div>

          <div className="content-container">
            {/* Left Section - Contact Info */}
            <div className="left-section contact-info">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <img src={logo} alt="Logo" style={{ height: "60px" }} />
                <h1>CONTACT US</h1>
              </div>
              
              <p style={{ color: "#ffffff", marginBottom: "2rem" }}>
                Have questions or need assistance? Reach out to us through any of the channels below.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <div>
                    <h3>Phone</h3>
                    <p>+94 76 123 4567</p>
                  </div>
                </div>

                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <div>
                    <h3>Email</h3>
                    <p>contact@mmpro.lk</p>
                  </div>
                </div>

                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <div>
                    <h3>Address</h3>
                    <p>123 Tech Park, Colombo, Sri Lanka</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="#"><FaLinkedin /></a>
                  <a href="#"><FaTwitter /></a>
                  <a href="#"><FaFacebook /></a>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="right-section contact-form-section">
              <h2>Send Us a Message</h2>
              <Form
                layout="vertical"
                onFinish={formik.handleSubmit}
              >
                <Form.Item
                  label="Name"
                  help={formik.touched.name && formik.errors.name}
                  validateStatus={formik.touched.name && formik.errors.name ? 'error' : ''}
                >
                  <Input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Your name"
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  help={formik.touched.email && formik.errors.email}
                  validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
                >
                  <Input
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Your email"
                  />
                </Form.Item>

                <Form.Item
                  label="Message"
                  help={formik.touched.message && formik.errors.message}
                  validateStatus={formik.touched.message && formik.errors.message ? 'error' : ''}
                >
                  <TextArea
                    name="message"
                    rows={6}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Your message here..."
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={isSubmitting}
                    style={{ width: '100%' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ContactUs;