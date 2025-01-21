import React from "react";
import { Layout, Menu, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import mmprologo from "../../assets/images/LOGO.png";
import { useLanguage } from "../../contexts/LanguageContext";
import "../layout/layout.css"; 

const { Header } = Layout;

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <Header style={{ backgroundColor: "#fff" }} id="h-header">
      <Row justify="space-between" align="middle">
        <Col style={{ width: "10%" }}>
          <img
            className="n-mmprologo"
            src={mmprologo}
            alt="mmPro Logo"
            style={{}}
          />
        </Col>
        <Col className="nav-list">
          <Menu mode="horizontal" style={{ lineHeight: "64px" }}>
            <Menu.Item key="home">
              <a href="#h-header">
                {language === "en"
                  ? "Home"
                  : language === "si"
                  ? "මුල් පිටුව"
                  : "முகப்பு"}
              </a>
            </Menu.Item>
            <Menu.Item key="services">
              <a href="#service">
                {language === "en"
                  ? "Service"
                  : language === "si"
                  ? "සේවාව"
                  : "சேவைகள்"}
              </a>
            </Menu.Item>
            {/* <Menu.Item key="news">
              <Link to="/news">News</Link>
            </Menu.Item> */}
            <Menu.Item key="about">
              <a href="#about">
                {language === "en"
                  ? "About"
                  : language === "si"
                  ? "පිළිබඳ"
                  : "பற்றிய"}
              </a>
            </Menu.Item>
            <Menu.Item key="contact">
              <a href="#h-footer">
                {language === "en"
                  ? "Contact"
                  : language === "si"
                  ? "සම්බන්ධවීම"
                  : "தொடர்பு"}
              </a>
            </Menu.Item>
          </Menu>
        </Col>
        <Col className="n-button">
          {language === "en" && (
            <>
              <Button
                type="primary"
                onClick={() => toggleLanguage("ta")}
                style={{
                  backgroundColor: "#781424",
                  whiteSpace: "balance",
                  margin: "5px",
                }}
              >
                தமிழ்
              </Button>
              <Button
                type="primary"
                onClick={() => toggleLanguage("si")}
                style={{
                  backgroundColor: "#781424",
                  margin: "5px",
                  marginRight: "80px",
                }}
              >
                සිංහල
              </Button>
            </>
          )}
          {language === "si" && (
            <>
              <Button
                type="primary"
                onClick={() => toggleLanguage("ta")}
                style={{
                  backgroundColor: "#781424",
                  borderColor: "#781424",
                  margin: "5px",
                }}
              >
                தமிழ்
              </Button>
              <Button
                type="primary"
                onClick={() => toggleLanguage("en")}
                style={{
                  backgroundColor: "#781424",
                  margin: "5px",
                  marginRight: "80px",
                }}
              >
                English
              </Button>
            </>
          )}
          {language === "ta" && (
            <>
              <Button
                type="primary"
                onClick={() => toggleLanguage("en")}
                style={{
                  backgroundColor: "#781424",
                  whiteSpace: "balance",
                  margin: "5px",
                }}
              >
                English
              </Button>
              <Button
                type="primary"
                onClick={() => toggleLanguage("si")}
                style={{
                  backgroundColor: "#781424",
                  margin: "5px",
                  marginRight: "50px",
                }}
              >
                සිංහල
              </Button>
            </>
          )}
          <Link to="/signin">
            <Button
              type="primary"
              style={{
                backgroundColor: "#781424",
                margin: "5px",
              }}
            >
              {language === "en"
                ? "Login"
                : language === "si"
                ? "පිවිසුම"
                : "உள்நுழைய"}
            </Button>
          </Link>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
