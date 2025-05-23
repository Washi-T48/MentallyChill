import React, { useEffect, useState } from "react";
import { BaseResult, ResultIndicator } from "../../components/BaseResult";

export default function StressResult() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const stressScore = localStorage.getItem("stressScore");
    if (stressScore) {
      setScore(parseInt(stressScore));
    }
  }, []);

  const getStressLevelInfo = (score) => {
    if (score >= 30) {
      return {
        severity: "เครียดมาก",
        color: "severe",
        recommendation:
          "ท่านมีความเครียดอยู่ในระดับสูงกว่าปกติมาก กำลังตกอยู่ในภาวะตึงเครียดหรือกำลังเผชิญกับวิกฤติการณ์ในชีวิตอย่างรุนแรง เช่น การเจ็บป่วยที่รุนแรง เรื้อรัง ความพิการ การสูญเสีย ปัญหาความรุนแรงในครอบครัว ปัญหาเศรษฐกิจซึ่งส่งผลต่อสุขภาพกาย และสุขภาพจิตอย่างชัดเจน ทำให้ชีวิตไม่มีความสุข ความคิดฟุ้งซ่าน ตัดสินใจผิดพลาด ขาดความยับยั้งชั่งใจ อาจเกิดอุบัติเหตุได้ง่าย บางครั้งอาจมีพฤติกรรมก้าวร้าวรุนแรง เช่น เอะอะโวยวาย ขว้างปาข้าวของ\n\nความเครียดในระดับนี้ถือว่ามีความรุนแรงมาก หากปล่อยไว้โดยไม่ดำเนินการแก้ไขอย่างเหมาะสมและถูกวิธี อาจนำไปสู่ความเจ็บป่วยทางจิตที่รุนแรง ซึ่งส่งผลเสียต่อตนเองและบุคคลใกล้ชิดต่อไปได้ ในระดับนี้ท่านต้องปรึกษากับผู้เชี่ยวชาญ ซึ่งอาจจะช่วยให้ท่านมองเห็นปัญหาและแนวทางแก้ไขที่ชัดเจนเหมาะสมต่อไป",
      };
    } else if (score >= 26) {
      return {
        severity: "เครียดปานกลาง",
        color: "moderate",
        recommendation:
          "ท่านมีความเครียดอยู่ในระดับสูงกว่าปกติปานกลาง ขณะนี้ท่านเริ่มมีความตึงเครียดในระดับค่อนข้างสูงและได้รับความเดือดร้อนเป็นอย่างมากจากปัญหาทางอารมณ์ที่เกิดจากปัญหาความขัดแย้ง และวิกฤติการณ์ในชีวิตเป็นสัญญาณเตือนขั้นต้นว่าท่านกำลังเผชิญภาวะวิกฤตและความขัดแย้ง ซึ่งท่านจัดการแก้ไขด้วยความลำบาก ลักษณะดังกล่าวจะเพิ่มความรุนแรง ซึ่งมีผลกระทบต่อการทำงาน จำเป็นต้องหาวิธีแก้ไขข้อขัดแย้งต่าง ๆ ให้ลดน้อยลงหรือหมดไปด้วยวิธีการอย่างใดอย่างหนึ่ง\n\nสิ่งแรกที่ต้องรีบจัดการคือ ท่านต้องมีวิธีคลายเครียดที่ดีและสม่ำเสมอทุกวัน วันละ 1 – 2 ครั้ง ครั้งละ 10 นาที โดยนั่งในท่าที่สบาย หายใจลึก ๆ ให้หน้าท้องขยาย หายใจออกช้า ๆ นับ 1 – 10 ไปด้วย ท่านจะใช้วิธีนั่งสมาธิหรือสวดมนต์ก็ได้\n\nท่านควรแก้ไขปัญหาให้ดีขึ้น โดยค้นหาสาเหตุของปัญหาที่ทำให้เกิดความขัดแย้ง หาวิธีแก้ไขปัญหาหลาย ๆ วิธี พร้อมทั้งพิจารณาผลดี ผลเสียของแต่ละวิธี เลือกวิธีที่เหมาะสมกับภาวะของตนเองมากที่สุด ทั้งนี้ต้องไม่สร้างปัญหาให้เพิ่มขึ้น หรือทำให้ผู้อื่นเดือดร้อน วางแผนแก้ไขปัญหาเป็นลำดับขั้นตอน และลงมือแก้ปัญหา\n\nหากท่านไม่สามารถจัดการคลี่คลาย หรือแก้ไขปัญหาด้วยตนเองได้ ควรปรึกษากับผู้ให้การปรึกษาปัญหาสุขภาพจิต",
      };
    } else if (score >= 18) {
      return {
        severity: "เครียดเล็กน้อย",
        color: "low",
        recommendation:
          "ท่านมีความเครียดอยู่ในระดับสูงกว่าปกติเล็กน้อย ซึ่งถือว่าเป็นความเครียดที่พบได้ในชีวิตประจำวัน อาจไม่รู้ตัวว่ามีความเครียดหรืออาจรู้สึกได้จากการเปลี่ยนแปลงของร่างกาย อารมณ์ ความรู้สึก และพฤติกรรมบ้างเล็กน้อย แต่ไม่ชัดเจนและยังพอทนได้ อาจต้องใช้เวลาในการปรับตัวแต่ในที่สุดท่านก็สามารถจัดการกับความเครียดได้และความเครียดระดับนี้ไม่เป็นผลเสียต่อการดำเนินชีวิต\n\nในกรณีนี้ ท่านสามารถผ่อนคลายความเครียดด้วยการหากิจกรรมที่เพิ่มพลัง เช่น การออกกำลังกาย เล่นกีฬา ทำสิ่งที่สนุกสนานเพลิดเพลิน เช่น ดูหนัง ฟังเพลง อ่านหนังสือ หรือทำงานอดิเรกต่าง ๆ หากท่านต้องการป้องกันไม่ให้เกิดความเครียดมากขึ้นในอนาคต ท่านอาจฝึกผ่อนคลายความเครียดเพิ่มเติม เช่น นั่งสมาธิ กำหนดลมหายใจ สวดมนต์ หรือค้นหาสาเหตุของปัญหาที่ทำให้ไม่สบายใจ แต่ในขณะเดียวกัน อย่าลืมพูดคุยกับผู้ที่ไว้วางใจ พิจารณาและลงมือแก้ไขปัญหาตามลำดับความสำคัญอย่างรอบคอบและมีสติ",
      };
    } else if (score >= 6) {
      return {
        severity: "เครียดในระดับปกติ",
        color: "normal",
        recommendation:
          "&nbpsท่านมีความเครียดอยู่ในเกณฑ์ปกติ สามารถจัดการกับความเครียดที่เกิดขึ้นในชีวิตประจำวันและสามารถปรับตัวกับสถานการณ์ต่าง ๆ ได้อย่างเหมาะสม รู้สึกพึงพอใจเกี่ยวกับตนเองและสิ่งแวดล้อมเป็นอย่างมาก ความเครียดในระดับนี้ถือว่ามีประโยชน์ในการดำเนินชีวิตประจำวัน เป็นแรงจูงใจที่นำไปสู่ความสำเร็จในชีวิตได้",
      };
    } else {
      return {
        severity: "ไม่มีภาวะเครียด",
        color: "normal",
        recommendation:
          "ท่านมีความเครียดอยู่ในระดับต่ำกว่าเกณฑ์ปกติ ความเครียดในระดับต่ำมากเช่นนี้ อาจมีความหมายว่า \n1. ท่านตอบไม่ตรงตามความเป็นจริง \n2. ท่านอาจเข้าใจคำถามคลาดเคลื่อนไป \n3. ท่านอาจเป็นคนที่ขาดแรงจูงใจ มีความเฉื่อยชา \n4. ชีวิตประจำวันซ้ำซากจำเจ น่าเบื่อ ปราศจากความตื่นเต้น",
      };
    }
  };

  const { severity, color, recommendation } = getStressLevelInfo(score);

  return (
    <BaseResult title="ผลการประเมินความเครียด">
      {/* <div className="mental-group">
        <div>ระดับความเครียด</div>
        <div>คะแนน</div>
        <div>การแปลผล</div>
      </div> */}
      <div className="mental-detail">
        <ResultIndicator
          label="ความเครียด"
          score={score}
          severity={severity}
          color={color}
        />
        <div
          style={{
            padding: "20px",
            marginTop: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            maxWidth: "100%",
          }}
        >
          <h3
            style={{
              marginBottom: "10px",
              color: "#333",
              textAlign: "center",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            สรุปผลการประเมิน
          </h3>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.5",
              color: "#666",
              whiteSpace: "pre-line",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            {recommendation}
          </p>
          <div style={{ marginTop: "15px", fontSize: "16px", color: "#666" }}>
            <p>
              * หากมีความกังวลเกี่ยวกับสุขภาพจิต
              สามารถขอรับคำปรึกษาจากเจ้าหน้าที่ได้
            </p>
          </div>
        </div>
      </div>
    </BaseResult>
  );
}
