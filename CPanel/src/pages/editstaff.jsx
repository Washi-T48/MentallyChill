import axios from "../components/axioscreds";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

export default function EditStaffPage() {
  const { staffId } = useParams();
  const [staffData, setStaffData] = useState({
    staff_id: staffId,
    name: "",
    surname: "",
    nickname: "",
    permission: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`/staff/lookup/${staffId}`);
        setStaffData((prevData) => ({
          ...prevData,
          ...response.data,
          staff_id: staffId, // Ensure staff_id is set
        }));
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
      const updatedData = {
        staff_id: staffData.staff_id, // Ensure staff_id is included
      };
      if (staffData.nickname) {
        updatedData.nickname = staffData.nickname;
      }
      if (staffData.name) {
        updatedData.name = staffData.name;
      }
      if (staffData.surname) {
        updatedData.surname = staffData.surname;
      }
      //   if (staffData.permission) {
      //   updatedData.permission = staffData.permission;
      // }

      console.log("Updated Data:", updatedData); // Log the updated data

      await axios.put(`/staff/update`, updatedData);
      alert("Staff data updated successfully!");
      navigate('/stafflist');
    } catch (error) {
      console.error("Error updating staff data:", error);
      alert("Failed to update staff data.");
    }
  };

  const handleCancel = () => {
    navigate('/stafflist');
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
            <p className="text-3xl mb-6">เลขที่เจ้าหน้าที่: {staffId}</p>
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
            {/* <div className="mb-4">
              <label className="block text-lg mb-2">ตำแหน่ง</label>
              <select
                name="permission"
                defaultValue={staffData.permission}
                value={staffData.permission}
                onChange={handleInputChange}
                className="py-2 px-4 rounded border w-full"
              >
                <option value="administrator">ผู้ดูแลระบบ</option>
                <option value="staff">เจ้าหน้าที่</option>
              </select>
            </div> */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-blue-500 text-white rounded"
              >
                บันทึก
              </button>
              <button
                onClick={handleCancel}
                className="py-2 px-4 bg-gray-500 text-white rounded"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

