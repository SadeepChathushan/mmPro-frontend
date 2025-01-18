import React from 'react';
import { Layout, Row, Col, Typography, Input, Button } from 'antd';
import { FacebookOutlined, LinkedinOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Text } = Typography;

const HomeFooter = () => {
  return (
    <HomeFooter style={{ textAlign: 'center', backgroundColor: '#781424', color: '#fff', padding: '20px 0' }}>
      <Row justify="space-between">
        <Col xs={24} sm={24} md={6} style={{ flex: 1 }}> 
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>mmPro</h1>
            <p style={{marginTop:'20px', color: '#B2A6A7'}}>mmPro is Your trusted partner in managing <br></br>natural resources and supporting economic<br></br> growth.</p>
            <div style={{ marginTop: '30px' }}>
              <FacebookOutlined style={{ marginRight: '10px' }} />
              <LinkedinOutlined style={{ marginRight: '10px' }} />
              <InstagramOutlined style={{ marginRight: '10px' }} />
              <TwitterOutlined style={{ marginRight: '10px' }} />
              <YoutubeOutlined />
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={4} style={{ flex: 1 ,marginTop:'10px'}}> 
          <h4 style={{ marginBottom: '10px' }}>Hot Line</h4>
          <p style={{fontSize:'64px'}}>1921</p>
        </Col>

        <Col xs={24} sm={24} md={4} style={{ flex: 1 ,marginTop:'10px'}}> 
          <h4 style={{ marginBottom: '10px' }}>Helpful Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Ministry of Environment</li>
            <li><br></br>Central Environmental Authority</li>
            <li><br></br>Disaster Management Division</li>
            <li><br></br>Water Resources Board</li>
          </ul>
        </Col>

        <Col xs={24} sm={24} md={4} style={{ flex: 1 ,marginTop:'10px' }}> 
          <h4 style={{ marginBottom: '10px' }}>Address</h4>
          <p>Geological Survey and Mines Bureau,</p>
          <p>569, Epitomulla Road,</p>
          <p>Pitakotte,</p>
          <p>Sri Lanka.</p>
        </Col>

        <Col xs={24} sm={24} md={4} style={{ flex: 1 ,marginRight:"20px",marginTop:'10px'}}> 
          <h4 style={{ marginBottom: '10px' }}>Contact</h4>
          <p>+94-11-2888289 / +94-112 886290</p>
          <p>info@gsmb.gov.lk</p>
          <div style={{ marginTop: '15px' }}>
            
            <Button type="primary" style={{ backgroundColor: '#fff', color: '#781424', border: '1px solid #fff' }}>Subscribe</Button>
          </div>
        </Col>
      </Row>
      {/* <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center'}}> 
        <Text style={{color: '#fff'}}>-----------------------------------------------------------------------</Text>
      </div> */}
        
     
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center'}}> 
        <Text style={{color: '#BA3838'}}>Copyright © 2025 Geological Survey & Mines Bureau. All Rights Reserved.</Text>
      </div>
      {/* <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}> 
        <Text>FAQ | Privacy Policy | Terms & Conditions</Text>
      </div> */}
      {/* <Row justify="end">
        <Col xs={24} sm={24} md={12}>
          <Text>FAQ | Privacy Policy | Terms & Conditions</Text>
        </Col>
      </Row> */}



      {/* <div style={{ marginTop: '20px' , marginBottom:'5px'  }}>
        <Text style={{color: '#B2A6A7'}}>Copyright © 2025 Geological Survey & Mines Bureau. All Rights Reserved.</Text>
      </div>
      <div style={{ marginTop: '10px' , display:'flex' ,padding:'20px'}}>
        <Text style={{color:'#B2A6A7'}}>FAQ | Privacy Policy | Terms & Conditions</Text>
      </div> */}
    </HomeFooter>
    
  );
};

export default HomeFooter;