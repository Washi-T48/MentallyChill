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

  const getNineQRecommendation = (score) => {
    if (score >= 19) {
      return "มีภาวะซึมเศร้าระดับรุนแรง – ควรพบแพทย์เพื่อประเมินอาการและให้การรักษา ระหว่างนี้ควรพักผ่อนให้เพียงพอ นอนหลับให้ได้ 6 – 8 ชั่วโมง ออกกำลังกายเบา ๆ ทำกิจกรรมที่ทำให้ผ่อนคลาย ไม่เก็บตัว และควรขอคำปรึกษาช่วยเหลือจากผู้เชี่ยวชาญหรือคนใกล้ชิด";
    } else if (score >= 13 && score <= 18) {
      return "มีภาวะซึมเศร้าระดับปานกลาง - ควรพักผ่อนให้เพียงพอ นอนหลับให้ได้ 6 – 8 ชั่วโมง ออกกำลังกายสม่ำเสมอ ทำกิจกรรมที่ทำให้ผ่อนคลาย พบปะเพื่อน ควรขอคำปรึกษาช่วยเหลือจากผู้ที่ไว้วางใจ ไม่จมอยู่กับปัญหา มองหาหนทางคลี่คลาย หากอาการที่ท่านเป็นผลกระทบต่อการทำงานหรือการเข้าสังคม เช่น ทำให้ท่านมีปัญหาในการทำงาน การดูแลสิ่งต่าง ๆ ในบ้าน หรือการเข้ากับผู้คนในระดับมากถึงมากที่สุด หรือหากว่าท่านมีอาการระดับนี้มานาน 1 – 2 สัปดาห์แล้วยังไม่ดีขึ้น ควรพบแพทย์เพื่อรับการช่วยเหลือหรือรักษาต่อไป";
    } else if (score >= 7 && score <= 12) {
      return "มีภาวะซึมเศร้าระดับเล็กน้อย – ควรพักผ่อนให้เพียงพอ นอนหลับให้ได้ 6 – 8 ชั่วโมง ออกกำลังกายสม่ำเสมอ ทำกิจกรรมที่ทำให้ผ่อนคลาย พบปะเพื่อน และควรทำแบบประเมินอีกครั้งใน 1 สัปดาห์";
    } else {
      return "ไม่มีภาวะซึมเศร้า - ควรรักษาสุขภาพจิตที่ดีต่อไป และหมั่นทำกิจกรรมที่สร้างความผ่อนคลายอย่างสม่ำเสมอ";
    }
  };

  const getEightQRecommendation = (score) => {
    if (score >= 17) {
      return "มีแนวโน้มจะฆ่าตัวตายในปัจจุบันระดับรุนแรง ควรได้รับการประเมินและดูแลเร่งด่วนจากผู้เชี่ยวชาญด้านสุขภาพจิต";
    } else if (score >= 9 && score <= 16) {
      return "มีแนวโน้มจะฆ่าตัวตายในปัจจุบันระดับปานกลาง ควรได้รับการประเมินและดูแลช่วยเหลือจากผู้เชี่ยวชาญด้านสุขภาพจิต";
    } else if (score >= 1 && score <= 8) {
      return "มีแนวโน้มจะฆ่าตัวตายในปัจจุบันระดับน้อย ควรได้รับการติดตามอาการและระวังสัญญาณเตือนต่างๆ";
    } else {
      return "ไม่มีแนวโน้มจะฆ่าตัวตายในปัจจุบัน";
    }
  };

  const getCombinedRecommendation = () => {
    const nineQRecommendation = getNineQRecommendation(nineQScore);
    const eightQRecommendation = getEightQRecommendation(eightQScore);

    // ถ้ามีความเสี่ยงสูงจากการฆ่าตัวตาย ให้แสดงคำเตือนหลัก
    if (eightQScore >= 17) {
      return (
        <div
          className="alert-box"
          style={{
            backgroundColor: "#ffebee",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "15px",
            borderLeft: "5px solid #d32f2f",
          }}
        >
          <h4 style={{ color: "#d32f2f", marginTop: 0 }}>
            คำเตือน - ต้องการความช่วยเหลือเร่งด่วน
          </h4>
          <p>
            ผลการประเมินพบความเสี่ยงต่อการฆ่าตัวตายในระดับที่ต้องได้รับการดูแลจากผู้เชี่ยวชาญ
            กรุณานัดหมายพบเจ้าหน้าที่หรือติดต่อสายด่วนสุขภาพจิต 1323
            โดยเร็วที่สุด
          </p>
        </div>
      );
    }

    return (
      <>
        <div
          className="recommendation-section"
          style={{ marginBottom: "15px" }}
        >
          <h4>ผลการประเมินภาวะซึมเศร้า (9Q)</h4>
          <p>{nineQRecommendation}</p>
        </div>

        <div className="recommendation-section">
          <h4>ผลการประเมินการฆ่าตัวตาย (8Q)</h4>
          <p>{eightQRecommendation}</p>
        </div>

        {(nineQScore >= 7 || eightQScore >= 1) && (
          <div
            className="self-care-tips"
            style={{
              marginTop: "20px",
              backgroundColor: "#f5f5f5",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                textAlign: "center",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              คำแนะนำในการดูแลตนเอง
            </h3>
            <ul style={{ paddingLeft: "20px", marginBottom: 0 }}>
              <li>พักผ่อนให้เพียงพอ นอนหลับให้ได้ 6-8 ชั่วโมง</li>
              <li>ออกกำลังกายสม่ำเสมอ อย่างน้อยวันละ 30 นาที</li>
              <li>ทำกิจกรรมที่ทำให้ผ่อนคลาย เช่น ฟังเพลง อ่านหนังสือ</li>
              <li>พูดคุยกับคนที่ไว้ใจ ไม่เก็บตัว</li>
              <li>ไม่จมอยู่กับปัญหา มองหาหนทางคลี่คลาย</li>
              <li>หากอาการไม่ดีขึ้นหรือแย่ลง ควรพบแพทย์หรือผู้เชี่ยวชาญ</li>
            </ul>
          </div>
        )}
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

      <div className="description-section" style={{ whiteSpace: "pre-line" }}>
        <h3
          style={{
            marginBottom: "10px",
            color: "#333",
            textAlign: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          สรุปผลการประเมิน
        </h3>
        <div className="description-item">{getCombinedRecommendation()}</div>
      </div>
    </BaseResult>
  );
};

export default QResult;
