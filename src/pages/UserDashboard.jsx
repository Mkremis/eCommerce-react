import React from "react";
import RenderForm from "../components/RenderForm";
import { useLoaderData, useNavigate } from "react-router-dom";

const UserDashboard = ({ newUser }) => {
  const navigate = useNavigate();
  let user;
  if (newUser) {
    user = newUser;
  } else {
    user = useLoaderData();
  }

  return (
    <article className="dashboard">
      <header>
        <h2
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: "var( --Orange)",
          }}
        >
          {user ? "User Dashboard" : "loggin out.."}
        </h2>
      </header>
      <aside
        style={{
          width: "90%",
          margin: "1rem auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          {user && (
            <button
              onClick={() => navigate(`/likeds/${user.login.username}`)}
              style={{ padding: "0.5rem" }}
            >
              View Likeds
            </button>
          )}
        </div>
        <div>
          {user && (
            <button
              onClick={() => navigate(`/orders/${user.login.username}`)}
              style={{ padding: "0.5rem" }}
            >
              Order History
            </button>
          )}
        </div>
      </aside>
      {user && <RenderForm user={user} />}
    </article>
  );
};

export default UserDashboard;
