import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";

import { ProfileProvider } from "./LIFF/ProfileContext";
import Person1 from "./pages/Person1";
import Person2 from "./pages/person2";
import Person3 from "./pages/person3";
import Remark from "./pages/remark";
import Remark2 from "./pages/remark2";
import FormOption from "./pages/formOption";
import FormOption2 from "./pages/formOption2";
import CRI_dass21 from "./pages/cri_dass21";
import P1_dass21 from "./pages/p1_dass21";
import P2_dass21 from "./pages/p2_dass21";
import P3_dass21 from "./pages/p3_dass21";
import Result from "./pages/result";
import Appoint from "./pages/appoint";
import Radio_rate from "./components/radio_rate";
import Confirm_app from "./pages/confirm_app";
import Finish_app from "./pages/finish_app";
import LineLiff from "./LIFF/lineLiff";
import LineDis from "./LIFF/LineDIS";

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<FormOption />} />
          <Route path="/person1" element={<Person1 />} />
          <Route path="/person2" element={<Person2 />} />
          <Route path="/person3" element={<Person3 />} />
          <Route path="/remark1" element={<Remark />} />
          <Route path="/remark2" element={<Remark2 />} />
          <Route path="/formOption1" element={<FormOption />} />
          <Route path="/formOption2" element={<FormOption2 />} />
          <Route path="/cri_dass21" element={<CRI_dass21 />} />
          <Route path="/p1_dass21" element={<P1_dass21 />} />
          <Route path="/radio_rate" element={<Radio_rate />} />
          <Route path="/p2_dass21" element={<P2_dass21 />} />
          <Route path="/p3_dass21" element={<P3_dass21 />} />
          <Route path="/result" element={<Result />} />
          <Route path="/appoint" element={<Appoint />} />
          <Route path="/confirm_app" element={<Confirm_app />} />
          <Route path="/finish_app" element={<Finish_app />} />
          <Route path="/lineLiff" element={<LineLiff />} />
          <Route path="/LineDis" element={<LineDis />} />
        </Routes>

        <CookieConsent
          flipButtons={true}
          enableDeclineButton
          location="bottom"
          buttonText="ฉันเข้าใจ"
          declineButtonText="ยกเลิก"
          cookieName="myCookieConsent"
          style={{
            background: "#2B373B",
            fontSize: "14px",
            color: "#ffffff",
            alignItems: "center",
            margin: "0",
          }}
          buttonStyle={{
            background: "#FFD700",
            color: "#4e503b",
            fontSize: "14px",
            fontFamily: "ChulabhornLikitText-Regular",
            borderRadius: "5px",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
          declineButtonStyle={{
            background: "#F8F8F8",
            color: "#4e503b",
            fontSize: "14px",
            fontFamily: "ChulabhornLikitText-Regular",
            borderRadius: "5px",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
          expires={150}
          id="cookie"
        >
          <b style={{ fontSize: "16px" }}>เว็บไซต์นี้มีการใช้งานคุกกี้</b>
          <br />
          <br />
          เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพ
          และประสบการณ์ที่ดีในการใช้งานเว็บไซต์
        </CookieConsent>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
