import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AppLayout from './components/layout/AppLayout';
import GSMBRoutes from './routes/GSMBRoutes';
import MLOwnerRoutes from './routes/MLOwnerRoutes';
import PoliceOfficerRoutes from './routes/PoliceOfficerRoutes';
import SignIn from './components/Auth/SignIn';
import { useAuth } from './hooks/useAuth';
import PrivateRoute from './routes/PrivateRoute';
import SignUp from './components/Auth/SignUp';
import GeneralPublicRoutes from './routes/GeneralPublicRoutes';
import Footer from './components/layout/Footer';


const App = () => {
  const userRole = "GSMBOfficer";
  localStorage.setItem("USERROLE", userRole);

  // console.log('App user:', user); // Debug log to verify user
  // console.log('App user role:', user?.role); // Debug log to verify user role

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/footer" element={<Footer />} />

        {/* Protected Routes */}
        <Route
          element={
            <PrivateRoute
              allowedRoles={['GSMBOfficer', 'PoliceOfficer','MLOwner']}
            />
          }
        >
          <Route path="/" element={<AppLayout />}>
            {/* GSMB Officer Routes */}
            <Route path="gsmb/*" element={<PrivateRoute allowedRoles={['GSMBOfficer']} />}>
              <Route path="*" element={<GSMBRoutes />} />
            </Route>

             {/* MLOwner Routes */}
             <Route path="mlowner/*" element={<PrivateRoute allowedRoles={['MLOwner']} />}>
              <Route path="*" element={<MLOwnerRoutes />} />
            </Route>

            {/* Police Officer Routes */}
            <Route path="police-officer/*" element={<PrivateRoute allowedRoles={['PoliceOfficer']} />}>
              <Route path="*" element={<PoliceOfficerRoutes />} />
            </Route>

            {/* GeneralPublic Routes */}
            <Route path="generalpublic/*" element={<PrivateRoute allowedRoles={['GeneralPublic']} />}>
              <Route path="*" element={<GeneralPublicRoutes />} />
            </Route>

          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
