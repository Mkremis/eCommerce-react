import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverLogout } from "../helpers/serverLogout";
import { reloadSession } from "../helpers/reloadSession";
import { login } from "../api/authRequests";

const AuthContext = createContext({});
const initialCart = {};
const initialLikes = [];

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  const [cart, setCart] = useState(initialCart);
  const [cartItems, setCartItems] = useState(0);
  const [page, setPage] = useState(1);
  const [likes, setLikes] = useState(initialLikes);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const [errors, setErrors] = useState([]);

  const refreshPage = (newPage = null) => {
    setPage(1);
    navigate(newPage);
  };

  const handleLogout = () => {
    navigate("/");
    setAuth(null);
    localStorage.removeItem("persist");
    setPersist(false);
    setCart(initialCart);
    setCartItems(0);
    setLikes(initialLikes);
    serverLogout();
  };

  useEffect(() => {
    const checkLogin = async () => {
      if (!persist) return;
      try {
        const response = await reloadSession();
        const { user_data, user_cart, user_likes } = response.data;
        const userCart = user_cart;
        const { likes } = user_likes;
        const userInfo = user_data;
        setAuth(userInfo);
        setCart(userCart || initialCart);
        setLikes(likes || initialLikes);
      } catch (error) {
        handleLogout();
      }
    };
    checkLogin();
  }, []);

  const handleAuth = async (e) => {
    try {
      let { username, psw } = e.target;
      username = username.value;
      psw = psw.value;
      const response = await login(username, psw);
      const { user_data, user_cart, user_likes } = response.data;
      setAuth(user_data);
      setCart(user_cart.cart || initialCart);
      setLikes(user_likes.likes || initialLikes);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
    }
  };
  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const data = {
    errors,
    persist,
    setPersist,
    likes,
    setLikes,
    auth,
    setAuth,
    handleAuth,
    handleLogout,
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
