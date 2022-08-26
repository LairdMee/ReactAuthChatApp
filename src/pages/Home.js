import React from "react";
import { useAuth } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar"

const Home = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <div>Home</div>
      {/* <br />
      <Link to="/profile"> Profile </Link>
      <Link to="/chat"> Chat Room </Link> */}
      <br />
      {user ? user.email : "User not set"}
    </>
  );
};
export default Home;
