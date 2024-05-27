import { useState } from "react";

const Dropdown = ({ options, onSelect, placehold }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className={`inline-flex justify-center h-10 w-28 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium ${
          selectedOption ? "text-gray-700" : "text-gray-400"
        } hover:bg-gray-50 focus:outline-none`}
      >
        {selectedOption || placehold}
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
