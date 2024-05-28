import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import Dropdown from "../components/dropdown";
import { useState } from "react";

export default function DiagnosisPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFormType, setSelectedFormType] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const rowsPerPage = 10;

  const data = [
    {
      uid: "001",
      formType: "Type A",
      result: "Red",
      date: "2024-05-25",
    },
    {
      uid: "002",
      formType: "Type B",
      result: "Green",
      date: "2024-05-26",
    },
    {
      uid: "003",
      formType: "Type B",
      result: "Yellow",
      date: "2024-05-26",
    },
    {
      uid: "004",
      formType: "Type B",
      result: "Green",
      date: "2024-05-26",
    },
    {
      uid: "005",
      formType: "Type A",
      result: "Green",
      date: "2024-05-26",
    },
    {
      uid: "006",
      formType: "Type A",
      result: "Green",
      date: "2024-05-26",
    },
    {
      uid: "007",
      formType: "Type C",
      result: "Yellow",
      date: "2024-05-26",
    },
    {
      uid: "008",
      formType: "Type C",
      result: "Red",
      date: "2024-05-26",
    },
    {
      uid: "009",
      formType: "Type B",
      result: "Red",
      date: "2024-05-26",
    },
    {
      uid: "010",
      formType: "Type B",
      result: "Green",
      date: "2024-05-26",
    },
    {
      uid: "011",
      formType: "Type A",
      result: "Yellow",
      date: "2024-05-26",
    },
    {
      uid: "012",
      formType: "Type C",
      result: "Yellow",
      date: "2024-05-26",
    },
  ];

  const filteredData = data.filter((item) => {
    return (
      (selectedFormType ? item.formType === selectedFormType : true) &&
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

  const handleSelectResult = (option) => {
    setSelectedResult(option);
    setCurrentPage(1); // Reset to the first page
  };

  const clearAllFilters = () => {
    setSelectedFormType("");
    setSelectedResult("");
    setCurrentPage(1); // Reset to the first page
  };

  // const Content = () => {
  //   return (
  //     <>
  //       <div className="flex flex-col flex-1 m-10">
  //         <div className="text-5xl mb-10">Diagnosis</div>
  //         <div className="flex flex-row gap-4 mb-10 items-center">
  //           <div className="text-4xl">Filter : </div>
  //           <Dropdown
  //             placehold={"Form Type"}
  //             options={["Type A", "Type B", "Type C"]}
  //             onSelect={handleSelectLocation}
  //             selected={selectedFormType}
  //           />
  //           <Dropdown
  //             placehold={"Result"}
  //             options={["Red", "Yellow", "Green"]}
  //             onSelect={handleSelectResult}
  //             selected={selectedResult}
  //           />
  //           <button
  //             className="py-2 px-4 bg-red-500 text-white rounded"
  //             onClick={clearAllFilters}
  //           >
  //             Clear All Filters
  //           </button>
  //         </div>
  //         <table className="w-full">
  //           <thead>
  //             <tr className="bg-[#FF6900]">
  //               <th className="py-2 px-4 text-3xl text-center">UID</th>
  //               <th className="py-2 px-4 text-3xl text-center">Form Type</th>
  //               <th className="py-2 px-4 text-3xl text-center">Result</th>
  //               <th className="py-2 px-4 text-3xl text-center">Date</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {paginatedData.map((row, index) => (
  //               <tr
  //                 key={index}
  //                 className="bg-[#D3D3D3] border border-[#FFFFFF] border-4"
  //               >
  //                 <td className="py-2 px-4 text-center text-xl">{row.uid}</td>
  //                 <td className="py-2 px-4 text-center text-xl">
  //                   {row.formType}
  //                 </td>
  //                 <td className="py-2 px-4 text-center text-xl">
  //                   {row.result}
  //                 </td>
  //                 <td className="py-2 px-4 text-center text-xl">{row.date}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //         <div className="flex justify-center mt-4">
  //           <button
  //             className="py-2 px-4 mx-2 bg-gray-200 rounded"
  //             onClick={handlePrevPage}
  //             disabled={currentPage === 1}
  //           >
  //             Previous
  //           </button>
  //           <span className="py-2 px-4 mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
  //           <button
  //             className="py-2 px-4 mx-2 bg-gray-200 rounded"
  //             onClick={handleNextPage}
  //             disabled={currentPage === totalPages}
  //           >
  //             Next
  //           </button>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  const Content = () => {
    return (
      <>
        <div className="flex flex-col flex-1 m-10 relative">
          <div className="text-5xl mb-10">Diagnosis</div>
          <div className="flex flex-row gap-4 mb-10 items-center">
            <div className="text-4xl">Filter : </div>
            <Dropdown
              placehold={"Form Type"}
              options={["Type A", "Type B", "Type C"]}
              onSelect={handleSelectLocation}
              selected={selectedFormType}
            />
            <Dropdown
              placehold={"Result"}
              options={["Red", "Yellow", "Green"]}
              onSelect={handleSelectResult}
              selected={selectedResult}
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
                <th className="py-2 px-4 text-3xl text-center ">UID</th>
                <th className="py-2 px-4 text-3xl text-center ">Form Type</th>
                <th className="py-2 px-4 text-3xl text-center ">Result</th>
                <th className="py-2 px-4 text-3xl text-center ">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className="bg-[#D3D3D3] border border-[#FFFFFF] border-4"
                >
                  <td className="py-2 px-4 text-center text-xl">{row.uid}</td>
                  <td className="py-2 px-4 text-center text-xl">
                    {row.formType}
                  </td>
                  <td className="py-2 px-4 text-center text-xl">
                    {row.result}
                  </td>
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
