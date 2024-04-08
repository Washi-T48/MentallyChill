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
            <p>Psychiatry is the branch of medicine focused on the diagnosis, treatment and 
              prevention of mental, emotional and 
              behavioral disorders.</p>
    
            <p>A psychiatrist is a medical doctor (an M.D. or D.O.) who specializes in mental health, including substance use disorders. Psychiatrists are qualified to assess both the mental and physical aspects of psychological problems.</p>
          </div>
    
          <div className='footer'>
            <img src={CRA02}></img>
            <div className="profile">
              <h1>รหัส CRA01 รุ้งนภา ผาณิตรัตน์ (พี่รุ้ง)</h1>
              <p>text</p>
            </div>
          </div>
    
        </div>
      )
} 
