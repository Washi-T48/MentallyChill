import React, { useState, useEffect } from "react";
import axios from "./axioscreds";
import TimeSelectorModal from "./timeselector";

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const Calendar = ({ setFetchTrigger }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignedDates, setAssignedDates] = useState({});
  const [staffdata, setStaffdata] = useState(null);

  const dayColors = [
    "bg-rose-400",
    "bg-amber-300",
    "bg-fuchsia-300",
    "bg-lime-300",
    "bg-orange-300",
    "bg-cyan-300",
    "bg-purple-300",
  ];

  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const englishMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const toThaiBuddhistYear = (year) => year + 543;

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get("/auth/check");
        setStaffdata(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStaffData();
  }, []);

  useEffect(() => {
    const fetchAssignedDates = async () => {
      if (staffdata) {
        try {
          const response = await axios.post("/timetable/getByStaffID", {
            staff_id: staffdata.staff_id,
          });
          const dates = response.data.reduce((acc, entry) => {
            const date = entry.date.split(" ")[0];
            if (!acc[date]) acc[date] = [];
            acc[date].push({ start: entry.time_start, end: entry.time_end });
            return acc;
          }, {});
          setAssignedDates(dates);
        } catch (error) {
          console.error("Error fetching assigned dates:", error);
        }
      }
    };

    fetchAssignedDates();
  }, [staffdata]);

  const handleClick = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
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

  const getDaysForGrid = () => {
    const daysInPrevMonth = daysInMonth(
      currentMonth - 1 < 0 ? 11 : currentMonth - 1,
      currentMonth - 1 < 0 ? currentYear - 1 : currentYear
    );
    const prevMonthDays = Array.from(
      { length: getFirstDayOfMonth(currentMonth, currentYear) },
      (_, i) => daysInPrevMonth - getFirstDayOfMonth(currentMonth, currentYear) + i + 1
    );
    const nextMonthDays = Array.from(
      {
        length:
          42 -
          daysInMonth(currentMonth, currentYear) -
          getFirstDayOfMonth(currentMonth, currentYear),
      },
      (_, i) => i + 1
    );
    return { prevMonthDays, nextMonthDays };
  };

  const { prevMonthDays, nextMonthDays } = getDaysForGrid();
  const days = Array.from(
    { length: daysInMonth(currentMonth, currentYear) },
    (_, i) => i + 1
  );

  return (
    <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl h-[800px] flex flex-col">
      <div className="flex flex-col items-center mb-4">
        <div className="flex justify-between items-center w-full mb-1">
          <button
            onClick={handlePreviousMonth}
            className="bg-blue-500 text-white px-3 py-1 rounded w-[100px]"
          >
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
          <button
            onClick={handleNextMonth}
            className="bg-blue-500 text-white px-3 py-1 rounded w-[100px]"
          >
            ถัดไป
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 flex-grow items-center">
        {["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"].map(
          (day, index) => (
            <div
              key={index}
              className={`text-lg text-center font-bold p-2 ${dayColors[index]}`}
            >
              {day}
            </div>
          )
        )}
        {prevMonthDays.map((day, idx) => (
          <div
            key={`prev-${idx}`}
            className="p-2 text-center text-gray-400 bg-gray-100"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dateString = `${currentYear}-${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
          const isAssigned = assignedDates[dateString];

          return (
            <div
              key={day}
              onClick={() => handleClick(day)}
              className={`cursor-pointer p-2 text-center rounded hover:bg-blue-100 h-20 flex flex-col items-center justify-center ${
                isAssigned ? "bg-green-300" : ""
              }`}
            >
              {day}
            </div>
          );
        })}
        {nextMonthDays.map((day, idx) => (
          <div
            key={`next-${idx}`}
            className="p-2 text-center text-gray-400 bg-gray-100"
          >
            {day}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <TimeSelectorModal
          day={selectedDay}
          month={currentMonth}
          year={currentYear}
          onClose={() => setIsModalOpen(false)}
          onSave={(date, start, end) => {
            setAssignedDates((prevDates) => {
              const updatedDates = { ...prevDates };
              if (!updatedDates[date]) updatedDates[date] = [];
              updatedDates[date] = [...updatedDates[date], { start, end }];
              return updatedDates;
            });
            setFetchTrigger((prev) => !prev);
          }}
        />
      )}
    </div>
  );
};

export default Calendar;
