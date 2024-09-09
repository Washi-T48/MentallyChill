import React, { useState, useEffect } from "react";
import "./appoint.css";
import Logo from "../components/logo";
import { useNavigate } from "react-router-dom";
import CustomRadioButton from "../components/CustomRadioButton";
import Loading from "../components/Loading";
import axios from "axios";
import liff from "@line/liff";

const topics = {
  พัฒนาการเรียน: [
    "พัฒนาประสิทธิภาพการเรียน",
    "การจัดการเวลา",
    "ค้นหาศักยภาพตนเอง",
    "สภาพแวดล้อมหรือบรรยากาศการเรียน",
    "หมดไฟ-แรงใจในการเรียน(Burnout – Brownout)",
  ],
  สุขภาพจิตและความเครียด: [
    "การเป็นที่ยอมรับ / คุณค่าในตนเอง",
    "ความเครียดจากการเรียน-ความกดดัน-ภาระงาน",
    "ภาวะทางอารมณ์ / ซึมเศร้า / การสูญเสีย",
  ],
  ความสัมพันธ์: [
    "ความสัมพันธ์กับอาจารย์",
    "ความสัมพันธ์กับเพื่อน",
    "ครอบครัว",
    "ความรัก",
    "เพศสัมพันธ์",
  ],
  สถานะการเงิน: [],
  "ติดโทรศัพท์มือถือ / อินเตอร์เน็ต /เกมส์ / สารเสพติด": [],
  ความยืดหยุ่นทางจิตใจ: [],
  เพศทางเลือก: [],
  อื่นๆ: [],
};

export default function Appoint() {
  const [appointData, setAppointData] = useState({
    uid: "",
    tel: "",
    contactMethod: "",
    medDoctor: "",
    date: "",
    time: "",
    topic: "",
    detail: "",
    subtopic: "",
    medHistory: "",
  });

  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [error, setError] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const navigate = useNavigate();

  // Fetch staff data when component mounts
  useEffect(() => {
    axios
      .get("/staff/all")
      .then((response) => {
        const formattedStaffList = response.data.map((staff) => ({
          value: staff.staff_id,
          label: `${staff.name} ${staff.surname} - ${staff.nickname}`,
        }));
        setStaffList(formattedStaffList);
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
      });
  }, []);

  // Fetch time slots when selected staff or date changes
  useEffect(() => {
    if (selectedStaff && appointmentDate) {
      axios
        .post("/timetable/getStaffTimeByDate", {
          staff_id: selectedStaff,
          date: appointmentDate,
        })
        .then((response) => {
          setTimeSlots(response.data);
        })
        .catch((error) => {
          console.error("Error fetching timetable data:", error);
        });
    }
  }, [selectedStaff, appointmentDate]);

  useEffect(() => {
    liff
      .init({ liffId: "2006283577-J1qnq04Q" })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then((profile) => {
              setAppointData((prevData) => ({
                ...prevData,
                uid: profile.userId,
              }));
            })
            .catch((err) => console.error("Error getting profile:", err));
        } else {
          liff.login();
        }
      })
      .catch((err) => console.error("Error initializing LIFF:", err));

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (appointData.date < currentDate) {
      setError("Please select a valid date.");
      return;
    }
    setError("");
    setLoading(true);

    console.log(appointData);

    setTimeout(() => {
      setLoading(false);
      navigate("/confirm_app", { state: { appointData } });
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "date") {
      setAppointmentDate(value);
    }

    if (name === "medDoctor") {
      setSelectedStaff(value);
    }
  };

  const handleRadioSelect = (name, value) => {
    setAppointData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "contactMethod" && value === "Google Meet") {
      setAppointData((prevData) => ({
        ...prevData,
        tel: "",
      }));
    }
  };

  const hasSubtopics = (topic) => topics[topic]?.length > 0;

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Logo />
      <div className="appoint-topic">
        <h1>นัดหมายพบเจ้าหน้าที่</h1>
      </div>
      <div className="appoint-form">
        <form onSubmit={onSubmit}>
          <div className="userid">
            UID: <small>{appointData.uid}</small>
          </div>
          <div className="app-contact">
            <label>
              ช่องทางการติดต่อ<mark> *</mark>
            </label>
            <div className="contact-container">
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <CustomRadioButton
                  label="Google Meet"
                  value="Google Meet"
                  name="contactMethod"
                  selected={appointData.contactMethod === "Google Meet"}
                  onSelect={(value) =>
                    handleRadioSelect("contactMethod", value)
                  }
                  required
                />
                <CustomRadioButton
                  label="เบอร์โทร"
                  value="เบอร์โทร"
                  name="contactMethod"
                  selected={appointData.contactMethod === "เบอร์โทร"}
                  onSelect={(value) =>
                    handleRadioSelect("contactMethod", value)
                  }
                  required
                />
              </ul>
            </div>
          </div>
          {appointData.contactMethod !== "Google Meet" && (
            <div className="app-tel">
              <label>
                หมายเลขโทรศัพท์<mark> *</mark>
              </label>
              <br />
              <small>Example: 0000000000</small>
              <br />
              <input
                className="app-tel"
                type="tel"
                placeholder="0000000000"
                pattern="[0-9]{10}"
                value={appointData.tel}
                name="tel"
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="app-advisor">
            <label>
              เลือกผู้ให้คำปรึกษา<mark> *</mark>
              <br />
              <select
                name="medDoctor"
                value={appointData.medDoctor}
                onChange={handleChange}
                required
              >
                <option value="">เลือกผู้ให้คำปรึกษา</option>
                {staffList.map((staff) => (
                  <option key={staff.value} value={staff.value}>
                    {staff.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="app-time">
            <label>
              วันที่และเวลา<mark> *</mark>
              <br />
              <input
                type="date"
                name="date"
                value={appointData.date}
                min={currentDate}
                onChange={handleChange}
                required
              />
              <br />
              <select
                name="time"
                value={appointData.time}
                onChange={handleChange}
                required
                disabled={
                  !appointData.date || !appointData.medDoctor || loadingSlots
                }
              >
                <option value="">เลือกเวลา</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {loadingSlots && <p>Loading available time slots...</p>}
            </label>
          </div>

          <div className="app-topic">
            <label>
              ประเด็นที่ต้องการปรึกษา<mark> *</mark>
              <br />
              <select
                name="topic"
                value={appointData.topic}
                onChange={handleChange}
                required
              >
                <option value="">เลือกประเด็นที่ต้องการปรึกษา</option>
                {Object.keys(topics).map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {hasSubtopics(appointData.topic) && (
            <div className="app-topic">
              <label>
                หัวข้อย่อย
                <br />
                <select
                  name="subtopic"
                  value={appointData.subtopic}
                  onChange={handleChange}
                >
                  <option value="">เลือกหัวข้อย่อย</option>
                  {topics[appointData.topic]?.map((subtopic) => (
                    <option key={subtopic} value={subtopic}>
                      {subtopic}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          <div className="app-detail">
            <label>
              รายละเอียดเพิ่มเติม
              <br />
              <textarea
                value={appointData.detail}
                name="detail"
                onChange={handleChange}
              ></textarea>
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="dass21-app-footer">
            <button type="submit" className="btn btn-next">
              จองเลย
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
