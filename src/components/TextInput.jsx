import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./RegistrationForm.css";

export default function Text_Input({
  labelText,
  value,
  handleChange,
  errorMessage,
  type,
  name,
  isRequired,
}) {
  const uuid = uuidv4();
  return (
    <div className="input-wrapper">
      <label htmlFor={uuid} className="label">
        {labelText}:
      </label>
      <div className="text-input-container">
        <input
          id={uuid}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={`Type the ${name} here`}
          name={name}
          autoComplete="off"
          required={isRequired}
        />
        {errorMessage && (
          <span
            style={{
              marginLeft: "-30px",
              cursor: "pointer",
              color: "#2780e3",
              zIndex: 100,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-6 h-6"
              width="1rem"
              height="1rem"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </span>
        )}
      </div>

      <p className="error-message">
        {errorMessage && <span>{errorMessage}</span>}
      </p>
    </div>
  );
}
