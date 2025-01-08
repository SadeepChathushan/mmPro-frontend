import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "./Header";

const { Content, Footer } = Layout;

const AppLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <AppHeader />
    <Content
      style={{ margin: "24px 16px", padding: 24, background: "#fff", flex: 1 }}
    >
      <Outlet />
    </Content>
    <Footer style={{ textAlign: "center" }}>
      My Project ©2025 Created with Ant Design
    </Footer>
  </Layout>
);

export default AppLayout;
