import React, { useState, useEffect } from 'react';
import TimeSelectorModal from './timeselector';
import axios from './axioscreds';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(null);
  const [assignedTimes, setAssignedTimes] = useState([]);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const dayColors = ['bg-rose-400', 'bg-amber-300', 'bg-fuchsia-300', 'bg-lime-300', 'bg-orange-300', 'bg-cyan-300', 'bg-purple-300'];

  useEffect(() => {
    if (selectedDate) {
      const fetchAssignedTimes = async () => {
        try {
          const date = `${selectedDate.year}-${(selectedDate.month + 1)
            .toString()
            .padStart(2, '0')}-${selectedDate.day.toString().padStart(2, '0')}`;
          const response = await axios.post('/timetable/getTimes', { date });
          setAssignedTimes(response.data);
        } catch (error) {
          console.error('Error fetching assigned times:', error);
        }
      };

      fetchAssignedTimes();
    }
  }, [selectedDate]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
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

  const handleDayClick = (day) => {
    setSelectedDate({ day, month: currentMonth, year: currentYear });
    setShowTimeModal(true); // Show TimeSelectorModal
  };

  const handleBackToMonthView = () => {
    setSelectedDate(null);
    setViewMode('month');
  };

  const handleViewModeChange = () => {
    setViewMode(viewMode === 'month' ? 'hourly' : 'month');
  };

  const renderMonthView = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="bg-blue-500 text-white px-4 py-2 rounded">
          ย้อนกลับ
        </button>
        <h2 className="text-lg font-bold">
          {new Date(currentYear, currentMonth).toLocaleString('th-TH', {
            year: 'numeric',
            month: 'long',
          })}
        </h2>
        <button onClick={handleNextMonth} className="bg-blue-500 text-white px-4 py-2 rounded">
          ถัดไป
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 flex-grow items-center">
        {['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'].map((day, index) => (
          <div key={index} className={`text-lg text-center font-bold p-2 ${dayColors[index]}`}>
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleDayClick(day)}
            className="cursor-pointer p-2 text-center rounded hover:bg-blue-100 bg-white h-20 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>
    </>
  );

  const renderHourlyView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
    return (
      <div className="p-4">
        <button
          onClick={handleBackToMonthView}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          กลับไปที่มุมมองรายเดือน
        </button>
        <h2 className="text-lg font-bold mb-4">
          {`มุมมองรายชั่วโมง`}
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {hours.map((hour) => {
            const isAssigned = assignedTimes.some((time) => time.start.startsWith(hour));
            return (
              <div
                key={hour}
                className={`p-4 rounded border ${isAssigned ? 'bg-green-300' : 'bg-white'} text-center`}
              >
                {hour}
                {isAssigned && (
                  <div className="text-sm text-gray-700 mt-2">
                    {assignedTimes
                      .filter((time) => time.start.startsWith(hour))
                      .map((time, idx) => (
                        <div key={idx}>
                          {time.start} - {time.end}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <button
        onClick={handleViewModeChange}
        className="bg-yellow-500 text-white px-4 py-2 rounded mb-4"
      >
        {viewMode === 'month' ? 'ดูรายชั่วโมง' : 'ดูรายเดือน'}
      </button>

      {viewMode === 'month' ? renderMonthView() : renderHourlyView()}

      {showTimeModal && (
        <TimeSelectorModal
          date={selectedDate}
          onClose={() => setShowTimeModal(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
