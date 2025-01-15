import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo";
import Radio_rate from "../../components/radio_rate";
import "../p1_dass21.css";
import "../p3_dass21.css";

const QUESTIONS_PER_PAGE = 10;
const TOTAL_QUESTIONS = 20;

export default function StressFormP2() {
  const [selectedValues, setSelectedValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedValues = localStorage.getItem("stressValues");
    if (storedValues) {
      setSelectedValues(JSON.parse(storedValues));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stressValues", JSON.stringify(selectedValues));
  }, [selectedValues]);

  const handleRadioChange = (questionNumber, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [questionNumber]: value,
    }));
  };

  const areAllQuestionsAnswered = () => {
    const answeredQuestions = Object.keys(selectedValues).filter(
      (key) => parseInt(key) > 10
    ).length;
    return answeredQuestions >= QUESTIONS_PER_PAGE;
  };

  const calculateFinalScore = () => {
    // Get first page score from localStorage
    const firstPageScore = parseInt(
      localStorage.getItem("stressFirstPageScore") || "0",
      10
    );

    // Calculate second page score
    const secondPageScore = Object.keys(selectedValues)
      .filter((key) => parseInt(key) > 10) // Only questions 11-20
      .reduce((sum, key) => sum + parseInt(selectedValues[key], 10), 0);

    // Return total score
    return firstPageScore + secondPageScore;
  };

  const handleNextClick = (event) => {
    if (!areAllQuestionsAnswered()) {
      toast.error("โปรดตอบคำถามให้ครบทุกข้อ!", {
        position: "top-right",
        hideProgressBar: true,
        style: {
          fontSize: "16px",
          fontFamily: "ChulabhornLikitText-Regular",
        },
      });
      event.preventDefault();
    } else {
      const totalScore = calculateFinalScore();
      localStorage.setItem("stressScore", totalScore.toString());
      navigate("/stress/result");
    }
  };

  return (
    <div>
      <Logo />
      <div className="progress-indicator">
        <div className="progress-step completed">หน้า 1/2</div>
        <div className="progress-step active">หน้า 2/2</div>
      </div>
      <div className="p1_dass21-content">
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;โปรดเลือกช่องแสดงระดับอาการที่เกิดขึ้นกับตัวท่านตามความเป็นจริงมากที่สุด
          ว่าในระยะ 2 เดือนที่ผ่านมานี้ ท่านมีอาการ พฤติกรรม
          หรือความรู้สึกต่อไปนี้มากน้อยเพียงใด
        </span>
        <p>
          เกณฑ์การให้คะแนน
          <br />
          0 หมายถึง ไม่เคยเลย
          <br />
          1 หมายถึง เป็นครั้งคราว
          <br />
          2 หมายถึง เป็นบ่อย
          <br />3 หมายถึง เป็นประจำ
        </p>
        <form className="dass21-1">
          {[...Array(QUESTIONS_PER_PAGE)].map((_, i) => (
            <div key={i} className="question-item">
              <label>{`${i + 11}. ${getQuestionText(i + 11)}`}</label>
              <Radio_rate
                questionNumber={i + 11}
                selectedValue={selectedValues[i + 11]}
                onRadioChange={handleRadioChange}
              />
            </div>
          ))}
        </form>
        <div className="p3_dass21-footer">
          <button className="btn btn-prev" onClick={() => navigate(-1)}>
            ย้อนกลับ
          </button>
          <button className="btn btn-next" onClick={handleNextClick}>
            ส่ง
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const getQuestionText = (questionNumber) => {
  const questions = {
    11: "รู้สึกว่าตนเองไม่มีสมาธิ",
    12: "รู้สึกเพลียจนไม่มีแรงจะทำอะไร",
    13: "รู้สึกเหนื่อยหน่ายไม่อยากทำอะไร",
    14: "มีอาการหัวใจเต้นแรง",
    15: "เสียงสั่น ปากสั่น หรือมือสั่นเวลาไม่พอใจ",
    16: "รู้สึกกลัวผิดพลาดในการทำสิ่งต่างๆ",
    17: "ปวดหรือเกร็งกล้ามเนื้อบริเวณท้ายทอย หลัง หรือไหล่",
    18: "ตื่นเต้นง่ายกับเหตุการณ์ที่ไม่คุ้นเคย",
    19: "มึนงงหรือเวียนศีรษะ",
    20: "มีความสุขทางเพศลดลง",
  };
  return questions[questionNumber];
};
