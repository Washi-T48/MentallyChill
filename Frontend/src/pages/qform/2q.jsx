import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Logo from "../../components/logo";
import Loading from "../../components/Loading";

import "./2q.css";

const VITE_API_PATH = import.meta.env.VITE_API_PATH;

const TwoQForm = () => {
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
  });
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUid = localStorage.getItem("uid");
    if (storedUid) {
      setUid(storedUid);
    }
  }, []);

  const handleRadioChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value === "true",
    }));
  };

  const handleSubmit = async () => {
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

    try {
      setIsLoading(true);

      const payload = {
        uid,
        ...answers,
      };

      await axios.post(`${VITE_API_PATH}/submitForms`, {
        uid: uid,
        forms_type: "2q",
        result: JSON.stringify(payload),
      });

      localStorage.setItem("2qAnswers", JSON.stringify(answers));

      // Navigate based on answers
      if (answers.q1 || answers.q2) {
        navigate("/2q-9q/1");
      } else {
        navigate("/2q/result");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("เกิดข้อผิดพลาดในการส่งข้อมูล โปรดลองอีกครั้งภายหลัง", {
        position: "top-right",
        hideProgressBar: true,
        style: {
          fontSize: "16px",
          fontFamily: "ChulabhornLikitText-Regular",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
                  checked={answers.q1 === true}
                  onChange={(e) => handleRadioChange("q1", e.target.value)}
                />
                <span>มี</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="q1"
                  value="false"
                  checked={answers.q1 === false}
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
                  checked={answers.q2 === true}
                  onChange={(e) => handleRadioChange("q2", e.target.value)}
                />
                <span>มี</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="q2"
                  value="false"
                  checked={answers.q2 === false}
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
