import React from "react";
import "./UserPanel.css";
import { useNavigate } from "react-router-dom";

const UserPanel = ({ isOpen, closeDash, user, logout }) => {
  const navigate = useNavigate();
  const handleDashboard = () => navigate(`/dashboard/${user.userName}`);

  return (
    <article
      className={`user-panel ${isOpen && "is-open"}`}
      onClick={closeDash}
    >
      <div className="user-info">
        <p className="user-username">{user.userName}</p>
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

export default UserPanel;
