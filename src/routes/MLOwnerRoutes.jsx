import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MLOwnerHomePage from '../pages/MLOwner/MLOwnerHomePage';

const MLOwnerRoutes = () => (
  <Routes>
    <Route path="home" element={<MLOwnerHomePage/>} />

  </Routes>
);

export default MLOwnerRoutes;