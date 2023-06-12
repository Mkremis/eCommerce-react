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
      <header
        style={{
          marginTop: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div style={{ flexBasis: "33%" }}></div>
        <div style={{ flexBasis: "33%" }}>
          <h2
            style={{
              textAlign: "center",
              color: "var( --Orange)",
            }}
          >
            {user ? "User Dashboard" : "loggin out.."}
          </h2>
        </div>
        <div style={{ flexBasis: "33%", textAlign: "center" }}>
          {user && (
            <button
              onClick={() => navigate(`/orders/${user.login.username}`)}
              style={{ padding: "0.5rem" }}
            >
              View Orders
            </button>
          )}
        </div>
      </header>

      {user && <RenderForm user={user} />}
    </article>
  );
};

export default UserDashboard;
