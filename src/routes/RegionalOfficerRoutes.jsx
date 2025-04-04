import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/RegionalOfficer/Dashboard';

const RegionalOfficerRoutes = () => {
  console.log('RegionalOfficerRoutes rendering...');
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default RegionalOfficerRoutes;