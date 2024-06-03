import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import Dropdown from "../components/dropdown";
import { useState, useEffect } from "react";
import axios from "axios";

// const apiUrl = "http://sardines.thddns.net:7275/forms";

// const response = await axios.get(`${apiUrl}/all`);
// const dat = response.data;
// console.log(dat, "data");

// const getSeverity = (score, type) => {
//   if (type === "d") {
//     if (score >= 14) return { label: "รุนแรงที่สุด", color: "severe" };
//     if (score >= 11) return { label: "รุนแรง", color: "high" };
//     if (score >= 7) return { label: "ปานกลาง", color: "moderate" };
//     if (score >= 5) return { label: "ระดับต่ำ", color: "low" };
//     return { label: "ปกติ", color: "normal" };
//   } else if (type === "a") {
//     if (score >= 10) return { label: "รุนแรงที่สุด", color: "severe" };
//     if (score >= 8) return { label: "รุนแรง", color: "high" };
//     if (score >= 6) return { label: "ปานกลาง", color: "moderate" };
//     if (score >= 4) return { label: "ระดับต่ำ", color: "low" };
//     return { label: "ปกติ", color: "normal" };
//   } else if (type === "s") {
//     if (score >= 17) return { label: "รุนแรงที่สุด", color: "severe" };
//     if (score >= 13) return { label: "รุนแรง", color: "high" };
//     if (score >= 10) return { label: "ปานกลาง", color: "moderate" };
//     if (score >= 8) return { label: "ระดับต่ำ", color: "low" };
//     return { label: "ปกติ", color: "normal" };
//   }
// };

export default function DiagnosisPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFormType, setSelectedFormType] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const [data, setData] = useState([]);
  const [formTypeData, setFormTypeData] = useState([]);
  const rowsPerPage = 10;

  const apiUrl = "http://ligma.sombat.cc:3000/forms"; // Added 'http://'

  const formtypeList = formTypeData.map((item) => item.forms_type);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/all`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchform = async () => {
      try {
        const response = await axios.get(`${apiUrl}/type`);
        setFormTypeData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchform();
    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    return (
      (selectedFormType ? item.forms_type === selectedFormType : true) &&
      (selectedResult ? item.result === selectedResult : true)
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

  // const handleSelectResult = (option) => {
  //   setSelectedResult(option);
  //   setCurrentPage(1); // Reset to the first page
  // };

  const clearAllFilters = () => {
    setSelectedFormType("");
    setSelectedResult("");
    setCurrentPage(1); // Reset to the first page
  };

  const Content = () => {
    return (
      <>
        <div className="flex flex-col flex-1 m-10 relative">
          <div className="text-5xl mb-10">Diagnosis</div>
          <div className="flex flex-row gap-4 mb-10 items-center">
            <div className="text-4xl">Filter : </div>
            <Dropdown
              placehold={"Form Type"}
              options={formtypeList}
              onSelect={handleSelectLocation}
              selected={selectedFormType}
            />
            {/* <Dropdown
              placehold={"Result"}
              options={["Red", "Yellow", "Green"]}
              onSelect={handleSelectResult}
              selected={selectedResult}
            /> */}
            <button
              className="py-2 px-4 bg-red-500 text-white rounded"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#003087] text-white">
                <th className="py-2 px-4 text-3xl text-center rounded-tl-xl">
                  Date
                </th>
                <th className="py-2 px-4 text-3xl text-center ">Form Type</th>
                <th className="py-2 px-4 text-3xl text-center ">Result</th>
                <th className="py-2 px-4 text-3xl text-center rounded-tr-xl">
                  UID
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`transition ease-in-out duration-150 border-2 ${
                    index % 2 === 0 ? "bg-zinc-200" : "bg-gray-300"
                  }
                   `}
                >
                  <td className="py-2 px-4 text-center text-xl">
                    {row.created.substr(0, 10)}
                    {/* {row.date} */}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">
                    {row.forms_type}
                    {/* {row.formType} */}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">
                    {/* D:{row.result.d} A:{row.result.a} S:{row.result.s} */}
                    {row.result
                      ? `D: ${row.result.d} A: ${row.result.a} S: ${row.result.s}`
                      : "null"}
                    {/* {row.result} */}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">
                    {row.user_id}
                    {/* {row.uid} */}
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
