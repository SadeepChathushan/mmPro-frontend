import React from "react";
import "../../styles/footer.css"; // Import external CSS
import logo from "../../assets/images/gsmblogo2.png"; // Import image
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-area">
            <div className="footer-logo">
              <img src={logo} alt="gsmblogo" />
            </div>
            <div className="footer-logo-text-area">
              <h6 className="footer-text">Geological Survey & Mines Bureau</h6>
              <h6 className="footer-text">
                භූ විද්‍යා සමීක්ෂණ සහ පතල් කාර්යාංශය
              </h6>
              <h6 className="footer-text">
                புவியியல் ஆய்வு மற்றும் சுரங்கப் பணியகம்
              </h6>
            </div>
          </div>
          <div className="footer-related-links">
            <h3>Related and Useful Links</h3>
            <div className="footer-related-links-list">
              <a
                href="https://env.gov.lk/web/index.php/en/"
                target="_blank"
                rel="noreferrer"
              >
                Ministry of Environment
              </a>
              <a href="https://www.cea.lk/" target="_blank" rel="noreferrer">
                Central Environmental Authority
              </a>
              {/* <a
                  href="http://www.mines.gov.lk/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Disaster Management Division
                </a> */}
              <a
                href="https://nbro.gov.lk/index.php?lang=en"
                target="_blank"
                rel="noreferrer"
              >
                National Building Research Organization
              </a>
              <a href="https://wrb.lk/" target="_blank" rel="noreferrer">
                Water Resources Board
              </a>
              <a
                href="https://www.usgs.gov/programs/earthquake-hazards/national-earthquake-information-center-neic"
                target="_blank"
                rel="noreferrer"
              >
                National Earthquake Information Center
              </a>
              <a href="https://www.bgs.ac.uk/" target="_blank" rel="noreferrer">
                British Geological Survry (BGS)
              </a>
              <a
                href="https://www.tsunami.gov/"
                target="_blank"
                rel="noreferrer"
              >
                Pacific Tsunami Warning Center (PTWC)
              </a>
              <a
                href="https://www.jma.go.jp/jma/indexe.html"
                target="_blank"
                rel="noreferrer"
              >
                Japan Meteorological Agency (JMA)
              </a>
            </div>
            
          </div>
          <div className="footer-contactus">
            <h3>Contact Us</h3>
            <div className="footer-contactus-details">
              <div className="footer-contactus-lebel">
                <h5>Phone:</h5>
                <h5>Email:</h5>
                <h5>Address: </h5>
              </div>
              <div className="footer-contactus-lebel-details">
                <h5>+94-11-2886289 / +94-112 886290</h5>
                <h5>info@gsmb.gov.lk</h5>
                <h5>Geological Survey and Mines Bureau,</h5>
                <h5> 569, Epitamulla Road, Pitakotte, Sri Lanka.</h5>
              </div>
            </div>
          </div>
          <div className="footer-followus">
            <h3>Follow Us</h3>
            <div className="footer-social-media-list">
              <a
                href="https://web.facebook.com/GSMBMEDIAUNIT?_rdc=1&_rdr#"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.gsmb.gov.lk/index.php?lang=en#"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.gsmb.gov.lk/index.php?lang=en#"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <h3 className="footer-hotline">Hotline</h3>
            <div className="footer-social-media-list">
              <p>1921</p>
            </div>
          </div>  
        </div>

        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <h6 className="footer-text">
            © {new Date().getFullYear()} Geological survey & mines bureau. All
            Rights Reserved.
          </h6>
          <h6 className="footer-text-ii">Designed and Developed by Aasa IT</h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
