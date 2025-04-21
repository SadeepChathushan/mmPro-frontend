import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import GSMBRoutes from "./routes/GSMBRoutes";
import MLOwnerRoutes from "./routes/MLOwnerRoutes";
import PoliceOfficerRoutes from "./routes/PoliceOfficerRoutes";
import SignInPage from "./components/Auth/SignIn";
import PrivateRoute from "./routes/PrivateRoute";
import SignUp from "./components/Auth/SignUp";
import GeneralPublicDashboard from "../src/pages/GeneralPublic/Dashboard";
import ResetPasswordModal from "../src/components/Auth/ResetPassword";
import GSMBManagementRoutes from "./routes/GSMBManagementRoutes";
import RegionalOfficerRoutes from "./routes/RegionalOfficerRoutes";
import MlOwnerRegister from "../src/pages/GSMBOfficer/RegNewOwner";
import NewOwnerRegister from "./components/Auth/NewOwnerRegister";
import PoliceOfficerRegister from "./components/Auth/PoliceOfficerRegister";
import GSMBOfficerRegister from "./components/Auth/GSMBOfficerRegister";

const App = () => {
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/NewOwnerRegister" element={<NewOwnerRegister />} />
        <Route path="/PoliceOfficerRegister" element={<PoliceOfficerRegister />} />
        <Route path="/GSMBOfficerRegister" element={<GSMBOfficerRegister />} />
        <Route
          path="/reset-password"
          element={
            <ResetPasswordPage
              showModal={() => setIsResetPasswordModalVisible(true)}
              hideModal={() => setIsResetPasswordModalVisible(false)}
            />
          }
        />
        <Route path="/" element={<AppLayout />}>
          <Route path="/public" element={<GeneralPublicDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<AppLayout />}>
          <Route path="/mlregister" element={< MlOwnerRegister />} />
        </Route>
        <Route path="*" element={<NotFound />} />


        {/* Protected Routes */} 
        <Route
          element={
            <PrivateRoute
              allowedRoles={[
                "GSMBOfficer",
                "PoliceOfficer",
                "MLOwner",
                "GSMBManagement",
                "RegionalOfficer",
              ]}
            />
          }
        >
          <Route path="/" element={<AppLayout />}>
            {/* GSMB Officer Routes */}
            <Route
              path="gsmb/*"
              element={<PrivateRoute allowedRoles={["GSMBOfficer"]} />}
            >
              <Route path="*" element={<GSMBRoutes />} />
            </Route>

            {/* MLOwner Routes */}
            <Route
              path="mlowner/*"
              element={<PrivateRoute allowedRoles={["MLOwner"]} />}
            >
              <Route path="*" element={<MLOwnerRoutes />} />
            </Route>

            {/* Police Officer Routes */}
            <Route
              path="police-officer/*"
              element={<PrivateRoute allowedRoles={["PoliceOfficer"]} />}
            >
              <Route path="*" element={<PoliceOfficerRoutes />} />
            </Route>

            {/* GSMB management routes*/}
            <Route
              path="gsmbmanagement/*"
              element={<PrivateRoute allowedRoles={["GSMBManagement"]} />}
            >
              <Route path="*" element={<GSMBManagementRoutes />} />
            </Route>

            {/* Regional Officer Routes */}
            <Route
              path="regional/*"
              element={<PrivateRoute allowedRoles={["RegionalOfficer"]} />}
            >
              <Route path="*" element={<RegionalOfficerRoutes />} />
            </Route>
          </Route>
        </Route>
      </Routes>

      {/* Reset Password Modal */}
      <ResetPasswordModal
        visible={isResetPasswordModalVisible}
        onClose={() => setIsResetPasswordModalVisible(false)}
      />
    </Router>
  );
};

// ResetPasswordPage Component
const ResetPasswordPage = ({ showModal, hideModal }) => {
  const navigate = useNavigate();

  // Show the modal when this page loads
  React.useEffect(() => {
    showModal();
  }, [showModal]);

  // Handle modal close
  const handleModalClose = () => {
    hideModal();
    navigate("/signin"); 
  };

  return null; // This page doesn't render anything; it just triggers the modal
};

export default App;