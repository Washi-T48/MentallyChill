import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoChatboxEllipsesSharp } from 'react-icons/io5';
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdOutlineIndeterminateCheckBox } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/dropdown';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import Modal from '../components/rebook';

export default function BookingInfoPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [topicData, setTopicData] = useState([]);
  const rowsPerPage = 10;
  const topicList = topicData.map((item) => item.topic);

  const searchInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/appointment/all`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchtopic = async () => {
      try {
        const response = await axios.get(`/appointment/topic`);
        setTopicData(response.data);
      } catch (error) {
        console.error('Error fetching topic data:', error);
      }
    };

    fetchData();
    fetchtopic();
  }, []);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchTerm]);

  const handleSelectTopic = (option) => {
    setSelectedTopic(option);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const clearAllFilters = () => {
    setSelectedTopic('');
    setSelectedStatus('');
    setSearchTerm('');
    setCurrentPage(1); // Reset to the first page
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <MdOutlineCheckBoxOutlineBlank className="bg-amber-300" />;
      case 'feedback':
        return <IoChatboxEllipsesSharp className="bg-violet-400" />;
      case 'decline':
        return <MdOutlineIndeterminateCheckBox className="bg-red-400" />;
      case 'complete':
        return <MdOutlineCheckBox className="bg-green-400" />;
      default:
        return null;
    }
  };

  const filteredData = data.filter((item) => {
    return (
      (selectedTopic ? item.topic === selectedTopic : true) &&
      (selectedStatus ? item.status === selectedStatus : true) &&
      (searchTerm ? item.user_id.includes(searchTerm.toLowerCase()) : true)
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
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentUserId(null);
  };


  const Content = () => {
    const gotoDetail = (status, bookingId) => {
      if (status === 'pending') {
        navigate(`/bookingdetails/${bookingId}`);
      } else if (status === 'feedback') {
        navigate(`/bookinghistory/${bookingId}`);
      } else if (status === 'complete') {
        navigate(`/bookinghistorydone/${bookingId}`);
      }
      // For "Declined" status, stay on the same page
    };

    const handleRebook = (event, userId) => {
      event.stopPropagation();
      setCurrentUserId(userId);
      setIsModalOpen(true);
    };

    return (
      <div className="flex flex-col flex-1 m-10 relative w-full">
        <div className="grid grid-cols-2">
          <div>
            <div className="text-5xl mb-10">การจอง</div>
            <div className="flex flex-row gap-4 mb-10 items-center">
              <div className="text-4xl">Filter : </div>
              <Dropdown
                placehold={'หัวข้อ'}
                options={topicList}
                onSelect={handleSelectTopic}
                selected={selectedTopic}
              />
              <Dropdown
                placehold={'สถานะ'}
                options={['pending', 'feedback', 'complete', 'decline']}
                onSelect={handleSelectStatus}
                selected={selectedStatus}
              />
              <button
                className="py-2 px-4 bg-red-500 rounded text-white"
                onClick={clearAllFilters}
              >
                ล้างการกรอง
              </button>
              <input
                type="search"
                placeholder="ค้นหาโดยเลขที่ผู้ใช้"
                onChange={handleSearchTermChange}
                value={searchTerm}
                ref={searchInputRef}
                className="py-2 px-4 rounded border"
              />
            </div>
          </div>
          <div className="grid grid-col justify-end mb-5">
            <div className="flex flex-row items-center gap-3 text-xl justify-start">
              <MdOutlineCheckBoxOutlineBlank className="text-3xl bg-amber-300" />
              =<div>รอการยืนยัน</div>
            </div>
            <div className="flex flex-row items-center gap-3 text-xl justify-start">
              <IoChatboxEllipsesSharp className="text-3xl bg-violet-400" />=
              <div>รอการสรุปผล</div>
            </div>
            <div className="flex flex-row items-center gap-3 text-xl justify-start">
              <MdOutlineCheckBox className="text-3xl bg-green-400" />=
              <div>เสร็จสิ้น</div>
            </div>
            <div className="flex flex-row items-center gap-3 text-xl justify-start">
              <MdOutlineIndeterminateCheckBox className="text-3xl bg-red-400" />
              =<div>ปฏิเสธ</div>
            </div>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#003087] text-white">
              <th className="py-2 px-4 text-2xl text-center rounded-tl-xl">สถานะ</th>
              <th className="py-2 px-4 text-2xl text-center">วันที่</th>
              <th className="py-2 px-4 text-2xl text-center">หัวข้อ</th>
              <th className="py-2 px-4 text-2xl text-center">เวลา</th>
              <th className="py-2 px-4 text-2xl text-center">เลขที่ผู้ใช้</th>
              <th className="py-2 px-4 text-2xl text-center">เลขที่การจอง</th>
              <th className="py-2 px-4 text-2xl text-center rounded-tr-xl">จองอีกครั้ง</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className={`transition ease-in-out duration-150 border-2 ${
                  index % 2 === 0 ? 'bg-zinc-200' : 'bg-gray-300'
                } ${
                  row.status === 'decline'
                    ? 'hover:cursor-default'
                    : 'hover:bg-gray-500 hover:text-white hover:cursor-pointer'
                }`}
                onClick={() => gotoDetail(row.status, row.booking_id)}
              >
                <td className="pl-24 text-center text-3xl">{getStatusIcon(row.status)}</td>
                <td className="py-1.5 text-center text-xl">{row.appointment_date.substring(0, 10)}</td>
                <td className="py-1.5 px-4 text-center text-xl">{row.topic}</td>
                <td className="py-1.5 px-4 text-center text-xl">{row.appointment_date.substring(11, 16)}</td>
                {/* <td className="py-1.5 px-4 text-center text-xl">{row.user_id}</td> */}
                <td className="py-1.5 px-4 text-center text-xl">
  <button
    onClick={(e) => {
      e.stopPropagation(); // Prevents the event from triggering other click handlers
      navigate(`/diagnosis?user_id=${row.user_id}`);
    }}
    className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200 ease-in-out z-100"
  >
    {row.user_id}
  </button>
</td>

                <td className="py-1.5 px-4 text-center text-xl">{row.booking_id}</td>
                <td className="py-1 px-4 text-center text-md">
                  {row.status === 'complete' && (
                    <button
                      onClick={(event) => handleRebook(event, row.user_id)}
                      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200 ease-in-out"
                    >
                      จองอีกครั้ง
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center w-full">
          <button
            className="py-2 px-4 mx-2 bg-[#003087] text-white rounded"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            ก่อนหน้า
          </button>
          <span className="py-2 px-4 mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="py-2 px-4 mx-2 bg-[#003087] text-white rounded"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            ถัดไป
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 h-dvh w-full">
      <Topbar />
      <div className="flex flex-row flex-1">
        <div className="flex relative w-72">
          <Sidebar />
        </div>
        <Content />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={() => {
          setIsModalOpen(false);
          setCurrentPage(1);
        }}
        userId={currentUserId}
        topicData= "นัดหมายเพิ่มเติม"
        statusdata= "pending"
      />
    </div>
  );
}
