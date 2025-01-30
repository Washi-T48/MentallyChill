import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Logo from "../../components/logo";
import Loading from "../../components/Loading";

import "./9q.css";

const VITE_API_PATH = import.meta.env.VITE_API_PATH;

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
      [question]: parseInt(value),
    }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const handleSubmit = async () => {
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

    try {
      setIsLoading(true);

      const totalScore = calculateScore();
      const payload = {
        uid,
        answers,
        totalScore,
      };

      await axios.post(`${VITE_API_PATH}/submitForms`, {
        uid: uid,
        forms_type: "9q",
        result: JSON.stringify(payload),
      });

      localStorage.setItem(
        "9qAnswers",
        JSON.stringify({ answers, totalScore })
      );
      navigate("/2q-9q-8q/1");
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
