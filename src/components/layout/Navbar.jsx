import { Layout, Menu, Row, Col, Button, Space } from "antd";
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import mmprologo from "../../assets/images/LOGO.png";
import { useLanguage } from "../../contexts/LanguageContext";
import "../layout/layout.css";

const { Header } = Layout;

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();

  const handleHashClick = (hash, e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Red color scheme
  const primaryColor = "#FF4757"; // Vibrant red
  const hoverColor = "#E84142"; // Slightly darker red
  const textColor = "#2D3748";
  const bgColor = "#FFFFFF";

  // Menu items data
  const menuItems = [
    {
      key: "home",
      label: (
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          style={{ color: textColor }}
        >
          <motion.span whileHover={{ color: primaryColor }}>
            {language === "en"
              ? "Home"
              : language === "si"
                ? "මුල් පිටුව"
                : "முகப்பு"}
          </motion.span>
        </Link>
      )
    },
    {
      key: "services",
      label: (
        <Link
          to="/#service"
          onClick={(e) => handleHashClick('service', e)}
          style={{ color: textColor }}
        >
          <motion.span whileHover={{ color: primaryColor }}>
            {language === "en"
              ? "Services"
              : language === "si"
                ? "සේවාව"
                : "சேவைகள்"}
          </motion.span>
        </Link>
      )
    },
    {
      key: "about",
      label: (
        <Link
          to="/#about"
          onClick={(e) => handleHashClick('about', e)}
          style={{ color: textColor }}
        >
          <motion.span whileHover={{ color: primaryColor }}>
            {language === "en"
              ? "About"
              : language === "si"
                ? "පිළිබඳ"
                : "பற்றிய"}
          </motion.span>
        </Link>
      )
    },
    {
      key: "contact",
      label: (
        <Link to="/contact" style={{ color: textColor }}>
          <motion.span whileHover={{ color: primaryColor }}>
            {language === "en" ? "Contact" : language === "si" ? "සම්බන්ධ වන්න" : "தொடர்பு"}
          </motion.span>
        </Link>
      )
    }
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <Header
      style={{
        backgroundColor: bgColor,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "0 24px",
        height: "80px",
        // minWidth: "1024px"
        width: "100%"

      }}
      id="h-header"
    >
      <Row justify="space-between" align="middle" style={{ height: "100%", flexWrap: "nowrap" }}>
        <Col flex="none">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <img
                className="n-mmprologo"
                src={mmprologo}
                alt="mmPro Logo"
                style={{ height: "50px", cursor: "pointer" }}
              />
            </Link>
          </motion.div>
        </Col>

        {/* <Col flex="auto" style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Menu
              mode="horizontal"
              style={{
                borderBottom: "none",
                lineHeight: "78px",
                color: textColor,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexWrap: "nowrap",
                whiteSpace: "nowrap"
              }}
              className="modern-menu"
              items={menuItems}
              disabledOverflow={true} // This prevents the menu from collapsing
            />
          </div>
        </Col> */}
        

<Col flex="auto" style={{ overflow: "hidden" }}>

  <div className="desktop-menu" style={{ display: "flex", justifyContent: "center" }}>
    <Menu
      mode="horizontal"
      style={{
        borderBottom: "none",
        lineHeight: "78px",
        color: textColor,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "nowrap",
        whiteSpace: "nowrap"
      }}
      className="modern-menu"
      items={menuItems}
      
      >
     
      {menuOpen ? <CloseOutlined style={{ marginLeft: 'auto' }} /> : <MenuOutlined style={{ marginLeft: 'auto' }} />}
    </Menu>
  </div>

  {/* Mobile Menu */}
  {/* <div className="mobile-menu-icon">
  <Button
    type="text"
    icon={menuOpen ? <CloseOutlined /> : <MenuOutlined />}
    onClick={toggleMenu}
    style={{ fontSize: "24px", color: textColor }}
  />
</div> */}

  {/* {menuOpen && (
    <Menu
     className="modern-menu show"
      mode="vertical"
      style={{
        position: "absolute",
        top: "80px",
        left: 0,
        right: 0,
        backgroundColor: bgColor,
        zIndex: 1000,
      }}
      // items={menuItems}
      
      
    />
  )} */}

</Col>


        <Col flex="none">
          <Space size="middle" align="center" style={{ flexWrap: "nowrap" }}>
            {language === "en" && (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="text"
                    onClick={() => toggleLanguage("ta")}
                    style={{
                      color: textColor,
                      fontWeight: 500,
                    }}
                  >
                    தமிழ்
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="text"
                    onClick={() => toggleLanguage("si")}
                    style={{
                      color: textColor,
                      fontWeight: 500,
                    }}
                  >
                    සිංහල
                  </Button>
                </motion.div>
              </>
            )}
            {language === "si" && (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="text"
                    onClick={() => toggleLanguage("ta")}
                    style={{
                      color: textColor,
                      fontWeight: 500,
                    }}
                  >
                    தமிழ்
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="text"
                    onClick={() => toggleLanguage("en")}
                    style={{
                      color: textColor,
                      fontWeight: 500,
                    }}
                  >
                    English
                  </Button>
                </motion.div>
              </>
            )}
            {language === "ta" && (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="text"
                    onClick={() => toggleLanguage("en")}
                    style={{
                      color: textColor,
                      fontWeight: 500,
                    }}
                  >
                    English
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="text"
                    onClick={() => toggleLanguage("si")}
                    style={{
                      color: textColor,
                      fontWeight: 500,
                    }}
                  >
                    සිංහල
                  </Button>
                </motion.div>
              </>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/signin">
                <Button
                  type="primary"
                  style={{
                    backgroundColor: primaryColor,
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 500,
                    boxShadow: "0 4px 6px rgba(255, 71, 87, 0.2)",
                  }}
                  className="login-btn"
                >
                  {language === "en"
                    ? "Login"
                    : language === "si"
                      ? "පිවිසුම"
                      : "உள்நுழைய"}
                </Button>
              </Link>
            </motion.div>
          </Space>
        </Col>
      </Row>

      <style jsx global>{`
        .modern-menu .ant-menu-item {
          padding: 0 16px;
          margin: 0 4px;
          border-radius: 8px;
          transition: all 0.3s ease;
          flex-shrink: 0;
          
        }
        
        .modern-menu .ant-menu-item:hover {
          background: rgba(255, 71, 87, 0.1) !important;
        }
        
        .modern-menu .ant-menu-item::after {
          display: none;
        }
        
        .login-btn:hover {
          background: ${hoverColor} !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 8px rgba(255, 71, 87, 0.3) !important;
        }
        
        .menu-item a {
          font-weight: 500;
          transition: color 0.2s ease;
          
        }

        /* Prevent menu from collapsing */
        .ant-menu-overflow {
          display: block;
          overflow-x: auto;
          overflow-y: hidden;
        }
        
        .ant-menu-overflow-item {
          flex-shrink: 0;
        }

        // .mobile-menu-icon {
        //   display: none;
        // }

       
        @media (max-width: 768px) {
          #h-header {
            flex-direction: column !important;
            height: auto !important;
            padding: 0 12px !important;
          }
          // .mobile-menu-icon {
          //   display: block !important;
          //   text-align: right; 
          //   // display: flex;
          //   justify-content: flex-end;
          //   align-items: center;
          //   height: 80px;
          //   padding-right: 20px;
          // }

          .modern-menu {
            flex-direction: column !important;
            
            align-items: center !important;
            width: 100% !important;
          }

          .desktop-menu {
            display: none ;
          }

           .modern-menu.hide {
            display: none !important;
          }
          

          // .modern-menu.show {
          //   display: flex ;
          // }

         

          .modern-menu .ant-menu-item {
            display: block;
            width: 100%;
            text-align: center;
            margin: 6px 0;
          }
       
          .ant-space {
            flex-direction: column !important;
            width: 100%;
            gap: 8px;
            align-items: center;
          }

          .login-btn {
            width: 100%;
          }

          .n-mmprologo {
            height: 40px !important;
          }
        
        

      }
      `}</style>
    </Header>
  );
};

export default Navbar;