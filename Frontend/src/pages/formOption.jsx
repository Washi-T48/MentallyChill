import React, { useState, useEffect } from "react";
import "./formOption.css";
import Logo from "../components/logo";
import EXicon from "../images/excla_icon.png";
import Enter from "../images/enter_icon.png";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import liff from "@line/liff";

export default function FormOption() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navigateStep2 = (formName) => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = `../formOption2?form_type=${formName}`;
    }, 500);
  };

  useEffect(() => {
    liff
      .init({ liffId: "2005311386-6GQLXp7Z" })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then((profile) => {
              localStorage.setItem("uid", profile.userId);
            })
            .catch((err) => {
              console.error("Error getting profile:", err);
            });
        } else {
          liff.login();
        }
      })
      .catch((err) => {
        console.error("Error initializing LIFF:", err);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

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
