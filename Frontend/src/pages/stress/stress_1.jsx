import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/logo";
import Radio_rate from "../../components/radio_rate";
import "../p1_dass21.css";
import "./stress_1.css";

const QUESTIONS_PER_PAGE = 10;
const TOTAL_QUESTIONS = 20;

export default function StressFormP1() {
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
    const answeredQuestions = Object.keys(selectedValues).length;
    return answeredQuestions >= QUESTIONS_PER_PAGE;
  };

  const calculateTotalScore = () => {
    return Object.values(selectedValues).reduce(
      (sum, value) => sum + parseInt(value, 10),
      0
    );
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
      const firstPageScore = calculateTotalScore();
      localStorage.setItem("stressFirstPageScore", firstPageScore.toString());
      navigate("/stress/2");
    }
  };

  return (
    <div>
      <Logo />

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
            <div key={i}>
              <label>{`${i + 1}. ${getQuestionText(i + 1)}`}</label>
              <Radio_rate
                questionNumber={i + 1}
                selectedValue={selectedValues[i + 1]}
                onRadioChange={handleRadioChange}
              />
              <br />
            </div>
          ))}
        </form>
        <div className="p1_dass21-footer">
          <button className="btn btn-next" onClick={handleNextClick}>
            ถัดไป
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const getQuestionText = (questionNumber) => {
  const questions = {
    1: "นอนไม่หลับเพราะคิดมากหรือกังวลใจ",
    2: "รู้สึกหงุดหงิด รำคาญใจ",
    3: "ทำอะไรไม่ได้เลยเพราะประสาทตึงเครียด",
    4: "มีความวุ่นวายใจ",
    5: "ไม่อยากพบปะผู้คน",
    6: "ปวดหัวข้างเดียวหรือปวดบริเวณขมับทั้ง 2 ข้าง",
    7: "รู้สึกไม่มีความสุขและเศร้าหมอง",
    8: "รู้สึกหมดหวังในชีวิต",
    9: "รู้สึกว่าชีวิตตนเองไม่มีคุณค่า",
    10: "กระวนกระวายอยู่ตลอดเวลา",
  };
  return questions[questionNumber];
};
