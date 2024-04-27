import React from 'react'
import './p1_dass21.css'
import Logo from './logo';
import Radio_rate from './radio_rate';


export default function P1_dass21() {
  return (
    <div>
      <Logo/>
      <div className='p1_dass21-content'>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;โปรดอ่านแต่ละข้อความและเลือกตัวเลข 0, 1, 2 หรือ 3 ซึ่งระบุว่าค่าดังกล่าวนั้นตรงกับคุณมากแค่ไหน
        ในช่วงสัปดาห์ที่ผ่านมา ไม่มีคำตอบที่ถูกหรือผิด อย่าใช้เวลามากเกินไปกับข้อความใด ๆ<br/></span>
        <p>
        เกณฑ์การให้คะแนน<br/>
                  0         หมายถึง          ไม่ตรงกับข้าพเจ้าเลย<br/>
                  1         หมายถึง          ตรงกับข้าพเจ้าบ้าง หรือเกิดขึ้นเป็นบางครั้ง<br/>
                  2         หมายถึง          ตรงกับข้าพเจ้า หรือเกิดขึ้นบ่อย<br/>
                  3         หมายถึง          ตรงกับข้าพเจ้ามาก หรือเกิดขึ้นบ่อยมากที่สุด<br/>
        </p>
        <form className='dass21-1'>
          <br/><label>1.ฉันพบว่ามันยากที่จะรู้สึกผ่อนคลาย (s)</label>
          <Radio_rate/>
          <br/><label>2.ฉันรู้ตัวว่าปากแห้ง (a)</label>
          <Radio_rate/>
          <br/><label>3.ฉันดูเหมือนจะไม่มีความรู้สึกดีๆ เลย (d) </label>
          <Radio_rate/>
          <br/><label>4.ฉันมีอาการหายใจลำบาก (เช่น หายใจเร็วเกินไป หายใจไม่ออก ในกรณีที่ไม่ได้ออกกําลังกาย) (a) </label>
          <Radio_rate/>
          <br/><label>5.ฉันพบว่ามันยากที่จะคิดริเริ่มที่จะทำสิ่งต่าง ๆ (d)</label>
          <Radio_rate/>
          <br/><label>6.ฉันมักจะตอบสนองต่อสถานการณ์มากเกินไป (s) </label>
          <Radio_rate/>
          <br/><label>7.ฉันมีอาการสั่น (เช่น มือสั่น) (a) </label>
          <Radio_rate/>
        </form>

      </div>
    </div>
  )
}
