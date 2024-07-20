import Calendar from "../components/calendar";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

export default function DashboardPage() {
  return (
    <>
    <div className="flex flex-col flex-1 h-dvh">
        <Topbar />
        <div className="flex flex-row flex-1">
            <div className="flex relative w-72">
                <Sidebar />
            </div>
            <div className="flex items-center justify-center bg-gray-100">
                <Calendar />
            </div>
        </div>
    </div>
    </>
  );
}
