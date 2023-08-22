import React, { useContext, useEffect, useRef, useState } from "react";
import client from "../api/axiosClient";
import useRenderForm from "../hooks/useRenderForm.jsx";
import "./RenderForm.css";
import signFormTemplate from "../helpers/signFormTemplate.js";
import { useLoaderData } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const RenderForm = () => {
  const { handleLogout } = useContext(AuthContext);
  let user = useLoaderData();
  if (user && user.length === 0) handleLogout();
  let data = user ? user : signFormTemplate;
  const output = useRef(null);
  const { renderFormElements } = useRenderForm();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        setMessages([]);
        output.current.classList.remove("error");
        output.current.classList.remove("success");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let $fieldsets = e.target.querySelectorAll("fieldset"),
      newUserData = {};
    $fieldsets.forEach((fieldset) => {
      let $legend = fieldset.querySelector("legend");
      let $inputs = fieldset.querySelectorAll("input");
      Array.from($inputs).forEach((input) => {
        let key = `${$legend.id}_${input.name}`;
        let val = input.value;
        let newData = { [key]: val };
        newUserData = { ...newUserData, ...newData };
      });
    });
    let method = user ? "put" : "post";
    try {
      await client[method](
        `/api/users/${method === "post" ? "register" : "update"}`,
        JSON.stringify(newUserData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      output.current.classList.add("success");
      setMessages([
        `The user information was ${
          method === "post" ? "registered" : "updated"
        } successfully`,
      ]);
    } catch (error) {
      console.error(error);
      output.current.classList.add("error");
      setMessages(error.response.data.message);
    }
  };

  return (
    <form className="user-account__form" onSubmit={handleSubmit}>
      {renderFormElements(data)}

      <div className="user-account__submit-container">
        <div ref={output} className="form-output">
          {messages.map((error, i) => (
            <p style={{ margin: "6px 0" }} key={i}>
              {error}
            </p>
          ))}
        </div>
        <input
          type="submit"
          id="btn"
          className="user-account__form-submit"
          value="Save the changes"
        />
      </div>
    </form>
  );
};

export default RenderForm;
