import axios from './axioscreds';
import React, { useState, useEffect } from 'react';

const generateTimeSlots = () => {
  const times = [];
  for (let i = 6; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i.toString().padStart(2, '0');
      const minute = j.toString().padStart(2, '0');
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

const DefaultTimeModal = ({ month, year, onClose, onSave }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [filteredEndTimes, setFilteredEndTimes] = useState([]);
  const [staffData, setStaffData] = useState(null);
  const [warning, setWarning] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  });
  const timeSlots = generateTimeSlots();

  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const dayNames = {
    monday: 'จันทร์',
    tuesday: 'อังคาร',
    wednesday: 'พุธ',
    thursday: 'พฤหัสบดี',
    friday: 'ศุกร์',
    saturday: 'เสาร์',
    sunday: 'อาทิตย์'
  };

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

  const handleDayToggle = (day) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const getDaysOfMonth = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      
      // Map JavaScript day (0=Sunday) to our day keys
      const dayMapping = {
        0: 'sunday',
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
        6: 'saturday'
      };

      if (selectedDays[dayMapping[dayOfWeek]]) {
        days.push(day);
      }
    }

    return days;
  };

  const handleSave = async () => {
    if (!startTime || !endTime) {
      setWarning('กรุณาเลือกเวลาเริ่มต้นและสิ้นสุด');
      return;
    }

    const selectedDaysList = Object.keys(selectedDays).filter(day => selectedDays[day]);
    if (selectedDaysList.length === 0) {
      setWarning('กรุณาเลือกอย่างน้อย 1 วัน');
      return;
    }

    setIsLoading(true);
    setWarning('');

    try {
      const daysToAdd = getDaysOfMonth();
      let successCount = 0;
      let duplicateCount = 0;

      for (const day of daysToAdd) {
        const date = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        try {
          // Check for duplicates
          const duplicateCheck = await axios.post('/timetable/checkDuplicate', {
            staff_id: staffData.staff_id,
            date: date,
            time_start: startTime,
            time_end: endTime,
          });

          if (duplicateCheck.data.length === 0) {
            // No duplicate, save the time slot
            await axios.post('/timetable/new', {
              staff_id: staffData.staff_id,
              date: date,
              time_start: startTime,
              time_end: endTime,
            });
            successCount++;
          } else {
            duplicateCount++;
          }
        } catch (error) {
          console.error(`Error saving time for ${date}:`, error);
        }
      }

      if (successCount > 0) {
        onSave();
      }

      if (duplicateCount > 0) {
        setWarning(`บันทึกสำเร็จ ${successCount} วัน, มีช่วงเวลาซ้ำ ${duplicateCount} วัน`);
      } else {
        setWarning(`บันทึกสำเร็จทั้งหมด ${successCount} วัน`);
      }

      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error saving default times:', error);
      setWarning('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          ตั้งเวลาเริ่มต้นสำหรับเดือน{monthNames[month]} {year}
        </h2>
        
        {warning && (
          <p className={`mb-4 ${warning.includes('สำเร็จ') ? 'text-green-500' : 'text-red-500'}`}>
            {warning}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-2 font-medium">เลือกวันที่ต้องการตั้งเวลา</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(dayNames).map(([key, label]) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedDays[key]}
                  onChange={() => handleDayToggle(key)}
                  className="rounded"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">เวลาเริ่มต้น</label>
          <select
            className="w-full p-2 border rounded"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            disabled={isLoading}
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
            disabled={!startTime || isLoading}
          >
            <option value="">เลือกเวลาสิ้นสุด</option>
            {filteredEndTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            onClick={onClose}
            disabled={isLoading}
          >
            ยกเลิก
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={handleSave}
            disabled={!startTime || !endTime || isLoading}
          >
            {isLoading ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultTimeModal;
