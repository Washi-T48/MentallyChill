import React, { useState, useEffect } from "react";
import "./formOption2.css";
import Logo from "../components/logo";
import { useNavigate, useLocation } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import Loading from "../components/Loading";
import liff from "@line/liff";
import axios from "axios";

const getNextPage = (formType) => {
  switch (formType) {
    case "DASS-21":
      return "/dass-21/1";
    case "STRESS":
      return "/stress/1";
    case "2Q9Q8Q":
      return "/2q/1";
    case "BURNOUT":
      return "/burnout/1";
    case "RQ":
      return "/rq/1";
    default:
      return "/dass-21/1";
  }
};

export default function FormOption2() {
  const [step2Data, setStep2Data] = useState({
    uid: "",
    gender: "",
    age: "",
    year: "",
    email: "",
    tel: "",
    sos_tel: "",
    form_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get form_type from URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const formType = searchParams.get("form_type");
    if (formType) {
      setStep2Data((prev) => ({
        ...prev,
        form_type: formType,
      }));
    }
  }, [location]);

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setStep2Data((prevData) => ({
        ...prevData,
        uid: uid,
      }));
    } else {
      liff
        .init({ liffId: "2005311386-6GQLXp7Z" })
        .then(() => {
          if (liff.isLoggedIn()) {
            liff
              .getProfile()
              .then((profile) => {
                setStep2Data((prevData) => ({
                  ...prevData,
                  uid: profile.userId,
                }));
                localStorage.setItem("uid", profile.userId);
              })
              .catch((err) => {
                console.error("Error getting profile:", err);
                setError("Failed to get profile information.");
              });
          } else {
            liff.login();
          }
        })
        .catch((err) => {
          console.error("Error initializing LIFF:", err);
          setError("Failed to initialize LIFF. Please try again later.");
        });
    }
  }, []);

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setStep2Data((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const VITE_API_PATH = import.meta.env.VITE_API_PATH;
      const response = await axios.post(
        `${VITE_API_PATH}/user/register`,
        step2Data
      );

      const nextPage = getNextPage(step2Data.form_type);
      navigate(nextPage);
    } catch (error) {
      setError("เกิดข้อผิดพลาด โปรดลองอีกครั้งภายหลัง");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Logo />
      <div className="step-2">
        <h1>STEP 2 :</h1>
        <p>กรอกข้อมูลผู้ขอรับคำปรึกษาเบื้องต้น</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="form-fill">
        <form onSubmit={onSubmit}>
          <div className="form_uid">
            UID: <small>{step2Data.uid}</small>
            <br />
          </div>

          <div className="gender-age">
            <RxPerson className="ioperson" />
            <select
              className="gender"
              value={step2Data.gender}
              name="gender"
              onChange={onChange}
              required
              aria-label="Gender"
            >
              <option value="">เพศ</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>

            <input
              className="age"
              type="number"
              placeholder="อายุ"
              value={step2Data.age}
              name="age"
              onChange={onChange}
              required
              aria-label="Age"
            />
          </div>

          <div className="eduLevel">
            <label>ระดับการศึกษา</label>
            <select
              className="eduLevel"
              name="year"
              value={step2Data.year.split(" ")[0] || ""} // Get first part (education level)
              onChange={(e) => {
                setStep2Data((oldData) => ({
                  ...oldData,
                  year: e.target.value, // Reset year
                }));
              }}
              required
              aria-label="Education Level"
            >
              <option value="">เลือกระดับการศึกษา</option>
              <option value="มัธยมศึกษา">มัธยมศึกษา</option>
              <option value="อุดมศึกษา">อุดมศึกษา</option>
            </select>
          </div>

          {step2Data.year.startsWith("มัธยมศึกษา") && (
            <div className="secondaryLevel">
              <label>ระดับชั้น</label>
              <select
                className="secondaryLevel"
                name="year"
                value={step2Data.year.split(" ")[1] || ""} // Get second part (school year)
                onChange={(e) => {
                  setStep2Data((oldData) => ({
                    ...oldData,
                    year: `${oldData.year.split(" ")[0]} ${e.target.value}`, // Combine
                  }));
                }}
                required
                aria-label="Secondary School Level"
              >
                <option value="">เลือกระดับชั้น</option>
                <option value="ม.1">ม.1</option>
                <option value="ม.2">ม.2</option>
                <option value="ม.3">ม.3</option>
                <option value="ม.4">ม.4</option>
                <option value="ม.5">ม.5</option>
                <option value="ม.6">ม.6</option>
              </select>
            </div>
          )}

          {step2Data.year.startsWith("อุดมศึกษา") && (
            <div className="faculty">
              <label>คณะ</label>
              <select
                className="faculty"
                name="year"
                value={step2Data.year.split(" ")[1] || ""} // Get second part (faculty)
                onChange={(e) => {
                  setStep2Data((oldData) => ({
                    ...oldData,
                    year: `${oldData.year.split(" ")[0]} ${e.target.value}`, // Combine
                  }));
                }}
                required
                aria-label="Faculty"
              >
                <option value="">เลือกคณะ</option>
                <option value="พยาบาล">พยาบาล</option>
                <option value="เทคโนโลยีการแพทย์">เทคโนโลยีการแพทย์</option>
                <option value="แพทย์ศาสตร์">แพทย์ศาสตร์</option>
                <option value="วิศวกรรมศาสตร์">วิศวกรรมศาสตร์</option>
                <option value="ศึกษาศาสตร์">ศึกษาศาสตร์</option>
                <option value="วิทยาศาสตร์">วิทยาศาสตร์</option>
              </select>
            </div>
          )}

          {step2Data.year.split(" ")[1] === "พยาบาล" && (
            <div className="course">
              <label>เลือกหลักสูตร</label>
              <select
                className="course"
                name="year"
                value={step2Data.year.split(" ")[2] || ""} // Get third part
                onChange={(e) => {
                  setStep2Data((oldData) => ({
                    ...oldData,
                    year: `${oldData.year.split(" ")[0]} ${
                      oldData.year.split(" ")[1]
                    } ${e.target.value}`, // Combine
                  }));
                }}
                required
                aria-label="Course"
              >
                <option value="">เลือกหลักสูตร</option>
                <option value="พยาบาลศาสตร์">พยาบาลศาสตร์</option>
                <option value="ปริญญาตรีสาขาอื่น">ปริญญาตรีสาขาอื่น</option>
                <option value="นานาชาติ">นานาชาติ</option>
              </select>
            </div>
          )}

          <div className="email">
            <label>อีเมล </label>
            <input
              className="email"
              type="email"
              placeholder="example@gmail.com"
              value={step2Data.email}
              name="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              onChange={onChange}
              required
              aria-label="Email"
            />
          </div>

          <div className="tel">
            <label>เบอร์ติดต่อ </label>
            <input
              className="tel"
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              placeholder="0000000000"
              value={step2Data.tel}
              name="tel"
              onChange={onChange}
              required
              aria-label="Telephone"
            />
            <small>Ex: 0000000000</small>
          </div>

          <div className="sos-tel">
            <label>เบอร์ติดต่อฉุกเฉิน (Optional)</label>
            <input
              className="sos-tel"
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              placeholder="0000000000"
              value={step2Data.sos_tel}
              name="sos_tel"
              onChange={onChange}
              aria-label="Emergency Telephone"
            />
            <small>Ex: 0000000000</small>
          </div>

          <div className="next-btn">
            <button type="submit" className="btn btn-next">
              ต่อไป
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
/* useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setStep2Data((prevData) => ({
        ...prevData,
        uid: uid,
      }));
    } else {
      liff
        .init({ liffId: "2005311386-6GQLXp7Z" })
        .then(() => {
          if (liff.isLoggedIn()) {
            liff
              .getProfile()
              .then((profile) => {
                setStep2Data((prevData) => ({
                  ...prevData,
                  uid: profile.userId,
                }));
                localStorage.setItem("uid", profile.userId);
              })
              .catch((err) => {
                console.error("Error getting profile:", err);
                setError("Failed to get profile information.");
              });
          } else {
            liff.login();
          }
        })
        .catch((err) => {
          console.error("Error initializing LIFF:", err);
          setError("Failed to initialize LIFF. Please try again later.");
        });
    }
  }, []); */
