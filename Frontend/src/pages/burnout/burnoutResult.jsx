import React, { useEffect, useState } from "react";
import { BaseResult } from "../../components/BaseResult";
import Loading from "../../components/Loading";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./burnoutResult.css";

export default function BurnOutResult() {
  const [scores, setScores] = useState({
    emotionalExhaustion: 0,
    depersonalization: 0,
    personalAccomplishment: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateAndSubmitScores = async () => {
      try {
        const storedValues = JSON.parse(
          localStorage.getItem("burnoutValues") || "{}"
        );
        const uid = localStorage.getItem("uid");

        // คำนวณคะแนนแต่ละด้าน
        const emotionalExhaustionQuestions = [1, 2, 3, 6, 8, 13, 14, 16, 20];
        const emotionalExhaustion = emotionalExhaustionQuestions.reduce(
          (sum, q) => sum + (storedValues[q] || 0),
          0
        );

        const depersonalizationQuestions = [5, 10, 11, 15, 22];
        const depersonalization = depersonalizationQuestions.reduce(
          (sum, q) => sum + (storedValues[q] || 0),
          0
        );

        const personalAccomplishmentQuestions = [4, 7, 9, 12, 17, 18, 19, 21];
        const personalAccomplishment = personalAccomplishmentQuestions.reduce(
          (sum, q) => sum + (6 - (storedValues[q] || 0)),
          0
        );

        const calculatedScores = {
          emotionalExhaustion,
          depersonalization,
          personalAccomplishment,
        };

        // ส่งข้อมูลไป API
        /* await axios.post(`${import.meta.env.VITE_API_PATH}/submitForms`, {
          uid: uid,
          forms_type: "burnout",
          result: JSON.stringify({
            uid,
            ...calculatedScores,
          }),
        }); */

        setScores(calculatedScores);
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("เกิดข้อผิดพลาดในการส่งข้อมูล โปรดลองอีกครังภายหลัง", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 5000,
          style: {
            fontSize: "16px",
            fontFamily: "ChulabhornLikitText-Regular",
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    calculateAndSubmitScores();
  }, []);

  const getSeverityLevel = (score, type) => {
    switch (type) {
      case "emotionalExhaustion":
        if (score >= 27) return "ระดับสูง";
        if (score >= 17) return "ระดับปานกลาง";
        return "ระดับต่ำ";
      case "depersonalization":
        if (score >= 13) return "ระดับสูง";
        if (score >= 7) return "ระดับปานกลาง";
        return "ระดับต่ำ";
      case "personalAccomplishment":
        if (score >= 39) return "ระดับต่ำ";
        if (score >= 32) return "ระดับปานกลาง";
        return "ระดับสูง";
      default:
        return "";
    }
  };

  const getRecommendation = (
    emotionalLevel,
    depersonalizationLevel,
    personalAccomplishmentLevel
  ) => {
    // สร้างตัวแปรเก็บจำนวนด้านที่มีระดับสูง (นับระดับต่ำของความสำเร็จส่วนบุคคลเป็นระดับสูงของภาวะหมดไฟ)
    let highBurnoutCount = 0;
    let mediumBurnoutCount = 0;

    if (emotionalLevel === "ระดับสูง") highBurnoutCount++;
    if (emotionalLevel === "ระดับปานกลาง") mediumBurnoutCount++;

    if (depersonalizationLevel === "ระดับสูง") highBurnoutCount++;
    if (depersonalizationLevel === "ระดับปานกลาง") mediumBurnoutCount++;

    if (personalAccomplishmentLevel === "ระดับต่ำ") highBurnoutCount++;
    if (personalAccomplishmentLevel === "ระดับปานกลาง") mediumBurnoutCount++;

    // ถ้ามีอย่างน้อย 2 ด้านที่อยู่ในระดับสูง ถือว่ามีภาวะหมดไฟระดับสูง
    if (highBurnoutCount >= 2) {
      return {
        level: "ระดับสูง",
        recommendation:
          "ท่านมีภาวะหมดไฟในการทำงานในระดับสูง ควรได้รับการสนับสนุน เช่น ปรึกษาเพื่อนร่วมงาน หัวหน้า หรือผู้เชี่ยวชาญด้านสุขภาพจิต เพื่อหาแนวทางลดภาวะหมดไฟและฟื้นฟูสภาพจิตใจ",
      };
    }
    // ถ้ามีอย่างน้อย 2 ด้านที่อยู่ในระดับปานกลางหรือสูง ถือว่ามีภาวะหมดไฟระดับปานกลาง
    else if (highBurnoutCount + mediumBurnoutCount >= 2) {
      return {
        level: "ระดับปานกลาง",
        recommendation:
          "ท่านเริ่มมีความเสี่ยงต่อภาวะหมดไฟในการทำงาน อาจต้องปรับวิธีทำงาน ลดความเครียด และหาเวลาพักผ่อน เพื่อป้องกันไม่ให้ภาวะหมดไฟพัฒนาไปสู่ระดับที่รุนแรงขึ้น",
      };
    }
    // นอกจากนั้นถือว่ามีภาวะหมดไฟระดับต่ำ
    else {
      return {
        level: "ระดับต่ำ",
        recommendation:
          "ท่านมีสุขภาพจิตดี มีภาวะหมดไฟในการทำงานต่ำ ควรรักษาสมดุลของการทำงานและชีวิตส่วนตัวเพื่อให้สุขภาพจิตคงอยู่ในระดับที่ดีต่อไป",
      };
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const emotionalLevel = getSeverityLevel(
    scores.emotionalExhaustion,
    "emotionalExhaustion"
  );
  const depersonalizationLevel = getSeverityLevel(
    scores.depersonalization,
    "depersonalization"
  );
  const personalAccomplishmentLevel = getSeverityLevel(
    scores.personalAccomplishment,
    "personalAccomplishment"
  );

  const overallAssessment = getRecommendation(
    emotionalLevel,
    depersonalizationLevel,
    personalAccomplishmentLevel
  );

  const ResultBox = ({ label, score, severity }) => (
    <div className="result-box">
      <div className="result-header">{label}</div>
      <div className="result-content">
        <div className="score">{score} คะแนน</div>
        <div
          className={`severity ${
            severity === "ระดับสูง"
              ? "high"
              : severity === "ระดับปานกลาง"
              ? "medium"
              : "low"
          }`}
        >
          {severity}
        </div>
      </div>
    </div>
  );

  return (
    <BaseResult title="ผลการประเมินภาวะหมดไฟในการทำงาน">
      <div className="burnout-results">
        <ResultBox
          label="ด้านความอ่อนล้าทางอารมณ์"
          score={scores.emotionalExhaustion}
          severity={emotionalLevel}
        />
        <ResultBox
          label="ด้านการลดความเป็นบุคคล"
          score={scores.depersonalization}
          severity={depersonalizationLevel}
        />
        <ResultBox
          label="ด้านความสำเร็จส่วนบุคคล"
          score={scores.personalAccomplishment}
          severity={personalAccomplishmentLevel}
        />

        <div className="description-section">
          <h3>คำอธิบาย:</h3>
          <div className="description-item">
            <h4>ด้านความอ่อนล้าทางอารมณ์</h4>
            <p>การมีอารมณ์ที่เหนื่อยล้า หมดแรง หมดความกระตือรือร้น</p>
          </div>
          <div className="description-item">
            <h4>ด้านการลดความเป็นบุคคล</h4>
            <p>การมีทัศนคติด้านลบ การแสดงออกถึงการไม่ใส่ใจผู้อื่น</p>
          </div>
          <div className="description-item">
            <h4>ด้านความสำเร็จส่วนบุคคล</h4>
            <p>ความรู้สึกไม่ประสบความสำเร็จและไม่มีประสิทธิภาพในการทำงาน</p>
          </div>
          <div
            className="description-item"
            style={{
              margin: "1.5rem 0",
              padding: "1rem",
              backgroundColor:
                overallAssessment.level === "ระดับสูง"
                  ? "#FFE5E5"
                  : overallAssessment.level === "ระดับปานกลาง"
                  ? "#fff8e1"
                  : "#e8f5e9",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                textAlign: "center",
              }}
            >
              สรุปผลการประเมิน
            </h3>
            <h3
              style={{
                color:
                  overallAssessment.level === "ระดับสูง"
                    ? "#FF4D4D"
                    : overallAssessment.level === "ระดับปานกลาง"
                    ? "#FF9800"
                    : "#4CAF50",
                textAlign: "center",
                fontWeight: "regular",
              }}
            >
              {overallAssessment.level}
            </h3>
            <p style={{ marginTop: "20px" }}>
              {"\n"}
              {overallAssessment.recommendation}
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </BaseResult>
  );
}
