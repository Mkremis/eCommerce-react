import React from "react";


const useRenderForm = () => {

  const isType=(key)=>{
    switch (key) {
      case 'password':
        return 'password'
      case 'email':
        return 'email'
      case 'phone':
          return 'tel'
      case 'thumbnail':
          return 'url'
      default: return 'text'
    }
  }

  const isRequired=(key)=>{
    switch (key) {
      case 'password':
        return true
      case 'username':
        return true
      case 'first':
          return true
      case 'last':
          return true
      case 'email':
            return true
      case 'phone':
            return true
    }
  }

  
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
              type={isType(key)}
              className="form-control"
              name={key}
              defaultValue={value}
              placeholder={key}
              aria-label={key}
              required={isRequired(key)}
              autocomplete="off"
            />
          </div>
        </div>
      );
    });
  };
  const handleSubmit = (e, user, output) => {
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
    let method = user === "newuser" ? "POST" : "PUT";
    fetchData(newUserData, method, output);
  };

  function fetchData(newUserData, method, output) {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserData),
    };
    let route = method === "POST" ? "register" : "update";
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${route}`;

    fetch(endpoint, options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .finally(() => {
        output.current.classList.remove("--invisible");
        setTimeout(() => {
          output.current.classList.add("--invisible");
        }, 3500);
      });
  }

  return { renderFormElements, handleSubmit };
};

export default useRenderForm;
