import React, { useContext, useEffect } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginForm = ({ handleAuth, closeModalLogin }) => {
  const { errors: loginErrors, persist, setPersist } = useContext(AuthContext);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    persist
      ? localStorage.setItem("persist", true)
      : localStorage.removeItem("persist");
  }, [persist]);
  const navigate = useNavigate();
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
  return (
    <section className="login-container" id="container">
      <article className="form-container sign-in-container">
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            fontSize: 12,
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {loginErrors.map((error, i) => (
            <p style={{ margin: "6px 0" }} key={i}>
              {error}
            </p>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAuth(e);
          }}
        >
          <h1>Sign in</h1>
          <div>
            <input type="text" name="username" placeholder="username" />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="password" name="psw" placeholder="password" />
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
          </div>
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">Trust This Device</label>
          </div>
          <input type="submit" value="Sign In" />
        </form>
      </article>
      <article className="form-container sign-up-container">
        <h4>Or create an account</h4>
        <button
          id="signUp"
          onClick={() => {
            closeModalLogin();
            navigate(`/dashboard/newuser`);
          }}
        >
          Sign Up
        </button>
      </article>
    </section>
  );
};

export default LoginForm;
