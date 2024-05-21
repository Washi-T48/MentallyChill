import "./person.css";
import React from "react";
import CRA03 from "../images/CRA03.jpg";
import CRAlogo from "../images/CRAlogo.png";
export default function Person3() {
    
    return (
        <div className='page'>
    
          <div className='content'>
            <img className='logo' src={CRAlogo}>
            </img>
            <p>ปริญญาโท : สาขาจิตวิทยาการปรึกษา คณะศิลปศาสตร์ มหาวิทยาลัยธรรมศาสตร์<br/>
            <br/>ปริญญาตรี : สาขาพยาบาลศาสตร์ คณะแพทยศาสตร์โรงพยาบาลรามาธิบดี มหาวิทยาลัยมหิดล<br/>
            </p>
    
            
          </div>
    
          <div className='footer'>
            <img src={CRA03}></img>
            <div className="profile">
              <h1>รหัส CRA03 <br/> วิภาพร สร้อยแสง</h1>
              <p>(พี่อ้อย)</p>
            </div>
          </div>
    
        </div>
      )
} 
