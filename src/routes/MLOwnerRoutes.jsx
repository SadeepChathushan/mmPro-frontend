import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MLOwnerHomePage from '../pages/MLOwner/MLOwnerHomePage';
import DispatchLoadPage from '../pages/MLOwner/DispatchLoadPage';
import History from '../pages/MLOwner/History';
import Licenses from '../pages/MLOwner/ViewLicenses';
import Receipt from '../pages/MLOwner/ReceiptPreviewPage';

import SDispatchLoadPage from '../pages/MLOwner/Sinhala/DispatchLoadPage';
import SMLOwnerHomePage from '../pages/MLOwner/Sinhala/MLOwnerHomePage';

const MLOwnerRoutes = () => (
  <Routes>
    <Route path="home" element={<MLOwnerHomePage/>} />

    <Route path="home/dispatchload" element={<DispatchLoadPage />} />
    <Route path="home/dispatchload/receipt" element={<Receipt />} />

    <Route path="history" element={<History/>} />
    <Route path="home/viewlicenses" element={<Licenses />} />
    <Route path="dispatchload" element={<DispatchLoadPage />} />

    <Route path="shome" element={<SMLOwnerHomePage/>} />
    <Route path="sdispatchload" element={<SDispatchLoadPage />} />

  </Routes>
);

export default MLOwnerRoutes;