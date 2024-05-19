import React from "react";
import "./formOption.css";
import Logo from "../components/logo";
import EXicon from "../images/excla_icon.png";
import Enter from "../images/enter_icon.png";
import { useNavigate } from "react-router-dom";

export default function FormOption() {
  const navigateStep2 = () => {
    // Change the URL to navigate to another page
    window.location.href = "../formOption2";
  };

  return (
    <div>
      <Logo />

      <div className="step-1">
        <h1>STEP 1 :</h1>
        <p>เลือกแบบประเมินวิเคราะห์ความเครียดด้วยตนเอง</p>
      </div>

      <div className="form-option">
        <div className="DASS21 f-container" onClick={navigateStep2}>
          <img className="ex-icon" src={EXicon}></img>
          <div className="form-name">
            <b>DASS-21</b>
            <br />
            <small>สำหรับคัดกรองภาวะซึมเศร้า, วิตกกังวล, ความเครียด</small>
          </div>
          <img className="ent-icon" src={Enter}></img>
        </div>
        <div className="ST5 f-container">
          <img className="ex-icon" src={EXicon}></img>
          <div className="form-name">
            <b>ST-5</b>
            <br />
            <small>สำหรับประเมินความเครียด</small>
          </div>
          <img className="ent-icon" src={Enter}></img>
        </div>
        <div className="9Q f-container">
          <img className="ex-icon" src={EXicon}></img>
          <div className="form-name">
            <b>9Q</b>
            <br />
            <small>สำหรับประเมินโรคซึมเศร้า</small>
          </div>
          <img className="ent-icon" src={Enter}></img>
        </div>
        <div className="8Q f-container">
          <img className="ex-icon" src={EXicon}></img>
          <div className="form-name">
            <b>8Q</b>
            <br />
            <small>สำหรับประเมินความเสี่ยงในการฆ่าตัวตาย</small>
          </div>
          <img className="ent-icon" src={Enter}></img>
        </div>
        <div className="YMM f-container">
          <img className="ex-icon" src={EXicon}></img>
          <div className="form-name">
            <b>Young Minds Matter (YMM)</b>
            <br />
            <small>แบบสำรวจสุขภาพจิตและความเป็นอยู่ที่ดีของเด็ก</small>
          </div>
          <img className="ent-icon" src={Enter}></img>
        </div>
      </div>
    </div>
  );
}
