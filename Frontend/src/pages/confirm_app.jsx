import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./confirm_app.css";
import Logo from "../components/logo";

export default function Confirm_app() {
  const location = useLocation();
  const { appointData } = location.state || {};
  const navigate = useNavigate();

  if (!appointData) {
    return <div>ไม่มีข้อมูลการนัดหมาย</div>;
  }

  return (
    <div>
      <div className="cf-content">
        <Logo />
        <div className="cf-detail">
          <h1>ยืนยันการนัดหมาย</h1>
          <p>หมายเลขโทรศัพท์: &nbsp;{appointData.tel}</p>
          <p>ช่องทางการติดต่อ: &nbsp;{appointData.contactMethod}</p>
          <p>ผู้ให้คำปรึกษา: &nbsp;{appointData.medDoctor}</p>
          <p>วันที่: &nbsp;{appointData.date}</p>
          <p>เวลา: &nbsp;{appointData.time}</p>
          <p>เรื่องที่ต้องการปรึกษา: &nbsp;{appointData.topic}</p>
          <p>รายละเอียด: &nbsp;{appointData.detail}</p>
          <p>ประวัติการรับยา: &nbsp;{appointData.medHistory}</p>
        </div>
        <div className="cf-ps">
          หมายเหตุ: ผู้ที่ทำการนัดหมายสามารถถ่ายภาพหน้าจอยืนยันการนัดหมายนี้ได้
        </div>
      </div>
      <div className="dass21-app-footer">
        <button className="btn btn-close" onClick={() => navigate(-1)}>
          แก้ไขข้อมูล
        </button>
        <button
          type="submit"
          className="btn btn-next"
          onClick={() => navigate("/finish_app")}
        >
          ยืนยัน
        </button>
      </div>
    </div>
  );
}
