import React from "react";
import Radio from "@mui/material/Radio";

export default function Radio_rate({
  questionNumber,
  selectedValue,
  onRadioChange,
}) {
  const handleChange = (event) => {
    const newValue = event.target.value;
    onRadioChange(questionNumber, newValue);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: `dass21-rated-${questionNumber}`,
    inputProps: { "aria-label": item },
  });

  return (
    <div
      className="radio-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {["0", "1", "2", "3"].map((item) => (
        <div
          key={item}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Radio
            {...controlProps(item)}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
