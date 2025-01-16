import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/PoliceOfficer/Dashboard';
import ValidPage from '../pages/PoliceOfficer/ValidPage';
import InvalidPage from '../pages/PoliceOfficer/InvalidPage';

const PoliceOfficerRoutes = () => {
  console.log('PoliceOfficerRoutes rendering...');
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="valid" element={<ValidPage />} />
      <Route path="invalid" element={<InvalidPage />} />
    </Routes>
  );
};

export default PoliceOfficerRoutes;
