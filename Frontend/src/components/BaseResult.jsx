import React from "react";
import Logo from "../components/logo";
import EXicon from "../images/excla_icon.png";
import { Link, useNavigate } from "react-router-dom";
import "./result.css";

export const AssessmentResultBase = ({
  title,
  children,
  showAppointmentButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <Logo />
      <div className="dass21-result-content">
        <div className="mental-health">
          <img src={EXicon} alt="Mental Health Icon" />
          &nbsp; <h1>{title}</h1>
        </div>
        {children}
      </div>
      <div className="dass21-result-footer">
        <Link to="/">
          <button className="btn btn-close">ปิด</button>
        </Link>
        {showAppointmentButton && (
          <button className="btn btn-next" onClick={() => navigate("/appoint")}>
            นัดหมายพบเจ้าหน้าที่
          </button>
        )}
      </div>
      <small className="result-small">
        * ข้อมูลที่ใช้ในการรับบริการการปรึกษา
        จะเป็นความลับและไม่ส่งผลต่อผลการเรียน
      </small>
    </div>
  );
};

export const ResultIndicator = ({ label, score, severity, color }) => (
  <div className={`result ${color}`}>
    <span>{label}</span>
    <div>{score} คะแนน</div>
    <div>{severity}</div>
  </div>
);
