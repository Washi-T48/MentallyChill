import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import thLocale from "@fullcalendar/core/locales/th";
import TimeSelectorModal from "./timeselector";
import DefaultTimeModal from "./defaultTimeModal";
import axios from "./axioscreds";

const Calendar = ({ setFetchTrigger }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDefaultTimeModalOpen, setIsDefaultTimeModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeRange, setTimeRange] = useState({ start: "", end: "" });
  const [events, setEvents] = useState([]);
  const [staffdata, setStaffdata] = useState(null);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get("/auth/check");
        setStaffdata(response.data);
        console.log("Staff data:", response.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
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
          const fetchedEvents = response.data.map((entry) => ({
            title: `${entry.time_start} - ${entry.time_end}`,
            start: `${entry.date}T${entry.time_start}`,
            end: `${entry.date}T${entry.time_end}`,
          }));
          setEvents(fetchedEvents);
        } catch (error) {
          console.error("Error fetching assigned dates:", error);
        }
      }
    };

    fetchAssignedDates();
  }, [staffdata, setFetchTrigger]);

  const handleDateClick = (info) => {
    const date = new Date(info.date);
  
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
  
    setSelectedDate(info);
    setDay(day);
    setMonth(month);
    setYear(year);
  
    console.log('Selected info:', info.date);
    console.log('Selected day:', day);
    console.log('Selected month:', month);
    console.log('Selected year:', year);
  
    setIsModalOpen(true);
  };
  
  

  const handleTimeSelect = (info) => {
    setSelectedDate(info.startStr.split("T")[0]);
    setTimeRange({ start: info.startStr, end: info.endStr });
    setIsModalOpen(true);
  };
  const handleModalSave = (start, end) => {
    const newEvent = {
      title: `${start} - ${end}`,
      start: `${selectedDate}T${start}`,
      end: `${selectedDate}T${end}`,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setIsModalOpen(false);
    setFetchTrigger((prev) => !prev);
    window.location.reload();
  };

  const handleDefaultTimeClick = () => {
    setIsDefaultTimeModalOpen(true);
  };

  const handleDefaultTimeModalSave = () => {
    setIsDefaultTimeModalOpen(false);
    setFetchTrigger((prev) => !prev);
    window.location.reload();
  };

  const handleCalendarNavigation = (info) => {
    setCurrentMonth(info.view.currentStart.getMonth());
    setCurrentYear(info.view.currentStart.getFullYear());
  };
  return (
    <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl h-[800px]">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">ปฏิทินการทำงาน</h2>
        <button
          onClick={handleDefaultTimeClick}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
          <span>ตั้งเวลาเริ่มต้น</span>
        </button>
      </div>
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={thLocale}
        timeZone="Asia/Bangkok"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridDay",
        }}        events={events}
        dateClick={handleDateClick}
        selectable={true}
        select={handleTimeSelect}
        datesSet={handleCalendarNavigation}
      />

      {isModalOpen && (
        <TimeSelectorModal
          day={day}
          month={month}
          year={year}
          start={timeRange.start}
          end={timeRange.end}
          onClose={() => setIsModalOpen(false)}
          onSave={handleModalSave}
        />
      )}

      {isDefaultTimeModalOpen && (
        <DefaultTimeModal
          month={currentMonth}
          year={currentYear}
          onClose={() => setIsDefaultTimeModalOpen(false)}
          onSave={handleDefaultTimeModalSave}
        />
      )}
    </div>
  );
};

export default Calendar;
