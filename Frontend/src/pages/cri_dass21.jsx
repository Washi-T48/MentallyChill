import React from "react";
import "./cri_dass21.css";
import Logo from "../components/logo";

import { Link, useNavigate } from "react-router-dom";
export default function CRI_dass21() {
  const navigate = useNavigate();

  return (
    <div>
      <Logo />
      <div className="cri_dass21-content">
        <div className="dass21-header">
          <h1>
            แบบสอบถามวัดภาวะสุขภาพจิต <br /> Depression Anxiety Stress Scales
            (DASS-21)
          </h1>
          <p>
            เกณฑ์การให้คะแนน
            <br />
            0 หมายถึง ไม่ตรงกับข้าพเจ้าเลย
            <br />
            1 หมายถึง ตรงกับข้าพเจ้าบ้าง หรือเกิดขึ้นเป็นบางครั้ง
            <br />
            2 หมายถึง ตรงกับข้าพเจ้า หรือเกิดขึ้นบ่อย
            <br />
            3 หมายถึง ตรงกับข้าพเจ้ามาก หรือเกิดขึ้นบ่อยมากที่สุด
            <br />
          </p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>อาการซึมเศร้า (D) </th>
                <th>ความวิตกกังวล (A) </th>
                <th>ความเครียด (S) </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ปกติ</td>
                <td>0-4</td>
                <td>0-3</td>
                <td>0-7</td>
              </tr>
              <tr>
                <td>ระดับต่ำ</td>
                <td>5-6</td>
                <td>4-5</td>
                <td>8-9</td>
              </tr>
              <tr>
                <td>ระดับปานกลาง</td>
                <td>7-10</td>
                <td>6-7</td>
                <td>10-12</td>
              </tr>
              <tr>
                <td>ระดับรุนแรง</td>
                <td>11-13</td>
                <td>8-9</td>
                <td>13-16</td>
              </tr>
              <tr>
                <td>ระดับรุนแรงที่สุด</td>
                <td>14 ขึ้นไป</td>
                <td>10 ขึ้นไป</td>
                <td>17 ขึ้นไป</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="cri_dass21-footer">
        <button className="btn btn-result" onClick={() => navigate("/result")}>
          See the result
        </button>
      </div>
    </div>
  );
}
