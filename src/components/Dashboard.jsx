import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom"; 

const Dashboard = ({ isOpen, closeDash, user, logout }) => {
  const navigate = useNavigate();
  
  return (
    <article
      className={`user-panel ${isOpen && "is-open"}`}
      onClick={closeDash}
    >
      <div className="user-info">
        <h3 className="user-fullname">
          {user.fullname.title} {user.fullname.first} {user.fullname.last}
        </h3>
        <p className="user-username">{user.login.username}</p>
        <p className="user-username">{user.email}</p>
      </div>
      <div className="user-buttons">
        <button
          className="user-mangment"
          onClick={() => navigate(`/dashboard/${user.login.username}`)}
        >
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
