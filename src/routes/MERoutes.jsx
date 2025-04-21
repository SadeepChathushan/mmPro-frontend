// src/routes/MiningEngineerRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MEDasboard from '../pages/MiningEngineer/MEDashboard';
//import MinePlanning from '../pages/MiningEngineer/MinePlanning';
//import SafetyReports from '../pages/MiningEngineer/SafetyReports';
//import ProductionAnalysis from '../pages/MiningEngineer/ProductionAnalysis';

const MiningEngineerRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<MEDasboard />} />
      <Route path="*" element={<MEDasboard />} />
    </Routes>
  );
};

export default MiningEngineerRoutes;