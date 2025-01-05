import axios from "../components/axioscreds";
import { useEffect, useState, useRef } from "react";
import Dropdown from "../components/dropdown";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { useLocation } from "react-router-dom";

export default function StaffListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFormType, setSelectedFormType] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [formTypeData, setFormTypeData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userIdFromQuery = queryParams.get('user_id');

  const searchInputRef = useRef(null);

  const formtypeList = formTypeData.map((item) => item.forms_type);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/forms/all`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await axios.get(`/staff/all`);
        setData2(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchform = async () => {
      try {
        const response = await axios.get(`/forms/type`);
        setFormTypeData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchform();
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRowsPerPage(5);
      } else if (window.innerWidth < 1024) {
        setRowsPerPage(8);
      } else {
        setRowsPerPage(10);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const getResultCategory = (d, a, s) => {
    const dCategory = d <= 6 ? "ปกติ" : d <= 13 ? "ปานกลาง" : "ร้ายแรง";
    const aCategory = a <= 5 ? "ปกติ" : a <= 9 ? "ปานกลาง" : "ร้ายแรง";
    const sCategory = s <= 9 ? "ปกติ" : s <= 16 ? "ปานกลาง" : "ร้ายแรง";

    const categories = [dCategory, aCategory, sCategory];
    if (categories.includes("ร้ายแรง")) return "ร้ายแรง";
    if (categories.includes("ปานกลาง")) return "ปานกลาง";
    return "ปกติ";
  };

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const filteredData = sortedData.filter((item) => {
    const resultCategory = item.result ? getResultCategory(item.result.d, item.result.a, item.result.s) : "";
    return (
      (selectedFormType ? item.forms_type === selectedFormType : true) &&
      (selectedResult ? resultCategory === selectedResult : true) &&
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

  const handleSelectLocation = (option) => {
    setSelectedFormType(option);
    setCurrentPage(1);
  };

  const handleSelectResult = (option) => {
    setSelectedResult(option);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedFormType("");
    setSelectedResult("");
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

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
          <h2 className="text-2xl md:text-4xl mb-2 md:mb-0">ตัวกรอง : </h2>
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
                  {/* <button
                    onClick={toggleSortOrder}
                    className="ml-2 py-1 px-2 bg-gray-300 text-black rounded text-sm md:text-2xl"
                  >
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </button> */}
                </th>
                <th className="py-2 px-4 text-lg md:text-3xl text-center">ชื่อเจ้าหน้าที่</th>
                <th className="py-2 px-4 text-lg md:text-3xl text-center">ชื่อเล่น</th>
                <th className="py-2 px-4 text-lg md:text-3xl text-center rounded-tr-xl">
                  แก้ไข
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`transition ease-in-out duration-150 border-2 ${
                    index % 2 === 0 ? "bg-zinc-200" : "bg-gray-300"
                  }`}
                >
                  <td className="py-2 px-4 text-center text-sm md:text-xl">
                    {row.created.substr(0, 10)}
                  </td>
                  <td className="py-2 px-4 text-center text-sm md:text-xl">
                    {row.forms_type}
                  </td>
                  <td className="py-2 px-4 text-center text-sm md:text-xl">
                    {row.result
                      ? `${getResultCategory(row.result.d, row.result.a, row.result.s)} (D: ${row.result.d} A: ${row.result.a} S: ${row.result.s})`
                      : "null"}
                  </td>
                  <td className="py-2 px-4 text-center text-sm md:text-xl">
                    {row.user_id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center w-full">
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
