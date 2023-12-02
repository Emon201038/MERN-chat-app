import { TextField } from "@mui/material";
import { useRef, useState, useEffect } from "react";

const Otp = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [activeInput, setActiveInput] = useState(0);
  // eslint-disable-next-line no-unused-vars, react-hooks/rules-of-hooks
  const inputRefs = Array.from({ length: 6 }, (_, index) => useRef(null));

  const handleInputChange = (index, e) => {
    const digit = e.target.value.replace(/[^0-9]/g, "");

    const newOtpValues = [...otpValues];
    newOtpValues[index] = digit;
    setOtpValues(newOtpValues);

    if (digit !== "" && index < 5) {
      setActiveInput(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otpValues[index] === "") {
      setActiveInput(index - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otpValues.join(""));
  };

  useEffect(() => {
    inputRefs[activeInput].current.focus();
  }, [activeInput, inputRefs]);

  return (
    <div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        {otpValues.map((value, index) => (
          <TextField
            key={index}
            required
            type="text"
            size="small"
            value={value}
            inputProps={{ maxLength: 1 }}
            className="w-10 h-10 bg-slate-300 text-center"
            placeholder="-"
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            inputRef={inputRefs[index]}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Otp;
