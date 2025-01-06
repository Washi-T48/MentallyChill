import React, { useState, useEffect } from 'react';
import axios from './axioscreds';

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const Calendar = ({ setFetchTrigger }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [isHourlyView, setIsHourlyView] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [assignedDates, setAssignedDates] = useState({});
  const [staffdata, setStaffdata] = useState(null);

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const englishMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const toThaiBuddhistYear = (year) => year + 543;

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get('/auth/check');
        setStaffdata(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, []);

  useEffect(() => {
    const fetchAssignedDates = async () => {
      if (staffdata) {
        try {
          const response = await axios.post('/timetable/getByStaffID', {
            staff_id: staffdata.staff_id,
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
  }, [staffdata]);

  const switchToHourlyView = (day) => {
    const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setSelectedDate(dateString);
    setIsHourlyView(true);
  };

  const switchToMonthlyView = () => {
    setIsHourlyView(false);
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

  const HourlyView = ({ date }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="flex flex-col items-center p-4">
        <h2 className="text-xl font-bold mb-4">{date} (รายชั่วโมง)</h2>
        <button onClick={switchToMonthlyView} className="bg-blue-500 text-white px-3 py-1 rounded mb-4">
          กลับไปปฏิทินรายเดือน
        </button>
        <div className="w-full max-w-4xl border rounded-lg shadow-md">
          {/* All Day Section */}
          <div className="flex items-center border-b p-2 bg-gray-100">
            <span className="text-lg font-semibold">All Day</span>
          </div>

          {/* Hourly Slots */}
          <div className="flex flex-col h-[700px] overflow-y-scroll">
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex items-center justify-between border-b p-2 h-16"
              >
                <span className="text-gray-600 w-16 text-right pr-4">
                  {hour}:00
                </span>
                <div className="flex-grow border-l pl-4">
                  {assignedDates[date]?.some(
                    (entry) => parseInt(entry.start.split(':')[0]) === hour
                  ) && <div className="bg-green-300 p-1 rounded">Assigned</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl h-[800px] flex flex-col">
      {isHourlyView ? (
        <HourlyView date={selectedDate} />
      ) : (
        <>
          <div className="flex flex-col items-center mb-4">
            <div className="flex justify-between items-center w-full mb-1">
              <button onClick={handlePreviousMonth} className="bg-blue-500 text-white px-3 py-1 rounded w-[100px]">
                ย้อนกลับ
              </button>
              <div className="text-center">
                <h2 className="text-xl font-bold pt-4">
                  {thaiMonths[currentMonth]} {toThaiBuddhistYear(currentYear)}
                </h2>
                <h3 className="text-lg pt-4">
                  {englishMonths[currentMonth]} {currentYear}
                </h3>
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
                  onClick={() => switchToHourlyView(day)}
                  className={`cursor-pointer p-2 text-center rounded hover:bg-blue-100 h-20 flex flex-col items-center justify-center ${
                    isAssigned ? 'bg-green-300' : ''
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
