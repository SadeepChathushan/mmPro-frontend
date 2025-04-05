import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/GSMBManagement/Dashboard';
import Activation from '../pages/GSMBManagement/Activation';

const GSMBManagementRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="activateofficers" element={<Activation />} />
  </Routes>
);

export default GSMBManagementRoutes;
