import React from "react";
import { Card } from "antd";

const StatsBox = ({ title, count, color }) => (
  <Card
    style={{
      backgroundColor: color,
      color: 'white',
      borderRadius: '8px',
      textAlign: 'center',
      padding: '5px', // Adjusted padding to fit content within the 50px height
      width: '100%',
      maxWidth: '450px',
      height: '50px', // Set height to 50px
      display: 'flex',
      justifyContent: 'center', // Center content horizontally
      alignItems: 'center', // Center content vertically
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 style={{ margin: 0, fontSize: '12px', lineHeight: '1' }}>{title}</h3> {/* Title font size adjusted */}
      <h1 style={{ margin: 0, fontSize: '20px', lineHeight: '1' }}>{count}</h1> {/* Count font size adjusted */}
    </div>
  </Card>
);

export default StatsBox;
