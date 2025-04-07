import { Route, Routes } from 'react-router-dom';
import MLOwnerHomePage from '../pages/MLOwner/MLOwnerHomePage';
import DispatchLoadPage from '../pages/MLOwner/DispatchLoadPage';
import History from '../pages/MLOwner/History';
import Licenses from '../pages/MLOwner/ViewLicenses';
import Receipt from '../pages/MLOwner/ReceiptPreviewPage';
import MLRequest from '../pages/MLOwner/MLRequest';
import TPLReceipt from '../pages/MLOwner/TPLHistoryRecipt';

const MLOwnerRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<MLOwnerHomePage />} />
      <Route path="home/dispatchload/*" element={<DispatchLoadPage />} />
      <Route path="home/dispatchload/receipt" element={<Receipt />} />
      <Route path="home/mlrequest" element={<MLRequest />} />
      <Route path="history" element={<History />} />
      <Route path="home/viewlicenses" element={<Licenses />} />
      <Route path="home/dispatchload/TPLreceipt" element={<TPLReceipt />} />
    </Routes>
  );
};

export default MLOwnerRoutes;