import React, { useContext, useEffect } from "react";
import RenderForm from "../components/RenderForm";
import AuthContext from "../context/AuthContext";
 
const UserDashboard = ({newUser}) => {
  let { user } = useContext(AuthContext);
newUser && !user ?user=newUser :user;

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
      {user && <RenderForm user={user} />}
    </article>
  );
};

export default UserDashboard;
