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

  const getRecommendation = (type, level) => {
    if (level === "สูงกว่าเกณฑ์ปกติ" || level === "เกณฑ์ปกติ") {
      return "ท่านจัดอยู่ในกลุ่มคนที่มีพลังสุขภาพจิตดีเยี่ยม ขอให้ท่านรักษาศักยภาพด้านนี้ไว้ ท่านอาจพัฒนาตนเองโดยการแสวงหาความรู้ เพื่อเสริมพลังสุขภาพจิตให้คงอยู่ เช่น การฝึกทักษะในการแก้ไขปัญหา การสร้างกำลังใจให้ตนเอง";
    } else {
      // ต่ำกว่าเกณฑ์ปกติ
      switch (type) {
        case "emotionalEndurance":
          return "ท่านสามารถพัฒนาศักยภาพด้านนี้ได้โดยฝึกควบคุมอารมณ์ตนเองให้มีสติและสงบ เริ่มต้นจากการควบคุมอารมณ์เมื่อเผชิญกับความเครียด ความผิดหวังเล็ก ๆ น้อย ๆ ฝึกหายใจเข้าออกช้า ๆ ลึก ๆ หรือฝึกมองส่วนดีที่มีอยู่";
        case "encouragement":
          return "ท่านสามารถพัฒนาศักยภาพด้านนี้ได้โดยคิดถึงสิ่งดี ๆ ที่มีอยู่ เช่น มีคนที่รักและห่วงใยเคยผ่านประสบการณ์ความยากลำบากมาก่อน หมั่นพูดให้กำลังใจตัวเอง เช่น เราต้องผ่านพ้นไปได้ชีวิตย่อมมีขึ้นมีลง คิดถึงโอกาสข้างหน้า หากฝ่าฟันจุดนี้ไปได้";
        case "problemManagement":
          return "ท่านสามารถพัฒนาศักยภาพด้านนี้ได้โดยฝึกคิดหาทางออกในการแก้ปัญหา เริ่มจากเมื่อมีปัญหาเล็ก ๆ น้อย ๆ ลองหาทางออกให้มากที่สุด หาข้อดีข้อเสียในแต่ละวิธีการ เลือกวิธีการที่ดีที่สุด และคิดหาวิธีการสำรองไว้ เผื่อวิธีที่เลือกใช้ไม่ได้ผล การแก้ไขปัญหาได้สำเร็จจะช่วยให้ท่านเห็นว่าการแก้ปัญหาไม่ใช่เรื่องยาก และมีทักษะที่ดีในการแก้ปัญหาได้";
        default:
          return "";
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const ResultBox = ({ label, score, severity, type }) => (
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
      {type && (
        <div
          className="recommendation"
          style={{
            padding: "10px",
            fontSize: "14px",
            backgroundColor: "#f8f8f8",
            margin: "10px 10px",
          }}
        >
          <strong>คำแนะนำ:</strong> {getRecommendation(type, severity)}
        </div>
      )}
    </div>
  );

  const totalScore =
    scores.emotionalEndurance + scores.encouragement + scores.problemManagement;
  const getTotalSeverityLevel = (total) => {
    if (total > 69) return "สูงกว่าเกณฑ์ปกติ";
    if (total >= 55) return "เกณฑ์ปกติ";
    return "ต่ำกว่าเกณฑ์ปกติ";
  };

  const totalSeverity = getTotalSeverityLevel(totalScore);

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
          type="emotionalEndurance"
        />
        <ResultBox
          label="ด้านกำลังใจ"
          score={scores.encouragement}
          severity={getSeverityLevel(scores.encouragement, "encouragement")}
          type="encouragement"
        />
        <ResultBox
          label="ด้านการจัดการกับปัญหา"
          score={scores.problemManagement}
          severity={getSeverityLevel(
            scores.problemManagement,
            "problemManagement"
          )}
          type="problemManagement"
        />
        <ResultBox
          label="คะแนนรวม"
          score={totalScore}
          severity={totalSeverity}
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
          <div
            className="description-item"
            style={{
              margin: "1.5rem 0",
            }}
          >
            <h3
              style={{
                textAlign: "center",
              }}
            >
              สรุปผลการประเมิน
            </h3>
            <p style={{ marginTop: "20px" }}>
              {totalSeverity === "ต่ำกว่าเกณฑ์ปกติ"
                ? "จากผลการประเมิน ท่านควรพัฒนาพลังสุขภาพจิตในด้านที่มีคะแนนต่ำกว่าเกณฑ์ปกติ ตามคำแนะนำที่ให้ไว้ในแต่ละด้าน การมีพลังสุขภาพจิตที่ดีจะช่วยให้ท่านสามารถรับมือกับความท้าทายและปัญหาในชีวิตได้อย่างมีประสิทธิภาพ"
                : "ท่านจัดอยู่ในกลุ่มคนที่มีพลังสุขภาพจิตดีเยี่ยม ขอให้ท่านรักษาศักยภาพด้านนี้ไว้ ท่านอาจพัฒนาตนเองโดยการแสวงหาความรู้ เพื่อเสริมพลังสุขภาพจิตให้คงอยู่ เช่น การฝึกทักษะในการแก้ไขปัญหา การสร้างกำลังใจให้ตนเอง"}
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </BaseResult>
  );
}
