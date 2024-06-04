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
      0
      <Radio
        {...controlProps("0")}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
      />
      <Radio
        {...controlProps("1")}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
      />
      <Radio
        {...controlProps("2")}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
      />
      <Radio
        {...controlProps("3")}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
      />
      3
    </div>
  );
}
