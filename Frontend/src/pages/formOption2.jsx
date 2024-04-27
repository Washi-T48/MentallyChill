import React from 'react'
import './formOption2.css'
import Logo from './logo';
import { useState,} from 'react';
import { useNavigate} from 'react-router-dom';
import { RxPerson } from "react-icons/rx";
import { BsTelephoneFill } from "react-icons/bs";

export default function FormOption2() {

  const [step2Data, setstep2Data] = useState({
    gender: '',
    age: '',
    year: '',
    email: '',
    tel: '',
    sos_tel: '',
  })
  const onChange = (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;
    setstep2Data((oldData) => 
      ({...oldData, [key]: value }));
    };
  const navigate = useNavigate()
  const onSubmit = e => {
    e.preventDefault()
    console.log('submit value', step2Data)
    navigate('/p1_dass21')
  }

  return (
    <div>
      <Logo/>

      <div className='step-2'>
        <h1>STEP 2 :</h1>
        <p>กรอกข้อมูลผู้ขอรับคำปรึกษาเบื้องต้น</p>
      </div>

      <div className='form-fill'>
        <form onSubmit={onSubmit}>
            <div className='gender-age'>
                <RxPerson className='ioperson'/>
                <input 
                  className='gender' 
                  type='text' 
                  placeholder='เพศ'
                  value={step2Data.gender}
                  name='gender'
                  onChange={onChange}
                  required>
                </input>

              <input 
                className='age' 
                type='text' 
                placeholder='อายุ'
                value={step2Data.age}
                name='age'
                onChange={onChange}
                required>
              </input>
            </div>

              <div className='year'>

                <label>ชั้นปีการศึกษา</label>
                <input
                  className='year'
                  type='text'
                  placeholder='ชั้นปีการศึกษา'
                  value={step2Data.year}
                  name='year'
                  onChange={onChange}
                  required
                ></input>

              </div>

              <div className='email'>
                
                <label >อีเมล (Optional)</label>
                <input className='email'
                  type='email' 
                  placeholder='Email'
                  value={step2Data.email}
                  name='email'
                  onChange={onChange}>
                </input>
              </div>

            <div className='tel'>
              <label >เบอร์ติดต่อ (Optional)</label>
              {/* <BsTelephoneFill className='teleicon'/> */}
              <input 
                className='tel' 
                type='tel'
                placeholder='0000 000 0000'
                value={step2Data.tel}
                name='tel'
                onChange={onChange}>
              </input>
            </div>

            <div className='sos-tel'>
              <label>เบอร์ติดต่อฉุกเฉิน (Optional)</label>
              <input 
                className='sos-tel' 
                type='tel'
                /* pattern='[0-9]{4}-[0-9]{3}-[0-9]{4}' */  
                placeholder='0000 000 0000'
                value={step2Data.sos_tel}
                name='sos_tel'
                onChange={onChange}>
              </input>
            </div>
            <div className='next-btn'>
              <button type='submit' className='btn btn-next' >Next</button>
            </div>
          </form>
      </div>
    </div>
  )
}
