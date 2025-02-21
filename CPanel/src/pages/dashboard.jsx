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
  const [selectedFormType, setSelectedFormType] = useState("");

  useEffect(() => {
    const fetchDiagData = async () => {
      try {
        const response = await axios.get(`/forms/all`);
        setDiagData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCountDiag = async () => {
      try {
        const response = await axios.get(`/forms/count`);
        const data = response.data.count;
        setCountDiag(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`/appointment/all`);
        setBookingData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCountBooking = async () => {
      try {
        const response = await axios.get(`/appointment/count`);
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
        if (entry.result) {
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
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1 flex-row">
        <div className="flex relative w-72">
          <Sidebar />
        </div>
        <div className="w-full overflow-x-hidden">
          <div className="p-4 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <StatCard
                title="คำขอการจอง"
                value={countBooking}
                color="blue"
                tone="500"
              />
              <StatCard
                title="จำนวนผลการประเมิน"
                value={countDiag}
                color="violet"
              />
              <div className="hidden lg:block"></div>{" "}
              {/* Empty div for the third column in the first row */}
              <StatCard title="ระดับปกติ" value={lowCount} color="green" />
              <StatCard
                title="ระดับปานกลาง"
                value={mediumCount}
                color="yellow"
              />
              <StatCard title="ระดับร้ายแรง" value={highCount} color="red" />
            </div>
            {/* <CategoryStats
              title="ความซึมเศร้า"
              low={countdlow}
              medium={countdmedium}
              high={countdhigh}
              bgColor="blue"
              tone="500"
            />
            <CategoryStats
              title="ความวิตกกังวล"
              low={countalow}
              medium={countamedium}
              high={countahigh}
              bgColor="violet"
            />
            <CategoryStats
              title="ความเครียด"
              low={countslow}
              medium={countsmedium}
              high={countshigh}
              bgColor="red"
            /> */}
            <div className="border-4 border-[#003087] bg-white rounded-md">
              <div className="flex flex-row bg-[#003087] rounded-md p-4 items-center">
                <div className="text-2xl text-white m-4"> แบบประเมิน : </div>
                <select
                  className="w-[200px] border border-transparent rounded-xl p-2 text-xl bg-blue-600 text-white shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                  onChange={(e) => {
                    setSelectedFormType(e.target.value);
                  }}
                  style={customStyles}
                >
                  <option value="">dass21</option>
                  <option value="burnout">burnout</option>
                  <option value="rq">rq</option>
                  <option value="stress">stress</option>
                  <option value="2Q8Q9Q">2Q8Q9Q</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4 m-10">
                {selectedFormType === "burnout" && (
                  <>
                    <StatCard
                      title="ระดับปานกลาง"
                      value={mediumCount}
                      color="yellow"
                    />
                    <StatCard
                      title="ระดับปกติ"
                      value={lowCount}
                      color="green"
                    />
                    <StatCard
                      title="ระดับร้ายแรง"
                      value={highCount}
                      color="red"
                    />
                  </>
                )}
                {selectedFormType === "rq" && (
                  <>
                    <StatCard
                      title="ระดับปกติ"
                      value={lowCount}
                      color="green"
                    />
                    <StatCard
                      title="ระดับปานกลาง"
                      value={mediumCount}
                      color="yellow"
                    />
                    <StatCard
                      title="ระดับร้ายแรง"
                      value={highCount}
                      color="red"
                    />
                  </>
                )}
                {selectedFormType === "stress" && (
                  <>
                    <StatCard
                      title="ระดับร้ายแรง"
                      value={highCount}
                      color="red"
                    />
                    <StatCard
                      title="ระดับปกติ"
                      value={lowCount}
                      color="green"
                    />
                    <StatCard
                      title="ระดับปานกลาง"
                      value={mediumCount}
                      color="yellow"
                    />
                  </>
                )}
                {selectedFormType === "2Q8Q9Q" && (
                  <>
                    <StatCard
                      title="ระดับปานกลาง"
                      value={mediumCount}
                      color="yellow"
                    />
                    <StatCard
                      title="ระดับร้ายแรง"
                      value={highCount}
                      color="red"
                    />
                    <StatCard
                      title="ระดับปกติ"
                      value={lowCount}
                      color="green"
                    />
                  </>
                )}
                {selectedFormType === "" && (
                  <>
                    <StatCard
                      title="ระดับปกติ"
                      value={countdlow}
                      color="green"
                    />
                    <StatCard
                      title="ระดับปานกลาง"
                      value={countdmedium}
                      color="yellow"
                    />
                    <StatCard
                      title="ระดับร้ายแรง"
                      value={countdhigh}
                      color="red"
                    />
                    <StatCard
                      title="ระดับร้ายแรง"
                      value={countalow}
                      color="red"
                    />
                    <StatCard
                      title="ระดับร้ายแรง"
                      value={countamedium}
                      color="red"
                    />
                    <StatCard
                      title="ระดับร้ายแรง"
                      value={countahigh}
                      color="red"
                    />
                    <StatCard
                      title="ระดับร้ายแรง"
                      value={countslow}
                      color="red"
                    />
                    <StatCard
                      title="ระดับร้ายแรง"
                      value={countsmedium}
                      color="red"
                    />
                    <StatCard
                      title="ระดับร้ายแรง"
                      value={countshigh}
                      color="red"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <DataTable
                title="การจองครั้งล่าสุด"
                data={recentBookingInfo}
                columns={["เลขที่การจอง", "หัวข้อ", "วันที่"]}
                bgColor="green"
              />
              <DataTable
                title="ผลการประเมินครั้งล่าสุด"
                data={recentDiagnosis}
                columns={["เลขที่ผู้ใช้", "ประเภทแบบฟอร์ม", "วันที่"]}
                bgColor="violet"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const colors = {
  orange: "bg-orange-400",
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-600",
  violet: "bg-violet-500",
  rose: "bg-rose-400",
  yellow: "bg-yellow-500",
};

const customStyles = {
  dropdownIndicator: (base) => ({
    ...base,
    color: "rgb(255, 255, 255)", // White color
    "&:hover": {
      color: "rgb(255, 255, 255)", // Ensure it stays white on hover
    },
  }),
};

function StatCard({ title, value, color, tone = 400 }) {
  return (
    <div
      className={`flex flex-col justify-between border-4 border-black rounded-md p-4 h-32 ${
        colors[color] || "bg-gray-400"
      }`}
    >
      <div className="text-lg text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {title}
      </div>
      <div className="text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {value}
      </div>
    </div>
  );
}

function CategoryStats({ title, low, medium, high, bgColor, tone }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
      <StatCard
        title={`${title} ต่ำ`}
        value={low}
        color={bgColor}
        tone={tone}
      />
      <StatCard
        title={`${title} ปานกลาง`}
        value={medium}
        color={bgColor}
        tone={tone}
      />
      <StatCard
        title={`${title} รุนแรง`}
        value={high}
        color={bgColor}
        tone={tone}
      />
    </div>
  );
}

function DataTable({ title, data, columns, bgColor }) {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl mb-3 ">{title}</h2>
      <table className="w-full">
        <thead>
          <tr className={`bg-${bgColor}-400`}>
            {columns.map((col, index) => (
              <th
                key={index}
                className="py-2 px-4 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white " : "bg-gray-100"}
            >
              {columns.map((col, cellIndex) => {
                let value;
                switch (col) {
                  case "เลขที่การจอง":
                    value = item.booking_id;
                    break;
                  case "หัวข้อ":
                    value = item.topic;
                    break;
                  case "วันที่":
                    value = item.appointment_date || item.created;
                    break;
                  case "เลขที่ผู้ใช้":
                    value = item.user_id;
                    break;
                  case "ประเภทแบบฟอร์ม":
                    value = item.forms_type;
                    break;
                  default:
                    value = "";
                }
                return (
                  <td key={cellIndex} className="py-2 px-4 text-center">
                    {typeof value === "string" && value.includes("T")
                      ? value.substring(0, 10)
                      : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
