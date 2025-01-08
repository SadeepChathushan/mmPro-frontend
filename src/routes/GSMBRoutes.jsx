import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/GSMBOfficer/Dashboard';

const GSMBRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />} />

  </Routes>
);

export default GSMBRoutes;
