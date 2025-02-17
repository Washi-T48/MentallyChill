import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/logo";
import CustomRadioGroup from "../../components/RadioGroup";
import "../p1_dass21.css";

const TOTAL_QUESTIONS = 11;

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

export default function BurnOutFormP1() {
  const [selectedValues, setSelectedValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedValues = JSON.parse(
      localStorage.getItem("burnoutValues") || "{}"
    );
    const updatedValues = { ...storedValues, ...selectedValues };
    localStorage.setItem("burnoutValues", JSON.stringify(updatedValues));
  }, [selectedValues]);

  useEffect(() => {
    localStorage.setItem("burnoutValues", JSON.stringify(selectedValues));
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

  const calculateScores = (values) => {
    const emotionalExhaustion = [1, 2, 3, 6, 8, 13, 14, 16, 20];
    const depersonalization = [5, 10, 11, 15, 22];
    const personalAchievement = [4, 7, 9, 12, 17, 18, 19, 21];

    const emotionalScore = emotionalExhaustion.reduce(
      (sum, q) => sum + (values[q] || 0),
      0
    );
    const depersonalizationScore = depersonalization.reduce(
      (sum, q) => sum + (values[q] || 0),
      0
    );
    const personalAchievementScore = personalAchievement.reduce(
      (sum, q) => sum + (values[q] || 0),
      0
    );

    console.log(`ความอ่อนล้าทางอารมณ์: ${emotionalScore}`);
    console.log(`การลดความเป็นบุคคล: ${depersonalizationScore}`);
    console.log(`ความสำเร็จส่วนบุคคล: ${personalAchievementScore}`);
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
      calculateScores(selectedValues);
      navigate("/burnout/2");
    }
  };

  return (
    <div>
      <Logo />
      <div className="p1_dass21-content">
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;โปรดอ่านแต่ละข้อความ แต่ละข้อให้เข้าใจ
          และตัดสินใจว่าท่านเคยมีความรู้สึกเช่นนี้กับการทำงานของท่าน
          และทำการเลือกลงในช่องที่ตรงกับความรู้สึกของท่านมากที่สุดเพียงคำตอบเดียว
          <br />
        </span>
        <p>
          เกณฑ์การให้คะแนน
          <br />
          0 = ไม่เคยมีความรู้สึกเช่นนั้นเลย
          <br />
          1 = ปีละ 2-3 ครั้ง
          <br />
          2 = เดือนละ 1 ครั้ง
          <br />
          3 = เดือนละ 2-3 ครั้ง
          <br />
          4 = สัปดาห์ละ 1 ครั้ง
          <br />
          5 = สัปดาห์ละ 2-3 ครั้ง
          <br />6 = ทุก ๆ วัน
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
    1: "ฉันรู้สึกห่อเหี่ยวจิตใจกับงานที่ทำอยู่",
    2: "ฉันจะรู้สึกหมดหวังเมื่อถึงเวลาเลิกงาน",
    3: "ฉันรู้สึกอ่อนเพลียตอนตื่นนอนและตอนเข้างาน",
    4: "ฉันสามารถเข้าใจความรู้สึกนึกคิดของผู้อื่นได้โดยง่าย",
    5: "ฉันปฏิบัติต่อผู้ร่วมงาน / ผู้รับบริการราวกับเขาไม่มีชีวิตจิตใจ",
    6: "การทำงานบริการผู้อื่นตลอดทั้งวันทำให้ฉันรู้สึกเครียด",
    7: "ฉันรู้สึกว่าตนเองสามารถแก้ไขปัญหาต่าง ๆ ให้ผู้อื่นได้อย่างมีประสิทธิภาพ",
    8: "ฉันรู้สึกเหนื่อยหน่ายกับงานที่ทำอยู่",
    9: "ฉันรู้สึกว่าได้ทำให้เกิดการเปลี่ยนแปลงที่ดีขึ้นในชีวิตของผู้ร่วมงาน / ผู้รับบริการ จากการทำงานของฉัน",
    10: "ฉันกลายเป็นคนแข็งกระด้างตั้งแต่เริ่มทำงานนี้",
    11: "ฉันกังวลใจว่างานที่ทำอยู่ ทำให้ฉันเป็นคนเจ้าอารมณ์",
  };
  return questions[questionNumber];
};
