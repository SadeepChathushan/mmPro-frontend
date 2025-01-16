import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/GeneralPublic/Dashboard';
import ValidPage from '../pages/GeneralPublic/ValidPage';
import InvalidPage from '../pages/GeneralPublic/InvalidPage';

const GeneralPublicRoutes = () => {
  console.log('GeneralPublicRoutes rendering...');
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="valid" element={<ValidPage />} />
      <Route path="invalid" element={<InvalidPage />} />
    </Routes>
  );
};

export default GeneralPublicRoutes;
