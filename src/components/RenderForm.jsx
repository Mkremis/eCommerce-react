import React, { useRef } from "react";
import "./RenderForm.css";

const RenderForm = ({ data }) => {
  const output = useRef(null);
  const renderFormElements = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object") {
        return (
          <fieldset key={key} style={{ padding: "1rem", margin: "1rem" }}>
            <legend>{key}</legend>
            {renderFormElements(value)}
          </fieldset>
        );
      }

      return (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input type="text" id={key} defaultValue={value} />
        </div>
      );
    });
  };

  return (
    <form className="user-account__form">
      {renderFormElements(data)}
      <input
        type="submit"
        id="btn"
        className="user-account__form-submit"
        value="Save the changes"
        onClick={(e) => {
          e.preventDefault();
          console.log(e.target.value);
        }}
      />
      <output ref={output} className="form-output --invisible">
        The user information was successfully updated
      </output>
    </form>
  );
};

export default RenderForm;
