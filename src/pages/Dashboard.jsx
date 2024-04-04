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
            <NavLink to={`/dashboard/${user.userName}`}>User Data</NavLink>
            <NavLink to={`/dashboard/purchases/${user.userName}`}>
              Order History
            </NavLink>
            <NavLink to={`/dashboard/likes/${user.userName}`}>Likes</NavLink>
          </nav>
        )}
      </header>
      {user ? <Outlet /> : <DashboardForm />}
    </article>
  );
};

export default Dashboard;
