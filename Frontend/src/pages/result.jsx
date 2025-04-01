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
      if (score >= 14)
        return { label: "รุนแรงที่สุด", color: "severe", level: 4 };
      if (score >= 11) return { label: "รุนแรง", color: "high", level: 3 };
      if (score >= 7) return { label: "ปานกลาง", color: "moderate", level: 2 };
      if (score >= 5) return { label: "ระดับต่ำ", color: "low", level: 1 };
      return { label: "ปกติ", color: "normal", level: 0 };
    } else if (type === "a") {
      if (score >= 10)
        return { label: "รุนแรงที่สุด", color: "severe", level: 4 };
      if (score >= 8) return { label: "รุนแรง", color: "high", level: 3 };
      if (score >= 6) return { label: "ปานกลาง", color: "moderate", level: 2 };
      if (score >= 4) return { label: "ระดับต่ำ", color: "low", level: 1 };
      return { label: "ปกติ", color: "normal", level: 0 };
    } else if (type === "s") {
      if (score >= 17)
        return { label: "รุนแรงที่สุด", color: "severe", level: 4 };
      if (score >= 13) return { label: "รุนแรง", color: "high", level: 3 };
      if (score >= 10) return { label: "ปานกลาง", color: "moderate", level: 2 };
      if (score >= 8) return { label: "ระดับต่ำ", color: "low", level: 1 };
      return { label: "ปกติ", color: "normal", level: 0 };
    }
  };

  const getRecommendation = (level) => {
    switch (level) {
      case 4:
        return "ระดับรุนแรงมาก ควรได้รับการรักษาจากจิตแพทย์หรือนักจิตบำบัด";
      case 3:
        return "ระดับรุนแรง ควรได้รับคำแนะนำเทคนิคในการจัดการปัญหา การให้คำปรึกษาทางสุขภาพจิต หรือพบผู้เชี่ยวชาญทางสุขภาพจิต";
      case 2:
        return "ระดับปานกลาง สามารถหาความรู้ทักษะในการจัดการปัญหา เพื่อแก้ไขปัญหาต่าง ๆ เนื่องจากเป็นปัญหาในระดับที่มีสาเหตุจากปัจจัยต่าง ๆ ที่มากระทบหรือกระตุ้นในช่วงเวลานั้น ๆ";
      case 1:
        return "ระดับเล็กน้อย สามารถพบได้ในชีวิตประจำวันทั่วไป ให้หมั่นฝึกฝนสร้างพลังบวกให้ตนเอง เพื่อเพิ่มสุขภาพจิตที่ดีต่อไป";
      default:
        return "ระดับปกติ";
    }
  };

  const getHighestSeverityLevel = () => {
    const dSeverity = getSeverity(scores.d, "d").level;
    const aSeverity = getSeverity(scores.a, "a").level;
    const sSeverity = getSeverity(scores.s, "s").level;

    return Math.max(dSeverity, aSeverity, sSeverity);
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

        {/* คำแนะนำ */}
        <div
          className="description-item"
          style={{
            margin: "1.5rem auto",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "15px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            สรุปผลการประเมิน
          </h3>

          {/* คำแนะนำสำหรับอาการซึมเศร้า */}
          {getSeverity(scores.d, "d").level > 0 && (
            <div style={{ marginBottom: "10px" }}>
              <p
                style={{
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <strong>อาการซึมเศร้า:</strong>{" "}
                {getRecommendation(getSeverity(scores.d, "d").level)}
              </p>
            </div>
          )}

          {/* คำแนะนำสำหรับความวิตกกังวล */}
          {getSeverity(scores.a, "a").level > 0 && (
            <div style={{ marginBottom: "10px" }}>
              <p
                style={{
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <strong>ความวิตกกังวล:</strong>{" "}
                {getRecommendation(getSeverity(scores.a, "a").level)}
              </p>
            </div>
          )}

          {/* คำแนะนำสำหรับความเครียด */}
          {getSeverity(scores.s, "s").level > 0 && (
            <div style={{ marginBottom: "10px" }}>
              <p
                style={{
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <strong>ความเครียด:</strong>{" "}
                {getRecommendation(getSeverity(scores.s, "s").level)}
              </p>
            </div>
          )}

          {/* หากไม่มีระดับความเสี่ยงใดๆ */}
          {getHighestSeverityLevel() === 0 && (
            <p style={{ textAlign: "center", padding: "10px" }}>
              ผลการประเมินไม่พบความเสี่ยง ท่านอยู่ในเกณฑ์ปกติ
            </p>
          )}

          <div style={{ marginTop: "15px", fontSize: "16px", color: "#888" }}>
            <p>
              * หากมีความกังวลเกี่ยวกับสุขภาพจิต
              สามารถขอรับคำปรึกษาจากเจ้าหน้าที่ได้
            </p>
          </div>
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
