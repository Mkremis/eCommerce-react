import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ isOpen, closeDash, user, logout }) => {
  const navigate = useNavigate();
  const handleDashboard = () => navigate(`/dashboard/${user.username}`);

  return (
    <article
      className={`user-panel ${isOpen && "is-open"}`}
      onClick={closeDash}
    >
      <div className="user-info">
        <p className="user-username">{user.username}</p>
        <p className="user-username">{user.email}</p>
      </div>
      <div className="user-buttons">
        <button className="user-mangment" onClick={handleDashboard}>
          Manage your account
        </button>
        <button className="user-logout" onClick={logout}>
          Log out
        </button>
      </div>
    </article>
  );
};

export default Dashboard;
