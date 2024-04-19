import React from 'react'
import './formOption2.css'
import CRAlogo from "../images/CRAlogo.png";

export default function FormOption2() {
  return (
    <div>
      <div className='logo'>
        <img className='logo' src={CRAlogo}></img>
      </div>

      <div className='step-2'>
        <h1>STEP 2 :</h1>
        <p>กรอกข้อมูลผู้ขอรับคำปรึกษาเบื้องต้น</p>
      </div>

      <div className='form-fill'>
        <form>
          
            <input 
              className='gender' 
              type='text' 
              placeholder='เพศ'>
            </input>
            <input 
              className='age' 
              type='text' 
              placeholder='อายุ'>
            </input>

            <div className='email'>
              <label >อีเมล (Optional)</label>
              <input className='email'
                type='email' 
                placeholder='Email'>
              </input>
            </div>

            <div className='tel'>
              <label >เบอร์ติดต่อ (Optional)</label>
              <input 
                className='tel' 
                type='number' 
                placeholder='0000 000 0000'>
              </input>
            </div>

            <div className='sos-tel'>
              <label>เบอร์ติดต่อฉุกเฉิน (Optional)</label>
              <input 
                className='sos-tel' 
                type='number' 
                placeholder='0000 000 0000'>
              </input>
            </div>
            <div className='next-btn'>
              <button className='btn btn-next' onClick={<></>}>Next</button>
            </div>
          </form>
      </div>
    </div>
  )
}
