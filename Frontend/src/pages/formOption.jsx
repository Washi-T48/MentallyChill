import React, { useState } from "react";
import "./formOption.css";
import Logo from "../components/logo";
import EXicon from "../images/excla_icon.png";
import Enter from "../images/enter_icon.png";
import { useNavigate } from "react-router-dom";

export default function FormOption() {
  const [formType, setFormType] = useState({
    forms_type: "",
  });
  const navigateStep2 = (formName) => {
    setFormType({ forms_type: formName });

    console.log("formName: " + formName);
    window.location.href = `../formOption2?form_type=${formName}`;
  };

  return (
    <div>
      <Logo />

      <div className="step-1">
        <h1>STEP 1 :</h1>
        <p>เลือกแบบประเมินวิเคราะห์ความเครียดด้วยตนเอง</p>
      </div>

      <div className="form-option">
        <div
          className="DASS21 f-container"
          onClick={() => navigateStep2("DASS-21")}
        >
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
            <b>ST-5</b> (not available)
            <br />
            <small>สำหรับประเมินความเครียด</small>
          </div>
          <img className="ent-icon" src={Enter}></img>
        </div>
        <div className="f9Q f-container">
          <img className="ex-icon" src={EXicon}></img>
          <div className="form-name">
            <b>9Q</b> (not available)
            <br />
            <small>สำหรับประเมินโรคซึมเศร้า</small>
          </div>
          <img className="ent-icon" src={Enter}></img>
        </div>
        <div className="f8Q f-container">
          <img className="ex-icon" src={EXicon}></img>
          <div className="form-name">
            <b>8Q</b> (not available)
            <br />
            <small>สำหรับประเมินความเสี่ยงในการฆ่าตัวตาย</small>
          </div>
          <img className="ent-icon" src={Enter}></img>
        </div>
        <div className="YMM f-container">
          <img className="ex-icon" src={EXicon}></img>
          <div className="form-name">
            <b>Young Minds Matter (YMM)</b> (not available)
            <br />
            <small>แบบสำรวจสุขภาพจิตและความเป็นอยู่ที่ดีของเด็ก</small>
          </div>
          <img className="ent-icon" src={Enter}></img>
        </div>
      </div>
    </div>
  );
}
