import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/logo";
import CustomRadioGroup from "../../components/RadioGroup";
import "../p1_dass21.css";

const TOTAL_QUESTIONS = 10;

const styles = {
  questionContainer: {
    marginBottom: "2rem",
  },
  questionLabel: {
    display: "block",
    marginBottom: "1rem",
    fontSize: "1rem",
    lineHeight: "1.5",
  },
};

export default function RQFormP1() {
  const [selectedValues, setSelectedValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedValues = JSON.parse(localStorage.getItem("rqValues") || "{}");
    const updatedValues = { ...storedValues, ...selectedValues };
    localStorage.setItem("rqValues", JSON.stringify(updatedValues));
  }, [selectedValues]);

  const handleRadioChange = (questionNumber, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [questionNumber]: parseInt(value),
    }));
  };

  const areAllQuestionsAnswered = () => {
    return Object.keys(selectedValues).length === TOTAL_QUESTIONS;
  };

  const handleNextClick = (event) => {
    if (!areAllQuestionsAnswered()) {
      toast.error("โปรดตอบคำถามให้ครบทุกข้อ!", {
        position: "top-right",
        hideProgressBar: true,
        height: "100%",
        style: {
          fontSize: "16px",
          fontFamily: "ChulabhornLikitText-Regular",
        },
      });
      event.preventDefault();
    } else {
      navigate("/rq/2");
    }
  };

  return (
    <div>
      <Logo />
      <div className="p1_dass21-content">
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;ข้อคำถามในแบบประเมินมีจำนวน 20 ข้อ
          เป็นการสอบถามถึงความคิด ความรู้สึก และพฤติกรรมของท่านเอง ในรอบ 3
          เดือนที่ผ่านมา ขอให้ท่านเลือกคำตอบที่ตรงกับความเป็นจริงที่มากที่สุด
          <br />
        </span>
        <p>
          เกณฑ์การให้คะแนน
          <br />
          1 = ไม่จริง
          <br />
          2 = จริงบางครั้ง
          <br />
          3 = ค่อนข้างจริง
          <br />4 = จริงมาก
        </p>
        <form className="dass21-1">
          {[...Array(TOTAL_QUESTIONS)].map((_, i) => (
            <div key={i} style={styles.questionContainer}>
              <label style={styles.questionLabel}>
                {`${i + 1}. ${getQuestionText(i + 1)}`}
              </label>
              <CustomRadioGroup
                questionNumber={i + 1}
                selectedValue={selectedValues[i + 1]}
                onChange={handleRadioChange}
                options={[1, 2, 3, 4]}
              />
            </div>
          ))}
        </form>
        <div className="p1_dass21-footer">
          <button className="btn btn-next" onClick={handleNextClick}>
            ต่อไป
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const getQuestionText = (questionNumber) => {
  const questions = {
    1: "เรื่องไม่สบายใจเล็กน้อยทำให้ฉันว้าวุ่นใจ นั่งไม่ติด",
    2: "ฉันไม่ใส่ใจคนที่หัวเราะเยาะฉัน",
    3: "เมื่อฉันทำผิดพลาดหรือเสียหาย ฉันยอมรับผิดหรือผลที่ตามมา",
    4: "ฉันเคยยอมทนลำบากเพื่ออนาคตที่ดีขึ้น",
    5: "เวลาทุกข์ใจมาก ๆ ฉันเจ็บป่วยไม่สบาย",
    6: "ฉันสอนและเตือนตัวเอง",
    7: "ความยากลำบากทำให้ฉันแกร่งขึ้น",
    8: "ฉันไม่จดจำเรื่องเลวร้าวในอดีต",
    9: "ถึงแม้ปัญหาจะหนักหนาเพียงใด ชีวิตฉันก็ไม่เลวร้ายไปหมด",
    10: "เมื่อมีเรื่องหนักใจ ฉันมีคนปรับทุกข์ด้วย",
  };
  return questions[questionNumber];
};
