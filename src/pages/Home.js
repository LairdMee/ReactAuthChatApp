import React from "react";
import { useAuth } from "../providers/AuthProvider";

const Home = () => {
  const { user } = useAuth();
  return (
    <>
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
