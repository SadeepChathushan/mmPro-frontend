import React, { useState, useRef, useEffect } from "react";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import Userlogo from "../../assets/images/user.png";
import { FaChevronDown } from "react-icons/fa";
import mmLogo from "../../assets/images/LOGO.png";
import "../layout/layout.css"; 
import { Link } from "react-router-dom";
import authService from "../../services/authService"; // Import authService

const { Header } = Layout;

const AppHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    authService.logout(); // Call logout from authService
    navigate("/signin"); // Redirect to signin page after logout
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown when clicked outside
      }
    };

    // Add event listener when component is mounted
    document.addEventListener("click", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Prevent dropdown from closing when clicking on the dropdown itself
  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent click from bubbling to document listener
    setIsOpen(!isOpen); // Toggle dropdown open/close
  };

  return (
    <Header
  style={{
    background: "#FCD5D0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",  // ✅ Fix header at the top
    top: 0,  // ✅ Stick to the top
    left: 0,  // ✅ Ensure it starts from the left
    width: "100%",  // ✅ Make it full width
    zIndex: 1000,  // ✅ Keep it above other elements
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // ✅ Add shadow effect
  }}
>

      <div className="user-header-logo">
        <Link to="/"><img
          src={mmLogo}
          alt="mmPro Logo"
          style={{ width: "50%", margin: "0 16px" }}
        />
        </Link>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
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
          onClick={handleDropdownClick} // Handle dropdown toggle
        />
      </div>
      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef} // Attach ref to the dropdown
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
            Profile
          </p>
          <p
            style={{
              margin: "-20px -10px -15px 10px",
              cursor: "pointer",
              color: "red",
            }}
            onClick={handleLogout} // Add logout action to the menu
          >
            Logout
          </p>
        </div>
      )}
      </div>
    </Header>
  );
};

export default AppHeader;
