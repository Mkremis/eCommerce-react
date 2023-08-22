import React, { useContext, useEffect, useRef, useState } from "react";
import useRenderForm from "../hooks/useRenderForm.jsx";
import "./RenderForm.css";
import signFormTemplate from "../helpers/signFormTemplate.js";
import { useLoaderData } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { register, updateUser } from "../api/authRequests";

const RenderForm = () => {
  const { handleLogout } = useContext(AuthContext);
  const user = useLoaderData();
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

    try {
      let response = user
        ? await updateUser(newUserData)
        : await register(newUserData);

      if (response.status === 200) {
        console.log(response);
        output.current.classList.add("success");
        setMessages([
          `The user information was ${
            user ? "updated" : "registered"
          } successfully`,
        ]);
      }
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
