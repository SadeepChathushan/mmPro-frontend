import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  // Define menu items using the `items` prop
  const menuItems = [
    { key: '1', label: 'Home', onClick: () => navigate('/') },
    { key: '2', label: 'Sign In', onClick: () => navigate('/signin') },
  ];

  return (
    <Header style={{ background: '#FCD5D0' }}>
      <Menu style={{ background: '#FCD5D0' }} mode="horizontal" items={menuItems} />
    </Header>
  );
};

export default AppHeader;
