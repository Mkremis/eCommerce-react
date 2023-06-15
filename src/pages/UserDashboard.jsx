import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import RenderForm from "../components/RenderForm";
import AuthContext from "../context/AuthContext";

const UserDashboard = () => {
  const { auth, user } = useContext(AuthContext);
  return (
    <article className="dashboard">
      <header className="dashboard_header">
        <div className="dashboard_title-container">
          <h1>{auth ? "Dashboard" : "New User Registration"}</h1>
        </div>
        {auth && (
          <nav className="dashboard_nav">
            <ul className="dashboard_items">
              <li>
                <NavLink
                  to={`/dashboard/${user.login.username}`}
                  className="dashboard_link"
                >
                  User Data
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard/orders/${user.login.username}`}
                  className="dashboard_link"
                >
                  Order History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard/likeds/${user.login.username}`}
                  className="dashboard_link"
                >
                  Likes
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </header>
      {auth ? <Outlet /> : <RenderForm />}
    </article>
  );
};

export default UserDashboard;
