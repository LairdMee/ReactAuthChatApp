import React, { useState, createContext, useContext } from "react";
import { signUp, logIn, logout } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // when null implies user logged out
  // const [error, setError] = useState(null);

  const register = async (email, password) => {
    // try to register a user
    // try {
    //   const newUser = await signUp(email, password);
    //   // successfull registeration
    //   setUser(newUser);
    // } catch (err) {
    //   // failed registration
    //   setError(err);
    // }
    const newUser = await signUp(email, password);
    setUser(newUser);
  };

  const login = async (email, password) => {
    // try to login with the provided email and password
    // successfull login
    const u = await logIn(email, password);
    setUser(u);

    // failed login
  };
  const logOut = async()=>{
    await logout()
    setUser(null)

  }
  const value = {
    user,
    // error,
    login,
    register,
    logOut
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
