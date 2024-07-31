import axios from "../components/axioscreds";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

export default function DashboardPage() {
  const [bookingdata, setBookingData] = useState([]);
  const [diagdata, setDiagData] = useState([]);
  const [countDiag, setCountDiag] = useState(0);
  const [countBooking, setCountBooking] = useState(0);
  const [resD, setResD] = useState(0);
  const [resA, setResA] = useState(0);
  const [resS, setResS] = useState(0);
  const [countdlow, setCountdlow] = useState(0);
  const [countdmedium, setCountdmedium] = useState(0);
  const [countdhigh, setCountdhigh] = useState(0);
  const [countalow, setCountalow] = useState(0);
  const [countamedium, setCountamedium] = useState(0);
  const [countahigh, setCountahigh] = useState(0);
  const [countslow, setCountslow] = useState(0);
  const [countsmedium, setCountsmedium] = useState(0);
  const [countshigh, setCountshigh] = useState(0);
  const [lowCount, setLowCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [highCount, setHighCount] = useState(0);

  useEffect(() => {
    const fetchDiagData = async () => {
      try {
        const response = await axios.get(
          `/forms/all`
        );
        setDiagData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCountDiag = async () => {
      try {
        const response = await axios.get(
          `/forms/count`
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
          `/appointment/all`
        );
        setBookingData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCountBooking = async () => {
      try {
        const response = await axios.get(
          `/appointment/count`
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

      let resD = 0;
      let resA = 0;
      let resS = 0;

      let dlow = 0;
        let dmedium = 0;
        let dhigh = 0;
        let alow = 0;
        let amedium = 0;
        let ahigh = 0;
        let slow = 0;
        let smedium = 0;
        let shigh = 0;

      diagdata.forEach((entry) => {
        const { d, a, s } = entry.result;

        // Convert values to numbers
        const dNum = Number(d);
        resD += dNum;
        const aNum = Number(a);
        resA += aNum;
        const sNum = Number(s);
        resS += sNum;

        let drank = 0;
        let arank = 0;
        let srank = 0;


        // Find the maximum value
        // const maxValue = Math.max(dNum, aNum, sNum);

        if (dNum >= 0 && dNum <= 6) {
          drank = 1;
          dlow++;
        } else if (dNum >= 7 && dNum <= 13) {
          drank = 2;
          dmedium++;
        } else if (dNum >= 14) {
          drank = 3;
          dhigh++;
        }

        if (aNum >= 0 && aNum <= 5) {
          arank = 1;
          alow++;
        } else if (aNum >= 6 && aNum <= 9) {
          arank = 2;
          amedium++;
        } else if (aNum >= 10) {
          arank = 3;
          ahigh++;
        }

        if (sNum >= 0 && sNum <= 9) {
          srank = 1;
          slow++;
        } else if (sNum >= 10 && sNum <= 16) {
          srank = 2;
          smedium++;
        } else if (sNum >= 17) {
          srank = 3;
          shigh++;
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

      setResD(resD);
      setResA(resA);
      setResS(resS);
      setCountdlow(dlow);
      setCountdmedium(dmedium);
      setCountdhigh(dhigh);
      setCountalow(alow);
      setCountamedium(amedium);
      setCountahigh(ahigh);
      setCountslow(slow);
      setCountsmedium(smedium);
      setCountshigh(shigh);
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
          <div className="w-full">
            <div className="grid grid-cols-3 gap-x-48 m-10">
              <div className="flex flex-row items-end justify-between border-4 border-sky-400 rounded-md bg-sky-400 h-full w-80 p-5">
                <div className="text-lg text-gray-200">คำขอการจอง</div>
                <div className="text-7xl text-white">{countBooking}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-violet-400 rounded-md bg-violet-400 h-full w-80 p-5">
                <div className="text-lg text-gray-100">จำนวนการวินิจฉัย</div>
                <div className="text-7xl text-white">{countDiag}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-48 mx-10 my-5 mb-10">
              <div className="flex flex-row items-end justify-between border-4 border-green-500 rounded-md bg-green-500 h-full w-80 p-5">
                <div className="text-lg text-gray-100">ระดับปกติ</div>
                <div className="text-7xl text-white">{lowCount}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-amber-400 rounded-md bg-amber-400 h-full w-80 p-5">
                <div className="text-lg text-gray-100">ระดับปานกลาง</div>
                <div className="text-7xl text-white">{mediumCount}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-rose-400 rounded-md bg-rose-400 h-full w-80 p-5">
                <div className="text-lg text-gray-100">ระดับร้ายแรง</div>
                <div className="text-7xl text-white">{highCount}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-48 mx-10 my-5 mb-10">
              <div className="flex flex-row items-end justify-between border-4 border-green-500 rounded-md bg-blue-300 h-full w-80 p-5">
                <div className="text-lg text-gray-100">ความซึมเศร้า ต่ำ</div>
                <div className="text-7xl text-white">{countdlow}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-amber-400 rounded-md bg-blue-300 h-full w-80 p-5">
                <div className="text-lg text-gray-100">ความซึมเศร้า ปานกลาง</div>
                <div className="text-7xl text-white">{countdmedium}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-rose-400 rounded-md bg-blue-300 h-full w-80 p-5">
                <div className="text-lg text-gray-100">ความซึมเศร้า สูง</div>
                <div className="text-7xl text-white">{countdhigh}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-48 mx-10 my-5 mb-10">
              <div className="flex flex-row items-end justify-between border-4 border-green-500 rounded-md bg-violet-300 h-full w-80 p-5">
                <div className="text-lg text-gray-100">ความวิตกกังวล ต่ำ</div>
                <div className="text-7xl text-white">{countalow}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-amber-400 rounded-md bg-violet-300 h-full w-80 p-5">
                <div className="text-lg text-gray-100">ความวิตกกังวล ปานกลาง</div>
                <div className="text-7xl text-white">{countamedium}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-rose-400 rounded-md bg-violet-300 h-full w-80 p-5">
                <div className="text-lg text-gray-100">ความวิตกกังวล สูง</div>
                <div className="text-7xl text-white">{countahigh}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-48 mx-10 my-5 mb-10">
              <div className="flex flex-row items-end justify-between border-4 border-green-500 rounded-md bg-rose-300  h-full w-80 p-5">
                <div className="text-lg text-gray-100">ความเครียด ต่ำ</div>
                <div className="text-7xl text-white">{countslow}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-amber-400 rounded-md bg-rose-300  h-full w-80 p-5">
                <div className="text-lg text-gray-100">ความเครียด ปานกลาง</div>
                <div className="text-7xl text-white">{countsmedium}</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-rose-400 rounded-md bg-rose-300  h-full w-80 p-5">
                <div className="text-lg text-gray-100">ความเครียด สูง</div>
                <div className="text-7xl text-white">{countshigh}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 mx-10 my-5 gap-5">
              <div className="">
                <div className="mb-3 text-2xl">การจองครั้งล่าสุด</div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-emerald-400">
                      <th className="py-2 px-4">เลขที่การจอง</th>
                      <th className="py-2 px-4">หัวข้อ</th>
                      <th className="py-2 px-4">วันที่</th>
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
                <div className="mb-3 text-2xl">การวินิจฉัยครั้งล่าสุด</div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-sky-300">
                      <th className="py-2 px-4">เลขที่ผู้ใช้</th>
                      <th className="py-2 px-4">ประเภทแบบฟอร์ม</th>
                      <th className="py-2 px-4">วันที่</th>
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
