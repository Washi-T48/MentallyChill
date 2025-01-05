import axios from "../components/axioscreds";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

export default function EditStaffPage() {
  const { staffId } = useParams();
  const [staffData, setStaffData] = useState({
    name: "",
    surname: "",
    nickname: "",
    permission: ""
  });

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`/staff/lookup/${staffId}`);
        setStaffData(response.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaffData();
  }, [staffId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/staff/${staffId}`, staffData);
      alert("Staff data updated successfully!");
    } catch (error) {
      console.error("Error updating staff data:", error);
      alert("Failed to update staff data.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1 flex-row">
        <div className="flex relative w-72">
          <Sidebar />
        </div>
        <div className="w-full overflow-x-hidden">
          <div className="p-4 md:p-10">
            <h1 className="text-3xl mb-6">แก้ไขข้อมูลพนักงาน</h1>
            <div className="mb-4">
              <label className="block text-lg mb-2">ชื่อ</label>
              <input
                type="text"
                name="name"
                value={staffData.name}
                onChange={handleInputChange}
                className="py-2 px-4 rounded border w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">นามสกุล</label>
              <input
                type="text"
                name="surname"
                value={staffData.surname}
                onChange={handleInputChange}
                className="py-2 px-4 rounded border w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">ชื่อเล่น</label>
              <input
                type="text"
                name="nickname"
                value={staffData.nickname}
                onChange={handleInputChange}
                className="py-2 px-4 rounded border w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">สิทธิ์การเข้าถึง</label>
              <input
                type="text"
                name="permission"
                value={staffData.permission}
                onChange={handleInputChange}
                className="py-2 px-4 rounded border w-full"
              />
            </div>
            <button
              onClick={handleSave}
              className="py-2 px-4 bg-blue-500 text-white rounded"
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

