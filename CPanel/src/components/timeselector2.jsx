const TimeSelectorModal2 = ({ day, start, end, onClose, onSave }) => {
  const [startTime, setStartTime] = useState(start || "");
  const [endTime, setEndTime] = useState(end || "");
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
    onSave(startTime, endTime);
    onClose();
  };

  const formatThaiDate = (date) => {
    const months = [
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
    const [year, month, day] = date.split("-");
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${parseInt(year) + 543}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          เลือกเวลาในวันที่ {formatThaiDate(day)}
        </h2>
        <div className="mb-4">
          <label className="block mb-2">เวลาเริ่มต้น</label>
          <select
            className="w-full p-2 border rounded"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="">เลือกเวลาเริ่มต้น</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">เวลาสิ้นสุด</label>
          <select
            className="w-full p-2 border rounded"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={!startTime}
          >
            <option value="">เลือกเวลาสิ้นสุด</option>
            {filteredEndTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button className="bg-red-500 text-white px-3 py-1 rounded mr-2" onClick={onClose}>
            ยกเลิก
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={handleSave}
            disabled={!startTime || !endTime}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelectorModal2;
