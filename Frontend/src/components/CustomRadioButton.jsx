import React from "react";

const styles = {
  radioButton: {
    padding: "12px 16px",
    borderRadius: "15px",
    marginBottom: "8px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#007BFF",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    fontFamily: "ChulabhornLikitText-Regular",
    fontSize: "18px",
  },
  selected: {
    background: "#007BFF",
    color: "#fff",
    borderColor: "#007BFF",
  },
};

const CustomRadioButton = ({ label, value, selected, onSelect, required }) => (
  <li>
    <input
      type="radio"
      id={value}
      value={value}
      checked={selected}
      onChange={() => onSelect(value)}
      required={required} // Add the required attribute
      style={{ display: "none" }} // Hide the default radio button
    />
    <label
      htmlFor={value}
      style={{
        ...styles.radioButton,
        ...(selected ? styles.selected : {}),
      }}
    >
      {label}
    </label>
  </li>
);

export default CustomRadioButton;
