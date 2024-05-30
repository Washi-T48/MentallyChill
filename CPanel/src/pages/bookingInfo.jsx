import { useNavigate } from "react-router-dom";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import Dropdown from "../components/dropdown";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";

// const apiUrl = "http://sardines.thddns.net:7275/appointment";

// const response = await axios.get(`${apiUrl}/all`);
// const dat = response.data;
// console.log(dat, "data");

export default function BookingInfoPage() {
  const navigate = useNavigate();
  const [booked, setBooked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const rowsPerPage = 10;

  const handleSelectTopic = (option) => {
    setSelectedTopic(option);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setCurrentPage(1); // Reset to the first page
  };
  const clearAllFilters = () => {
    setSelectedTopic("");
    setSelectedStatus("");
    setCurrentPage(1); // Reset to the first page
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <MdOutlineCheckBoxOutlineBlank className="bg-amber-300" />;
      case "Feedback":
        setBooked(true);
        console.log(booked);
        return <IoChatboxEllipsesSharp className="bg-violet-400" />;
      case "Declined":
        return <MdOutlineIndeterminateCheckBox className="bg-red-400" />;
      case "Completed":
        setBooked(true);
        return <MdOutlineCheckBox className="bg-green-400" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-300";
      case "Feedback":
        return "bg-blue-400";
      case "Completed":
        return "bg-green-400";
      case "Declined":
        return "bg-red-400";
      default:
        return "bg-[#D3D3D3]";
    }
  };

  const data = [
    {
      status: "Pending",
      bookingNo: "1",
      uid: "001",
      topic: "Study",
      date: "2024-05-25",
      time: "09:00",
    },
    {
      status: "Feedback",
      bookingNo: "2",
      uid: "002",
      topic: "Bullying",
      date: "2024-05-26",
      time: "10:00",
    },
    {
      status: "Declined",
      bookingNo: "3",
      uid: "003",
      topic: "Family",
      date: "2024-05-26",
      time: "11:00",
    },
    {
      status: "Pending",
      bookingNo: "4",
      uid: "004",
      topic: "Study",
      date: "2024-05-26",
      time: "12:00",
    },
    {
      status: "Completed",
      bookingNo: "5",
      uid: "005",
      topic: "Drugs",
      date: "2024-05-27",
      time: "13:00",
    },
    {
      status: "Feedback",
      bookingNo: "6",
      uid: "006",
      topic: "Relationship",
      date: "2024-05-28",
      time: "14:00",
    },
    {
      status: "Completed",
      bookingNo: "6",
      uid: "006",
      topic: "Family",
      date: "2024-05-28",
      time: "15:00",
    },
    {
      status: "Completed",
      bookingNo: "6",
      uid: "006",
      topic: "Family",
      date: "2024-05-28",
      time: "16:00",
    },
    {
      status: "Declined",
      bookingNo: "6",
      uid: "006",
      topic: "Family",
      date: "2024-05-28",
      time: "17:00",
    },
    {
      status: "Declined",
      bookingNo: "10",
      uid: "010",
      topic: "Drugs",
      date: "2024-05-28",
      time: "18:00",
    },
    {
      status: "Feedback",
      bookingNo: "11",
      uid: "011",
      topic: "Drugs",
      date: "2024-05-28",
      time: "19:00",
    },
    {
      status: "Pending",
      bookingNo: "12",
      uid: "012",
      topic: "Study",
      date: "2024-05-28",
      time: "20:00",
    },
  ];

  const filteredData = data.filter((item) => {
    return (
      (selectedTopic ? item.topic === selectedTopic : true) &&
      (selectedStatus ? item.status === selectedStatus : true)
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
        <div className="flex flex-col flex-1 m-10 relative">
          <div className="grid grid-cols-2">
            <div>
              <div className="text-5xl mb-10">Booking Information</div>
              <div className="flex flex-row gap-4 mb-10 items-center">
                <div className="text-4xl">Filter : </div>
                <Dropdown
                  placehold={"Topic"}
                  options={[
                    "Study",
                    "Relationship",
                    "Family",
                    "Bullying",
                    "Drugs",
                  ]}
                  onSelect={handleSelectTopic}
                  selected={selectedTopic}
                />
                <Dropdown
                  placehold={"Status"}
                  options={["Pending", "Feedback", "Completed", "Declined"]}
                  onSelect={handleSelectStatus}
                  selected={selectedStatus}
                />
                <button
                  className="py-2 px-4 bg-red-500 rounded"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
            <div className="grid grid-col justify-end mb-5">
              <div className="flex flex-row items-center  gap-3 text-xl justify-start">
                <MdOutlineCheckBoxOutlineBlank className="text-3xl bg-amber-300" />
                =<div>Pending</div>
              </div>
              <div className="flex flex-row items-center gap-3 text-xl justify-start">
                <IoChatboxEllipsesSharp className="text-3xl bg-violet-400" />=
                <div>Feedback</div>
              </div>
              <div className="flex flex-row items-center gap-3 text-xl justify-start">
                <MdOutlineIndeterminateCheckBox className="text-3xl bg-green-400" />
                =<div>Complete</div>
              </div>
              <div className="flex flex-row items-center gap-3 text-xl justify-start">
                <MdOutlineCheckBox className="text-3xl bg-red-400" />=
                <div>Decline</div>
              </div>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#003087] text-white">
                <th className="py-2 px-4 text-3xl text-center rounded-tl-xl">
                  Status
                </th>
                <th className="py-2 px-4 text-3xl text-center">Date</th>
                <th className="py-2 px-4 text-3xl text-center">Topic</th>
                <th className="py-2 px-4 text-3xl text-center">Time</th>
                <th className="py-2 px-4 text-3xl text-center">UID</th>
                <th className="py-2 px-4 text-3xl text-center rounded-tr-xl">
                  Booking ID
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`transition ease-in-out duration-150 border-2 ${
                    index % 2 === 0 ? "bg-zinc-200" : "bg-gray-300"
                  } ${
                    row.status === "Declined"
                      ? "bg-red-300"
                      : "hover:bg-gray-500 hover:text-white hover:cursor-pointer"
                  }`}
                  onClick={() => gotoDetail(row.status)}
                >
                  <td className={`pl-24 text-center text-3xl`}>
                    {getStatusIcon(row.status)}
                    {/* {row.appointment_date.substring(0, 10)} */}
                  </td>
                  <td className="py-2 text-center text-xl">
                    {/* {row.appointment_date.substring(0, 10)} */}
                    {row.date}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">{row.topic}</td>
                  <td className="py-2 px-4 text-center text-xl">
                    {/* {row.appointment_date.substring(11, 16)} */}
                    {row.time}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">
                    {/* {row.user_id} */}
                    {row.uid}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">
                    {/* {row.booking_id} */}
                    {row.bookingNo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center w-full">
            <button
              className="py-2 px-4 mx-2 bg-gray-200 rounded"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="py-2 px-4 mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              className="py-2 px-4 mx-2 bg-gray-200 rounded"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
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
