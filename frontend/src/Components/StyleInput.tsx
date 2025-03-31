import { useState } from "react";
import "./StyleInput.css";

type StyleInputProps = {
  label: string;
  value: string;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  validate?: (value: string) => string | undefined;
};

const StyleInput = ({
  label,
  value,
  onChangeValue,
  type = "text",
  validate,
}: StyleInputProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validate) {
      const error = validate(event.target.value);
      setErrorMessage(error);
    }
    onChangeValue(event);
  };

  return (
    <label htmlFor={label}>
      {label}
      <input
        type={type}
        id={label}
        placeholder={`Digite seu ${label}`}
        value={value}
        onChange={onChange}
        className="input-style"
      />
      <span style={{ color: "red" }}>{errorMessage}</span>
    </label>
  );
};

export default StyleInput;
