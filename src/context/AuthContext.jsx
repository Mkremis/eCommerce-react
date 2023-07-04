import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../helpers/handleLogin";

const AuthContext = createContext({});
const initialProductQ = 0;
const initialCart = {};
const initialLikes = [];

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))||null);
  const [productQ, setProductQ] = useState(initialProductQ);
  const [cart, setCart] = useState(initialCart);
  const [cartItems, setCartItems] = useState(0);
  const [page, setPage] = useState(1);
  const [likes, setLikes] = useState(initialLikes);
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist'))||false);
  const refreshPage = (newPage = null) => {
    setPage(1);
    navigate(newPage);
  };
  const handlePlusQ = () => setProductQ(productQ + 1);
  const handleMinusQ = () =>
    productQ === 0 ? false : setProductQ(productQ - 1);

  // UPDATE AUTH STATES WHEN USER LOGOUT
  const handleLogout = () => {
    navigate("/");
    setAuth(false);
    localStorage.removeItem("auth");
    setCart(initialCart);
    setCartItems(initialProductQ);
    setLikes(initialLikes);
  };


  const handleAuth = async (e) => {
    let { username, psw } = e.target;
    username =  username.value;
    psw = psw.value;

    const { data, userCart, userLikes } = await handleLogin(
      username,
      psw
    );
    setAuth(data);
    setCart(userCart);
    setLikes(userLikes);
    localStorage.setItem("persist", true);
  };


  const data = {
    persist,
    likes,
    setLikes,
    auth,
    setAuth,
    handleAuth,
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
    cartItems,
    setCartItems,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
