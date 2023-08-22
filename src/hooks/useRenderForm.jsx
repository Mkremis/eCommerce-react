import { validate } from "../helpers/validate";

const useRenderForm = () => {
  const handleTogglePass = (e) => {
    const togglePassword = e.target;
    const password = togglePassword.previousSibling;
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
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

  const renderFormElements = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object") {
        return (
          <fieldset key={key} className={key}>
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

  return { renderFormElements };
};

export default useRenderForm;
