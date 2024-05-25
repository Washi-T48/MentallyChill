import React, { useState } from "react";
import "./appoint.css";
import Logo from "../components/logo";
import { useNavigate } from "react-router-dom";
import CustomRadioButton from "../components/CustomRadioButton";

export default function Appoint() {
  const [appointData, setAppointData] = useState({
    tel: "",
    contactMethod: "",
    medDoctor: "",
    date: "",
    time: "",
    topic: "",
    detail: "",
    medHistory: "",
  });

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit value", appointData);
    navigate("/confirm_app", { state: { appointData } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioSelect = (name, value) => {
    setAppointData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Logo />
      <div className="appoint-topic">
        <h1>นัดหมายพบเจ้าหน้าที่</h1>
      </div>
      <div className="appoint-form">
        <form onSubmit={onSubmit}>
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
                  selected={appointData.contactMethod === "Google Meet"}
                  onSelect={(value) =>
                    handleRadioSelect("contactMethod", value)
                  }
                  required
                />
                <CustomRadioButton
                  label="เบอร์โทร"
                  value="เบอร์โทร"
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
                onChange={handleChange}
                required
              />
              <br />
              <select
                name="time"
                value={appointData.time}
                onChange={handleChange}
                required
              >
                <option value="">เลือกเวลา</option>
                <option value="TIME-1">TIME-1</option>
                <option value="TIME-2">TIME-2</option>
                <option value="TIME-3">TIME-3</option>
              </select>
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
