// src/layouts/AppLayout.js
import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "./Header";
import Footer from "./Footer";

const { Content } = Layout;

const AppLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <AppHeader />
    <Content
      style={{ margin: "24px 16px", padding: 24, background: "#fff", flex: 1 }}
    >
      <Outlet />
    </Content>
    <Footer />
  </Layout>
);

export default AppLayout;