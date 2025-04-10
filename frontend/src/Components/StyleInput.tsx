import { useState } from "react";
import "./StyleInput.css";

type StyleInputProps = {
  label: string;
  value: string;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  validate?: (value: string) => string | undefined;
  iconRight?: React.ReactNode;
  readOnly?: boolean;
  placeholder?: string;
  onClick?: () => void;
};

const StyleInput = ({
  label,
  value,
  onChangeValue,
  type = "text",
  validate,
  iconRight,
  readOnly = false,
  placeholder,
  onClick,
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
    <label htmlFor={label} style={{ display: "flex", flexDirection: "column" }}>
      {label}
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <input
          type={type}
          id={label}
          placeholder={placeholder ?? `Digite seu ${label}`}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          onClick={onClick}
          className="input-style"
          style={{
            paddingRight: iconRight ? "40px" : undefined,
            width: "100%",
          }}
        />
        {iconRight && (
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {iconRight}
          </span>
        )}
      </div>
      {errorMessage && (
        <span style={{ color: "red", fontSize: "0.85rem" }}>
          {errorMessage}
        </span>
      )}
    </label>
  );
};

export default StyleInput;
