import { useEffect, useState } from "react";
import Calendar from "../components/calendar";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

import axios from "../components/axioscreds";

export default function AssignDatePage() {

  const [timetabledata, setTimetabledata] = useState([]);
  const [staffdata, setStaffdata] = useState(null); // Initialize with null to check for data later

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get('/auth/check');
        setStaffdata(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStaffData();
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    const fetchTimeTableData = async () => {
      if (staffdata) { // Check if staffdata is available before making the request
        try {
          const response = await axios.post('/timetable/getByStaffID', {
            staff_id: staffdata.staff_id
          });
          setTimetabledata(response.data); // Set the timetable data to state if needed
          console.log(response.data);
        } catch (error) {
          console.error('There has been a problem with your axios operation:', error);
        }
      }
    };

    fetchTimeTableData();
  }, [staffdata]); // Dependency array with staffdata ensures this runs when staffdata changes


  const handleDelete = async (t_id) => {
    try {
      const response = await axios.delete('/timetable/delete', {
        data: { timetable_id: t_id }
      });
      console.log("hello");
    } catch (error) {
      console.error('There has been a problem with your axios operation:', error);
    }
  };

  return (
    <>
    <div className="flex flex-col flex-1 h-dvh">
        <Topbar />
        <div className="flex flex-row flex-1">
            <div className="flex w-72">
                <Sidebar />
            </div>
            <div className="flex flex-1 flex-col m-10">
              <div className="flex flex w-full items-center justify-center pb-10">
                <Calendar />
              </div>
              <div className="text-2xl pb-5">ตารางเวลา</div>
              <table className="w-full">
                  <thead>
                    <tr className="bg-emerald-400">
                      <th className="py-2 px-4">เจ้าหน้าที่</th>
                      <th className="py-2 px-4">วันที่</th>
                      <th className="py-2 px-4">ลบเวลา</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetabledata.map((time, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } text-center`}
                      >
                        <td className="py-2 px-4">{time.staff_id}</td>
                        <td className="py-2 px-4">{time.time_range}</td>
                        <td className="py-2 px-4"><button
                      onClick={() => handleDelete(index)}
                      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200 ease-in-out"
                    >
                      ลบเวลา
                    </button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  );
}
