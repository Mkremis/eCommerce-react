import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import RenderForm from "../components/RenderForm";
import AuthContext from "../context/AuthContext";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const UserDashboard = () => {
  const { auth, user } = useContext(AuthContext);
  return (
    <article className="dashboard">
      <header className="dashboard_header">
        <h1>{auth ? "Dashboard" : "New User Registration"}</h1>
        {auth && (
          <Navbar bg="light" expand="lg">
            <Container fluid>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <NavLink
                    to={`/dashboard/${user.login.username}`}
                    className="nav-link"
                  >
                    User Data
                  </NavLink>
                  <NavLink
                    to={`/dashboard/orders/${user.login.username}`}
                    className="nav-link"
                  >
                    Order History
                  </NavLink>
                  <NavLink
                    to={`/dashboard/likeds/${user.login.username}`}
                    className="nav-link"
                  >
                    Likes
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )}
      </header>
      {auth ? <Outlet /> : <RenderForm />}
    </article>
  );
};

export default UserDashboard;
