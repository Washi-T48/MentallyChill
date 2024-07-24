import axios from './axioscreds'
import React, { useState, useEffect } from 'react';


const generateTimeSlots = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i.toString().padStart(2, '0');
      const minute = j.toString().padStart(2, '0');
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

const TimeSelectorModal = ({ day, month, year, onClose }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [filteredEndTimes, setFilteredEndTimes] = useState([]);
  const timeSlots = generateTimeSlots();

  useEffect(() => {
    if (startTime) {
      const startIndex = timeSlots.indexOf(startTime);
      setFilteredEndTimes(timeSlots.slice(startIndex + 1));
    } else {
      setFilteredEndTimes([]);
    }
  }, [startTime]);

  const handleSave = () => {
    console.log(`Date: ${year}-${month + 1}-${day}`);
    console.log(`Start Time: ${startTime}`);
    console.log(`End Time: ${endTime}`);
    try {
      axios.post('/timetable/new', {
        date: `${year}-${month + 1}-${day}`,
        time_start: startTime,
        time_end: endTime,
      });
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          Select Time for {new Date(year, month, day).toDateString()}
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Start Time</label>
          <select
            className="w-full p-2 border rounded"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="">Select start time</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">End Time</label>
          <select
            className="w-full p-2 border rounded"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={!startTime}
          >
            <option value="">Select end time</option>
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
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={handleSave}
            disabled={!startTime || !endTime}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelectorModal;
