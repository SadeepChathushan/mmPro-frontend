import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import Userlogo from "../../assets/images/user.png";
import { FaChevronDown } from "react-icons/fa";
import mmLogo from "../../assets/images/LOGO.png";
import "../layout/layout.css";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  return (
    <Header
      style={{
        background: "#FCD5D0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="user-header-logo">
        <Link to="/">
          <img
            src={mmLogo}
            alt="mmPro Logo"
            style={{ width: "50%", margin: "0 16px" }}
          />
        </Link>
      </div>
      <div className="user-header-rest">
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
              }}
            >
              සිංහල
            </Button>
          </>
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Userlogo}
            alt="gsmblogo"
            style={{ height: "40px", margin: "0 16px" }}
          />
          <FaChevronDown
            style={{ fontSize: "20px", color: "#781424", cursor: "pointer" }}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {/* Dropdown Menu */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "65px",
              right: "50px",
              background: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              minWidth: "150px",
              padding: "10px" /* Add padding to give spacing inside */,
            }}
          >
            <p style={{ margin: "-15px -10px -10px 10px", cursor: "pointer" }}>
              {language === "en"
                ? "Profile"
                : language === "si"
                ? "පැතිකඩ"
                : "சுயவிவரம்"}
            </p>
            <p style={{ margin: "-20px -10px -15px 10px", cursor: "pointer" }}>
              {language === "en"
                ? "Logout"
                : language === "si"
                ? "පිටවීම"
                : "வெளியேறு"}
            </p>
          </div>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
