import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../components/logo";
import Loading from "../../components/Loading";
import axios from "axios";

import "../p2_dass21.css";
import "./8q.css";

const QUESTIONS = {
  1: ["ช่วง 1 เดือนที่ผ่านมา", "คิดอยากตาย หรือคิดว่าตายไปจะดีกว่า"],
  2: ["ช่วง 1 เดือนที่ผ่านมา", "อยากทำร้ายตัวเอง หรือทำให้ตัวเองบาดเจ็บ"],
  3: ["ช่วง 1 เดือนที่ผ่านมา", "คิดเกี่ยวกับการฆ่าตัวตาย"],
  3.1: [
    "",
    "ท่านสามารถควบคุมความอยากฆ่าตัวตายที่ท่านคิดอยู่ได้หรือไม่ หรือบอกได้ไหมว่าคงจะไม่ทำตามความคิดนั้นในขณะนี้",
  ],
  4: ["ช่วง 1 เดือนที่ผ่านมา", "มีแผนการที่จะฆ่าตัวตาย"],
  5: [
    "ช่วง 1 เดือนที่ผ่านมา",
    "ได้เตรียมการที่จะทำร้ายตนเอง หรือเตรียมการจะฆ่าตัวตาย โดยตั้งใจว่าจะให้ตายจริง ๆ",
  ],
  6: [
    "ช่วง 1 เดือนที่ผ่านมา",
    "ได้ทำให้ตนเองบาดเจ็บ แต่ไม่ตั้งใจที่จะทำให้เสียชีวิต",
  ],
  7: [
    "ช่วง 1 เดือนที่ผ่านมา",
    "ได้พยายามฆ่าตัวตาย โดยคาดหวัง/ตั้งใจที่จะให้ตาย",
  ],
  8: ["ตลอดชีวิตที่ผ่านมา", "ท่านเคยพยายามฆ่าตัวตาย"],
};

const SCORES = {
  1: { true: 1, false: 0 },
  2: { true: 2, false: 0 },
  3: { true: 6, false: 0 },
  3.1: { true: 0, false: 8 },
  4: { true: 8, false: 0 },
  5: { true: 9, false: 0 },
  6: { true: 4, false: 0 },
  7: { true: 10, false: 0 },
  8: { true: 4, false: 0 },
};

const VITE_API_PATH = import.meta.env.VITE_API_PATH;

const EightQForm = () => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    const storedUid = localStorage.getItem("uid");
    if (storedUid) {
      setUid(storedUid);
    }
  }, []);

  const handleRadioChange = (question, value) => {
    const newAnswers = {
      ...answers,
      [question]: value === "true",
    };

    if (question === "3" && value === "false") {
      delete newAnswers["3.1"];
    }

    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const requiredQuestions = answers[3]
      ? ["1", "2", "3", "3.1", "4", "5", "6", "7", "8"]
      : ["1", "2", "3", "4", "5", "6", "7", "8"];

    const isComplete = requiredQuestions.every((q) => answers[q] !== undefined);

    if (!isComplete) {
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

      const totalScore = Object.entries(answers).reduce(
        (total, [question, answer]) => {
          return total + SCORES[question][answer.toString()];
        },
        0
      );

      const payload = {
        uid,
        answers,
        scores: totalScore,
      };

      await axios.post(`${VITE_API_PATH}/submitForms`, {
        uid: uid,
        forms_type: "8q",
        result: JSON.stringify(payload),
      });

      localStorage.setItem(
        "8qAnswers",
        JSON.stringify({ answers, totalScore })
      );
      navigate("/2q-9q-8q/result");
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
          &nbsp;&nbsp;&nbsp;&nbsp;โปรดเลือกช่องที่ตรงกับความรู้สึกของตนเองในช่วงเวลาแต่ละข้อคำถาม
        </span>
        <form className="dass21-1">
          {Object.entries(QUESTIONS).map(([number, [period, question]]) => {
            if (number === "3.1" && !answers["3"]) {
              return null;
            }

            return (
              <div key={number} className="question-container">
                <label>
                  {number.length === 1 ? `${number}. ${period}` : ""} {question}
                </label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name={`q${number}`}
                      value="true"
                      checked={answers[number] === true}
                      onChange={(e) =>
                        handleRadioChange(number, e.target.value)
                      }
                    />
                    <span>{number === "3.1" ? "ได้" : "มี"}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`q${number}`}
                      value="false"
                      checked={answers[number] === false}
                      onChange={(e) =>
                        handleRadioChange(number, e.target.value)
                      }
                    />
                    <span>{number === "3.1" ? "ไม่ได้" : "ไม่มี"}</span>
                  </label>
                </div>
              </div>
            );
          })}
        </form>

        <div className="p2_dass21-footer">
          <button className="btn btn-prev" onClick={() => navigate(-1)}>
            ย้อนกลับ
          </button>
          <button className="btn btn-next" onClick={handleSubmit}>
            ต่อไป
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EightQForm;
