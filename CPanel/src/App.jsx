import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import DiagnosisPage from "./pages/diagnosis";
import BookingInfoPage from "./pages/bookingInfo";
import BookingDetailsPage from "./pages/bookingDetails";
import BookingHistoryPage from "./pages/bookingHistory";
import BookingHistoryDonePage from "./pages/bookingHistoryDone";
import SignInPage from "./pages/signin";
import Topbar from "./components/topbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/diagnosis" element={<DiagnosisPage />} />
          <Route path="/bookinginfo" element={<BookingInfoPage />} />
          <Route
            path="/bookingdetails/:bookingId"
            element={<BookingDetailsPage />}
          />
          <Route
            path="/bookinghistory/:bookingId"
            element={<BookingHistoryPage />}
          />
          <Route
            path="/bookinghistorydone/:bookingId"
            element={<BookingHistoryDonePage />}
          />
          <Route
            path="/bookinghistorydone/:bookingId"
            element={<BookingHistoryDonePage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
