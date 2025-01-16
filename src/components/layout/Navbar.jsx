import React from 'react';
import { Layout, Menu, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom'; 
import mmprologo from "../../assets/images/LOGO.png";


const { Header } = Layout;

const Navbar = () => {
  return (
    <Header style={{ backgroundColor: '#fff' }}>
      <Row justify="space-between" align="middle">
        <Col>
        <img src={mmprologo} alt="mmPro Logo" style={{ height: '70px' }} />
        </Col>
        <Col>
          <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="services">
              <Link to="/services">Services</Link>
            </Menu.Item>
            <Menu.Item key="news">
              <Link to="/news">News</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col>
          <Button type="primary" style={{ backgroundColor: '#D63F54', borderColor: '#D63F54' , whiteSpace: 'balance'}}>தமிழ்</Button>
        </Col>
        <Col>
          <Button type="primary" style={{ backgroundColor: '#D63F54', borderColor: '#D63F54' }}>සිංහල</Button>
        </Col>
        <Col>
          <Button type="primary" style={{ backgroundColor: '#781424', borderColor: '#781424' }}>Get Started</Button>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;