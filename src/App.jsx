import "./App.css";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import { Outlet, useNavigation } from "react-router-dom";
import MediaQuery from "react-responsive";
import Loader from "./components/Loader";

function App() {
  const navigation = useNavigation();
  return (
    <main>
      <AuthProvider>
        <Header />
        <MediaQuery query="(min-width: 415px)"></MediaQuery>
        {navigation.state === "loading" && <Loader />}
        <Outlet />
      </AuthProvider>
    </main>
  );
}

export default App;
