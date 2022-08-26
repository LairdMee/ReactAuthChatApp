import React from "react";
import { useAuth } from "../providers/AuthProvider";
import Meera from "../images/Meera.jpg";
import Navbar from "../component/Navbar"
const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
       <Navbar/>
       <div className="profile">
      <div>Profile</div>
      {user.email}
      <br />
      <img className="profile-image" src={Meera} />
    </div>

    </div>
   
  );
};

export default Profile;
