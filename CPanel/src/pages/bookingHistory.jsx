import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import axios from "axios";

const Content = ({
  handleClick,
  note,
  setNote,
  con,
  setCon,
  feed,
  setFeed,
  bookingId,
  data,
}) => {
  const appointmentDate = data.appointment_date
    ? data.appointment_date.substring(0, 10)
    : "Not available";

  const appointmentTime = data.appointment_date
    ? data.appointment_date.substring(11, 16)
    : "Not available";
  return (
    <>
      <div className="flex flex-col flex-1 m-10">
        <div className="text-5xl mb-10">Booking History</div>
        <div className="flex flex-row justify-between mb-10 p-3 bg-[#FFF3C7] border border-[#FFF3C7] border-4 rounded-lg">
          <div className="text-4xl font-semibold">Booking ID : {bookingId}</div>
          <div className="text-4xl font-semibold">User ID : {data.user_id}</div>
        </div>
        <div className="flex flex-col flex-1 bg-[#FFAD4D] border border-[#FFAD4D] border-4 rounded-lg h-full ">
          <div className="p-4 flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-row justify-between text-2xl font-medium mb-4">
                <div>Topic : {data.topic}</div>
                <div className="flex flex-row gap-3">
                  <div>{appointmentDate}</div>
                  <div>{appointmentTime}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 text-2xl font-medium mb-4 pt-3 border-t-4 border-[#FFFFFF]">
                <div>Note</div>
                <div>Personal Feedback</div>
              </div>
              <div className="flex flex-row gap-3 mb-4">
                <div className="w-full">
                  <textarea
                    className="flex w-full h-60 bg-gray-100 break-all p-2 mb-2"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="text-2xl font-medium mb-4">Conclusion</div>
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
                <button
                  className="bg-[#24DB36] rounded-full px-10 py-2"
                  onClick={() => handleClick("pass")}
                >
                  Save
                </button>
                <button
                  className="bg-[#FF0000] rounded-full px-10 py-2"
                  onClick={() => handleClick("not")}
                >
                  Cancel
                </button>
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
  const [note, setNote] = useState("");
  const [con, setCon] = useState("");
  const [feed, setFeed] = useState("");
  const [status, setStatus] = useState("Pending");
  const { bookingId } = useParams();
  const apiUrl = "http://ligma.sombat.cc:3000/appointment";
  const [alldata, setAlldata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/lookup/${bookingId}`);
        const data = response.data[0];
        console.log(data, "data");
        console.log(data, "uid");
        setAlldata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [bookingId]);

  useEffect(() => {
    if (status !== "Pending") {
      const postData = async () => {
        try {
          const response = await axios.post(`${apiUrl}/post`, {
            booking_id: bookingId,
            status: status,
            post_note: note,
            post_feedback: feed,
            post_conclusion: con,
          });
          console.log("Response:", response.data);
          navigate("/bookinginfo");
        } catch (error) {
          console.error("Error:", error);
        }
      };

      postData();
    }
  }, [status, bookingId, navigate]);

  const handleClick = (stat) => {
    switch (stat) {
      case "pass":
        setStatus("complete");
        break;
      case "not":
        setStatus("feedback");
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
            note={note}
            setNote={setNote}
            con={con}
            setCon={setCon}
            feed={feed}
            setFeed={setFeed}
            bookingId={bookingId}
            status={status}
            data={alldata}
          />
        </div>
      </div>
    </>
  );
}
