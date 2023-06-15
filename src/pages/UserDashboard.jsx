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
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      to={`/dashboard/${user.login.username}`}
                      className="nav-link"
                    >
                      User Data
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/dashboard/orders/${user.login.username}`}
                      className="nav-link"
                    >
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/dashboard/likeds/${user.login.username}`}
                      className="nav-link"
                    >
                      Likes
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </header>
      {auth ? <Outlet /> : <RenderForm />}
    </article>
  );
};

export default UserDashboard;
