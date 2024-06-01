import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";

const Content = ({
  handleClick,
  note,
  setNote,
  con,
  setCon,
  feed,
  setFeed,
}) => {
  return (
    <>
      <div className="m-10 w-full flex flex-col">
        <div className="text-5xl mb-10">Booking History Done</div>
        <div className="grid grid-cols-3 text-4xl bg-[#FFF3C7] p-3 rounded-lg border border-4 border-[#FFF3C7] mb-10">
          <div>Booking No.XXXXXX</div>
          <div className="col-start-3">User ID. XXXXX</div>
        </div>
        {/* <div className="flex flex-col bg-orange-300 p-3 pt-5 rounded-lg border border-4 border-orange-300 flex-grow ">
          <div className="flex flex-row justify-between text-2xl font-medium mb-4 w-full">
            <div>Booking No.XXXX</div>
            <div>Topic : XXX</div>
            <div className="flex flex-row gap-3">
              <div>27/05/2567</div>
              <div>11:27 AM</div>
            </div>
          </div>
          <div className="grid grid-rows-2 grid-flow-col gap-5 border-t-4 border-white pt-5 h-full">
            <div className="mb-5">
              <div className="mb-2 text-2xl">Note</div>
              <div className="bg-gray-300 h-full break-all p-2 overflow-auto">
                3prgmp4mgopmgm4tphpo46opmgm4tphpo46opmgm446opmgm4tphpo46opmgm4tphpo46gm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tphgm4tphpo46opmgm4tph
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 text-2xl">Conclusion</div>
              <div className="bg-gray-300 h-full break-all p-2">
                3prgmp3prgmp4mgopmgpmgm4tphpo46opmgm4tphpo46opm6opmgm4tphpo46opmgm4tphpo46opm
              </div>
            </div>
            <div className="mb-5 row-span-2">
              <div className="mb-2 text-2xl">Personal Feedback</div>
              <div className="bg-gray-300 h-full break-all p-2">
                3prgmp4mgoopmgm4tphpo46opmgm4tphpo46oopmgm4tphpo46opmgm4tphpo46opmgm4tphpo46
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end border-t-4 border-white pt-3 mt-7">
            <div className="flex flex-row justify-between gap-4">
              <button
                className="bg-[#FF0000] rounded-full px-10 py-2"
                onClick={() => handleClick("Cancel")}
              >
                Back
              </button>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col flex-1 bg-[#FFAD4D] border border-[#FFAD4D] border-4 rounded-lg h-full ">
          <div className="p-4 flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-row justify-between text-2xl font-medium mb-4">
                <div>Booking No.XXXX</div>
                <div>Topic : XXX</div>
                <div className="flex flex-row gap-3">
                  <div>27/05/2567</div>
                  <div>11:27 AM</div>
                </div>
              </div>
              <div className="grid grid-cols-2 text-2xl font-medium mb-4 pt-3 border-t-4 border-[#FFFFFF]">
                <div>Note</div>
                <div>Personal Feedback</div>
              </div>
              <div className="flex flex-row gap-3 mb-4">
                <div className="w-full">
                  <div className="flex w-full h-60 bg-gray-300 break-all p-2 mb-2 overflow-y-auto">
                    oekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekr
                  </div>
                  <div className="text-2xl font-medium mb-4">Conclusion</div>
                  <div className="flex w-full h-16 bg-gray-300 break-all p-2 overflow-y-auto">
                    oekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekroekoekr
                    3prgmp4mgoopmgm4tphpo46opmgm4tphpo46oopmgm4tphpo46opmgm4tphpo46opmgm4tphpo46
                  </div>
                </div>
                <div className="flex w-full justify-end">
                  <div className="flex w-full h-[360px] bg-gray-300 break-all p-2 overflow-y-auto">
                    flex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-autoflex w-full h-16 bg-gray-300 break-all p-2
                    overflow-y-auto
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-end border-t-4 border-[#FFFFFF] pt-3">
              <div className="flex flex-row justify-between gap-4">
                <button
                  className="bg-[#FF0000] rounded-full px-10 py-2"
                  onClick={() => handleClick("Cancel")}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function BookingHistoryDonePage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [note, setNote] = useState("");
  const [con, setCon] = useState("");
  const [feed, setFeed] = useState("");

  const handleClick = (status) => {
    switch (status) {
      case "Save":
        console.log(status);
        console.log("Note: " + note);
        console.log("Conclusion: " + con);
        console.log("Feedback: " + feed);
        navigate("/bookinginfo");
        break;
      case "Cancel":
        console.log(status);
        console.log("Cancel");
        navigate("/bookinginfo");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <Topbar />
        <div className="flex flex-1">
          <div className="flex w-72">
            <Sidebar />
          </div>
          <div className="flex-1 flex">
            <Content
              handleClick={handleClick}
              note={note}
              setNote={setNote}
              con={con}
              setCon={setCon}
              feed={feed}
              setFeed={setFeed}
            />
          </div>
        </div>
      </div>
    </>
  );
}
