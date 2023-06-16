import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import RenderForm from "../components/RenderForm";
import AuthContext from "../context/AuthContext";
import { Nav, Tab, TabContent, TabPane } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const UserDashboard = () => {
  const { auth, user } = useContext(AuthContext);
  return (
    <article className="dashboard">
      <header>
        <h2 style={{ textAlign: "center" }}>
          {auth ? "Dashboard" : "New User Registration"}
        </h2>
        {auth && (
          <Tab.Container defaultActiveKey="/dashboard/user-data">
            <Nav variant="tabs">
              <Nav.Item>
                <LinkContainer to={`/dashboard/${user.login.username}`}>
                  <Nav.Link eventKey="/dashboard/user-data">User Data</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to={`/dashboard/orders/${user.login.username}`}>
                  <Nav.Link eventKey="/dashboard/order-history">
                    Order History
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to={`/dashboard/likeds/${user.login.username}`}>
                  <Nav.Link eventKey="/dashboard/likes">Likes</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>

            <TabContent>
              <TabPane eventKey="/dashboard/user-data">
                {/* Contenido para User Data */}
              </TabPane>
              <TabPane eventKey="/dashboard/order-history">
                {/* Contenido para Order History */}
              </TabPane>
              <TabPane eventKey="/dashboard/likes">
                {/* Contenido para Likes */}
              </TabPane>
            </TabContent>
          </Tab.Container>
        )}
      </header>
      {auth ? <Outlet /> : <RenderForm />}
    </article>
  );
};

export default UserDashboard;
