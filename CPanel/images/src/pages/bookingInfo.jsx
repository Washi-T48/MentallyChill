import { useNavigate } from "react-router-dom";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Dropdown from "./dropdown";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { useState } from "react";


export default function BookingInfoPage() {

  const navigate = useNavigate();
  const [booked, setBooked] = useState(false);

  const handleSelect = (option) => {
    alert(`You selected: ${option}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <MdOutlineCheckBoxOutlineBlank />;
      case "Feedback":
        setBooked(true);
        console.log(booked);
        return <IoChatboxEllipsesSharp />
      case "Declined":
        return <MdOutlineIndeterminateCheckBox />;
      case "Completed":
        setBooked(true);
        return <MdOutlineCheckBox />;
      default:
        return null;
    }
  };

  const data = [
    {
      status: "Pending",
      bookingNo: "1",
      uid: "001",
      location: "Online",
      topic: "Topic 1",
      date: "2024-05-25",
    },
    {
      status: "Feedback",
      bookingNo: "2",
      uid: "002",
      location: "Onsite",
      topic: "Topic 2",
      date: "2024-05-26",
    },
    {
      status: "Declined",
      bookingNo: "3",
      uid: "003",
      location: "Onsite",
      topic: "Topic 3",
      date: "2024-05-26",
    },
    {
      status: "Completed",
      bookingNo: "4",
      uid: "004",
      location: "Online",
      topic: "Topic 1",
      date: "2024-05-26",
    },
  ];



  const Content = () => {

    const gotoDetail = (status) => {
      if (status === "Pending") {
        navigate("/bookingdetails");
      } else if (status === "Feedback") {
        navigate("/bookinghistory");
      } else if (status === "Completed") {
        navigate("/bookinghistorydone");
      }
      // For "Declined" status, stay on the same page
    };
  
    return (
      <>
        <div className="flex flex-col flex-1 m-10">
          <div className="text-5xl mb-10">Booking Information</div>
          <div className="flex flex-row gap-4 mb-10">
            <div className="text-4xl">Filter:</div>
            <Dropdown
              placehold={"Location"}
              options={["Online", "Onsite"]}
              onSelect={handleSelect}
            />
            <Dropdown
              placehold={"Topic"}
              options={["Topic 1", "Topic 2", "Topic 3"]}
              onSelect={handleSelect}
            />
            {/* <div className="text-4xl ml-auto">Search:</div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-md"
            /> */}
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#FF6900]">
                <th className="py-2 px-4 text-3xl text-center">Booking No.</th>
                <th className="py-2 px-4 text-3xl text-center">UID</th>
                <th className="py-2 px-4 text-3xl text-center">Location</th>
                <th className="py-2 px-4 text-3xl text-center">Topic</th>
                <th className="py-2 px-4 text-3xl text-center">Date</th>
              </tr>
            </thead>
            <tbody >
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="transition-colors duration-300 hover:bg-[#B6B6B6] bg-[#D3D3D3] border border-[#FFFFFF] border-4"
                  onClick={() => gotoDetail(row.status)}
                >
                  <td className="flex py-2 px-4 text-center text-xl items-center gap-32">
                    {getStatusIcon(row.status)}
                    {row.bookingNo}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">{row.uid}</td>
                  <td className="py-2 px-4 text-center text-xl">
                    {row.location}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">{row.topic}</td>
                  <td className="py-2 px-4 text-center text-xl">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col flex-1 h-dvh">
        <Topbar />
        <div className="flex flex-row flex-1">
          <div className="flex relative w-72">
            <Sidebar />
          </div>
          <Content />
        </div>
      </div>
    </>
  );
}
