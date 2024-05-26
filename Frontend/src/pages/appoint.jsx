import React, { useState, useEffect } from "react";
import "./appoint.css";
import Logo from "../components/logo";
import { useNavigate } from "react-router-dom";
import CustomRadioButton from "../components/CustomRadioButton";
import liff from "@line/liff";

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
    medHistory: "",
  });

  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    liff
      .init({ liffId: "2005311386-dnvmKNjJ" })
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

    // Set the current date in YYYY-MM-DD format
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Convert date and time
    const formattedDate = new Date(appointData.date)
      .toISOString()
      .split("T")[0];
    const formattedTime = appointData.time + ":00";

    const dataToSubmit = {
      ...appointData,
      date: formattedDate,
      time: formattedTime,
    };

    // Validate if the selected time slot is still available
    const isAvailable = await checkSlotAvailability(
      appointData.medDoctor,
      appointData.date,
      appointData.time
    );

    if (isAvailable) {
      console.log("submit value", dataToSubmit);
      navigate("/confirm_app", { state: { appointData: dataToSubmit } });
    } else {
      alert(
        "The selected time slot is no longer available. Please choose another time slot."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Fetch available time slots when the date or doctor changes
    if (name === "date" || name === "medDoctor") {
      if (appointData.medDoctor && appointData.date) {
        fetchAvailableTimeSlots(appointData.medDoctor, appointData.date);
      }
    }
  };

  const handleRadioSelect = (name, value) => {
    setAppointData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchAvailableTimeSlots = async (doctor, date) => {
    setLoadingSlots(true);
    // Replace with API call to fetch available time slots
    const availableTimeSlots = await mockFetchTimeSlots(doctor, date);
    setTimeSlots(availableTimeSlots);
    setLoadingSlots(false);
  };

  // simulate fetching available time slots from an API
  const mockFetchTimeSlots = async (doctor, date) => {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["09:00", "10:00", "11:00", "13:00", "14:00"]);
      }, 1000);
    });
  };

  // simulate checking slot availability from an API
  const checkSlotAvailability = async (doctor, date, time) => {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // assume all slots are available
        resolve(true);
      }, 500);
    });
  };

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
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              value={appointData.tel}
              name="tel"
              onChange={handleChange}
              required
            />
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
                <option value="CRA01">
                  CRA01 รุ้งนภา ผาณิตรัตน์ (พี่รุ้ง)
                </option>
                <option value="CRA02">
                  CRA02 ดวงแก้ว เตชะกาญจนเวช (พี่ปู)
                </option>
                <option value="CRA03">CRA03 วิภาพร สร้อยแสง (พี่อ้อย)</option>
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
                min={currentDate} // Prevent selection of past dates
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
              เรื่องที่ต้องการปรึกษา<mark> *</mark>
              <br />
              <select
                name="topic"
                value={appointData.topic}
                onChange={handleChange}
                required
              >
                <option value="">เลือกหัวข้อ</option>
                <option value="TOPIC-1">TOPIC-1</option>
                <option value="TOPIC-2">TOPIC-2</option>
                <option value="TOPIC-3">TOPIC-3</option>
              </select>
            </label>
          </div>
          <div className="app-detail">
            <label>
              เรื่องที่ขอรับการปรึกษา
              <br />
              <textarea
                className="app-detail"
                name="detail"
                value={appointData.detail}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="med-his">
            <label>
              ประวัติการรับยา
              <br />
              <textarea
                className="med-his"
                name="medHistory"
                value={appointData.medHistory}
                onChange={handleChange}
                required
              />
            </label>
          </div>

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
