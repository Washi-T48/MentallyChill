import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./topbar";
import Sidebar from "./sidebar";

const Content = ({ handleClick, note, setNote, con, setCon, feed, setFeed }) => {
  return (
    <>
      <div className="flex flex-col flex-1 m-10">
        <div className="text-5xl mb-10">Booking History</div>
        <div className="flex flex-row justify-between mb-10 p-3 bg-[#FFF3C7] border border-[#FFF3C7] border-4 rounded-lg">
          <div className="text-4xl font-semibold">Booking No.XXXX</div>
          <div className="text-4xl font-semibold">User ID. 001</div>
        </div>
        <div className="flex flex-col flex-1 bg-[#FFAD4D] border border-[#FFAD4D] border-4 rounded-lg h-full ">
          <div className="p-4 flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-row justify-between text-2xl font-medium mb-4">
                <div>Booking No.XXXX</div>
                <div>Location : Online</div>
                <div>Topic : Topic 2</div>
                <div className="flex flex-row gap-3">
                    <div>27/05/2567</div>
                    <div>11:27 AM</div>
                </div>
              </div>
              <div className="flex flex-row gap-96 text-2xl font-medium mb-4 border-t-4 border-[#FFFFFF]">
                <div>Note</div>
                <div className="pl-80">Personal Feedback</div>
              </div>
              <div className="flex flex-row gap-3 mb-4">
                <div className="w-full">
                <textarea
                    className="flex w-full h-60 bg-gray-100 break-all p-2 mb-2"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="text-2xl font-medium mb-4">
                    Conclusion
                  </div>
                  <textarea
                    className="flex w-full h-16 bg-gray-100 break-all p-2"
                    value={con}
                    onChange={(e) => setCon(e.target.value)}
                  />
                </div>
                <div className="flex w-full justify-end">
                  <textarea
                    className="flex w-full h-full bg-gray-100 break-all p-2"
                    value={feed}
                    onChange={(e) => setFeed(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-end border-t-4 border-[#FFFFFF] pt-3">
              <div className="flex flex-row justify-between gap-4">
                <button className="bg-[#24DB36] rounded-full px-10 py-2" onClick={() => handleClick('Save')}>Save</button>
                <button className="bg-[#FF0000] rounded-full px-10 py-2" onClick={() => handleClick('Cancel')}>Cancel</button>
              </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default function BookingHistoryPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [note, setNote] = useState("");
  const [con, setCon] = useState("");
  const [feed, setFeed] = useState("");

  const handleClick = (status) => {
    switch (status) {
      case 'Save':
        console.log(status);
        console.log("Note: "+note);
        console.log("Conclusion: "+con)
        console.log("Feedback: "+feed)
        navigate('/bookinginfo');
        break;
      case 'Cancel':
        console.log(status);
        console.log("Cancel");
        navigate('/bookinginfo');
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
          <Content handleClick={handleClick} note={note} setNote={setNote} con={con} setCon={setCon} feed={feed} setFeed={setFeed} />
        </div>
      </div>
    </>
  );
}

