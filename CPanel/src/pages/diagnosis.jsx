import axios from "../components/axioscreds";
import { useEffect, useState, useRef } from "react";
import Dropdown from "../components/dropdown";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { useLocation } from "react-router-dom";

export default function DiagnosisPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFormType, setSelectedFormType] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const [data, setData] = useState([]);
  const [formTypeData, setFormTypeData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // New state for sorting
  const rowsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
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

    const fetchform = async () => {
      try {
        const response = await axios.get(`/forms/type`);
        setFormTypeData(response.data);
        console.log(response.data);
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

  // Sort the data based on the created date
  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // const filteredData = sortedData.filter((item) => {
  //   return (
  //     (selectedFormType ? item.forms_type === selectedFormType : true) &&
  //     (selectedResult ? item.result === selectedResult : true) &&
  //     (searchTerm ? item.user_id.includes(searchTerm.toLowerCase()) : true)
  //   );
  // });

  const filteredData = sortedData.filter((item) => {
    return (
      (selectedFormType ? item.forms_type === selectedFormType : true) &&
      (selectedResult ? item.result === selectedResult : true) &&
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
    setCurrentPage(1); // Reset to the first page
  };

  const handleSelectResult = (option) => {
    setSelectedResult(option);
    setCurrentPage(1); // Reset to the first page
  };

  const clearAllFilters = () => {
    setSelectedFormType("");
    setSelectedResult("");
    setCurrentPage(1); // Reset to the first page
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setCurrentPage(1); // Reset to the first page
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const Content = () => {
    return (
      <>
        <div className="flex flex-col flex-1 m-10 relative">
          <div className="text-5xl mb-10">ผลการประเมิน</div>
          <div className="flex flex-row gap-4 mb-10 items-center">
            <div className="text-4xl">ตัวกรอง : </div>
            <Dropdown
              placehold={"ประเภทแบบฟอร์ม"}
              options={formtypeList}
              onSelect={handleSelectLocation}
              selected={selectedFormType}
            />
            <Dropdown
              placehold={"ผลการประเมิน"}
              options={["ร้ายแรง", "ปานกลาง", "ปกติ"]}
              onSelect={handleSelectResult}
              selected={selectedResult}
            />
            <button
              className="py-2 px-4 bg-red-500 text-white rounded"
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
          <table className="w-full">
            <thead>
              <tr className="bg-[#003087] text-white">
                <th className="py-2 px-4 text-3xl text-center rounded-tl-xl">
                  วันที่
                  <button
                    onClick={toggleSortOrder}
                    className="ml-2 py-1 px-2 bg-gray-300 text-black rounded text-2xl"
                  >
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </button>
                </th>
                <th className="py-2 px-4 text-3xl text-center">ประเภทแบบฟอร์ม</th>
                <th className="py-2 px-4 text-3xl text-center">ผลการประเมิน</th>
                <th className="py-2 px-4 text-3xl text-center rounded-tr-xl">
                  เลขที่ผู้ใช้
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`transition ease-in-out duration-150 border-2 ${index % 2 === 0 ? "bg-zinc-200" : "bg-gray-300"
                    }`}
                >
                  <td className="py-2 px-4 text-center text-xl">
                    {row.created.substr(0, 10)}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">
                    {row.forms_type}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">
                    {row.result
                      ? `D: ${row.result.d} A: ${row.result.a} S: ${row.result.s}`
                      : "null"}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">
                    {row.user_id}
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

