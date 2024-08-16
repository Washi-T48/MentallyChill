import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import axios from "../components/axioscreds";
import { useState } from "react";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const handleRegister = async (data) => {
        try {
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');
            console.log('Sending registration request:', data);
            const response = await axios.post('/auth/register', data, { withCredentials: true });
            console.log('Received response:', response);
            setLoading(false);
            if (response.status === 200 || response.status === 201) {
                console.log('Registration successful:', data);
                const successMessage = `ทำการเพิ่มบัญชีผู้ใช้สำเร็จ\nบัญชีผู้ใช้ : ${data.staff_id}\nรหัสผ่าน: ${data.password}`;
                setSuccessMessage(successMessage);
                setModalOpen(true);
            } else {
                console.log('Unexpected response status:', response.status);
                setErrorMessage('การเพิ่มบัญชีเจ้าหน้าที่ไม่สำเร็จ กรุณาลองอีกครั้ง');
            }
        } catch (error) {
            setLoading(false);
            console.error('Registration error:', error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('การเพิ่มบัญชีเจ้าหน้าที่ไม่สำเร็จ กรุณาลองอีกครั้ง');
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { staff_id, name, surname, nickname, password, confirm_password } = event.target.elements;

        if (password.value !== confirm_password.value) {
            setErrorMessage('รหัสผ่านไม่ตรงกัน');
            return;
        }

        const data = {
            staff_id: staff_id.value,
            name: name.value,
            surname: surname.value,
            nickname: nickname.value,
            password: password.value,
        };
        handleRegister(data);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const Content = () => {
        return (
            <>
                <div className="flex flex-col flex-1 m-5 md:m-10 relative">
                    <div className="text-2xl md:text-5xl mb-6 md:mb-10">เพิ่มบัญชีเจ้าหน้าที่</div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="staff_id" className="block text-gray-700 text-sm font-bold mb-2">บัญขีผู้ใช้</label>
                            <input 
                                type="text" 
                                id="staff_id" 
                                name="staff_id" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">ชื่อ</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="surname" className="block text-gray-700 text-sm font-bold mb-2">นามสกุล</label>
                            <input 
                                type="text" 
                                id="surname" 
                                name="surname" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nickname" className="block text-gray-700 text-sm font-bold mb-2">ชื่อเล่น</label>
                            <input 
                                type="text" 
                                id="nickname" 
                                name="nickname" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">รหัสผ่าน</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirm_password" className="block text-gray-700 text-sm font-bold mb-2">ยื่นยันรหัสผ่าน</label>
                            <input 
                                type="password" 
                                id="confirm_password" 
                                name="confirm_password" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
                        <button 
                            type="submit" 
                            className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={loading}
                        >
                            {loading ? 'กำลังเพิ่มเจ้าหน้าที่...' : 'เพิ่มเจ้าหน้าที่'}
                        </button>
                    </form>
                </div>
            </>
        );
    };

    const Modal = ({ isOpen, onClose, message }) => {
        if (!isOpen) return null;
    
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                    <div className="text-lg font-semibold mb-4 whitespace-pre-line">{message}</div>
                    <button 
                        onClick={onClose} 
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex flex-col flex-1 h-dvh">
                <Topbar/>
                <div className="flex flex-col md:flex-row flex-1">
                    <div className="flex relative w-full md:w-72">
                        <Sidebar/>
                    </div>
                    <Content/>
                </div>
                <Modal 
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    message={successMessage}
                />
            </div>
        </>
    ); 
}
