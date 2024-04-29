import React, { useEffect, useState } from 'react';
import Logo from './logo';
import Radio_rate from './radio_rate';
import "./p3_dass21.css"
import { Link } from 'react-router-dom';
export default function P3_dass21() {
    
  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    // Retrieve selected values from local storage when component mounts
    const storedValues = localStorage.getItem('selectedValues');
    if (storedValues) {
      setSelectedValues(JSON.parse(storedValues));
    }
  }, []);

  const handleRadioChange = (questionNumber, value) => {
    // Update selected values
    setSelectedValues({ ...selectedValues, [questionNumber]: value });
    console.log(`Question ${questionNumber}:`, value);
  };

  useEffect(() => {
    // Save selected values to local storage whenever it changes
    localStorage.setItem('selectedValues', JSON.stringify(selectedValues));
  }, [selectedValues]);

  return (
    <div>
      <Logo />
      <div className='p3_dass21-content'>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;โปรดอ่านแต่ละข้อความและเลือกตัวเลข 0, 1, 2 หรือ 3 ซึ่งระบุว่าค่าดังกล่าวนั้นตรงกับคุณมากแค่ไหน
        ในช่วงสัปดาห์ที่ผ่านมา ไม่มีคำตอบที่ถูกหรือผิด อย่าใช้เวลามากเกินไปกับข้อความใด ๆ<br/></span>
        <p>
          เกณฑ์การให้คะแนน<br/>
          0         หมายถึง          ไม่ตรงกับข้าพเจ้าเลย<br/>
          1         หมายถึง          ตรงกับข้าพเจ้าบ้าง หรือเกิดขึ้นเป็นบางครั้ง<br/>
          2         หมายถึง          ตรงกับข้าพเจ้า หรือเกิดขึ้นบ่อย<br/>
          3         หมายถึง          ตรงกับข้าพเจ้ามาก หรือเกิดขึ้นบ่อยมากที่สุด<br/>
        </p>
        <form className='dass21-2'>
          <br/><label>15.ฉันรู้สึกหวาดกลัวหรือเสียขวัญ (a)</label>
          <Radio_rate questionNumber={15} selectedValue={selectedValues[8]} onRadioChange={handleRadioChange} />
          <br/><label>16.ฉันไม่สามารถมีความกระตือรือร้นในสิ่งใดได้ (d) </label>
          <Radio_rate questionNumber={16} selectedValue={selectedValues[16]} onRadioChange={handleRadioChange} />
          <br/><label>17.ฉันรู้สึกว่าตัวเองไม่มีค่ามาก (d) </label>
          <Radio_rate questionNumber={17} selectedValue={selectedValues[17]} onRadioChange={handleRadioChange} />
          <br/><label>18.ฉันรู้สึกหงุดหงิดอารมณ์เสีย (s) </label>
          <Radio_rate questionNumber={18} selectedValue={selectedValues[18]} onRadioChange={handleRadioChange} />
          <br/><label>19.ฉันรู้สึกว่าสภาพหัวใจขาดการออกกำลังกาย (เช่น ความรู้สึกของอัตราการเต้นของหัวใจเพิ่มขึ้น, หัวใจเต้นผิดจังหวะ) (a) </label>
          <Radio_rate questionNumber={19} selectedValue={selectedValues[19]} onRadioChange={handleRadioChange} />
          <br/><label>20.ฉันรู้สึกกลัวโดยไม่มีเหตุผล (a) </label>
          <Radio_rate questionNumber={20} selectedValue={selectedValues[20]} onRadioChange={handleRadioChange} />
          <br/><label>21.ฉันรู้สึกว่าชีวิตไม่มีความหมาย (d)   </label>
          <Radio_rate questionNumber={21} selectedValue={selectedValues[21]} onRadioChange={handleRadioChange} />
        </form>
        <div className='p3_dass21-footer'>
            <Link to="/p2_dass21">
                <button className='btn btn-prev'>Back</button>
            </Link>
            <Link to="/cri_dass21">
                <button className='btn btn-next'>Submit</button>
            </Link>
        </div>
      </div>
    </div>
  );
}
