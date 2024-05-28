import { useState } from "react";

export default function Dropdown({ placehold, options, onSelect, selected }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className={`py-2 px-4 bg-white border rounded ${
          selected ? "text-black" : "text-gray-400"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || placehold}
      </button>
      {isOpen && (
        <div className="absolute mt-2 bg-white border rounded w-24">
          {options.map((option, index) => (
            <div
              key={index}
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
