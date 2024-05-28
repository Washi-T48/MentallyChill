import React from "react";
import Logo from "../components/logo";
import Check from "../images/Checked.png";
import "./finish_app.css";

export default function Finish_app() {
  const closeTab = () => {
    if (window.confirm("Are you sure you want to close this tab?")) {
      window.close();
    }

    alert(
      "The tab could not be closed automatically. Please close it manually."
    );
  };

  return (
    <div>
      <Logo />
      <div className="finish-content">
        <img src={Check} alt="Checked" />
        <h1>Thank You</h1>
        <p>Your answers have been sent.</p>

        <div className="finish-msg">
          เจ้าหน้าที่จะติดต่อกลับ
          <br />
          ภายใน 24 ชั่วโมง
        </div>
        <br />
        {/* <button className="btn btn-close" onClick={closeTab}>
          Close
        </button> */}
      </div>
    </div>
  );
}
