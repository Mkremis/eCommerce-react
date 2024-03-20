import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import DashboardForm from "../components/DashboardForm";

const Dashboard = () => {
  const { auth: user } = useContext(AuthContext);

  return (
    <article className="dashboard">
      <header>
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
      {user ? <Outlet /> : <DashboardForm />}
    </article>
  );
};

export default Dashboard;
