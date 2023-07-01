import React, { useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import RenderForm from "../components/RenderForm";
import AuthContext from "../context/AuthContext";
import axios from "../api/axios";



const UserDashboard = () => {
  const { auth, user } = useContext(AuthContext);
  useEffect(()=>{
    const r = async ()=>{
      const response = await axios.get('/refresh-token', {
         withCredentials: true
    });
    const {data} =  response;
    console.log(data)
    }
    r()
    
    },[])

  return (
    <article className="dashboard">
      <header>
        <h2 style={{ textAlign: "center" }}>
          {auth ? "Dashboard" : "New User Registration"}
        </h2>
        {auth && (
          <nav className="dashboard-nav">
            <NavLink to={`/dashboard/${user.login.username}`}>
              User Data
            </NavLink>
            <NavLink to={`/dashboard/orders/${user.login.username}`}>
              Order History
            </NavLink>
            <NavLink to={`/dashboard/likeds/${user.login.username}`}>
              Likes
            </NavLink>
          </nav>
        )}
      </header>
      {auth ? <Outlet /> : <RenderForm />}
    </article>
  );
};

export default UserDashboard;
