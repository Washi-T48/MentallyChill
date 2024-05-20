import React, { useEffect, useState } from "react";
import Logo from "../components/logo";
import Radio_rate from "../components/radio_rate";
import "./p1_dass21.css";
import { useNavigate } from "react-router-dom";

export default function P1_dass21() {
  const [selectedValues, setSelectedValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve selected values from local storage when component mounts
    const storedValues = localStorage.getItem("selectedValues");
    if (storedValues) {
      setSelectedValues(JSON.parse(storedValues));
    }
  }, []);

  const handleRadioChange = (questionNumber, value) => {
    // Update selected values
    setSelectedValues({ ...selectedValues, [questionNumber]: value });
    console.log(`Question ${questionNumber}:`, value);
  };

  useEffect(() => {
    // Save selected values to local storage whenever it changes
    localStorage.setItem("selectedValues", JSON.stringify(selectedValues));
  }, [selectedValues]);

  const areAllQuestionsAnswered = () => {
    // Check if all questions have been answered
    const totalQuestions = 7; // Update this if you have more or fewer questions
    for (let i = 1; i <= totalQuestions; i++) {
      if (!selectedValues[i]) {
        return false;
      }
    }
    return true;
  };

  const calculateScores = () => {
    const categories = { d: 0, a: 0, s: 0 };
    const categoryMapping = {
      1: "s",
      2: "a",
      3: "d",
      4: "a",
      5: "d",
      6: "s",
      7: "a",
    };

    for (const [question, value] of Object.entries(selectedValues)) {
      const category = categoryMapping[question];
      if (category) {
        categories[category] += parseInt(value, 10);
      }
    }

    return categories;
  };

  const handleNextClick = (event) => {
    if (!areAllQuestionsAnswered()) {
      alert("Please answer all questions before proceeding.");
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
          <br />
          <label>1. ฉันพบว่ามันยากที่จะรู้สึกผ่อนคลาย (s)</label>
          <Radio_rate
            questionNumber={1}
            selectedValue={selectedValues[1]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>2. ฉันรู้ตัวว่าปากแห้ง (a)</label>
          <Radio_rate
            questionNumber={2}
            selectedValue={selectedValues[2]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>3. ฉันดูเหมือนจะไม่มีความรู้สึกดีๆ เลย (d)</label>
          <Radio_rate
            questionNumber={3}
            selectedValue={selectedValues[3]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>
            4. ฉันมีอาการหายใจลำบาก (เช่น หายใจเร็วเกินไป หายใจไม่ออก
            ในกรณีที่ไม่ได้ออกกําลังกาย) (a)
          </label>
          <Radio_rate
            questionNumber={4}
            selectedValue={selectedValues[4]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>5. ฉันพบว่ามันยากที่จะคิดริเริ่มที่จะทำสิ่งต่าง ๆ (d)</label>
          <Radio_rate
            questionNumber={5}
            selectedValue={selectedValues[5]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>6. ฉันมักจะตอบสนองต่อสถานการณ์มากเกินไป (s)</label>
          <Radio_rate
            questionNumber={6}
            selectedValue={selectedValues[6]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>7. ฉันมีอาการสั่น (เช่น มือสั่น) (a)</label>
          <Radio_rate
            questionNumber={7}
            selectedValue={selectedValues[7]}
            onRadioChange={handleRadioChange}
          />
        </form>
        <div className="p1_dass21-footer">
          <button className="btn btn-next" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
