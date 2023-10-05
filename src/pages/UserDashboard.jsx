import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
// import RenderForm from "../components/RenderForm";
import AuthContext from "../context/AuthContext";
import RegistrationForm from "../components/RegistrationForm";

const UserDashboard = () => {
  const { auth: user } = useContext(AuthContext);

  return (
    <article className="dashboard">
      <header>
        {/* <h2 style={{ textAlign: "center" }}>
          {user ? "Dashboard" : "New User Registration"}
        </h2> */}
        {user && (
          <nav className="dashboard-nav">
            <NavLink to={`/dashboard/${user.username}`}>User Data</NavLink>
            <NavLink to={`/dashboard/orders/${user.username}`}>
              Order History
            </NavLink>
            <NavLink to={`/dashboard/likeds/${user.username}`}>Likes</NavLink>
          </nav>
        )}
      </header>
      {user ? <Outlet /> : <RegistrationForm />}
    </article>
  );
};

export default UserDashboard;
