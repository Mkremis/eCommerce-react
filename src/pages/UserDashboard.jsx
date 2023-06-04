import React from "react";
import RenderForm from "../components/RenderForm";
import { useLoaderData } from "react-router-dom";

const UserDashboard = ({newUser}) => {
  let {user} = useLoaderData();
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
