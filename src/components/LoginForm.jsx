import React, { useContext, useEffect, useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LoginForm = ({ closeModalLogin }) => {
  const { setErrors, setAuth, setLikes, setCart, errors, persist, setPersist } =
    useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    persist
      ? localStorage.setItem("persist", true)
      : localStorage.removeItem("persist");
  }, [persist]);
  const navigate = useNavigate();

  return (
    <section className="login-container" id="container">
      <article className="form-container sign-up-container">
        {isLogin ? (
          <SignIn
            setErrors={setErrors}
            errors={errors}
            setAuth={setAuth}
            setLikes={setLikes}
            setCart={setCart}
            togglePersist={togglePersist}
            persist={persist}
          />
        ) : (
          <SignUp
            setErrors={setErrors}
            errors={errors}
            setIsLogin={setIsLogin}
          />
        )}

        <h4>
          {isLogin ? "Or create an account" : "Or Sign In to your account"}
        </h4>
        <button id="signUp" onClick={() => setIsLogin((is) => !is)}>
          {isLogin ? "Sign Up" : "Sing In"}
        </button>
      </article>
    </section>
  );
};

export default LoginForm;
