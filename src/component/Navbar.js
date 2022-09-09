import { NavLink } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    // logoutHandler
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      alert("couldn't logout this time");
    }
  };

  let links;
  if (!user) {
    links = (
      <ul>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "lactive-class" : "not-active-class"
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "lactive-class" : "not-active-class"
          }
        >
          Register
        </NavLink>
      </ul>
    );
  } else {
    links = (
      <ul>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "lactive-class" : "not-active-class"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "lactive-class" : "not-active-class"
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? "lactive-class" : "not-active-class"
          }
        >
          Chat
        </NavLink>

        <NavLink
          onClick={logout}
          to="/logout"
          className={({ isActive }) =>
            isActive ? "lactive-class" : "not-active-class"
          }
        >
          Logout
        </NavLink>
      </ul>
    );
  }

  // if (user === null) { // not logged in
  //   return <Navigate to='/login' />
  // }
  // // logged in
  // return children;

  return (
    <nav className="navbar">
      {/* <!-- LOGO --> */}
      <div className="logo">Chill n Chat Live</div>
      {links}
    </nav>
  );
};

export default Navbar;
