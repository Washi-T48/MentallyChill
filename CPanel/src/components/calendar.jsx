// src/Calendar.js

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

const Calendar = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = Array.from({ length: daysInMonth(month + 1, year) }, (_, i) => i + 1);

  const handleClick = (day) => {
    const date = new Date(year, month, day);
    console.log(date.toDateString());
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl">
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleClick(day)}
            className="cursor-pointer p-2 text-center rounded hover:bg-blue-100"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
