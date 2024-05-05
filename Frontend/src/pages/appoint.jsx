import React, { useState } from 'react'
import "./appoint.css"
import Logo from './logo'
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
                    <label >หมายเลขโทรศัพท์</label>
                    <input 
                        className='app-tel' 
                        type='tel'
                        placeholder='0000 000 0000'
                        name='tel'
                        >
                    </input>
                    </div>
                <div className="app-contact">
                    <div>ช่องทางการติดต่อ</div>
                    <label >Google Meet
                        <input 
                            className='app-contact' 
                            type='radio'
                            name='gg-meet'
                            >
                        </input>
                        <span class="checkmark"></span>
                    </label>

                    <label>เบอร์โทร
                        <input 
                            className='app-contact' 
                            type='radio'
                            name='tel'
                            >
                        </input>
                        <span class="checkmark"></span>
                    </label>
                </div>
            </form>
        </div>
    </div>
  )
}
