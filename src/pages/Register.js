import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Navbar from "../component/Navbar"

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const emailHandler = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const passwordHandler = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };

  const confirmPasswordHandler = (e) => {
    const passwordValue = e.target.value;
    setConfirmPassword(passwordValue);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // check password and confirm password are the same
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
    } else {
      // register the new user, and report invalidation errors
      try {
        await register(email, password); // if it throws an error, it would be caught below
        navigate("/"); // navigate to the home page
      } catch (error) {
        console.log(error.code);
        console.log(error.message);
        // email or password error from firebase
        switch (error.code) {
          case "auth/weak-password":
            setPasswordError("Password should be at least 6 characters");
            break;
          case "auth/email-already-in-use":
            setEmailError("Email already in use");
            break;
          default:
            console.log("no error code matched for ", error.code);
            break;
        }
      }
    }
  };

  return (
    <div> <Navbar /> 
    <form onSubmit={submitHandler}>
      <h2>New User Registration</h2>
      {/* email */}
      <label htmlFor="email-field">Email</label>
      <input
        name="email-field"
        type="email"
        className={emailError ? "input-error" : ""}
        value={email}
        onChange={emailHandler}
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
      />
      {passwordError && <div className="error-message">{passwordError}</div>}
      {/* confirm password */}
      <label htmlFor="confirm-password-field">Confirm Password</label>
      <input
        name="confirm-password-field"
        type="password"
        className={confirmPasswordError ? "input-error" : ""}
        value={confirmPassword}
        onChange={confirmPasswordHandler}
      />
      {confirmPasswordError && (
        <div className="error-message">{confirmPasswordError}</div>
      )}
      {/* submit button */}
      <button type="submit">Register</button>
    </form>

    </div>
  );
};

export default Register;
