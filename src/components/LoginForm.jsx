import React from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleAuth, closeModalLogin }) => {
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

          <a href="#">Forgot your password?</a>
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
