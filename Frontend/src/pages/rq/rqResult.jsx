import React, { useEffect, useState } from "react";
import { BaseResult } from "../../components/BaseResult";
import Loading from "../../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import "../burnout/burnoutResult.css";

export default function RQResult() {
  const [scores, setScores] = useState({
    emotionalEndurance: 0,
    encouragement: 0,
    problemManagement: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateAndSubmitScores = async () => {
      try {
        const storedValues = JSON.parse(
          localStorage.getItem("rqValues") || "{}"
        );

        // Calculate scores based on RQ scoring criteria with 1-4 scale
        const emotionalEnduranceQuestions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const encouragementQuestions = [11, 12, 13, 14, 15];
        const problemManagementQuestions = [16, 17, 18, 19, 20];

        // Reverse scoring for negative questions
        // For 1-4 scale: 1->4, 2->3, 3->2, 4->1
        const negativeQuestions = [1, 5, 14, 15, 16];

        const calculateScore = (questions) => {
          return questions.reduce((sum, q) => {
            const value = storedValues[q] || 0;
            if (negativeQuestions.includes(q)) {
              // Reverse scoring for 1-4 scale
              return sum + (5 - value);
            }
            return sum + value;
          }, 0);
        };

        const emotionalEndurance = calculateScore(emotionalEnduranceQuestions);
        const encouragement = calculateScore(encouragementQuestions);
        const problemManagement = calculateScore(problemManagementQuestions);

        setScores({
          emotionalEndurance,
          encouragement,
          problemManagement,
        });
      } catch (error) {
        console.error("Error calculating scores:", error);
        toast.error("เกิดข้อผิดพลาดในการคำนวณคะแนน โปรดลองอีกครั้งภายหลัง", {
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
      case "emotionalEndurance":
        if (score > 34) return "สูงกว่าเกณฑ์ปกติ";
        if (score >= 27) return "เกณฑ์ปกติ";
        return "ต่ำกว่าเกณฑ์ปกติ";
      case "encouragement":
        if (score > 19) return "สูงกว่าเกณฑ์ปกติ";
        if (score >= 14) return "เกณฑ์ปกติ";
        return "ต่ำกว่าเกณฑ์ปกติ";
      case "problemManagement":
        if (score > 18) return "สูงกว่าเกณฑ์ปกติ";
        if (score >= 13) return "เกณฑ์ปกติ";
        return "ต่ำกว่าเกณฑ์ปกติ";
      default:
        return "";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const ResultBox = ({ label, score, severity }) => (
    <div className="result-box">
      <div className="result-header">{label}</div>
      <div className="result-content">
        <div className="score">{score} คะแนน</div>
        <div
          className={`severity ${
            severity === "สูงกว่าเกณฑ์ปกติ" || severity === "เกณฑ์ปกติ"
              ? "low"
              : "high"
          }`}
        >
          {severity}
        </div>
      </div>
    </div>
  );

  const totalScore =
    scores.emotionalEndurance + scores.encouragement + scores.problemManagement;
  const getTotalSeverityLevel = (total) => {
    if (total > 69) return "สูงกว่าเกณฑ์ปกติ";
    if (total >= 55) return "เกณฑ์ปกติ";
    return "ต่ำกว่าเกณฑ์ปกติ";
  };

  return (
    <BaseResult title="ผลการประเมินพลังสุขภาพจิต (RQ)">
      <div className="burnout-results">
        <ResultBox
          label="ด้านความทนทานทางอารมณ์"
          score={scores.emotionalEndurance}
          severity={getSeverityLevel(
            scores.emotionalEndurance,
            "emotionalEndurance"
          )}
        />
        <ResultBox
          label="ด้านกำลังใจ"
          score={scores.encouragement}
          severity={getSeverityLevel(scores.encouragement, "encouragement")}
        />
        <ResultBox
          label="ด้านการจัดการกับปัญหา"
          score={scores.problemManagement}
          severity={getSeverityLevel(
            scores.problemManagement,
            "problemManagement"
          )}
        />
        <ResultBox
          label="คะแนนรวม"
          score={totalScore}
          severity={getTotalSeverityLevel(totalScore)}
        />

        <div className="description-section">
          <h3>คำอธิบาย:</h3>
          <div className="description-item">
            <h4>ด้านความทนทานทางอารมณ์</h4>
            <p>
              การมีอารมณ์ที่มั่นคงไม่อ่อนไหวง่าย ไม่ถูกกระตุ้นง่าย ไม่เครียดง่าย
              อยู่ในความกดดันได้
              และมีวิธีจัดการกับอารมณ์ให้สงบและกลับมามั่นคงเหมือนเดิมได้
            </p>
          </div>
          <div className="description-item">
            <h4>ด้านกำลังใจ</h4>
            <p>
              การมีจิตใจที่มุ่งมั่นสู่เป้าหมายที่ต้องการ ไม่ท้อถอย
              มีที่พึ่งที่ปรึกษาเมื่อพบกับความยากลำบาก หรือวิกฤต
            </p>
          </div>
          <div className="description-item">
            <h4>ด้านการจัดการกับปัญหา</h4>
            <p>
              การมีมุมมองทางบวกต่อปัญหา ไม่หนีปัญหา
              มีการหาข้อมูลและมีแนวทางในการแก้ไขปัญหา
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </BaseResult>
  );
}
