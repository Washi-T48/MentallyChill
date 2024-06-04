import Topbar from "./topbar";
import Sidebar from "./sidebar";

export default function DashboardPage() {
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
            <div className="grid gap-y pb-5 font-chula">Booking request</div>
            <div font-chula>9</div>
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
        <div className="flex gap-x-20 m-10">
          <div className="border border-sky-500 rounded-md bg-[#FFFFFF] h-full w-30 p-2">
            <div className="grid gap-y-2">Recent Diagnosis</div>
            <div>1</div>
          </div>
          <div className="border border-sky-500 rounded-md bg-[#FFFFFF] h-full w-30 p-2">
            <div className="grid gap-y-2">Recent Booking infomation</div>
            <div>1</div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}
