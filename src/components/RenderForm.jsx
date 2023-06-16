import React, { useContext, useRef } from "react";
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
  const { renderFormElements, handleSubmit } = useRenderForm();

  return (
    <form
      className="user-account__form"
      onSubmit={(e) => handleSubmit(e, user, output)}
    >
      <section className="user-account__form-container">
        {renderFormElements(data)}
      </section>
      <div className="user-account__submit-container">
        <output ref={output} className="form-output --invisible">
          The user information was successfully updated
        </output>
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
