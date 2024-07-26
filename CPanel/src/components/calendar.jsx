// import React, { useState, useEffect } from 'react';
// import axios from './axioscreds';
// import TimeSelectorModal from './timeselector';

// const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
// const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

// const Calendar = () => {
//   const today = new Date();
//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());
//   const [currentYear, setCurrentYear] = useState(today.getFullYear());
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [assignedDates, setAssignedDates] = useState([]);
//   const [staffdata, setStaffdata] = useState(null);

//   const dayColors = ['bg-rose-400', 'bg-amber-300', 'bg-fuchsia-300', 'bg-lime-300', 'bg-orange-300', 'bg-cyan-300', 'bg-purple-300']; // Tailwind color classes for Sun to Sat

//   useEffect(() => {
//     const fetchStaffData = async () => {
//       try {
//         const response = await axios.get('/auth/check');
//         setStaffdata(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchStaffData();
//   }, []);

//   useEffect(() => {
//     const fetchAssignedDates = async () => {
//       if (staffdata) {
//         try {
//           const response = await axios.post('/timetable/getByStaffID', {
//             staff_id: staffdata.staff_id
//           });
//           // Assuming the date is in YYYY-MM-DD format in your response
//           const dates = response.data.map(entry => entry.date.split(' ')[0]);
//           setAssignedDates(dates);
//         } catch (error) {
//           console.error('Error fetching assigned dates:', error);
//         }
//       }
//     };

//     fetchAssignedDates();
//   }, [staffdata]);

//   const handleClick = (day) => {
//     setSelectedDay(day);
//     // Check if the date is already assigned
//     if (assignedDates.includes(`${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)) {
//       alert('This date is already assigned.');
//       return;
//     }
//     setIsModalOpen(true);
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
//     <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl h-[800px] flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={handlePreviousMonth} className="bg-blue-500 text-white px-3 py-1 rounded w-[100px]">
//           ย้อนกลับ
//         </button>
//         <h2 className="text-xl font-bold">
//           {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
//         </h2>
//         <button onClick={handleNextMonth} className="bg-blue-500 text-white px-3 py-1 rounded w-[100px]">
//           ถัดไป
//         </button>
//       </div>
//       <div className="grid grid-cols-7 gap-1 flex-grow items-center">
//         {['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'].map((day, index) => (
//           <div key={index} className={`text-lg text-center font-bold p-2 ${dayColors[index]}`}>
//             {day}
//           </div>
//         ))}
//         {Array.from({ length: firstDay }).map((_, index) => (
//           <div key={index} className="p-2"></div>
//         ))}
//         {days.map((day) => {
//           const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
//           const isAssigned = assignedDates.includes(dateString);

//           return (
//             <div
//               key={day}
//               onClick={() => handleClick(day)}
//               className={`cursor-pointer p-2 text-center rounded hover:bg-blue-100 h-20 flex items-center justify-center ${isAssigned ? 'bg-green-300' : ''}`}
//             >
//               {day}
//             </div>
//           );
//         })}
//       </div>
//       {isModalOpen && (
//         <TimeSelectorModal
//           day={selectedDay}
//           month={currentMonth}
//           year={currentYear}
//           onClose={() => setIsModalOpen(false)}
//           onSave={(date) => setAssignedDates([...assignedDates, date])}
//         />
//       )}
//     </div>
//   );
// };

// export default Calendar;













// import React, { useState, useEffect } from 'react';
// import axios from './axioscreds';
// import TimeSelectorModal from './timeselector';

// const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
// const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

// const Calendar = () => {
//   const today = new Date();
//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());
//   const [currentYear, setCurrentYear] = useState(today.getFullYear());
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [assignedDates, setAssignedDates] = useState([]);
//   const [staffdata, setStaffdata] = useState(null);

//   const dayColors = ['bg-rose-400', 'bg-amber-300', 'bg-fuchsia-300', 'bg-lime-300', 'bg-orange-300', 'bg-cyan-300', 'bg-purple-300']; // Tailwind color classes for Sun to Sat

//   // Thai month names
//   const thaiMonths = [
//     'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
//     'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
//   ];

//   useEffect(() => {
//     const fetchStaffData = async () => {
//       try {
//         const response = await axios.get('/auth/check');
//         setStaffdata(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchStaffData();
//   }, []);

//   useEffect(() => {
//     const fetchAssignedDates = async () => {
//       if (staffdata) {
//         try {
//           const response = await axios.post('/timetable/getByStaffID', {
//             staff_id: staffdata.staff_id
//           });
//           // Assuming the date is in YYYY-MM-DD format in your response
//           const dates = response.data.map(entry => entry.date.split(' ')[0]);
//           setAssignedDates(dates);
//         } catch (error) {
//           console.error('Error fetching assigned dates:', error);
//         }
//       }
//     };

//     fetchAssignedDates();
//   }, [staffdata]);

//   const handleClick = (day) => {
//     setSelectedDay(day);
//     // Check if the date is already assigned
//     if (assignedDates.includes(`${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)) {
//       alert('This date is already assigned.');
//       return;
//     }
//     setIsModalOpen(true);
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
//     <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl h-[800px] flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={handlePreviousMonth} className="bg-blue-500 text-white px-3 py-1 rounded w-[100px]">
//           ย้อนกลับ
//         </button>
//         <h2 className="text-xl font-bold">
//           {thaiMonths[currentMonth]} {currentYear}
//         </h2>
//         <button onClick={handleNextMonth} className="bg-blue-500 text-white px-3 py-1 rounded w-[100px]">
//           ถัดไป
//         </button>
//       </div>
//       <div className="grid grid-cols-7 gap-1 flex-grow items-center">
//         {['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'].map((day, index) => (
//           <div key={index} className={`text-lg text-center font-bold p-2 ${dayColors[index]}`}>
//             {day}
//           </div>
//         ))}
//         {Array.from({ length: firstDay }).map((_, index) => (
//           <div key={index} className="p-2"></div>
//         ))}
//         {days.map((day) => {
//           const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
//           const isAssigned = assignedDates.includes(dateString);

//           return (
//             <div
//               key={day}
//               onClick={() => handleClick(day)}
//               className={`cursor-pointer p-2 text-center rounded hover:bg-blue-100 h-20 flex items-center justify-center ${isAssigned ? 'bg-green-300' : ''}`}
//             >
//               {day}
//             </div>
//           );
//         })}
//       </div>
//       {isModalOpen && (
//         <TimeSelectorModal
//           day={selectedDay}
//           month={currentMonth}
//           year={currentYear}
//           onClose={() => setIsModalOpen(false)}
//           onSave={(date) => setAssignedDates([...assignedDates, date])}
//         />
//       )}
//     </div>
//   );
// };

// export default Calendar;











import React, { useState, useEffect } from 'react';
import axios from './axioscreds';
import TimeSelectorModal from './timeselector';

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignedDates, setAssignedDates] = useState([]);
  const [staffdata, setStaffdata] = useState(null);

  const dayColors = ['bg-rose-400', 'bg-amber-300', 'bg-fuchsia-300', 'bg-lime-300', 'bg-orange-300', 'bg-cyan-300', 'bg-purple-300']; // Tailwind color classes for Sun to Sat

  // Thai month names
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  // English month names
  const englishMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Convert Gregorian year to Thai Buddhist Era year
  const toThaiBuddhistYear = (year) => year + 543;

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get('/auth/check');
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
          const response = await axios.post('/timetable/getByStaffID', {
            staff_id: staffdata.staff_id
          });
          // Assuming the date is in YYYY-MM-DD format in your response
          const dates = response.data.map(entry => entry.date.split(' ')[0]);
          setAssignedDates(dates);
        } catch (error) {
          console.error('Error fetching assigned dates:', error);
        }
      }
    };

    fetchAssignedDates();
  }, [staffdata, assignedDates]);

  const handleClick = (day) => {
    setSelectedDay(day);
    // Check if the date is already assigned
    if (assignedDates.includes(`${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)) {
      alert('This date is already assigned.');
      return;
    }
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
          <div key={index} className={`text-lg text-center font-bold p-2 ${dayColors[index]}`}>
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={index} className="p-2"></div>
        ))}
        {days.map((day) => {
          const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const isAssigned = assignedDates.includes(dateString);

          return (
            <div
              key={day}
              onClick={() => handleClick(day)}
              className={`cursor-pointer p-2 text-center rounded hover:bg-blue-100 h-20 flex items-center justify-center ${isAssigned ? 'bg-green-300' : ''}`}
            >
              {day}
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <TimeSelectorModal
          day={selectedDay}
          month={currentMonth}
          year={currentYear}
          onClose={() => setIsModalOpen(false)}
          onSave={(date) => setAssignedDates([...assignedDates, date])}
        />
      )}
    </div>
  );
};

export default Calendar;

