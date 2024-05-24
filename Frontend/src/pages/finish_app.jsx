import React from "react";
import Logo from "../components/logo";
import Check from "../images/Checked.png";
import "./finish_app.css";
export default function Finish_app() {
  return (
    <div>
      <Logo />
      <div className="finish-content">
        <img src={Check} alt="" />
        <h1>Thank You</h1>
        <p>Your answers have been sent.</p>

        <div className="finish-msg">
          เจ้าหน้าที่จะติดต่อกลับ
          <br />
          ภายใน 24 ชั่วโมง
        </div>
        <br />
        <button className="btn btn-close">Close</button>
      </div>
    </div>
  );
}
