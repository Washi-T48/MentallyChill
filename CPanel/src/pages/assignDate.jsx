import { useEffect, useState } from "react";
import Calendar from "../components/calendar";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import axios from "../components/axioscreds";

export default function AssignDatePage() {
  const [timetabledata, setTimetabledata] = useState([]);
  const [staffdata, setStaffdata] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false); // State to trigger fetch

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
  }, []);

  useEffect(() => {
    const fetchTimeTableData = async () => {
      if (staffdata) {
        try {
          const response = await axios.post('/timetable/getByStaffID', {
            staff_id: staffdata.staff_id
          });
          setTimetabledata(response.data);
        } catch (error) {
          console.error('There has been a problem with your axios operation:', error);
        }
      }
    };

    fetchTimeTableData();
  }, [staffdata, fetchTrigger]); // Dependency array includes fetchTrigger

  const handleDelete = async (t_id) => {
    try {
      const response = await axios.delete('/timetable/delete', {
        data: { timetable_id: t_id }
      });
      setFetchTrigger(!fetchTrigger); // Toggle fetchTrigger to re-fetch data
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
              <Calendar setFetchTrigger={setFetchTrigger} />
            </div>
            <div className="text-2xl pb-5">ตารางเวลา</div>
            {timetabledata.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-emerald-400">
                    <th className="py-2 px-4">เจ้าหน้าที่</th>
                    <th className="py-2 px-4">วันที่</th>
                    <th className="py-2 px-4">เวลาเริ่มต้น</th>
                    <th className="py-2 px-4">เวลาสิ้นสุด</th>
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
                      <td className="py-2 px-4">{time.date}</td>
                      <td className="py-2 px-4">{time.time_start.split(':').slice(0, 2).join(':')}</td>
                      <td className="py-2 px-4">{time.time_end.split(':').slice(0, 2).join(':')}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleDelete(time.timetable_id)}
                          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200 ease-in-out"
                        >
                          ลบเวลา
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500">ไม่มีเวลาที่ลงไว้</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
