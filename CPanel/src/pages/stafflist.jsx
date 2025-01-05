import axios from "../components/axioscreds";
import { useEffect, useState, useRef } from "react";
import Dropdown from "../components/dropdown";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { useLocation } from "react-router-dom";

export default function StaffListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userIdFromQuery = queryParams.get('user_id');

  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/staff/all`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (userIdFromQuery) {
      setSearchTerm(userIdFromQuery);
    }
  }, [userIdFromQuery]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const Content = () => {
    return (
      <div className="flex flex-col flex-1 p-4 md:p-10 relative">
        <div className="flex flex-col md:flex-row gap-6 mb-6 text-center items-center">
          <h1 className="text-3xl md:text-5xl">รายชื่อเจ้าหน้าที่</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6 md:mb-10 items-start md:items-center">
          <h2 className="text-2xl md:text-4xl mb-2 md:mb-0">ค้นหาโดยเลขที่ผู้ใช้ : </h2>
          <input
            type="search"
            placeholder="ค้นหาโดยเลขที่ผู้ใช้"
            onChange={handleSearchTermChange}
            value={searchTerm}
            ref={searchInputRef}
            className="py-2 px-4 rounded border w-full md:w-auto"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#003087] text-white">
                <th className="py-2 px-4 text-lg md:text-3xl text-center rounded-tl-xl">
                  เลขที่เจ้าหน้าที่
                </th>
                <th className="py-2 px-4 text-lg md:text-3xl text-center">ชื่อเจ้าหน้าที่</th>
                <th className="py-2 px-4 text-lg md:text-3xl text-center">ชื่อเล่น</th>
                <th className="py-2 px-4 text-lg md:text-3xl text-center rounded-tr-xl">
                  แก้ไข
                </th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((item) => item.user_id.includes(searchTerm.toLowerCase()))
                .map((row, index) => (
                  <tr
                    key={index}
                    className="transition ease-in-out duration-150 border-2 bg-gray-300"
                  >
                    <td className="py-2 px-4 text-center text-sm md:text-xl">
                      {row.user_id}
                    </td>
                    <td className="py-2 px-4 text-center text-sm md:text-xl">
                      {row.name}
                    </td>
                    <td className="py-2 px-4 text-center text-sm md:text-xl">
                      {row.nickname}
                    </td>
                    <td className="py-2 px-4 text-center text-sm md:text-xl">
                      {row.email}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="grid">
      <Topbar />
      <div className="flex flex-1 h-[897px]">
        <div className={`flex relative w-72`}>
          <Sidebar />
        </div>
        <Content />
      </div>
    </div>
  );
}
