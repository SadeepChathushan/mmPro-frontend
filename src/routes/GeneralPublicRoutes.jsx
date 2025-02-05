import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/GeneralPublic/Dashboard';


const GeneralPublicRoutes = () => {
  console.log('GeneralPublicRoutes rendering...');
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default GeneralPublicRoutes;
