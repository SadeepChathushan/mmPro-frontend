import React from "react";
import { FaGear } from "react-icons/fa6";
import { FaOilWell } from "react-icons/fa6";
import "../styles/notfound.css"; // Import external CSS

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-top">
        <FaOilWell className="oilwell" />
      </div>
      <div className="notfound-middle">
        <h1 className="notfound-title">
          <span className="num">4</span>
          <FaGear className="gear" />
          <span className="num">4</span>
        </h1>
        <h2 className="notfound">Page Not Found</h2>
      </div>
    </div>
  );
};

export default NotFound;
