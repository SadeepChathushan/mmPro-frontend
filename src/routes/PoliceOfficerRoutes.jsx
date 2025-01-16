import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/PoliceOfficer/Dashboard';
import SDashboard from '../pages/PoliceOfficer/Sinhala/Dashboard';
import SInvalid from '../pages/PoliceOfficer/Sinhala/Invalid';
import SValid from '../pages/PoliceOfficer/Sinhala/Valid';


const PoliceOfficerRoutes = () => {
  console.log('PoliceOfficerRoutes rendering...');
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />

      <Route path="sdashboard" element={<SDashboard />} />
      <Route path="sinvalid" element={<SInvalid />} />
      <Route path="svalid" element={<SValid />} />
    </Routes>
  );
};

export default PoliceOfficerRoutes;
