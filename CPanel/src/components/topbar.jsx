import axios from "./axioscreds";

export default function Topbar() {
  const onLogout = () => {
    axios.post("/auth/logout")
      .then(() => {
        window.location.href = "/";
      })
      .catch(error => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="flex justify-between w-full h-auto bg-[#003087] border-1 border-[#003087]">
      <div className="logo">
        <img src="../images/logo.png" width={350} height={100} alt="logo" />
      </div>
      <div className="flex flex-row items-center">
        <h1 className="text-2xl font-bold text-[#FFFFFF]">Admin</h1>
        <button
          className="ml-4 text-lg mr-5 border border-4 border-[#FFFFFF] bg-[#FFFFFF] p-1 rounded-xl"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
