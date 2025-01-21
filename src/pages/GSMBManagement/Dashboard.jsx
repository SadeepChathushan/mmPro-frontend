import React from 'react';
import { Row, Col, Card, Typography, Select } from 'antd';
import { Line } from '@ant-design/plots';

const { Title, Text } = Typography;
const { Option } = Select;

const Dashboard = () => {
  // Chart data
  const data = [
    { month: 'January', value: 3000 },
    { month: 'February', value: 4000 },
    { month: 'March', value: 6000 },
    { month: 'April', value: 7000 },
    { month: 'May', value: 5000 },
    { month: 'June', value: 4000 },
    { month: 'July', value: 8000 },
    { month: 'August', value: 3000 },
    { month: 'September', value: 7000 },
    { month: 'October', value: 9000 },
  ];

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    point: {
      size: 2,
      shape: 'circle',
    },
    smooth: true,
  };

  return (
    <div style={{ padding: '5px', backgroundColor: '#fffff' }}>
      {/* Overall Stats and License Status */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="OVERALL USER STATS (ACTIVE)" bordered={false} style={{ backgroundColor: '#FEE4B2' , textAlign:'center' }}>
            <p style={{textAlign:'left',fontSize: '20px'}}>Licence Owner <span style={{ float: 'right' ,fontSize: '20px' }}>0/0</span></p>
            <p style={{textAlign:'left',fontSize: '20px'}}>Active GSMB Officers <span style={{ float: 'right' ,fontSize: '20px'}}>0/0</span></p>
            <p style={{textAlign:'left',fontSize: '20px'}}>Police Officers <span style={{ float: 'right' ,fontSize: '20px'}}>0/0</span></p>
            <p style={{textAlign:'left',fontSize: '20px'}}>Public <span style={{ float: 'right' ,fontSize: '20px'}}>0/0</span></p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="TOTAL LICENSE STATUS" bordered={false} style={{ backgroundColor: '#B7F7A4' , textAlign:'center' }}>
            <p style={{textAlign:'left',fontSize: '20px'}}>NEW <span style={{ float: 'right' ,fontSize: '20px'}}>0/0</span></p>
            <p style={{textAlign:'left',fontSize: '20px'}}>RENEWED <span style={{ float: 'right' ,fontSize: '20px'}}>0/0</span></p>
            <p style={{textAlign:'left',fontSize: '20px'}}>EXTENDED <span style={{ float: 'right' ,fontSize: '20px'}}>0/0</span></p>
            <p style={{textAlign:'left',fontSize: '20px'}}>CANCELLED <span style={{ float: 'right' ,fontSize: '20px'}}>0/0</span></p>
          </Card>
        </Col>
        </Row>
        <Row gutter={[16,16]} style={{padding: '10px'}}>
        <Col span={6}>
          <Card title="FINANCE" bordered={false} style={{ backgroundColor: '#A8D5FF', textAlign: 'center' }}>
          <Text style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Total Royalty</Text>

            <Title level={3}>Rs 0</Title>
          </Card>
        </Col>
        <Col span={18}>
          <Card title="TRACK VIOLATIONS" bordered={false} style={{ backgroundColor: '#FFB5B5' , textAlign:'center' }}>
            <p style={{textAlign:'left' ,fontSize: '20px'}}>Checked Lorries <span style={{ float: 'right' ,fontSize: '20px'}}>0</span></p>
            <p style={{textAlign:'left',fontSize: '20px'}}>Reported Lorries <span style={{ float: 'right' ,fontSize: '20px'}}>0</span></p>
            <p style={{textAlign:'left',fontSize: '20px'}}>Actioned Lorries <span style={{ float: 'right' ,fontSize: '20px'}}>0</span></p>
          </Card>
        </Col>
      </Row>

      {/* Site Activities and System Info */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="SITE ACTIVITIES" bordered={false} style={{ backgroundColor: '#E0E0E0' , textAlign:'center'}}>
            <p style={{textAlign:'left',fontSize: '20px'}}>Active <span style={{ float: 'right' ,fontSize: '20px' }}>0/0</span></p>
            <p style={{textAlign:'left',fontSize: '20px'}}>Used Lorries <span style={{ float: 'right' ,fontSize: '20px' }}>0/0</span></p>
            <p style={{textAlign:'left',fontSize: '20px'}}>Trips / Loads <span style={{ float: 'right' ,fontSize: '20px'}}>0/0</span></p>
            <p style={{textAlign:'left',fontSize: '20px'}}>Resource Extractions <span style={{ float: 'right' ,fontSize: '20px'}}>0/0</span></p>
          </Card>
        </Col>
        <Col span={18}>
        <Card
      title={<Text style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>SYSTEM</Text>}
      bordered={false}
      style={{
        backgroundColor: '#1E3A8A', // Matches the blue background color
        color: 'white',
        textAlign: 'center',
        borderRadius: '8px',
      }}
    >
      <Row gutter={[16, 16]}>
        {/* OTPs Section */}
        <Col span={12}>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>OTPs</Text>
          <div style={{ marginTop: '16px' }}>
            <Text style={{ color: 'white' ,fontSize: '20px'}}>Requested OTPs</Text>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>0</p>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Text style={{ color: 'white' ,fontSize: '20px'}}>Verified OTPs</Text>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>0</p>
          </div>
        </Col>

        {/* Messages Section */}
        <Col span={12}>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Messages</Text>
          <div style={{ marginTop: '16px' }}>
            <Text style={{ color: 'white' ,fontSize: '20px'}}>Recieved Messages</Text>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>0</p>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Text style={{ color: 'white',fontSize: '20px' }}>Sent Messages</Text>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>0</p>
          </div>
        </Col>
      </Row>
    </Card>
    </Col>
      
      </Row>

      {/* Mineral Extractions History */}
      <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
        <Col span={24}>
          <Card title="MINERAL EXTRACTIONS HISTORY" bordered={false} style={{ backgroundColor: '#E7DBE3', color: 'white' ,  textAlign:'center'}}>
            <Row justify="space-between" style={{ marginBottom: '16px' }}>
              <Col>
                <Select defaultValue="Select One" style={{ width: 200 }}>
                  <Option value="selectOne">Select One</Option>
                </Select>
              </Col>
              <Col>
                <Select defaultValue="Select Period" style={{ width: 200 }}>
                  <Option value="selectPeriod">Select Period</Option>
                </Select>
              </Col>
            </Row>
            <Line {...config} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
