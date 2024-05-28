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
              <div className="border-4 border-[#D29701] rounded-md bg-[#FFFFFF] h-full w-80 p-5 text-2xl">
                <div className="grid gap-y pb-5 font-chula">
                  Booking request
                </div>
                <div>9</div>
              </div>
              <div className="border-4 border-[#038400] rounded-md bg-[#FFFFFF] h-full w-80 p-5 text-2xl">
                <div className="grid gap-y pb-5">Diagnosis done</div>
                <div>9</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-48 m-10">
              <div className="border-4 border-[#EAE000] rounded-md bg-[#FFFFFF] h-full w-80 p-5 text-2xl">
                <div className="grid gap-y-2 pb-5">Yellow result</div>
                <div>1</div>
              </div>
              <div className="border-4 border-[#2CDE29] rounded-md bg-[#FFFFFF] h-full w-80 p-5 text-2xl">
                <div className="grid gap-y-2 pb-5">Green result</div>
                <div>1</div>
              </div>
              <div className="border-4 border-[#DF0000] rounded-md bg-[#FFFFFF] h-full w-80 p-5 text-2xl">
                <div className="grid gap-y-2 pb-5">Red result</div>
                <div>1</div>
              </div>
            </div>
            <div className="grid grid-cols-2 m-10">
              <div className="gap-y-2">Recent Diagnosis</div>
              <div className="gap-y-2">Recent Diagnosis</div>
            </div>
            {/* <div className="flex flex-row">
                <table>
                  <thead>
                    <tr>
                      <th>Booking No</th>
                      <th>UID</th>
                      <th>Location</th>
                      <th>Topic</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDiagnosis.map((diag, index) => (
                      <tr key={index}>
                        <td>{diag.bookingNo}</td>
                        <td>{diag.uid}</td>
                        <td>{diag.location}</td>
                        <td>{diag.topic}</td>
                        <td>{diag.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
