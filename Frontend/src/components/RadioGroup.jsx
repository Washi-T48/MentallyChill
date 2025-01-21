import React from "react";

const styles = {
  radioContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    margin: "8px 0",
    width: "100%",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  radioInput: {
    appearance: "none",
    width: "24px",
    height: "24px",
    border: "2px solid #ccc",
    borderRadius: "50%",
    outline: "none",
    cursor: "pointer",
    position: "relative",
    margin: "0",
    transition: "all 0.2s ease",
    backgroundColor: "white",
  },
  radioOption: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    width: "40px",
  },
  radioLabel: {
    fontSize: "16px",
    color: "#333",
    userSelect: "none",
  },
};

const CustomRadioGroup = ({
  questionNumber,
  selectedValue,
  onChange,
  options = [0, 1, 2, 3, 4, 5, 6],
}) => {
  return (
    <div style={styles.radioContainer}>
      {options.map((value) => (
        <label key={value} style={styles.radioOption}>
          <input
            type="radio"
            name={`question${questionNumber}`}
            value={value}
            checked={selectedValue === value}
            onChange={() => onChange(questionNumber, value)}
            style={{
              ...styles.radioInput,
              ...(selectedValue === value && {
                boxShadow: "inset 0 0 0 6px #3179FF",
                border: "2px solid #FFFFFFFF",
              }),
            }}
          />
          <span style={styles.radioLabel}>{value}</span>
        </label>
      ))}
    </div>
  );
};

export default CustomRadioGroup;
