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
  const [events, setEvents] = useState([]);
  const [staffdata, setStaffdata] = useState(null);

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
    setSelectedDate(info.dateStr);
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
        events={events}
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
