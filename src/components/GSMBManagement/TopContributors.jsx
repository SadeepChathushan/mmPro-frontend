// import React from 'react';
// import { Card, Space, Typography } from './card';
// import { List, Avatar } from 'antd';
import React from 'react';
import { Card, List, Avatar,Col } from 'antd';

export const TopContributors = ({orders}) => {

  return (
    <Col xs={24} md={8}>
    <Card title={<span style={{ color: "#fff" }}>Top Royalty Contributors</span>} 
      style={{
        backgroundColor: "rgba(254, 118, 118, 0.1)",
        borderRadius: "8px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "none",
        outline: "none",
      }}>
      <List
        dataSource={orders}
        renderItem={(item) => (
          <List.Item style={{ color: "#fff" }}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<span style={{ color: "#ffef2f" }}>{item.title}</span>}
              description={<span style={{ color: "#ffef2f" }}>{item.description}</span>}
            />
          </List.Item>
        )}
      />
    </Card>
    </Col>
  );
};
