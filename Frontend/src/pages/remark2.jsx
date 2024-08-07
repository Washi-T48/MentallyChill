import React, { useState } from "react";
import "./remark2.css";
import Logo from "../components/logo";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Remark2() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("../formOption1");
    }, 1000);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Logo />
      <div className="remark2-content">
        &nbsp;&nbsp;&nbsp;&nbsp;เครื่องมือนี้ ใช้ในการคัดกรอง
        ไม่ใช่เครื่องมือที่ใช้ในการวินิจฉัยโรค กล่าวคือ
        ระดับคะแนนที่สูงจะช่วยบ่งชี้ว่าคุณอาจจะมีคุณภาพชีวิตที่ไม่ดีและภาวะแปรปรวนทางอารมณ์
        อย่างไรก็ตาม
        แบบประเมินนี้ไม่สามารถวินิจฉัยโรคทางจิตเวชหรือสาเหตุของภาวะอารมณ์เชิงลบที่คุณประสบอยู่ได้
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;แบบประเมินสุขภาพจิตเป็นการประเมินด้วยตัวเอง
        คุณสามารถทำเมื่อใดก็ได้ ให้เลือกข้อที่คิดว่าตรงกับท่านมากที่สุด
        เพื่อวัดระดับภาวะซึมเศร้า ความวิตกกังวล และความเครียด
        ถ้าได้ผลแตกต่างกันในแต่ละครั้งถือเป็นเรื่องผิดปกติ
      </div>
      <div className="remark2-footer">
        <button className="btn btn-next" onClick={handleAccept}>
          ยอมรับ
        </button>
      </div>
    </div>
  );
}
