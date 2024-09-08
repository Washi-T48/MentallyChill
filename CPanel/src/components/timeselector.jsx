import axios from './axioscreds';
import React, { useState, useEffect } from 'react';

const generateTimeSlots = () => {
  const times = [];
  for (let i = 6; i < 24; i++) { // change frome 0 AM to 11 PM to 6 AM to 11 PM
    for (let j = 0; j < 60; j += 30) {
      const hour = i.toString().padStart(2, '0');
      const minute = j.toString().padStart(2, '0');
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

const TimeSelectorModal = ({ day, month, year, onClose, onSave }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [filteredEndTimes, setFilteredEndTimes] = useState([]);
  const [staffData, setStaffData] = useState(null);
  const timeSlots = generateTimeSlots();

  useEffect(() => {
    if (startTime) {
      const startIndex = timeSlots.indexOf(startTime);
      setFilteredEndTimes(timeSlots.slice(startIndex + 1));
    } else {
      setFilteredEndTimes([]);
    }
  }, [startTime]);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get('/auth/check');
        setStaffData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStaffData();
  }, []);

  const handleSave = async () => {
    const date = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    try {
      await axios.post('/timetable/new', {
        staff_id: staffData.staff_id,
        date: date,
        time_start: startTime,
        time_end: endTime,
      });
      onSave(date);
      console.log(date);
    } catch (error) {
      console.error('Error saving data:', error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          เลือกเวลาในวันที่ {new Date(year, month, day).toDateString()}
        </h2>
        <div className="mb-4">
          <label className="block mb-2">เวลาเริ่มต้น</label>
          <select
            className="w-full p-2 border rounded"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="">เลือกเวลาเริ่มต้น</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">เวลาสิ้นสุด</label>
          <select
            className="w-full p-2 border rounded"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={!startTime}
          >
            <option value="">เลือกเวลาสิ้นสุด</option>
            {filteredEndTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded mr-2"
            onClick={onClose}
          >
            ยกเลิก
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={handleSave}
            disabled={!startTime || !endTime}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelectorModal;