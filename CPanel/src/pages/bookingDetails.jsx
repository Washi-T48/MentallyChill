import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";

const Content = ({ handleClick, reasonNote, setReasonNote }) => {
  return (
    <>
      <div className="flex flex-col flex-1 m-10">
        <div className="text-5xl mb-10">Booking Details</div>
        <div className="flex flex-row justify-between mb-10 p-3 bg-[#FFF3C7] border border-[#FFF3C7] border-4 rounded-lg">
          <div className="text-4xl font-semibold">Booking No.XXXX</div>
          <div className="text-4xl font-semibold">User ID. 001</div>
        </div>
        <div className="flex flex-col flex-1 bg-[#FFAD4D] border border-[#FFAD4D] border-4 rounded-lg h-full ">
          <div className="p-4 flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-row justify-between text-2xl font-medium mb-4">
                <div>ผู้ให้คำปรึกษาที่ต้องการพบ : นพ.สมชาย</div>
                <div>27/05/2567</div>
              </div>
              <div className="flex flex-row justify-between text-2xl font-medium mb-4">
                <div>Location : Online</div>
                <div>11:27 AM</div>
              </div>
              <div className="text-2xl font-medium mb-4 w-1/2">
                Topic : Topic 2
              </div>
              <div className="flex flex-row gap-3 mb-4">
                <div className="w-full h-full">
                  <div className="text-2xl font-medium mb-4">
                    เรื่องที่ขอรับการปรึกษา :
                  </div>
                  <div className="flex w-full h-60 bg-gray-100 break-all p-2">
                    Hello
                    Worldlenmgeioklgbeuigio;ehngiosdsdasdasdasdsdfnelgkeogl'eogmeogjmoegeormgoeasdasddledmgoemnogegioeigjeigbniwlkmfwmfok
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-2xl font-medium mb-4">
                    ประวัติการรับยา :
                  </div>
                  <div className="flex w-full h-60 bg-gray-100 break-all p-2">
                    Hello
                    Worldlenmgeioklgbeuigio;ehngiosdsdasdasdasdsdfnelgkeogl'eogmeogjmoegeormgoe
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-2xl font-medium mb-4">Reason / Note</div>
                  <textarea
                    className="flex w-full h-60 bg-gray-100 break-all p-2"
                    value={reasonNote}
                    onChange={(e) => setReasonNote(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between border-t-4 border-[#FFFFFF] pt-3">
              <div className="text-2xl font-medium">
                หมายเลขโทรศัพท์ติดต่อ : xxxxxxxxxx
              </div>
              <div className="flex flex-row justify-between gap-4">
                <button
                  className="bg-[#24DB36] rounded-full px-10 py-2"
                  onClick={() => handleClick("Feedback")}
                >
                  Accept
                </button>
                <button
                  className="bg-[#FF0000] rounded-full px-10 py-2"
                  onClick={() => handleClick("Declined")}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function BookingDetailsPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [reasonNote, setReasonNote] = useState("");

  const handleClick = (status) => {
    switch (status) {
      case "Feedback":
        console.log("Feedback");
        console.log(reasonNote);
        setStatus("Feedback");
        navigate("/bookinginfo");
        break;
      case "Declined":
        console.log("Declined");
        console.log(reasonNote);
        setStatus("Declined");
        navigate("/bookinginfo");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 h-dvh">
        <Topbar />
        <div className="flex flex-row flex-1">
          <div className="flex relative w-72">
            <Sidebar />
          </div>
          <Content
            handleClick={handleClick}
            reasonNote={reasonNote}
            setReasonNote={setReasonNote}
          />
        </div>
      </div>
    </>
  );
}
