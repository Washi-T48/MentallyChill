import React, { useEffect, useState } from "react";
import { BaseResult } from "../../components/BaseResult";
import "./2q_result.css";

const TwoQResult = () => {
  const [answers, setAnswers] = useState({ q1: null, q2: null });

  useEffect(() => {
    const storedAnswers = localStorage.getItem("2qAnswers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  return (
    <BaseResult title="ผลการคัดกรองภาวะซึมเศร้า (2Q)">
      <div className="result-box">
        <div className="result-header">ผลการประเมิน</div>
        <div className="result-content">
          <div className="severity low">ไม่มีแนวโน้มภาวะซึมเศร้า</div>
        </div>
      </div>

      <div className="description-section">
        <h3>รายละเอียดผลการประเมิน</h3>
        <div className="description-item">
          <p>
            จากการประเมินพบว่าท่านไม่มีอาการของโรคซึมเศร้า
            ขอให้ท่านรักษาสุขภาพกายและสุขภาพจิตให้แข็งแรงด้วยการ
          </p>
          <ul>
            <li>รับประทานอาหารที่มีประโยชน์</li>
            <li>ออกกำลังกายสม่ำเสมอ</li>
            <li>พักผ่อนให้เพียงพอ</li>
            <li>ทำกิจกรรมที่ผ่อนคลายความเครียด</li>
            <li>พูดคุยปรึกษากับคนที่ไว้ใจเมื่อมีปัญหา</li>
          </ul>
        </div>
      </div>
    </BaseResult>
  );
};

export default TwoQResult;
