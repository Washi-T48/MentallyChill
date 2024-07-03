import { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Dropdown({ placehold, options, onSelect, selected }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const displayText = selected || placehold;
  const textColor = selected ? 'text-black' : 'text-gray-500';

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`py-2 pl-2 bg-white border rounded ${isOpen ? "" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-row">
          <span className={textColor}>{displayText}</span> 
          <RiArrowDropDownLine className="text-2xl" />
        </div>
        {isOpen && (
          <div className="absolute left-0 mt-2 bg-white border rounded">
            {options.map((option, index) => (
              <div
                key={index}
                className="py-2 px-4 hover:bg-gray-200 cursor-pointer w-full"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}
