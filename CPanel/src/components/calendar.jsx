// // src/Calendar.js
// import React, { useState } from 'react';

// const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
// const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

// const Calendar = () => {
//   const today = new Date();
//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());
//   const [currentYear, setCurrentYear] = useState(today.getFullYear());

//   const handleClick = (day) => {
//     const date = new Date(currentYear, currentMonth, day);
//     console.log(date.toDateString());
//   };

//   const handlePreviousMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear(currentYear - 1);
//     } else {
//       setCurrentMonth(currentMonth - 1);
//     }
//   };

//   const handleNextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear(currentYear + 1);
//     } else {
//       setCurrentMonth(currentMonth + 1);
//     }
//   };

//   const days = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);
//   const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

//   return (
//     <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl">
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={handlePreviousMonth} className="bg-blue-500 text-white px-3 py-1 rounded">
//           Previous
//         </button>
//         <h2 className="text-xl font-bold">
//           {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
//         </h2>
//         <button onClick={handleNextMonth} className="bg-blue-500 text-white px-3 py-1 rounded">
//           Next
//         </button>
//       </div>
//       <div className="grid grid-cols-7 gap-4">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
//           <div key={index} className="text-center font-bold">
//             {day}
//           </div>
//         ))}
//         {Array.from({ length: firstDay }).map((_, index) => (
//           <div key={index}></div>
//         ))}
//         {days.map((day) => (
//           <div
//             key={day}
//             onClick={() => handleClick(day)}
//             className="cursor-pointer p-2 text-center rounded hover:bg-blue-100"
//           >
//             {day}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Calendar;




import React, { useState } from 'react';
import TimeSelectorModal from './timeselector';

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const days = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  return (
    <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl h-[800px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousMonth} className="bg-blue-500 text-white px-3 py-1 rounded">
          Previous
        </button>
        <h2 className="text-xl font-bold">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h2>
        <button onClick={handleNextMonth} className="bg-blue-500 text-white px-3 py-1 rounded">
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 flex-grow">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="text-center font-bold p-2">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={index} className="p-2"></div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleClick(day)}
            className="cursor-pointer p-2 text-center rounded hover:bg-blue-100 h-20 flex items-center justify-center"
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
        />
      )}
    </div>
  );
};

export default Calendar;

