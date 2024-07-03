import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import DiagnosisPage from "./pages/diagnosis";
import BookingInfoPage from "./pages/bookingInfo";
import BookingDetailsPage from "./pages/bookingDetails";
import BookingHistoryPage from "./pages/bookingHistory";
import BookingHistoryDonePage from "./pages/bookingHistoryDone";
import SignInPage from "./pages/signin";
import RebookPage from "./pages/rebook";

import AuthCheck from "./components/authCheck";
import ProtectedRoute from "./components/protectedroute";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthed = await AuthCheck();
        setIsLoggedIn(isAuthed);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <DashboardPage /> : <SignInPage />} />
          {/* <Route path="/" element={<SignInPage />} /> */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<ProtectedRoute element={DashboardPage} />} />
          <Route path="/diagnosis" element={<ProtectedRoute element={DiagnosisPage} />} />
          <Route path="/bookinginfo" element={<ProtectedRoute element={BookingInfoPage} />} />
          <Route path="/bookingdetails/:bookingId" element={<ProtectedRoute element={BookingDetailsPage} />} />
          <Route path="/rebook/:bookingId" element={<ProtectedRoute element={RebookPage} />} />
          <Route path="/bookinghistory/:bookingId" element={<ProtectedRoute element={BookingHistoryPage} />} />
          <Route path="/bookinghistorydone/:bookingId" element={<ProtectedRoute element={BookingHistoryDonePage} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
