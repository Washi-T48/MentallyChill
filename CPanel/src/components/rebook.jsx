import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from './dropdown';

export default function Modal({ isOpen, onClose, onSubmit, userId, topicData, statusdata }) {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [contactMethod, setContactMethod] = useState('เบอร์โทร');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      axios.get('/staff/all')
        .then(response => {
          const formattedStaffList = response.data.map(staff => ({
            value: staff.staff_id,
            label: `${staff.staff_id} - ${staff.nickname}`
          }));
          setStaffList(formattedStaffList);
        })
        .catch(error => {
          console.error('Error fetching staff data:', error);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedStaff && appointmentDate) {
      const [staff_id] = selectedStaff.split(' - ');
      axios.post('/timetable/getStaffTimeByDate', { staff_id, date: appointmentDate })
        .then(response => {
          setTimeSlots(response.data);
        })
        .catch(error => {
          console.error('Error fetching timetable data:', error);
        });
    }
  }, [selectedStaff, appointmentDate]);

  useEffect(() => {
    if (formSubmitted) {
      window.location.reload();
    }
  }, [formSubmitted]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData.entries());
    const [staff_id] = selectedStaff.split(' - ');

    const appointmentData = {
      uid: userId,
      tel: contactMethod === 'เบอร์โทร' ? formProps.tel : '',
      medDoctor: staff_id,
      contactMethod: formProps.contactMethod,
      date: formProps.appointmentDate,
      time: formProps.appointmentTime,
      topic: topicData,
      detail: formProps.detail,
      medHistory: formProps.medHistory
    };

    axios.post('/appointment/new', appointmentData)
      .then(response => {
        onSubmit(response.data);
        setFormSubmitted(true);
      })
      .catch(error => {
        console.error('Error submitting appointment:', error);
      });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl mb-4">นัดหมายขอรับคำปรึกษาอีกครั้ง</h2>
        <div className="mb-4 text-2xl">
          <label className="block text-gray-700">เลขที่ผู้ใช้ : {userId}</label>
          <label className="block text-gray-700">หัวข้อ : {topicData}</label>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div>ผู้ให้คำปรึกษา</div>
            <Dropdown
              name="medDoctor"
              placehold="เลือกผู้ให้คำปรึกษา"
              options={staffList.map(staff => staff.label)}
              onSelect={setSelectedStaff}
              selected={selectedStaff}
              required
            />
          </div>
          <div className="mb-4">
            <div>วิธีการติดต่อ</div>
            <div>
              <label>
                <input
                  type="radio"
                  name="contactMethod"
                  value="เบอร์โทร"
                  checked={contactMethod === 'เบอร์โทร'}
                  onChange={(e) => setContactMethod(e.target.value)}
                />
                เบอร์โทร
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="contactMethod"
                  value="Google Meets"
                  checked={contactMethod === 'Google Meets'}
                  onChange={(e) => setContactMethod(e.target.value)}
                />
                Google Meets
              </label>
            </div>
          </div>
          {contactMethod === 'เบอร์โทร' && (
            <div className="mb-4">
              <div>เบอร์ติดต่อ</div>
              <input
                name="tel"
                type="text"
                required
                className="w-full border rounded p-2"
              />
            </div>
          )}
          <div className="mb-4">
            <div>รายละเอียด</div>
            <input
              name="detail"
              type="text"
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <div>ประวัติการรับยา</div>
            <input
              name="medHistory"
              type="text"
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">วันที่</label>
            <input
              name="appointmentDate"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">เวลา</label>
            <select
              name="appointmentTime"
              required
              className="w-full border rounded p-2"
            >
              {timeSlots.length > 0 ? timeSlots.map((slot, index) => (
                <option key={index} value={slot.time_start}>
                  {slot.time_start} - {slot.time_end}
                </option>
              )) : (
                <option value="" disabled>ไม่มีเวลาว่าง</option>
              )}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 py-2 px-4 bg-gray-300 rounded"
              onClick={onClose}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded"
            >
              ยืนยันการจอง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
