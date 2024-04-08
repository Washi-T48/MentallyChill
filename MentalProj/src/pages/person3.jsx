import "./person1.css";
import React from "react";
import CRA03 from "../images/CRA03.jpg";
import CRAlogo from "../images/CRAlogo.png";
export default function Person3() {
    
    return (
        <div className='page'>
    
          <div className='content'>
            <img className='logo' src={CRAlogo}>
            </img>
            <p>Psychiatry is the branch of medicine focused on the diagnosis, treatment and 
              prevention of mental, emotional and 
              behavioral disorders.</p>
    
            <p>A psychiatrist is a medical doctor (an M.D. or D.O.) who specializes in mental health, including substance use disorders. Psychiatrists are qualified to assess both the mental and physical aspects of psychological problems.</p>
          </div>
    
          <div className='footer'>
            <img src={CRA03}></img>
            <div className="profile">
              <h1>รหัส CRA01 รุ้งนภา ผาณิตรัตน์ (พี่รุ้ง)</h1>
              <p>text</p>
            </div>
          </div>
    
        </div>
      )
} 
