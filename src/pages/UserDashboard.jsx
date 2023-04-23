import React, { useContext } from "react";
import RenderForm from "../components/RenderForm";
import AuthContext from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <article>
      <h2
        style={{
          textAlign: "center",
          marginTop: "1rem",
          color: "var( --Orange)",
        }}
      >
        {user ? "User Dashboard" : "loggin out.."}
      </h2>
      {user && <RenderForm data={user} />}
    </article>
  );
};

export default UserDashboard;
