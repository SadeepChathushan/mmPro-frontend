import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/GSMBManagement/Dashboard';




const GSMBManagementRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />} />

  </Routes>
);

export default GSMBManagementRoutes;
