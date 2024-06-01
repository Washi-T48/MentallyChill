import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";

export default function DashboardPage() {
  const diagdata = [
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
  ];

  const bookingdata = [
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
  ];

  // Get recent diagnosis data with maximum 5 rows
  const recentDiagnosis = diagdata.slice(0, 5);

  // Get recent booking information with maximum 5 rows
  const recentBookingInfo = bookingdata.slice(0, 5);

  return (
    <>
      <div className="flex flex-col flex-1 h-dvh">
        <Topbar />
        <div className="flex flex-row flex-1">
          <div className="flex relative w-72">
            <Sidebar />
          </div>
          <div className="">
            <div className="grid grid-cols-3 gap-x-48 m-10">
              <div className="flex flex-row items-end justify-between border-4 border-sky-400 rounded-md bg-sky-400 h-full w-80 p-5">
                <div className="text-lg text-gray-200">Booking request</div>
                <div className="text-7xl text-white">27</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-violet-400 rounded-md bg-violet-400 h-full w-80 p-5">
                <div className="text-lg text-gray-100">Diagnosis done</div>
                <div className="text-7xl text-white">56</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-48 mx-10 my-5 mb-20">
              <div className="flex flex-row items-end justify-between border-4 border-green-500 rounded-md bg-green-500 h-full w-80 p-5">
                <div className="text-lg text-gray-100">Mild</div>
                <div className="text-7xl text-white">56</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-amber-400 rounded-md bg-amber-400 h-full w-80 p-5">
                <div className="text-lg text-gray-100">Moderate</div>
                <div className="text-7xl text-white">56</div>
              </div>
              <div className="flex flex-row items-end justify-between border-4 border-rose-400 rounded-md bg-rose-400 h-full w-80 p-5">
                <div className="text-lg text-gray-100">Severe</div>
                <div className="text-7xl text-white">56</div>
              </div>
            </div>
            <div className="grid grid-cols-2 mx-10 my-5 gap-5">
              <div className="">
                <div className="mb-3 text-2xl">Recent Booking</div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-emerald-400">
                      <th className="py-2 px-4">Booking No</th>
                      <th className="py-2 px-4">Topic</th>
                      <th className="py-2 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDiagnosis.map((diag, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } text-center`}
                      >
                        <td className="py-2 px-4">{diag.bookingNo}</td>
                        <td className="py-2 px-4">{diag.topic}</td>
                        <td className="py-2 px-4">{diag.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div className="mb-3 text-2xl">Recent Diagnosis</div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-sky-300">
                      <th className="py-2 px-4">UID</th>
                      <th className="py-2 px-4">Form Type</th>
                      <th className="py-2 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookingInfo.map((book, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } text-center`}
                      >
                        <td className="py-2 px-4">{book.uid}</td>
                        <td className="py-2 px-4">{book.formType}</td>
                        <td className="py-2 px-4">{book.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
