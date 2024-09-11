import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import Logo from "../components/logo";
import Radio_rate from "../components/radio_rate";

import "./p1_dass21.css";

const TOTAL_QUESTIONS = 7;
const CATEGORY_MAPPING = {
  1: "s",
  2: "a",
  3: "d",
  4: "a",
  5: "d",
  6: "s",
  7: "a",
};

export default function P1_dass21() {
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
    return Object.keys(selectedValues).length === TOTAL_QUESTIONS;
  };

  const calculateScores = () => {
    return Object.entries(selectedValues).reduce(
      (scores, [question, value]) => {
        const category = CATEGORY_MAPPING[question];
        scores[category] += parseInt(value, 10);
        return scores;
      },
      { d: 0, a: 0, s: 0 }
    );
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
      const scores = calculateScores();
      console.log(scores);
      localStorage.setItem("dass21Scores", JSON.stringify(scores));
      navigate("/p2_dass21");
    }
  };

  return (
    <div>
      <Logo />
      <div className="p1_dass21-content">
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
        <form className="dass21-1">
          {[...Array(TOTAL_QUESTIONS)].map((_, i) => (
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
    1: "ฉันรู้สึกยากที่จะสงบจิตใจลงได้ (s)",
    2: "ฉันรู้ตัวว่าปากแห้ง (a)",
    3: "ฉันดูเหมือนจะไม่มีความรู้สึกดีๆ เลย (d)",
    4: "ฉันมีอาการหายใจลำบาก (เช่น หายใจเร็วเกินไป หายใจไม่ออก ในกรณีที่ไม่ได้ออกกําลังกาย) (a)",
    5: "ฉันพบว่ามันยากที่จะคิดริเริ่มที่จะทำสิ่งต่าง ๆ (d)",
    6: "ฉันมักจะตอบสนองต่อสถานการณ์มากเกินไป (s)",
    7: "ฉันมีอาการสั่น (เช่น มือสั่น) (a)",
  };
  return questions[questionNumber];
};
