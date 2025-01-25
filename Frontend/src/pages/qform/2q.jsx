import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../components/logo";

import "./2q.css";

const TwoQForm = () => {
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
  });
  const navigate = useNavigate();

  const handleRadioChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value === "true",
    }));
  };

  const handleSubmit = () => {
    if (answers.q1 === null || answers.q2 === null) {
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

    localStorage.setItem("2qAnswers", JSON.stringify(answers));
    if (answers.q1 || answers.q2) {
      navigate("/2q-9q/1");
    } else {
      navigate("/2q/result");
    }
  };

  return (
    <div>
      <Logo />
      <div className="p1_dass21-content">
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;โปรดเลือกช่องที่ตรงกับความรู้สึกของตนเองในช่วง
          2 สัปดาห์ที่ผ่านมารวมถึงวันนี้
        </span>

        <form className="dass21-1">
          <div className="question-container">
            <p>
              1. ใน 2 สัปดาห์ที่ผ่านมารวมถึงวันนี้ "ท่านรู้สึกหดหู่ เศร้า
              หรือท้อแท้สิ้นหวังหรือไม่"
            </p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="q1"
                  value="true"
                  onChange={(e) => handleRadioChange("q1", e.target.value)}
                />
                <span>มี</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="q1"
                  value="false"
                  onChange={(e) => handleRadioChange("q1", e.target.value)}
                />
                <span>ไม่มี</span>
              </label>
            </div>
          </div>

          <div className="question-container">
            <p>
              2. ใน 2 สัปดาห์ที่ผ่านมารวมวันนี้ "ท่านรู้สึกเบื่อ
              ทำอะไรก็ไม่เพลิดเพลินหรือไม่"
            </p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="q2"
                  value="true"
                  onChange={(e) => handleRadioChange("q2", e.target.value)}
                />
                <span>มี</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="q2"
                  value="false"
                  onChange={(e) => handleRadioChange("q2", e.target.value)}
                />
                <span>ไม่มี</span>
              </label>
            </div>
          </div>
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

export default TwoQForm;
