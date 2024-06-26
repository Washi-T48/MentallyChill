import React, { useEffect, useState } from "react";
import Logo from "../components/logo";
import Radio_rate from "../components/radio_rate";
import "./p2_dass21.css";
import { Link, useNavigate } from "react-router-dom";
export default function P2_dass21() {
  const [selectedValues, setSelectedValues] = useState({});

  const navigate = useNavigate();

  const areAllQuestionsAnswered = () => {
    // Check if all questions have been answered
    const totalQuestions = 14; // Update this if you have more or fewer questions
    for (let i = 8; i <= totalQuestions; i++) {
      if (!selectedValues[i]) {
        return false;
      }
    }
    return true;
  };

  const calculateScores = () => {
    const categories = JSON.parse(localStorage.getItem("dass21Scores")) || {
      d: 0,
      a: 0,
      s: 0,
    };
    const categoryMapping = {
      8: "s",
      9: "a",
      10: "d",
      11: "s",
      12: "s",
      13: "d",
      14: "s",
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
      navigate("/p3_dass21");
    }
  };

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
          3 หมายถึง ตรงกับข้าพเจ้ามาก หรือเกิดขึ้นบ่อยมากที่สุด
          <br />
        </p>
        <form className="dass21-2">
          <br />
          <label>
            8.ฉันรู้สึกว่าฉันใช้พลังงานที่มาจากอารมณ์โมโหหรือหงุดหงิด (s)
          </label>
          <Radio_rate
            questionNumber={8}
            selectedValue={selectedValues[8]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>
            9.ฉันกังวลเกี่ยวกับสถานการณ์ที่ฉันอาจตื่นตระหนกและทำให้ตนเองรู้สึกงี่เง่า
            (a)
          </label>
          <Radio_rate
            questionNumber={9}
            selectedValue={selectedValues[9]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>10.ฉันรู้สึกว่าฉันไม่มีความหวังในวันข้างหน้า (d) </label>
          <Radio_rate
            questionNumber={10}
            selectedValue={selectedValues[10]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>11.ฉันพบว่าตัวเองเริ่มกระสับกระส่าย (s) </label>
          <Radio_rate
            questionNumber={11}
            selectedValue={selectedValues[11]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>12.ฉันพบว่ามันยากที่จะผ่อนคลาย (s)</label>
          <Radio_rate
            questionNumber={12}
            selectedValue={selectedValues[12]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>13.ฉันรู้สึกท้อแท้และเศร้า (d)</label>
          <Radio_rate
            questionNumber={13}
            selectedValue={selectedValues[13]}
            onRadioChange={handleRadioChange}
          />
          <br />
          <label>
            14. ฉันรู้สึกไม่อดทนต่อสิ่งใด ๆ ที่ขัดขวางสิ่งที่ฉันอยากจะทำ (s){" "}
          </label>
          <Radio_rate
            questionNumber={14}
            selectedValue={selectedValues[14]}
            onRadioChange={handleRadioChange}
          />
        </form>
        <div className="p2_dass21-footer">
          <button className="btn btn-prev" onClick={() => navigate(-1)}>
            Back
          </button>

          <button className="btn btn-next" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
