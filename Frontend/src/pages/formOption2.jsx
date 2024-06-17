import React, { useState, useEffect } from "react";
import "./formOption2.css";
import Logo from "../components/logo";
import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { BsTelephoneFill } from "react-icons/bs";
import liff from "@line/liff";

export default function FormOption2() {
  const [step2Data, setStep2Data] = useState({
    uid: "",
    gender: "",
    age: "",
    year: "",
    email: "",
    tel: "",
    sos_tel: "",
  });

  const navigate = useNavigate();

  /* useEffect(() => {
    liff
      .init({ liffId: "2005311386-6GQLXp7Z" })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            setStep2Data((prevData) => ({
              ...prevData,
              uid: profile.userId,
            }));
            localStorage.setItem("uid", profile.userId);
          });
        } else {
          liff.login();
        }
      })
      .catch((err) => console.error("Error initializing LIFF:", err));
  }, []); */

  const onChange = (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;
    setStep2Data((oldData) => ({ ...oldData, [key]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit value", step2Data);
    navigate("/p1_dass21");
  };

  return (
    <div>
      <Logo />

      <div className="step-2">
        <h1>STEP 2 :</h1>
        <p>กรอกข้อมูลผู้ขอรับคำปรึกษาเบื้องต้น</p>
      </div>

      <div className="form-fill">
        <form onSubmit={onSubmit}>
          <div className="form_uid">
            UID: <small>{step2Data.uid}</small>
            <br />
          </div>
          <div className="gender-age">
            <RxPerson className="ioperson" />
            <select
              className="gender"
              value={step2Data.gender}
              name="gender"
              onChange={onChange}
              required
            >
              <option value="">เพศ</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>

            <input
              className="age"
              type="number"
              placeholder="อายุ"
              value={step2Data.age}
              name="age"
              onChange={onChange}
              required
            />
          </div>

          <div className="year">
            <label>ชั้นปีการศึกษา</label>
            <select
              className="year"
              value={step2Data.year}
              name="year"
              onChange={onChange}
              required
            >
              <option value="">เลือกชั้นปีการศึกษา</option>
              {/* <option value="ป.1">ป.1</option>
              <option value="ป.2">ป.2</option>
              <option value="ป.3">ป.3</option>
              <option value="ป.4">ป.4</option>
              <option value="ป.5">ป.5</option>
              <option value="ป.6">ป.6</option> */}
              <option value="ม.1">ม.1</option>
              <option value="ม.2">ม.2</option>
              <option value="ม.3">ม.3</option>
              <option value="ม.4">ม.4</option>
              <option value="ม.5">ม.5</option>
              <option value="ม.6">ม.6</option>
              {/* <option value="มหาวิทยาลัย">มหาวิทยาลัย</option>
              <option value="others">อื่นๆ</option> */}
            </select>
          </div>
          <div className="email">
            <label>อีเมล </label>
            <input
              className="email"
              type="email"
              placeholder="example@gmail.com"
              value={step2Data.email}
              name="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              onChange={onChange}
              required
            />
          </div>

          <div className="tel">
            <label>เบอร์ติดต่อ </label>
            <input
              className="tel"
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              placeholder="0000000000"
              value={step2Data.tel}
              name="tel"
              onChange={onChange}
              required
            />
            <small>Ex: 0000000000</small>
          </div>

          <div className="sos-tel">
            <label>เบอร์ติดต่อฉุกเฉิน (Optional)</label>
            <input
              className="sos-tel"
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              placeholder="0000000000"
              value={step2Data.sos_tel}
              name="sos_tel"
              onChange={onChange}
            />
            <small>Ex: 0000000000</small>
          </div>
          <div className="next-btn">
            <button type="submit" className="btn btn-next">
              ต่อไป
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
