import HomePage from 'pages/HomePage';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function AppRoutes() {
  const location = useLocation();
  return (
    <div className="w-full flex flex-col">
      <Routes location={location}>
        <Route path="" element={<HomePage />}></Route>
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
}

export default AppRoutes;
