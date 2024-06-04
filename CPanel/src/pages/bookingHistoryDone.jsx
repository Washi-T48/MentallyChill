import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

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
      <div className="m-10 w-full flex flex-col">
        <div className="text-5xl mb-10">Booking History Done</div>
        <div className="flex flex-row justify-between text-4xl bg-[#FFF3C7] p-3 rounded-lg border border-4 border-[#FFF3C7] mb-10">
          <div>Booking ID : {bookingId}</div>
          <div className="col-start-3">User ID : {data.user_id}</div>
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
                  <div className="flex w-full h-60 bg-gray-300 break-all p-2 mb-2 overflow-y-auto">
                    {data.post_note}
                  </div>
                  <div className="text-2xl font-medium mb-4">Conclusion</div>
                  <div className="flex w-full h-16 bg-gray-300 break-all p-2 overflow-y-auto">
                    {data.post_conclusion}
                  </div>
                </div>
                <div className="flex w-full justify-end">
                  <div className="flex w-full h-[360px] bg-gray-300 break-all p-2 overflow-y-auto">
                    {data.post_feedback}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-end border-t-4 border-[#FFFFFF] pt-3">
              <div className="flex flex-row justify-between gap-4">
                <button
                  className="bg-[#FF0000] rounded-full px-10 py-2"
                  onClick={() => handleClick()}
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
  const [note, setNote] = useState("");
  const [con, setCon] = useState("");
  const [feed, setFeed] = useState("");
  const { bookingId } = useParams();
  const apiUrl = import.meta.env.VITE_API_PATH;
  const [alldata, setAlldata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/appointment/lookup/${bookingId}`);
        const data = response.data[0];
        console.log(data, "data");
        setAlldata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [bookingId]);

  const handleClick = () => {
    navigate("/bookinginfo");
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
              bookingId={bookingId}
              data={alldata}
            />
          </div>
        </div>
      </div>
    </>
  );
}
