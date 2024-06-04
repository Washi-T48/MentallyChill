import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import DiagnosisPage from "./pages/diagnosis";
import BookingInfoPage from "./pages/bookingInfo";
import BookingDetailsPage from "./pages/bookingDetails";
import BookingHistoryPage from "./pages/bookingHistory";
import BookingHistoryDonePage from "./pages/bookingHistoryDone";
import SignInPage from "./pages/signin";

import ProtectedRoute from "./components/protectedroute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<ProtectedRoute element={DashboardPage} />} />
          <Route path="/diagnosis" element={<ProtectedRoute element={DiagnosisPage} />} />
          <Route path="/bookinginfo" element={<ProtectedRoute element={BookingInfoPage} />} />
          <Route path="/bookingdetails/:bookingId" element={<ProtectedRoute element={BookingDetailsPage} />} />
          <Route path="/bookinghistory/:bookingId" element={<ProtectedRoute element={BookingHistoryPage} />} />
          <Route path="/bookinghistorydone/:bookingId" element={<ProtectedRoute element={BookingHistoryDonePage} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
