import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../components/logo";

import "./9q.css";

const QUESTIONS = {
  1: "เบื่อ ไม่สนใจอยากทำอะไร",
  2: "ไม่สบายใจ ซึมเศร้า ท้อแท้",
  3: "หลับยาก หรือหลับๆ ตื่นๆ หรือหลับมากไป",
  4: "เหนื่อยง่ายหรือไม่ค่อยมีแรง",
  5: "เบื่ออาหารหรือกินมากเกินไป",
  6: "รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลวหรือทำให้ครอบครัวผิดหวัง",
  7: "สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ",
  8: "พูดช้า ทำอะไรช้าลงจนคนอื่นสังเกตเห็นได้ หรือกระสับกระส่ายไม่สามารถอยู่นิ่งได้เหมือนที่เคยเป็น",
  9: "คิดทำร้ายตัวเอง หรือคิดว่าตายไปคงจะดีกว่า",
};

const NineQForm = () => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleRadioChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: parseInt(value),
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== 9) {
      toast.error("โปรดตอบคำถามให้ครบทุกข้อ!", {
        position: "top-right",
        hideProgressBar: true,
        style: {
          fontSize: "16px",
          fontFamily: "ChulabhornLikitText-Regular",
        },
      });
      return;
    }

    localStorage.setItem("9qAnswers", JSON.stringify(answers));
    navigate("/2q-9q-8q/1");
  };

  return (
    <div>
      <Logo />
      <div className="p1_dass21-content">
        <span>
          ในช่วง 2 สัปดาห์ที่ผ่านมารวมถึงวันนี้ ท่านมีอาการเหล่านี้บ่อยแค่ไหน
        </span>

        <p>
          เกณฑ์การให้คะแนน
          <br />
          0 หมายถึง ไม่มีเลย
          <br />
          1 หมายถึง เป็นบางวัน
          <br />
          2 หมายถึง เป็นบ่อย (มากกว่า 1 สัปดาห์)
          <br />3 หมายถึง เป็นทุกวัน
        </p>

        <form className="dass21-1">
          {Object.entries(QUESTIONS).map(([number, question]) => (
            <div key={number} className="question-container">
              <label>
                {number}. {question}
              </label>
              <div className="radio-group">
                {[0, 1, 2, 3].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name={`q${number}`}
                      value={value}
                      onChange={(e) =>
                        handleRadioChange(number, e.target.value)
                      }
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </form>

        <div className="p1_dass21-footer">
          <button className="btn btn-next" onClick={handleSubmit}>
            ต่อไป
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NineQForm;
