import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from './pages/dashboard';
import DiagnosisPage from './pages/diagnosis';
import BookingInfoPage from "./pages/bookingInfo";
import BookingDetailsPage from "./pages/bookingDetails";
import BookingHistoryPage from "./pages/bookingHistory";
import BookingHistoryDonePage from "./pages/bookingHistoryDone";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/diagnosis' element={<DiagnosisPage />} />
          <Route path='/bookinginfo' element={<BookingInfoPage />} />
          <Route path='/bookingdetails' element={<BookingDetailsPage />} />
          <Route path='/bookinghistory' element={<BookingHistoryPage />} />
          <Route path='/bookinghistorydone' element={<BookingHistoryDonePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
