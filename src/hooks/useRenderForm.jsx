import React from "react";

const useRenderForm = () => {
  const handleTogglePass = (e) => {
    const togglePassword = e.target;
    const password = togglePassword.previousSibling;
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    // togglePassword.classList.toggle("material-symbols-outlined");
    type === "password"
      ? (togglePassword.textContent = "visibility")
      : (togglePassword.textContent = "visibility_off");
  };
  const isType = (key) => {
    switch (key) {
      case "password":
        return "password";
      case "email":
        return "email";
      case "phone":
        return "tel";
      case "thumbnail":
        return "url";
      default:
        return "text";
    }
  };

  const isRequired = (key) => {
    switch (key) {
      case "password":
        return true;
      case "username":
        return true;
      case "email":
        return true;
    }
  };

  const validate = {
    password: {
      pattern: ".{7,60}",
      title: "7 to 60 characters",
    },
    username: {
      pattern: "^[A-Za-z][A-Za-z0-9_]{8,15}$",
      title: "8 to 15 characters",
    },
    title: {
      pattern: "[A-Za-z]{1,5}",
      title: "only letters max 5 characters",
    },
    first: {
      pattern: "[A-Za-z]{1,30}",
      title: "only letters max 30 characters",
    },
    last: {
      pattern: "[A-Za-z]{1,30}",
      title: "only letters max 30 characters",
    },
    email: {
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,50}$",
      title: "characters@characters.domain",
    },
    phone: {
      pattern: "((+|00)?[1-9]{2}|0)[1-9]( ?[0-9]){10}",
      title: "only numbers and spaces max 10 characters",
    },
    thumbnail: {
      pattern: "https?://.+",
      title: "Include http://",
    },
    city: {
      pattern: "[A-Za-z]{1,20}",
      title: "only letters max 20 characters",
    },
    state: {
      pattern: "[A-Za-z]{1,20}",
      title: "only letters max 20 characters",
    },
    number: {
      pattern: "^[A-Za-z][A-Za-z0-9_]{1,20}$",
      title: "numbers and letters max 20 characters",
    },
    street: {
      pattern: "^[A-Za-z][A-Za-z0-9_]{1,20}$",
      title: "numbers and letters max 20 characters",
    },
    country: {
      pattern: "[A-Za-z]{1,20}",
      title: "only letters max 20 characters",
    },
    postcode: {
      pattern: "^[A-Za-z][A-Za-z0-9_]{1,10}$",
      title: "numbers and letters max 10 characters",
    },
  };

  const renderFormElements = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object") {
        return (
          <fieldset key={key}>
            <legend id={key}>{key}</legend>
            {renderFormElements(value, key)}
          </fieldset>
        );
      }
      return (
        <div key={key} className="user-account__input-row">
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
            pattern={validate[key] && validate[key].pattern}
            title={validate[key] && validate[key].title}
            autoComplete="false"
          />
          {key === "password" && (
            <span
              className="material-symbols-outlined"
              id="togglePassword"
              style={{
                marginLeft: "-30px",
                cursor: "pointer",
                color: "#2780e3",
                zIndex: 100,
              }}
              onClick={handleTogglePass}
            >
              visibility
            </span>
          )}
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
