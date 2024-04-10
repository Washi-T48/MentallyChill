import "./person.css";
import React from "react";
import CRA01 from "../images/CRA01.jpg";
import CRAlogo from "../images/CRAlogo.png";
export default function Person1() {
    
    return (
        <div className='page'>
    
          <div className='content'>
            <img className='logo' src={CRAlogo}>
            </img>
            <p>ปริญญาเอก : Nursing Science School of Nursing, Case Western Reserve University, USA<br/>
            <br/>
            ปริญญาโท : ศิลปศาสตรมหาบัณฑิต สาขาจิตวิทยาการปรึกษา คณะครุศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย<br/>
            <br/>
            ปริญญาตรี : วิทยาศาสตร์บัณฑิต(พยาบาลและผดุงครรภ์) คณะพยาบาลศาสตร์ มหาวิทยาลัยมหิดล<br/> </p>
    
            {/*<p>A psychiatrist is a medical doctor (an M.D. or D.O.) who specializes in mental health, including substance use disorders. Psychiatrists are qualified to assess both the mental and physical aspects of psychological problems.</p>*/}
          </div>
    
          <div className='footer'>
            <img src={CRA01}></img>
            <div className="profile">
              <h1>รหัส CRA01 <br/> รุ้งนภา ผาณิตรัตน์ </h1>
              <p>(พี่รุ้ง)</p>
            </div>
          </div>
    
        </div>
      )
} 
