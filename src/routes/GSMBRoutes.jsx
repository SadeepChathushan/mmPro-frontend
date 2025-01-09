import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/GSMBOfficer/Dashboard';
import AddNewLicense from '../pages/GSMBOfficer/AddNewLicense';
import RegNewowner from '../pages/GSMBOfficer/RegNewOwner';
import ViewLicense from '../pages/GSMBOfficer/ViewLicenseDetails';



const GSMBRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="add-new-license" element={<AddNewLicense />} />
    <Route path="register-new-owner" element={<RegNewowner />} />
    <Route path="license/:licenseId" element={<ViewLicense />} />

  </Routes>
);

export default GSMBRoutes;
