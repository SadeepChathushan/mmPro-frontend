import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MLOwnerHomePage from '../pages/MLOwner/MLOwnerHomePage';
import DispatchLoadPage from '../pages/MLOwner/DispatchLoadPage';
import History from '../pages/MLOwner/History';
import ViewLicenses from '../pages/MLOwner/ViewLicenses';

const MLOwnerRoutes = () => (
  <Routes>
    <Route path="home" element={<MLOwnerHomePage/>} />
    <Route path="dispatchload" element={<DispatchLoadPage />} />
    <Route path="history" element={<History/>} />
    <Route path="viewlicenses" element={<ViewLicenses />} />
  </Routes>
);

export default MLOwnerRoutes;