import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const { Header } = Layout;

const AppHeader = () => {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const menuItems = [
    { key: '1', label: language === 'en' ? 'Home' : 'මුල් පිටුව', onClick: () => navigate('/') },
    { key: '2', label: language === 'en' ? 'Sign In' : 'පිවිසෙන්න', onClick: () => navigate('/signin') },
  ];

  return (
    <Header style={{ background: '#FCD5D0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Menu mode="horizontal" items={menuItems} style={{ background: '#FCD5D0', border: 'none', flex: 1 }} />
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          type={language === 'en' ? 'primary' : 'default'}
          onClick={() => toggleLanguage('en')}
          style={{
            background: language === 'en' ? '#800000' : '#fff',
            borderColor: '#800000',
          }}
        >
          English
        </Button>
        <Button
          type={language === 'si' ? 'primary' : 'default'}
          onClick={() => toggleLanguage('si')}
          style={{
            background: language === 'si' ? '#800000' : '#fff',
            borderColor: '#800000',
          }}
        >
          සිංහල
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
