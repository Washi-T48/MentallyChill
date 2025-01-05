import axios from "../components/axioscreds";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

export default function EditStaffPage() {

return (
  <div className="flex flex-col min-h-screen">
    <Topbar />
    <div className="flex flex-1 flex-row">
      <div className="flex relative w-72">
        <Sidebar />
      </div>
      <div className="w-full overflow-x-hidden">
        <div className="p-4 md:p-10">
            แก้ไขข้อมูลพนักงาน
        </div>
      </div>
    </div>
  </div>
);
}

