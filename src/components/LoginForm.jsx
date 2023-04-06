import React from 'react';
import './LoginForm.css';

const LoginForm = ({ handleAuth }) => {
  return (
    <div className="login-container" id="container">
      <div className="form-container sign-up-container">
        <form>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAuth(e);
          }}
        >
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your account</span>
          <input type="text" name="username" placeholder="silverladybug306" />
          <input type="password" name="psw" placeholder="Password: willy1" />
          <a href="#">Forgot your password?</a>
          <input type="submit" value="Sign In" />
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className="ghost"
              id="signIn"
              onClick={() =>
                document
                  .getElementById('container')
                  .classList.remove('right-panel-active')
              }
            >
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button
              className="ghost"
              id="signUp"
              onClick={() =>
                document
                  .getElementById('container')
                  .classList.add('right-panel-active')
              }
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
