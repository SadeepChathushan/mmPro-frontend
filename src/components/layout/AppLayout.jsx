import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "./Header";
import Footer from "./Footer"; // Import the custom Footer component

const { Content } = Layout;

const AppLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <AppHeader />
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: "#fff",
        flex: 1,
      }}
    >
      <Outlet />
    </Content>
    <Footer /> {/* Replace the default Footer with your custom Footer */}
  </Layout>
);

export default AppLayout;
