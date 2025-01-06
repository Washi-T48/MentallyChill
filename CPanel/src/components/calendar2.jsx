import React, { useState, useEffect } from 'react';
import axios from './axioscreds';
import TimeSelectorModal from './timeselector';

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const Calendar = ({ setFetchTrigger }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isHourlyView, setIsHourlyView] = useState(false);
  const [assignedDates, setAssignedDates] = useState({});
  const [staffData, setStaffData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const toThaiBuddhistYear = (year) => year + 543;

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get('/auth/check');
        setStaffData(response.data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, []);

  useEffect(() => {
    const fetchAssignedDates = async () => {
      if (staffData) {
        try {
          const response = await axios.post('/timetable/getByStaffID', {
            staff_id: staffData.staff_id,
          });
          const dates = response.data.reduce((acc, entry) => {
            const date = entry.date.split(' ')[0];
            if (!acc[date]) acc[date] = [];
            acc[date].push({ start: entry.time_start, end: entry.time_end });
            return acc;
          }, {});
          setAssignedDates(dates);
        } catch (error) {
          console.error('Error fetching assigned dates:', error);
        }
      }
    };

    fetchAssignedDates();
  }, [staffData]);

  const handleDayClick = (day) => {
    setSelectedDate({ day, month: currentMonth, year: currentYear });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (date) => {
    console.log('Saved date:', date);
    setIsModalOpen(false);
    setFetchTrigger((prev) => !prev);
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const days = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  return (
    <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl h-[800px] flex flex-col">
      <div className="flex flex-col items-center mb-4">
        <div className="flex justify-between items-center w-full mb-1">
          <button onClick={handlePreviousMonth} className="bg-blue-500 text-white px-3 py-1 rounded w-[100px]">
            ย้อนกลับ
          </button>
          <div className="text-center">
            <h2 className="text-xl font-bold pt-4">
              {thaiMonths[currentMonth]} {toThaiBuddhistYear(currentYear)}
            </h2>
          </div>
          <button onClick={handleNextMonth} className="bg-blue-500 text-white px-3 py-1 rounded w-[100px]">
            ถัดไป
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 flex-grow items-center">
        {['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'].map((day, index) => (
          <div key={index} className="text-lg text-center font-bold p-2 bg-gray-200">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={index} className="p-2"></div>
        ))}
        {days.map((day) => {
          const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const isAssigned = assignedDates[dateString];

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`cursor-pointer p-2 text-center rounded hover:bg-blue-100 h-20 flex flex-col items-center justify-center ${
                isAssigned ? 'bg-green-300' : ''
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
      {isModalOpen && selectedDate && (
        <TimeSelectorModal
          day={selectedDate.day}
          month={selectedDate.month}
          year={selectedDate.year}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Calendar;
