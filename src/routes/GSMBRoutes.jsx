import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/GSMBOfficer/Dashboard';
import AddNewLicense from '../pages/GSMBOfficer/AddNewLicense';
import RegNewowner from '../pages/GSMBOfficer/RegNewOwner';
import ViewLicense from '../pages/GSMBOfficer/ViewLicenseDetails';

import SDashboard from '../pages/GSMBOfficer/Sinhala/Dashboard';
import SAddNewLicense from '../pages/GSMBOfficer/Sinhala/SAddNewLicense';
import SRegNewowner from '../pages/GSMBOfficer/Sinhala/RegNewOwner';
import SViewLicense from '../pages/GSMBOfficer/Sinhala/ViewLicenseDetails';


const GSMBRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="add-new-license" element={<AddNewLicense />} />
    <Route path="register-new-owner" element={<RegNewowner />} />
    <Route path="license/:licenseId" element={<ViewLicense />} />

    <Route path="sdashboard" element={<SDashboard />} />
    <Route path="sadd-new-license" element={<SAddNewLicense />} />
    <Route path="sregister-new-owner" element={<SRegNewowner />} />
    <Route path="slicense/:licenseId" element={<SViewLicense />} />

  </Routes>
);

export default GSMBRoutes;
