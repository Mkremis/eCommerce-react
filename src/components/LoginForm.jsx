import React from 'react';
import './LoginForm.css';
import { useNavigate } from "react-router-dom"; 

const LoginForm = ({ handleAuth, closeModalLogin }) => {
  const navigate = useNavigate();
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
          <input type="text" name="username" placeholder="silverladybug306" />
          <input type="password" name="psw" placeholder="Password: willy1" />
          <a href="#">Forgot your password?</a>
          <input type="submit" value="Sign In" />
        </form>
          </article>
          <article className="form-container sign-up-container">
          <h1>Or create an account</h1>
            <button
              id="signUp"
              onClick={() => {
                closeModalLogin();
                navigate(`/dashboard/newuser`)}}
            >
              Sign Up
            </button>
      </article>
    </section>
  );
};

export default LoginForm;
