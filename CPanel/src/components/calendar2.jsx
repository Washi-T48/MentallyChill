import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import thLocale from "@fullcalendar/core/locales/th";
import TimeSelectorModal from "./timeselector";
import axios from "./axioscreds";

const Calendar = ({ setFetchTrigger }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeRange, setTimeRange] = useState({ start: "", end: "" });
  const [assignedDates, setAssignedDates] = useState({});

  useEffect(() => {
    const fetchAssignedDates = async () => {
      try {
        const response = await axios.post("/timetable/getByStaffID", { staff_id: 1 }); 
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
    };
    fetchAssignedDates();
  }, []);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setIsModalOpen(true);
  };

  const handleTimeSelect = (info) => {
    setSelectedDate(info.startStr.split("T")[0]);
    setTimeRange({ start: info.startStr, end: info.endStr });
    setIsModalOpen(true);
  };

  const handleModalSave = (start, end) => {
    const date = selectedDate;
    setAssignedDates((prev) => {
      const updatedDates = { ...prev };
      if (!updatedDates[date]) updatedDates[date] = [];
      updatedDates[date].push({ start, end });
      return updatedDates;
    });
    setFetchTrigger((prev) => !prev);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl h-[800px]">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={thLocale}
        timeZone="Asia/Bangkok"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridDay",
        }}
        events={Object.entries(assignedDates).flatMap(([date, times]) =>
          times.map((time) => ({
            title: `${time.start} - ${time.end}`,
            start: `${date}T${time.start}`,
            end: `${date}T${time.end}`,
          }))
        )}
        dateClick={handleDateClick}
        selectable={true}
        select={handleTimeSelect}
      />

      {isModalOpen && (
        <TimeSelectorModal
          day={selectedDate}
          start={timeRange.start}
          end={timeRange.end}
          onClose={() => setIsModalOpen(false)}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default Calendar;
