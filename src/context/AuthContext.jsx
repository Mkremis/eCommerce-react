import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import fakeUser from "../test/fakeUser";

const AuthContext = createContext();
const initialAuth = null;
const initialUser = null;
const initialProductQ = 0;
const initialCart = "";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(initialUser);
  const [auth, setAuth] = useState(initialAuth);
  const [productQ, setProductQ] = useState(initialProductQ);
  const [cart, setCart] = useState(initialCart);

  const [page, setPage] = useState(1);
  const refreshPage = (newPage = null) => {
    setPage(1);
    navigate(newPage);
  };

  const handlePlusQ = (e) => setProductQ(productQ + 1);
  const handleMinusQ = (e) =>
    productQ === 0 ? false : setProductQ(productQ - 1);

  const handleAuth = (e) => {
    const { username, psw } = e.target;

    if (auth) {
      setAuth(null);
    } else {
      fetch("https://ecommerce-users-api-production.up.railway.app/api/users")
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((users) => {
          const matchUsername = users.find(
            (user) => user.username === username.value
          );

          const matchPassword =
            matchUsername.userData.login.password === psw.value ? true : false;

          if (matchUsername && matchPassword) {
            setUser(matchUsername.userData);
            setAuth(true);
          }
          if (!matchUsername && matchPassword) {
            alert(`Not user found with the username ${username.value}.`);
          }
          if (matchUsername && !matchPassword) {
            alert(`Wrong password, please try again.`);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleLogout = () => {
    navigate("/");
    setAuth(initialAuth);
    setUser(initialUser);
  };

  const data = {
    auth,
    handleAuth,
    user,
    handleLogout,
    handlePlusQ,
    handleMinusQ,
    setProductQ,
    productQ,
    cart,
    setCart,
    page,
    setPage,
    refreshPage,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
