import React from "react";
import { Layout, Button, Typography } from "antd";
import "antd/dist/reset.css";
import logo from '../assets/images/gsmbLogo.jpg';

const { Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Title level={2} style={{ color: "#C7375F", fontSize: "2.5em", marginBottom: "10px" }}>mmPro</Title>
        <img
          src={logo}
          alt="Logo"
          style={{ maxWidth: "200px", margin: "20px 0" }}
        />
        <Title level={3} style={{ fontSize: "1.8em", marginBottom: "10px" }}>Welcome</Title>
        <Text style={{ marginBottom: "20px", color: "#444444", fontSize: "1.2em" }}>
          Something here to say hi
        </Text>

        <div style={{ width: "100%", maxWidth: "350px" }}>
          <Button
            type="primary"
            block
            style={{
              backgroundColor: "#FAD4D4",
              borderColor: "#FAD4D4",
              color: "#C7375F",
              marginBottom: "15px",
              padding: "12px 0",
              fontSize: "1em",
              fontWeight: "bold",
            }}
          >
            Create account
          </Button>
          <Button
            type="primary"
            block
            style={{
              backgroundColor: "#C7375F",
              borderColor: "#C7375F",
              color: "white",
              padding: "12px 0",
              fontSize: "1em",
              fontWeight: "bold",
            }}
          >
            Log in
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
