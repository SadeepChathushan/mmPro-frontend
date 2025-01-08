import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/PoliceOfficer/Dashboard';

const PoliceOfficerRoutes = () => {
  console.log('PoliceOfficerRoutes rendering...');
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default PoliceOfficerRoutes;
