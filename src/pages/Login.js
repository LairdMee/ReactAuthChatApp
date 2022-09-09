import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const passwordHandler = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };

  const focusHandler = () => {
    setEmailError("");
    setPasswordError("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // log the user in, and report invalidation
    try {
      await login(email, password); // if it throws an error, it goes to catch
      navigate("/"); // navigate to the home page
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      switch (error.code) {
        case "auth/wrong-password":
          setPasswordError("Password is wrong");
          break;
        case "auth/invalid-email":
          setEmailError("Invalid email");
          break;
        case "auth/user-not-found":
          setEmailError("Email not found");
          break;
        default:
          console.log("no error code matched for ", error.code);
          break;
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>
      {/* email */}
      <label htmlFor="email-field">Email</label>
      <input
        name="email-field"
        type="email"
        className={emailError ? "input-error" : ""}
        value={email}
        onChange={emailHandler}
        onFocus={focusHandler}
      />
      {emailError && <div className="error-message">{emailError}</div>}
      {/* password */}
      <label htmlFor="password-field">Password</label>
      <input
        name="password-field"
        type="password"
        className={passwordError ? "input-error" : ""}
        value={password}
        onChange={passwordHandler}
        onFocus={focusHandler}
      />
      {passwordError && <div className="error-message">{passwordError}</div>}
      {/* submit button */}
      <button type="submit">Login</button>
      <div>
        Don't have an account? Sign up <Link to="/register">here</Link>
      </div>
    </form>
  );
};

export default Login;
