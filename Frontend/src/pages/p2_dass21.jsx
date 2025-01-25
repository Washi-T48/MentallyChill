import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import Logo from "../components/logo";
import Radio_rate from "../components/radio_rate";

import "./p2_dass21.css";

const QUESTIONS_RANGE = [8, 9, 10, 11, 12, 13, 14];
const CATEGORY_MAPPING = {
  8: "s",
  9: "a",
  10: "d",
  11: "s",
  12: "s",
  13: "d",
  14: "s",
};

export default function P2_dass21() {
  const [selectedValues, setSelectedValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedValues = localStorage.getItem("selectedValues");
    if (storedValues) {
      setSelectedValues(JSON.parse(storedValues));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedValues", JSON.stringify(selectedValues));
  }, [selectedValues]);

  const handleRadioChange = (questionNumber, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [questionNumber]: value,
    }));
    /* console.log(`Question ${questionNumber}:`, value); */
  };

  const areAllQuestionsAnswered = () => {
    return QUESTIONS_RANGE.every((question) =>
      selectedValues.hasOwnProperty(question)
    );
  };

  const calculateScores = () => {
    const previousScores = JSON.parse(localStorage.getItem("dass21Scores")) || {
      d: 0,
      a: 0,
      s: 0,
    };
    const updatedScores = Object.entries(selectedValues).reduce(
      (scores, [question, value]) => {
        const category = CATEGORY_MAPPING[question];
        if (category) {
          scores[category] += parseInt(value, 10);
        }
        return scores;
      },
      { ...previousScores }
    );
    return updatedScores;
  };

  const handleNextClick = (event) => {
    if (!areAllQuestionsAnswered()) {
      toast.error("โปรดตอบคำถามให้ครบทุกข้อ!", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 5000,
        style: {
          fontSize: "16px",
          fontFamily: "ChulabhornLikitText-Regular",
        },
      });
      event.preventDefault();
    } else {
      const scores = calculateScores();
      console.log(scores);
      localStorage.setItem("dass21Scores", JSON.stringify(scores));
      navigate("/dass-21/3");
    }
  };

  return (
    <div>
      <Logo />
      <div className="p2_dass21-content">
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;โปรดอ่านแต่ละข้อความและเลือกตัวเลข 0, 1, 2
          หรือ 3 ซึ่งระบุว่าค่าดังกล่าวนั้นตรงกับคุณมากแค่ไหน
          ในช่วงสัปดาห์ที่ผ่านมา ไม่มีคำตอบที่ถูกหรือผิด
          อย่าใช้เวลามากเกินไปกับข้อความใด ๆ<br />
        </span>
        <p>
          เกณฑ์การให้คะแนน
          <br />
          0 หมายถึง ไม่ตรงกับข้าพเจ้าเลย
          <br />
          1 หมายถึง ตรงกับข้าพเจ้าบ้าง หรือเกิดขึ้นเป็นบางครั้ง
          <br />
          2 หมายถึง ตรงกับข้าพเจ้า หรือเกิดขึ้นบ่อย
          <br />
          3 หมายถึง ตรงกับข้าพเจ้าอย่างมาก หรือเกิดขึ้นบ่อยมากที่สุด
          <br />
        </p>
        <form className="dass21-2">
          {QUESTIONS_RANGE.map((questionNumber) => (
            <div key={questionNumber}>
              <label>{`${questionNumber}. ${getQuestionText(
                questionNumber
              )}`}</label>
              <Radio_rate
                questionNumber={questionNumber}
                selectedValue={selectedValues[questionNumber]}
                onRadioChange={handleRadioChange}
              />
              <br />
            </div>
          ))}
        </form>
        <div className="p2_dass21-footer">
          <button className="btn btn-prev" onClick={() => navigate(-1)}>
            ย้อนกลับ
          </button>
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
    8: "ฉันรู้สึกว่าฉันใช้พลังงานที่มาจากอารมณ์โมโหหรือหงุดหงิด (s)",
    9: "ฉันกังวลเกี่ยวกับสถานการณ์ที่ฉันอาจตื่นตระหนกและทำให้ตนเองรู้สึกงี่เง่า (a)",
    10: "ฉันรู้สึกว่าฉันไม่มีความหวังในวันข้างหน้า (d)",
    11: "ฉันพบว่าตัวเองเริ่มกระสับกระส่าย (s)",
    12: "ฉันพบว่ามันยากที่จะผ่อนคลาย (s)",
    13: "ฉันรู้สึกท้อแท้และเศร้า (d)",
    14: "ฉันรู้สึกไม่อดทนต่อสิ่งใด ๆ ที่ขัดขวางสิ่งที่ฉันอยากจะทำ (s)",
  };
  return questions[questionNumber];
};
