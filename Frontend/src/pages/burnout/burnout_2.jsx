import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../../components/logo";
import CustomRadioGroup from "../../components/RadioGroup";
import Loading from "../../components/Loading";
import "../p1_dass21.css";
import "../p3_dass21.css";

const QUESTIONS_RANGE = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

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

const VITE_API_PATH = import.meta.env.VITE_API_PATH;

export default function BurnOutFormP2() {
  const [selectedValues, setSelectedValues] = useState({});
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUid = localStorage.getItem("uid");
    if (storedUid) {
      setUid(storedUid);
    }
  }, []);

  useEffect(() => {
    const storedValues = JSON.parse(
      localStorage.getItem("burnoutValues") || "{}"
    );
    const updatedValues = { ...storedValues, ...selectedValues };
    localStorage.setItem("burnoutValues", JSON.stringify(updatedValues));
  }, [selectedValues]);

  const handleRadioChange = (questionNumber, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [questionNumber]: parseInt(value),
    }));
  };

  const areAllQuestionsAnswered = () => {
    return QUESTIONS_RANGE.every((question) =>
      selectedValues.hasOwnProperty(question)
    );
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

    return {
      emotionalScore,
      depersonalizationScore,
      personalAchievementScore,
    };
  };

  const handleNextClick = async (event) => {
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
      return;
    }

    try {
      setIsLoading(true);

      const storedValues = JSON.parse(
        localStorage.getItem("burnoutValues") || "{}"
      );
      const allValues = { ...storedValues, ...selectedValues };
      const scores = calculateScores(allValues);

      const payload = {
        uid,
        answers: allValues,
        scores,
      };

      await axios.post(`${VITE_API_PATH}/submitForms`, {
        uid: uid,
        forms_type: "burnout",
        result: JSON.stringify(payload),
      });

      localStorage.setItem("burnoutValues", JSON.stringify(allValues));
      localStorage.setItem("burnoutScores", JSON.stringify(scores));

      navigate("/burnout/result");
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
          {QUESTIONS_RANGE.map((questionNumber) => (
            <div key={questionNumber} style={styles.questionContainer}>
              <label style={styles.questionLabel}>
                {`${questionNumber}. ${getQuestionText(questionNumber)}`}
              </label>
              <CustomRadioGroup
                questionNumber={questionNumber}
                selectedValue={selectedValues[questionNumber]}
                onChange={handleRadioChange}
              />
            </div>
          ))}
        </form>
        <div className="p3_dass21-footer">
          <button className="btn btn-prev" onClick={() => navigate(-1)}>
            ย้อนกลับ
          </button>
          <button className="btn btn-next" onClick={handleNextClick}>
            ส่ง
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const getQuestionText = (questionNumber) => {
  const questions = {
    12: "ฉันรู้สึกเต็มเปี่ยมไปด้วยพละกำลัง",
    13: "ฉันรู้สึกคับข้องใจจากการทำงาน",
    14: "ฉันรู้สึกว่ากำลังทำงานในหน้าที่ที่หนักเกินไป",
    15: "ฉันรู้สึกไม่อยากใส่ใจต่อพฤติกรรมของผู้ร่วมงาน หรือผู้รับบริการบางคน",
    16: "การทำงานเกี่ยวข้องกับคนอื่นโดยตรงทำให้ฉันรู้สึกเครียดมากเกินไป",
    17: "ฉันสามารถสร้างบรรยากาศที่เป็นกันเองกับผู้ร่วมงาน หรือผู้รับบริการได้ไม่ยาก",
    18: "ฉันรู้สึกเป็นสุขภายหลังจากให้บริการแก่ผู้ร่วมงาน หรือผู้รับบริการอย่างใกล้ชิด",
    19: "ฉันรู้สึกว่าได้สร้างสิ่งที่มีคุณค่ามากให้กับงานที่ฉันทำอยู่",
    20: "ฉันรู้สึกหมดความอดทนกับงานที่ทำอยู่",
    21: "ในการทำงาน ฉันสามารถเผชิญปัญหาทางอารมณ์ได้อย่างสงบนิ่ง",
    22: "ฉันรู้สึกว่าที่ผู้ร่วมงาน หรือผู้รับบริการตำหนิฉันนั้น เป็นปัญหาของเขา",
  };
  return questions[questionNumber];
};
