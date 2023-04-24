import React, { useRef } from 'react';
import useRenderForm from '../hooks/useRenderForm.jsx';
import './RenderForm.css'; 
import signFormTemplate from '../helpers/signFormTemplate.js';


const RenderForm = ({ user }) => {
 let data = user==="newuser" ?signFormTemplate :user;

  const output = useRef(null);
  const { renderFormElements, handleSubmit } = useRenderForm();

  return (
    <form className="user-account__form" onSubmit={(e)=>handleSubmit(e,user, output)}>
      {renderFormElements(data)}
      <input
        type="submit"
        id="btn"
        className="user-account__form-submit"
        value="Save the changes"
      />
      <output ref={output} className="form-output --invisible">
        The user information was successfully updated
      </output>
    </form>
  );
};

export default RenderForm;
