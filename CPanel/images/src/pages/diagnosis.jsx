import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Dropdown from "./dropdown";

export default function DiagnosisPage() {

  const handleSelect = (option) => {
    alert(`You selected: ${option}`);
  };

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
  ];


  const Content = () => {
    return (
      <>
        <div className="flex flex-col flex-1 m-10">
          <div className="text-5xl mb-10">Diagnosis</div>
          <div className="flex flex-row gap-4 mb-10">
            <div className="text-4xl">Filter:</div>
            <Dropdown
              placehold={"Form Type"}
              options={["Type 1", "Type 2", "Type 3"]}
              onSelect={handleSelect}
            />
            <Dropdown
              placehold={"Result"}
              options={["Red", "Yellow", "Green"]}
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
                <th className="py-2 px-4 text-3xl text-center">UID</th>
                <th className="py-2 px-4 text-3xl text-center">Form Type</th>
                <th className="py-2 px-4 text-3xl text-center">Result</th>
                <th className="py-2 px-4 text-3xl text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
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
