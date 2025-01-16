import React from "react";
import { Tabs } from "antd";

const TabSection = ({ tabs, activeKey, onChange }) => (
  <Tabs activeKey={activeKey} onChange={onChange} style={{ marginBottom: "16px" }}>
    {tabs.map((tab) => (
      <Tabs.TabPane tab={tab.label} key={tab.key} />
    ))}
  </Tabs>
);

export default TabSection;