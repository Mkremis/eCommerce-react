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
        <h3 className="user-fullname">
          {user.title} {user.first} {user.last}
        </h3>
        <p className="user-username">{user.username}</p>
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
