import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../helpers/handleLogin";
import { serverLogout } from "../helpers/serverLogout";
import { processUserData } from "../helpers/processUserData";
import { reloadSession } from "../helpers/reloadSession";

const AuthContext = createContext({});
const initialProductQ = 0;
const initialCart = {};
const initialLikes = [];

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  const [productQ, setProductQ] = useState(initialProductQ);
  const [cart, setCart] = useState(initialCart);
  const [cartItems, setCartItems] = useState(0);
  const [page, setPage] = useState(1);
  const [likes, setLikes] = useState(initialLikes);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const refreshPage = (newPage = null) => {
    setPage(1);
    navigate(newPage);
  };
  const handlePlusQ = () => setProductQ(productQ + 1);
  const handleMinusQ = () =>
    productQ === 0 ? false : setProductQ(productQ - 1);

  const handleLogout = () => {
    navigate("/");
    setAuth(null);
    Cookies.remove("accessToken");
    localStorage.removeItem("persist");
    setPersist(false);
    setCart(initialCart);
    setCartItems(initialProductQ);
    setLikes(initialLikes);
    serverLogout();
  };

  useEffect(() => {
    const checkLogin = async () => {
      if (!persist) return;
      try {
        const response = await reloadSession();
        const { userData } = response?.data;
        const userCart = userData.user_cart;
        const userLikes = userData.user_likes;
        const userInfo = processUserData({ userData });
        setAuth(userInfo);
        setCart(userCart || initialCart);
        setLikes(userLikes || initialLikes);
      } catch (error) {
        handleLogout();
      }
    };
    checkLogin();
  }, []);

  const handleAuth = async (e) => {
    let { username, psw } = e.target;
    username = username.value;
    psw = psw.value;
    const { userInfo, userCart, userLikes } = await handleLogin(username, psw);
    setAuth(userInfo);
    setCart(userCart || initialCart);
    setLikes(userLikes || initialLikes);
  };

  const data = {
    persist,
    setPersist,
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
