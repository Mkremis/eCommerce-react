import React, { useRef } from "react";
import "./RenderForm.css";
import { helpHttp } from "../helpers/helpHttp";

const RenderForm = ({ data }) => {
  const output = useRef(null);
  const renderFormElements = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object") {
        return (
          <fieldset key={key} style={{ padding: "1rem", margin: "1rem" }}>
            <legend id={key}>{key}</legend>
            {renderFormElements(value)}
          </fieldset>
        );
      }

      return (
        <div key={key}>
          <label htmlFor={key} id={key}>{key}</label>
          <input type="text" name={key} defaultValue={value} />
        </div>
      );
    });
  };
const handleSubmit=(e)=>{ 
  e.preventDefault();
  let $fieldsets = e.target.querySelectorAll("fieldset"),
    newUserData = {};
   $fieldsets.forEach((fieldset) => {
   let $legend = fieldset.querySelector("legend");
   let $inputs = fieldset.querySelectorAll("input");
   let newObj = Array.from($inputs).reduce(
   (acum, prev) => ({ ...acum, [prev.name]: prev.value }),
    {}
   ),
     objCons = { [$legend.id]: { ...newObj } };
   Object.assign(newUserData, objCons);
  });
     let $fInputs = document.querySelectorAll(".user-account__form>input");
    $fInputs.forEach(($input) => {
      if($input.type !== "submit"){
        let key = $input.name,
        value = $input.value,
        newObj = { [key]: value };
      Object.assign(newUserData, newObj);
      }
      
    });
    console.log(newUserData);
  
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: { userData: newUserData }
};
fetch(`https://ecommerce-users-api-production.up.railway.app/api/users/${newUserData.login.username}`, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
//    helpHttp().put(`https://ecommerce-users-api-production.up.railway.app/api/users/${newUserData.login.username}`, {
//     body:{userData : newUserData},
//   });
}
  return (
    <form className="user-account__form" onSubmit={handleSubmit}>
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
