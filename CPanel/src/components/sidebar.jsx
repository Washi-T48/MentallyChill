import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export default function Sidebar() {
  const [isDashboardActive, setIsDashboardActive] = useState(true);
  const [isDiagnosisActive, setIsDiagnosisActive] = useState(false);
  const [isBookingActive, setIsBookingActive] = useState(false);
  const [isAssignDate, setIsAssignDate] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { bookingId } = useParams();

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setIsDashboardActive(true);
        setIsDiagnosisActive(false);
        setIsBookingActive(false);
        setIsAssignDate(false);
        break;
      case "/diagnosis":
        setIsDashboardActive(false);
        setIsDiagnosisActive(true);
        setIsBookingActive(false);
        setIsAssignDate(false);
        break;
      case "/bookinginfo":
        setIsDashboardActive(false);
        setIsDiagnosisActive(false);
        setIsBookingActive(true);
        setIsAssignDate(false);
        break;
      case "/bookingdetails/":
        setIsDashboardActive(false);
        setIsDiagnosisActive(false);
        setIsBookingActive(true);
        setIsAssignDate(false);
        break;
      case "/bookinghistory/":
        setIsDashboardActive(false);
        setIsDiagnosisActive(false);
        setIsBookingActive(true);
        setIsAssignDate(false);
        break;
      case "/bookinghistorydone/":
        setIsDashboardActive(false);
        setIsDiagnosisActive(false);
        setIsBookingActive(true);
        setIsAssignDate(false);
        break;
      case "/assigndate":
        setIsDashboardActive(false);
        setIsDiagnosisActive(false);
        setIsBookingActive(false);
        setIsAssignDate(true);
        break;
      default:
        setIsDashboardActive(false);
        setIsDiagnosisActive(false);
        setIsBookingActive(true);
        setIsAssignDate(false);
        break;
    }
  }, [location.pathname]);

  const checkActive = (section) => {
    switch (section) {
      case "dashboard":
        setIsDashboardActive(true);
        setIsDiagnosisActive(false);
        setIsBookingActive(false);
        setIsAssignDate(false);
        navigate("/dashboard");
        break;
      case "diagnosis":
        setIsDashboardActive(false);
        setIsDiagnosisActive(true);
        setIsBookingActive(false);
        setIsAssignDate(false);
        navigate("/diagnosis");
        break;
      case "booking":
        setIsDashboardActive(false);
        setIsDiagnosisActive(false);
        setIsBookingActive(true);
        setIsAssignDate(false);
        navigate("/bookinginfo");
        break;
      case "assigndate":
        setIsDashboardActive(false);
        setIsDiagnosisActive(false);
        setIsBookingActive(false);
        setIsAssignDate(true);
        navigate("/assigndate");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-row w-screen">
      <div className="flex relative w-full border bg-[#FFFFFF] justify-center">
        <div className="flex flex-col items-center pt-10 w-full">
          <div
            onClick={() => checkActive("dashboard")}
            className={`flex items-center justify-center p-5 rounded-md cursor-pointer w-full text-2xl ${
              isDashboardActive
                ? "bg-[#003087] text-white"
                : "hover:bg-gray-300"
            }`}
          >
            แผงควบคุม
          </div>
          <div
            onClick={() => checkActive("diagnosis")}
            className={`flex items-center justify-center p-5 rounded-md cursor-pointer w-full text-2xl ${
              isDiagnosisActive
                ? "bg-[#003087] text-white"
                : "hover:bg-gray-300"
            }`}
          >
            การวินิจฉัย
          </div>
          <div
            onClick={() => checkActive("booking")}
            className={`flex items-center justify-center p-5 rounded-md cursor-pointer w-full text-2xl ${
              isBookingActive ? "bg-[#003087] text-white" : "hover:bg-gray-300"
            }`}
          >
            การจอง
          </div>
          <div
            onClick={() => checkActive("assigndate")}
            className={`flex items-center justify-center p-5 rounded-md cursor-pointer w-full text-2xl ${
              isAssignDate ? "bg-[#003087] text-white" : "hover:bg-gray-300"
            }`}
          >
            ลงเวลา
          </div>
        </div>
      </div>
    </div>
  );
}
