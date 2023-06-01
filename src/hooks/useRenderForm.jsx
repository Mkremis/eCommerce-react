import React from "react";
import { helpHttp } from "../helpers/helpHttp";

const useRenderForm = () => {
  const renderFormElements = (obj, fieldName) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object") {
        return (
          <fieldset key={key} style={{ padding: "1rem", margin: "1rem" }}>
            <legend id={key}>{key}</legend>
            {renderFormElements(value, key)}
          </fieldset>
        );
      }
      return (
        <div key={key} className="row">
          <div className="col">
            <label htmlFor={key} className="form-label">
              {key}
            </label>
            <input
              type="text"
              className="form-control"
              name={`${fieldName}_${key}`}
              defaultValue={value}
              placeholder={key}
              aria-label={key}
            />
          </div>
        </div>
      );
    });
  };
  const handleSubmit = (e, user, output) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUserData = Object.fromEntries(formData);
    const userName = newUserData.login_username;
    let method = user === "newuser" ? "POST" : "PUT";

    const options = {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserData),
    };

    fetch(
      `https://ecommerce-db-geqb34iue-mkremis.vercel.app/api/users/${userName}`,
      options
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .finally(() => {
        output.current.classList.remove("--invisible");
        setTimeout(() => {
          output.current.classList.add("--invisible");
        }, 3500);
      });
  };

  return { renderFormElements, handleSubmit };
};

export default useRenderForm;
