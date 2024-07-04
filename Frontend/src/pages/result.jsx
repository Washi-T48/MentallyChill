import React, { useEffect, useState } from "react";
import Logo from "../components/logo";
import "./result.css";
import EXicon from "../images/excla_icon.png";
import { Link, useNavigate } from "react-router-dom";

export default function Result() {
  const [scores, setScores] = useState({ d: 0, a: 0, s: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const storedScores = localStorage.getItem("dass21Scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  const getSeverity = (score, type) => {
    if (type === "d") {
      if (score >= 14) return { label: "รุนแรงที่สุด", color: "severe" };
      if (score >= 11) return { label: "รุนแรง", color: "high" };
      if (score >= 7) return { label: "ปานกลาง", color: "moderate" };
      if (score >= 5) return { label: "ระดับต่ำ", color: "low" };
      return { label: "ปกติ", color: "normal" };
    } else if (type === "a") {
      if (score >= 10) return { label: "รุนแรงที่สุด", color: "severe" };
      if (score >= 8) return { label: "รุนแรง", color: "high" };
      if (score >= 6) return { label: "ปานกลาง", color: "moderate" };
      if (score >= 4) return { label: "ระดับต่ำ", color: "low" };
      return { label: "ปกติ", color: "normal" };
    } else if (type === "s") {
      if (score >= 17) return { label: "รุนแรงที่สุด", color: "severe" };
      if (score >= 13) return { label: "รุนแรง", color: "high" };
      if (score >= 10) return { label: "ปานกลาง", color: "moderate" };
      if (score >= 8) return { label: "ระดับต่ำ", color: "low" };
      return { label: "ปกติ", color: "normal" };
    }
  };

  return (
    <div>
      <Logo />
      <div className="dass21-result-content">
        <div className="mental-health">
          <img src={EXicon} alt="Mental Health Icon" />
          &nbsp; <h1>Mental Health Concern</h1>
        </div>
        <div className="mental-group">
          <div>กลุ่มอาการ</div>
          <div></div>
          <div>ระดับความรุนแรง</div>
        </div>
        <div className="mental-detail">
          {["d", "a", "s"].map((type) => {
            const { label, color } = getSeverity(scores[type], type);
            return (
              <div key={type} className={`result ${color}`}>
                <span>
                  {type === "d"
                    ? "อาการซึมเศร้า (D)"
                    : type === "a"
                    ? "ความวิตกกังวล (A)"
                    : "ความเครียด (S)"}
                </span>
                <div> {scores[type]} คะแนน </div>
                <div>{label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="dass21-result-footer">
        <Link to="/">
          <button className="btn btn-close">ปิด</button>
        </Link>
        <button className="btn btn-next" onClick={() => navigate("/appoint")}>
          นัดหมายพบเจ้าหน้าที่
        </button>
      </div>
      <small className="result-small">
        * ข้อมูลที่ใช้ในการรับบริการการปรึกษา
        จะเป็นความลับและไม่ส่งผลต่อผลการเรียน{" "}
      </small>
    </div>
  );
}
