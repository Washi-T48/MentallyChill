import React, { useEffect, useState } from "react";
import { BaseResult } from "../../components/BaseResult";

const QResult = () => {
  const [nineQScore, setNineQScore] = useState(0);
  const [eightQScore, setEightQScore] = useState(0);

  useEffect(() => {
    try {
      // อ่านข้อมูลจาก localStorage
      const nineQData = JSON.parse(localStorage.getItem("9qAnswers") || "{}");
      const eightQData = JSON.parse(localStorage.getItem("8qAnswers") || "{}");

      // ดึงค่า totalScore ถ้ามี
      if (nineQData.totalScore !== undefined) {
        setNineQScore(nineQData.totalScore);
      }
      // ถ้าไม่มี totalScore ให้คำนวณจาก answers
      else if (nineQData.answers) {
        const score = Object.values(nineQData.answers).reduce(
          (sum, val) => sum + val,
          0
        );
        setNineQScore(score);
      }

      // ดึงค่า totalScore ของ 8Q
      if (eightQData.totalScore !== undefined) {
        setEightQScore(eightQData.totalScore);
      }
    } catch (error) {
      console.error("Error parsing data:", error);
      setNineQScore(0);
      setEightQScore(0);
    }
  }, []);

  const getNineQSeverity = (score) => {
    if (score <= 6)
      return { text: "ไม่มีอาการของโรคซึมเศร้าหรือมีน้อยมาก", class: "low" };
    if (score <= 12)
      return { text: "มีอาการของโรคซึมเศร้า ระดับน้อย", class: "low" };
    if (score <= 18)
      return { text: "มีอาการของโรคซึมเศร้า ระดับปานกลาง", class: "medium" };
    return { text: "มีอาการของโรคซึมเศร้า ระดับรุนแรง", class: "high" };
  };

  const getEightQSeverity = (score) => {
    if (score === 0)
      return { text: "ไม่มีแนวโน้มจะฆ่าตัวตายในปัจจุบัน", class: "low" };
    if (score <= 8)
      return { text: "มีแนวโน้มจะฆ่าตัวตายในปัจจุบันระดับน้อย", class: "low" };
    if (score <= 16)
      return {
        text: "มีแนวโน้มจะฆ่าตัวตายในปัจจุบันระดับปานกลาง",
        class: "medium",
      };
    return { text: "มีแนวโน้มจะฆ่าตัวตายในปัจจุบันระดับรุนแรง", class: "high" };
  };

  const nineQResult = getNineQSeverity(nineQScore);
  const eightQResult = getEightQSeverity(eightQScore);

  const getRecommendation = () => {
    if (eightQScore >= 17 || nineQScore >= 19) {
      return (
        <>
          <p>
            ท่านมีความเสี่ยงในระดับที่รุนแรง
            กรุณาติดต่อขอรับการปรึกษาจากผู้เชี่ยวชาญด้านสุขภาพจิตโดยด่วน
          </p>
        </>
      );
    }
    if (eightQScore >= 9 || nineQScore >= 13) {
      return <p>ควรพบผู้เชี่ยวชาญเพื่อประเมินอาการและให้การดูแลช่วยเหลือ</p>;
    }
    return (
      <>
        <p>คำแนะนำในการดูแลตนเอง:</p>
        <ul>
          <li>ทำกิจกรรมที่ทำให้ผ่อนคลาย</li>
          <li>พูดคุยกับคนที่ไว้ใจ</li>
          <li>ออกกำลังกายสม่ำเสมอ</li>
          <li>นอนหลับพักผ่อนให้เพียงพอ</li>
        </ul>
      </>
    );
  };

  return (
    <BaseResult title="ผลการประเมินภาวะซึมเศร้าและการฆ่าตัวตาย">
      <div className="result-box">
        <div className="result-header">ผลการประเมิน 9Q</div>
        <div className="result-content">
          <div className="score">{nineQScore} คะแนน</div>
          <div className={`severity ${nineQResult.class}`}>
            {nineQResult.text}
          </div>
        </div>
      </div>

      <div className="result-box">
        <div className="result-header">ผลการประเมิน 8Q</div>
        <div className="result-content">
          <div className="score">{eightQScore} คะแนน</div>
          <div className={`severity ${eightQResult.class}`}>
            {eightQResult.text}
          </div>
        </div>
      </div>

      <div className="description-section">
        <h3>คำแนะนำ</h3>
        <div className="description-item">{getRecommendation()}</div>
      </div>
    </BaseResult>
  );
};

export default QResult;
