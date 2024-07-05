import axios from "../components/axioscreds";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import Dropdown from "../components/dropdown";

const Content = ({
  handleClick,
  reasonNote,
  setReasonNote,
  handleSubmit,
  bookingId,
  data,
  appointData,
  setAppointData,
}) => {
  const appointmentDate = data.appointment_date
    ? data.appointment_date.substring(0, 10)
    : "Not available";

  const appointmentTime = data.appointment_date
    ? data.appointment_date.substring(11, 16)
    : "Not available";

  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedMed, setSelectedMed] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const medList = ["CRA01", "CRA02", "CRA03", "CRA04", "CRA05"];
  const topicList = ["Topic 1", "Topic 2", "Topic 3"];

  const handleSelectMed = (option) => {
    setSelectedMed(option);
  };

  const handleSelectTopic = (option) => {
    setSelectedTopic(option);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Mock fetching available time slots when the date or doctor changes
    if (name === "date" || name === "medDoctor") {
      if (appointData.medDoctor && appointData.date) {
        fetchAvailableTimeSlots();
      }
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 m-10">
        <div className="text-5xl mb-10">จองอีกครั้ง</div>
        <div className="flex flex-row justify-between mb-10 p-3 bg-[#FFF3C7] border border-[#FFF3C7] border-4 rounded-lg">
          <div className="text-4xl font-semibold">เลขที่การจอง : {bookingId}</div>
          <div className="text-4xl font-semibold">เลขที่ผู้ใช้ : {data.user_id}</div>
        </div>
        <div className="flex flex-col flex-1 bg-[#FFAD4D] border border-[#FFAD4D] border-4 rounded-lg h-full ">
          <div className="p-4 flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-row text-2xl font-medium mb-4 items-center gap-3">
                <div>ผู้ให้คำปรึกษาที่ต้องการพบ :</div>
                <Dropdown
                placehold={"ผู้ให้คำปรึกษา"}
                options={medList}
                onSelect={handleChange}
                selected={selectedMed}
              />
              </div>
              <div className="flex flex-row text-2xl font-medium mb-4 items-center gap-3">
                <div>หัวข้อ :</div>
                <Dropdown
                placehold={"หัวข้อ"}
                options={topicList}
                onSelect={handleSelectTopic}
                selected={selectedTopic}
                zIndex={100} // Provide a base zIndex
              />
              </div>
              <div className="flex flex-row gap-3 mb-4">
                <div className="w-full">
                    <div className="flex flex-row text-2xl font-medium mb-4 items-center gap-3">
                        <div>วันที่ :</div>
                        <input
                type="date"
                name="date"
                value={appointData.date}
                min={currentDate} // Prevent selection of past dates
                onChange={handleChange}
                required
              />
                    </div>
                    <div className="flex flex-row text-2xl font-medium mb-4 items-center gap-3">
                        <div>เวลา :</div>
                        <select
                name="time"
                value={appointData.time}
                onChange={handleChange}
                required
                disabled={
                  !appointData.date || !appointData.medDoctor
                }
              >
                <option value="">เลือกเวลา</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
                    </div>
                </div>
                {/* <div className="w-full">
                <div className="text-2xl font-medium mb-4">โน้ต :</div>
                  <form onSubmit={handleSubmit}>
                    <textarea
                      className="flex w-full h-60 bg-gray-100 break-all p-2 overflow-y-auto"
                      value={reasonNote}
                      onChange={(e) => setReasonNote(e.target.value)}
                    />
                  </form>
                </div> */}
              </div>
            </div>
            {/* <div className="flex flex-row justify-between border-t-4 border-[#FFFFFF] pt-3">
              <div className="flex flex-row items-center gap-3 text-2xl font-medium">
                <div>หมายเลขโทรศัพท์ติดต่อ :</div>
                <input type="text" className="border border-gray-300 p-2 rounded placeholder-gray-200"
  placeholder=" "/>
              </div>
              <div className="flex flex-row justify-between gap-4">
                <button
                  className="bg-[#24DB36] rounded-full px-10 py-2"
                  onClick={() => handleClick("Feedback")}
                >
                  ยืนยัน
                </button>
                <button
                  className="bg-stone-500 rounded-full px-10 py-2 text-white"
                  onClick={() => handleClick("Declined")}
                >
                  ปฏิเสธ
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default function RebookPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [reasonNote, setReasonNote] = useState("");
  const { bookingId } = useParams();
  const [alldata, setAlldata] = useState([]);

  const [appointData, setAppointData] = useState({
    uid: "",
    tel: "",
    contactMethod: "",
    medDoctor: "",
    date: "",
    time: "",
    topic: "",
    detail: "",
    medHistory: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/appointment/lookup/${bookingId}`);
        const data = response.data[0];
        console.log(data, "data");
        console.log(data, "uid");
        setAlldata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [bookingId]);

  useEffect(() => {
    if (status !== "Pending") {
      const postData = async () => {
        try {
          const response = await axios.post(`/appointment/respond`, {
            booking_id: bookingId,
            status: status,
            pre_note: reasonNote,
          });
          console.log("Response:", response.data);
          navigate("/bookinginfo");
        } catch (error) {
          console.error("Error:", error);
        }
      };

      postData();
    }
  }, [status, bookingId, reasonNote, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noted = {
      reasonNote: reasonNote,
    };

    console.log(noted);
  };

  const handleClick = (stat) => {
    switch (stat) {
      case "Feedback":
        console.log("Feedback");
        setStatus("feedback");
        break;
      case "Declined":
        console.log("Declined");
        setStatus("decline");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 h-dvh">
        <Topbar />
        <div className="flex flex-row flex-1">
          <div className="flex relative w-72">
            <Sidebar />
          </div>
          <Content
            handleClick={handleClick}
            reasonNote={reasonNote}
            setReasonNote={setReasonNote}
            handleSubmit={handleSubmit}
            bookingId={bookingId}
            status={status}
            data={alldata}
            appointData={appointData}
            setAppointData={setAppointData}
          />
        </div>
      </div>
    </>
  );
}
