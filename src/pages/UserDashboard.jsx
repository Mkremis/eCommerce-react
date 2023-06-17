import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import RenderForm from "../components/RenderForm";
import AuthContext from "../context/AuthContext";
// import { Nav, Tab, TabContent, TabPane } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

const UserDashboard = () => {
  const { auth, user } = useContext(AuthContext);
  return (
    <article className="dashboard">
      <header>
        <h2 style={{ textAlign: "center" }}>
          {auth ? "Dashboard" : "New User Registration"}
        </h2>
        {auth && (
          <nav className="dashboard-nav">
            <NavLink to={`/dashboard/${user.login.username}`}>
              User Data
            </NavLink>
            <NavLink to={`/dashboard/orders/${user.login.username}`}>
              Order History
            </NavLink>
            <NavLink to={`/dashboard/likeds/${user.login.username}`}>
              Likes
            </NavLink>
          </nav>
        )}
      </header>
      {auth ? <Outlet /> : <RenderForm />}
    </article>
  );
};

export default UserDashboard;
