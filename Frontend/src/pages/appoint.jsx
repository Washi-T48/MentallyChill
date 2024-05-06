import React, { useState } from 'react'
import "./appoint.css"
import Logo from './logo'
import { Link } from 'react-router-dom'

export default function Appoint() {
    const [appointData, setAppointData] = useState({
        tel:"",
        contact:'',
        med_doctor:'',
        date:'',
        topic:'',
        detail:'',
        med_history:''
    })

  return (
    <div>
        <Logo/>
        <div className="appoint-topic">
            <h1>นัดหมายพบเจ้าหน้าที่</h1>
        </div>
        <div className="appoint-form">
            <form>
                <div className='app-tel'>
                    <label >หมายเลขโทรศัพท์</label><br/>
                    <input 
                        className='app-tel' 
                        type='tel'
                        placeholder='0000 000 0000'
                        value={appointData.tel}
                        name='tel'
                        required
                        >
                    </input>
                    </div>
                <div className="app-contact">
                    <div>ช่องทางการติดต่อ</div>
                        <input 
                            className='app-contact' 
                            type='radio'
                            name='gg-meet'
                            >
                        </input>
                    <label htmlFor="gg-meet" >Google Meet
                        <span className="checkmark"></span><br/>
                    </label>
                        <input 
                            className='app-contact' 
                            type='radio'
                            name='app-tel'
                            >
                        </input>
                    <label htmlFor="app-tel">เบอร์โทร
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="app-advisor">
                    <label>เลือกผู้ให้คำปรึกษา
                        <select >
                            <option value="CRA01">รุ้งนภา ผาณิตรัตน์ (พี่รุ้ง)</option>
                            <option value="CRA02">ดวงแก้ว เตชะกาญจนเวช (พี่ปู)</option>
                            <option value="CRA03">วิภาพร สร้อยแสง (พี่อ้อย)</option>
                        </select>
                    </label>
                </div>
                <div className="app-time">
                    <label>วันที่และเวลา<br/>
                        <input type="date" required="required"/><br/>
                        <select>
                            <option value={"/"}>TIME-1</option>
                            <option value={"/"}>TIME-1</option>
                            <option value={"/"}>TIME-1</option>
                        </select>
                    </label>
                </div>
                <div className="app-topic">
                    <label>เรื่องที่ต้องการปรึกษา<br/>
                        <select >
                                <option value={"/"}>TOPIC-1</option>
                                <option value={"/"}>TOPIC-2</option>
                                <option value={"/"}>TOPIC-3</option>
                        </select>
                    </label>
                </div>
                <div className="app-detail">
                    <label>เรื่องที่ขอรับการปรึกษา
                        <input 
                            className='app-detail' 
                            type='text'
                            name='detail'
                            
                            >
                        </input>
                    </label>
                </div>
                <div className="med-his">
                    <label>ประวัติการรับยา<br/>
                        <input 
                            className='med-his' 
                            type='text'
                            name='med_history'
                            >
                        </input>
                    </label>
                </div>
            </form>

            <div className='dass21-app-footer'>
            <Link to="/">
                <button className='btn btn-next'>จองเลย</button>
            </Link>
            </div>
        </div>
    </div>
  )
}
