import React from 'react'
import Logo from './logo'
import "./result.css"
import EXicon from "../images/excla_icon.png";
import { Link } from 'react-router-dom';
export default function Result() {
  return (
    <div>
        <Logo />
        <div className="dass21-result-content">
                <div className="mental-health">
                    <img src={EXicon}></img>
                    &nbsp; Mental Health Concern
                </div>
                <div className="mental-group">
                    <div>กลุ่มอาการ</div>
                    <div>ระดับความรุนแรง</div>
                </div>
                <div className="mental-detail">
                    <div className="d-result">
                        <span>อาการซึมเศร้า (D)</span>
                            <div> - คะแนน</div>
                            <div>รุนแรงที่สุด</div>
                    </div>
                    <div className="a-result">
                        <span>ความวิตกกังวล (A)</span>
                            <div> - คะแนน</div>
                            <div>ปกติ</div>
                    </div>
                    <div className="s-result">
                        <span>ความเครียด (S)</span>
                            <div> - คะแนน</div>
                            <div>ปานกลาง</div>
                    </div>
                </div>
        </div>
        <div className='dass21-result-footer'>
            <Link to="/">
                <button className='btn btn-close'>Close</button>
            </Link>
            <Link to="/appoint">
                <button className='btn btn-next'>Appointment</button>
            </Link>
        </div>
    </div>
  )
}
