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
// const dat = response.data
// console.log(dat,"data");

export default function BookingInfoPage() {
  const navigate = useNavigate();
  const [booked, setBooked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const rowsPerPage = 10;

  const handleSelectLocation = (option) => {
    setSelectedLocation(option);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSelectTopic = (option) => {
    setSelectedTopic(option);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setCurrentPage(1); // Reset to the first page
  };
  const clearAllFilters = () => {
    setSelectedLocation("");
    setSelectedTopic("");
    setSelectedStatus("");
    setCurrentPage(1); // Reset to the first page
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <MdOutlineCheckBoxOutlineBlank />;
      case "Feedback":
        setBooked(true);
        console.log(booked);
        return <IoChatboxEllipsesSharp />;
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
    {
      status: "Completed",
      bookingNo: "5",
      uid: "005",
      location: "Online",
      topic: "Topic 2",
      date: "2024-05-27",
    },
    {
      status: "Completed",
      bookingNo: "6",
      uid: "006",
      location: "Online",
      topic: "Topic 3",
      date: "2024-05-28",
    },
    {
      status: "Completed",
      bookingNo: "6",
      uid: "006",
      location: "Online",
      topic: "Topic 3",
      date: "2024-05-28",
    },
    {
      status: "Completed",
      bookingNo: "6",
      uid: "006",
      location: "Online",
      topic: "Topic 3",
      date: "2024-05-28",
    },
    {
      status: "Declined",
      bookingNo: "6",
      uid: "006",
      location: "Online",
      topic: "Topic 3",
      date: "2024-05-28",
    },
    {
      status: "Declined",
      bookingNo: "10",
      uid: "010",
      location: "Onsite",
      topic: "Topic 2",
      date: "2024-05-28",
    },
    {
      status: "Feedback",
      bookingNo: "11",
      uid: "011",
      location: "Online",
      topic: "Topic 2",
      date: "2024-05-28",
    },
    {
      status: "Pending",
      bookingNo: "12",
      uid: "012",
      location: "Onsite",
      topic: "Topic 1",
      date: "2024-05-28",
    },
  ];

  const filteredData = data.filter((item) => {
    return (
      (selectedLocation ? item.location === selectedLocation : true) &&
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
          <div className="text-5xl mb-10">Booking Information</div>
          <div className="flex flex-row gap-4 mb-10 items-center">
            <div className="text-4xl">Filter : </div>
            <Dropdown
              placehold={"Location"}
              options={["Online", "Onsite"]}
              onSelect={handleSelectLocation}
              selected={selectedLocation}
            />
            <Dropdown
              placehold={"Topic"}
              options={["Topic 1", "Topic 2", "Topic 3"]}
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
              className="py-2 px-4 bg-red-500 text-white rounded"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </button>
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
            <tbody>
              {paginatedData.map((row, index) => (
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
