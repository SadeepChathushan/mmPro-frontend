import React from 'react';
import { Layout, Row, Col, Typography, Input, Button } from 'antd';
import { FacebookOutlined, LinkedinOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Text } = Typography;

const HomeFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#781424', color: '#fff', padding: '20px 0' }}>
      <Row>
        <Col span={6}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>mmPro</h1>
            <Text>mmPro is Your trusted partner in managing natural resources and supporting economic growth.</Text>
            <div style={{ marginTop: '15px' }}>
              <FacebookOutlined style={{ marginRight: '10px' }} />
              <LinkedinOutlined style={{ marginRight: '10px' }} />
              <InstagramOutlined style={{ marginRight: '10px' }} />
              <TwitterOutlined style={{ marginRight: '10px' }} />
              <YoutubeOutlined />
            </div>
          </div>
        </Col>

        <Col span={6}>
          <h4 style={{ marginBottom: '10px' }}>Hot Line</h4>
          <p>1921</p>
        </Col>

        <Col span={6}>
          <h4 style={{ marginBottom: '10px' }}>Helpful Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Ministry of Environment</li>
            <li>Central Environmental Authority</li>
            <li>Disaster Management Division</li>
            <li>Water Resources Board</li>
          </ul>
        </Col>

        <Col span={6}>
          <h4 style={{ marginBottom: '10px' }}>Address</h4>
          <p>Geological Survey and Mines Bureau</p>
          <p>569, Epitomulla Road,</p>
          <p>Pitakotte,</p>
          <p>Sri Lanka.</p>
        </Col>

        <Col span={6}>
          <h4 style={{ marginBottom: '10px' }}>Contact</h4>
          <p>+94-11-2888289 / +94-112 886290</p>
          <p>info@gsmb.gov.lk</p>
          <div style={{ marginTop: '15px' }}>
            <Input placeholder="Enter your email" />
            <Button type="primary" style={{ backgroundColor: '#fff', color: '#781424', border: '1px solid #fff' }}>Subscribe</Button>
          </div>
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Text>Copyright © 2025 Geological Survey & Mines Bureau. All Rights Reserved.</Text>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Text>FAQ | Privacy Policy | Terms & Conditions</Text>
      </div>
    </Footer>
  );
};

export default HomeFooter;