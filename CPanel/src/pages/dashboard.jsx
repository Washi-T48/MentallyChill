import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [bookingdata, setBookingData] = useState([]);
  const [diagdata, setDiagData] = useState([]);
  const [countDiag, setCountDiag] = useState(0);
  const [countBooking, setCountBooking] = useState(0);
  const [lowCount, setLowCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [highCount, setHighCount] = useState(0);

  useEffect(() => {
    const fetchDiagData = async () => {
      try {
        const response = await axios.get(
          `http://ligma.sombat.cc:3000/forms/all`
        );
        setDiagData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCountDiag = async () => {
      try {
        const response = await axios.get(
          `http://ligma.sombat.cc:3000/forms/count`
        );
        const data = response.data.count;
        setCountDiag(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          `http://ligma.sombat.cc:3000/appointment/all`
        );
        setBookingData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCountBooking = async () => {
      try {
        const response = await axios.get(
          `http://ligma.sombat.cc:3000/appointment/count`
        );
        const data = response.data.count;
        setCountBooking(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCountDiag();
    fetchCountBooking();
    fetchDiagData();
    fetchBookingData();
  }, []);

  useEffect(() => {
    // Process data to classify and count levels
    const classifyAndCount = () => {
      let low = 0;
      let medium = 0;
      let high = 0;

      diagdata.forEach((entry) => {
        const { d, a, s } = entry.result;

        // Convert values to numbers
        const dNum = Number(d);
        const aNum = Number(a);
        const sNum = Number(s);

        let drank = 0;
        let arank = 0;
        let srank = 0;

        // Find the maximum value
        // const maxValue = Math.max(dNum, aNum, sNum);

        if (dNum >= 0 && dNum <= 6) {
          drank = 1;
        } else if (dNum >= 7 && dNum <= 13) {
          drank = 2;
        } else if (dNum >= 14) {
          drank = 3;
        }

        if (aNum >= 0 && aNum <= 5) {
          arank = 1;
        } else if (aNum >= 6 && aNum <= 9) {
          arank = 2;
        } else if (aNum >= 10) {
          arank = 3;
        }

        if (sNum >= 0 && sNum <= 9) {
          srank = 1;
        } else if (sNum >= 10 && sNum <= 16) {
          srank = 2;
        } else if (sNum >= 17) {
          srank = 3;
        }

        const maxValue = Math.max(drank, arank, srank);

        if (maxValue === 1) {
          low++;
        } else if (maxValue === 2) {
          medium++;
        } else if (maxValue === 3) {
          high++;
        }
      });

      setLowCount(low);
      setMediumCount(medium);
      setHighCount(high);
    };

    classifyAndCount();
  }, [diagdata]);

  // Get recent diagnosis data with maximum 5 rows
  const recentDiagnosis = diagdata.slice(0, 5);

  // Get recent booking information with maximum 5 rows
  const recentBookingInfo = bookingdata.slice(0, 5);

  return (
    <>
      <div className="flex flex-col flex-1 h-dvh">
        <Topbar />
        <div className="flex flex-row flex-1">
          <div className="flex relative w-72">
            <Sidebar />
          </div>
          <div className="">
            <div className="grid grid-cols-3 gap-x-48 m-10">
              <div className="flex flex-row items-end justify-between border-4 border-sky-400 rounded-md bg-sky-400 h-full w-80 p-5">
                <div className="text-lg text-gray-200">Booking request</div>
                <div className="text-7xl text-white">{countBooking}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-violet-400 rounded-md bg-violet-400 h-full w-80 p-5">
                <div className="text-lg text-gray-100">Diagnosis done</div>
                <div className="text-7xl text-white">{countDiag}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-48 mx-10 my-5 mb-20">
              <div className="flex flex-row items-end justify-between border-4 border-green-500 rounded-md bg-green-500 h-full w-80 p-5">
                <div className="text-lg text-gray-100">Mild</div>
                <div className="text-7xl text-white">{lowCount}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-amber-400 rounded-md bg-amber-400 h-full w-80 p-5">
                <div className="text-lg text-gray-100">Moderate</div>
                <div className="text-7xl text-white">{mediumCount}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-rose-400 rounded-md bg-rose-400 h-full w-80 p-5">
                <div className="text-lg text-gray-100">Severe</div>
                <div className="text-7xl text-white">{highCount}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 mx-10 my-5 gap-5">
              <div className="">
                <div className="mb-3 text-2xl">Recent Booking</div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-emerald-400">
                      <th className="py-2 px-4">Booking No</th>
                      <th className="py-2 px-4">Topic</th>
                      <th className="py-2 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookingInfo.map((book, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } text-center`}
                      >
                        <td className="py-2 px-4">{book.booking_id}</td>
                        <td className="py-2 px-4">{book.topic}</td>
                        <td className="py-2 px-4">
                          {book.appointment_date.substring(0, 10)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div className="mb-3 text-2xl">Recent Diagnosis</div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-sky-300">
                      <th className="py-2 px-4">UID</th>
                      <th className="py-2 px-4">Form Type</th>
                      <th className="py-2 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDiagnosis.map((diag, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } text-center`}
                      >
                        <td className="py-2 px-4">{diag.user_id}</td>
                        <td className="py-2 px-4">{diag.forms_type}</td>
                        <td className="py-2 px-4">
                          {diag.created.substring(0, 10)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
