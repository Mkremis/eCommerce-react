import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { cartUpdate } from "../helpers/cartUpdate";
import { likesUpdate } from "../helpers/likesUpdate";
import { handleLogin } from "../helpers/handleLogin";

const AuthContext = createContext();
const initialAuth = Cookies.get("accessToken") || null;
const initialUser = JSON.parse(localStorage.getItem("user")) || null;
const initialProductQ = 0;
const initialCart = {};
const initialLikes = [];

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [auth, setAuth] = useState(initialAuth);
  const [productQ, setProductQ] = useState(initialProductQ);
  const [cart, setCart] = useState(initialCart);
  const [cartItems, setCartItems] = useState(0);
  const [page, setPage] = useState(1);
  const [likes, setLikes] = useState(initialLikes);
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
    localStorage.removeItem("user");
    setUser(null);
    setCart(initialCart);
    setCartItems(initialProductQ);
    setLikes(initialLikes);
  };

  const handleAuth = async (e) => {
    let { username, psw } = e.target;
    const { data, userCart, userLikes } = await handleLogin(
      username.value,
      psw.value
    );
    setAuth(true);
    setUser(data);
    setCart(userCart);
    setLikes(userLikes);
    localStorage.setItem("user", JSON.stringify(data));
  };

  useEffect(() => {
    cartUpdate(auth, cart, user);
  }, [cart]);

  useEffect(() => {
    likesUpdate(likes, auth, user);
  }, [likes]);

  const data = {
    likes,
    setLikes,
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
    cartItems,
    setCartItems,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
