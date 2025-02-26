import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AppLayout from './components/layout/AppLayout';
import GSMBRoutes from './routes/GSMBRoutes';
import MLOwnerRoutes from './routes/MLOwnerRoutes';
import PoliceOfficerRoutes from './routes/PoliceOfficerRoutes';
import SignInPage from './components/Auth/SignIn';
import { useAuth } from './hooks/useAuth';
import PrivateRoute from './routes/PrivateRoute';
import SignUp from './components/Auth/SignUp';
import GeneralPublicDashboard from '../src/pages/GeneralPublic/Dashboard';
import GeneralPublicRoutes from './routes/GeneralPublicRoutes';
import Footer from './components/layout/Footer';



import GSMBManagementRoutes from './routes/GSMBManagementRoutes';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/public" element={<GeneralPublicDashboard />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route
          element={

            <PrivateRoute
              // allowedRoles={['GSMBOfficer', 'PoliceOfficer','MLOwner','GSMBManagement','GeneralPublic']}
              allowedRoles={['GSMBOfficer', 'PoliceOfficer','MLOwner','GSMBManagement']}
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
            {/* <Route path="generalpublic/*" element={<PrivateRoute allowedRoles={['GeneralPublic']} />}>
              <Route path="*" element={<GeneralPublicRoutes />} />
            </Route> */}


            {/* GSMB management routes*/}
            <Route path="gsmbmanagement/*" element={<PrivateRoute allowedRoles={['GSMBManagement']}/>}>
              <Route path="*" element={<GSMBManagementRoutes/>}/>

            </Route>


          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
