import React from 'react'
import "./formOption.css"
import CRAlogo from "../images/CRAlogo.png";
import EXicon from "../images/excla_icon.png";
import Enter from "../images/enter_icon.png";
export default function FormOption() {
  return (
    <div>
      <div className='logo'>
        <img className='logo' src={CRAlogo}></img>
      </div>

      <div className='step-1'>
        <h1>STEP 1 :</h1>
        <p>เลือกแบบประเมินวิเคราะห์ความเครียดด้วยตนเอง</p>
      </div>

      <div className='form-option'>
        <div className='DASS21'>
          <img className='ex-icon' src={EXicon}></img>
          <h2>DASS-21</h2>
          <p>สำหรับคัดกรองภาวะซึมเศร้า, วิตกกังวล, ความเครียด</p>
          <img className='ent-icon' src={Enter}></img>
        </div>
        <div className='ST5'>
          <img className='ex-icon' src={EXicon}></img>
          <h2>ST-5</h2>
          <p>สำหรับประเมินความเครียด</p>
          <img className='ent-icon' src={Enter}></img>
        </div>
        <div className='9Q'>
          <img className='ex-icon' src={EXicon}></img>
          <h2>9Q</h2>
          <p>สำหรับประเมินโรคซึมเศร้า</p>
          <img className='ent-icon' src={Enter}></img>
        </div>
        <div className='8Q'>
          <img className='ex-icon' src={EXicon}></img>
          <h2>8Q</h2>
          <p>สำหรับประเมินความเสี่ยงในการฆ่าตัวตาย</p>
          <img className='ent-icon' src={Enter}></img>
        </div>
        <div className='YMM'> 
          <img className='ex-icon' src={EXicon}></img>
          <h2>Young Minds Matter (YMM)</h2>
          <p>แบบสำรวจสุขภาพจิตและความเป็นอยู่ที่ดีของเด็ก</p>
          <img className='ent-icon' src={Enter}></img>
        </div>
      </div>
    </div>
  )
}
