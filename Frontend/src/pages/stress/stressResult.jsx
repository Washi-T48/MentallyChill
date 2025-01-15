import React, { useEffect, useState } from "react";
import { BaseResult, ResultIndicator } from "../../components/BaseResult";

export default function StressResult() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const stressScore = localStorage.getItem("stressScore");
    if (stressScore) {
      setScore(parseInt(stressScore));
    }
  }, []);

  const getStressLevelInfo = (score) => {
    if (score >= 30) {
      return {
        severity: "เครียดมาก",
        color: "severe",
        recommendation:
          "ควรได้รับการดูแลช่วยเหลือจากผู้เชี่ยวชาญ เนื่องจากมีความเครียดสูงมาก อาจส่งผลกระทบต่อสุขภาพกายและจิตใจได้",
      };
    } else if (score >= 26) {
      return {
        severity: "เครียดปานกลาง",
        color: "moderate",
        recommendation:
          "ควรหาวิธีคลายเครียด และหากอาการไม่ดีขึ้นควรปรึกษาผู้เชี่ยวชาญเพื่อป้องกันปัญหาสุขภาพจิต",
      };
    } else if (score >= 18) {
      return {
        severity: "เครียดเล็กน้อย",
        color: "low",
        recommendation:
          "สามารถจัดการความเครียดด้วยการพักผ่อน ทำกิจกรรมที่ชื่นชอบ หรือพูดคุยกับคนใกล้ชิด",
      };
    } else if (score >= 6) {
      return {
        severity: "เครียดในระดับปกติ",
        color: "normal",
        recommendation:
          "มีความเครียดในระดับปกติซึ่งสามารถจัดการได้ในชีวิตประจำวัน ควรรักษาสมดุลในการใช้ชีวิตและการจัดการความเครียดที่ดีอยู่เสมอ",
      };
    } else {
      return {
        severity: "ไม่มีภาวะเครียด",
        color: "normal",
        recommendation:
          "มีความสามารถในการจัดการความเครียดได้ดี ควรรักษาสภาวะนี้ไว้และดูแลสุขภาพกายใจอย่างสม่ำเสมอ",
      };
    }
  };

  const { severity, color, recommendation } = getStressLevelInfo(score);

  return (
    <BaseResult title="ผลการประเมินความเครียด">
      {/* <div className="mental-group">
        <div>ระดับความเครียด</div>
        <div>คะแนน</div>
        <div>การแปลผล</div>
      </div> */}
      <div className="mental-detail">
        <ResultIndicator
          label="ความเครียด"
          score={score}
          severity={severity}
          color={color}
        />
        <div
          style={{
            padding: "20px",
            marginTop: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "10px", color: "#333" }}>คำแนะนำ</h3>
          <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#666" }}>
            {recommendation}
          </p>
          <div style={{ marginTop: "15px", fontSize: "14px", color: "#888" }}>
            <p>
              * หากมีความกังวลเกี่ยวกับสุขภาพจิต
              สามารถขอรับคำปรึกษาจากผู้เชี่ยวชาญได้
            </p>
          </div>
        </div>
      </div>
    </BaseResult>
  );
}
