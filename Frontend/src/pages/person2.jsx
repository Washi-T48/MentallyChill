import "./person2.css";
import React from "react";
import CRA02 from "../images/CRA02.jpg";
import CRAlogo from "../images/CRAlogo.png";
export default function Person2() {
    
    return (
        <div className='page'>
    
          <div className='content'>
            <img className='logo' src={CRAlogo}>
            </img>
            <p>ปริญญาเอก : Nursing Science Mid Sweden University<br/>
            <br/>ปริญญาโท : พยาบาลศาสตรมหาบัณฑิต (พย.ม.) การพยาบาลสุขภาพจิตและจิตเวช  และ การศึกษามหาบัณฑิต (กศ.ม.) จิตวิทยาพัฒนาการ<br />
            <br/>ปริญญาตรี : การพยาบาล วิทยาลัยพยาบาลพระปกเกล้า จันทบุรี<br/>
            </p>
    
            
          </div>
    
          <div className='footer'>
            <img src={CRA02}></img>
            <div className="profile">
              <h1>รหัส CRA02 <br/> ดวงแก้ว เตชะกาญจนเวช </h1>
              <p>(พี่ปู)</p>
            </div>
          </div>
    
        </div>
      )
} 
