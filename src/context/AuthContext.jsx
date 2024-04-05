import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequests } from "../api/clientRequests";

const AuthContext = createContext({});
const initialCart = [];
const initialLikes = [];

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en-US");
  const [auth, setAuth] = useState(null);
  const [cart, setCart] = useState(initialCart);
  const [currentProduct, setCurrentProduct] = useState(null);
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
    userRequests().logoutUser();
    navigate("/");
    localStorage.removeItem("persist");
    setPersist(false);
    setCart(initialCart);
    setCartItems(0);
    setLikes(initialLikes);
    setAuth(null);
  };

  const reloadSession = async () => {
    try {
      const response = await userRequests().reloadSession();
      const { userData, userCart, userLikes } = response.data;
      setAuth(userData);
      setCart(userCart || initialCart);
      setLikes(userLikes || initialLikes);
    } catch (error) {
      console.error(error);
      handleLogout();
    }
  };
  useEffect(() => {
    if (!persist) return;
    reloadSession();
  }, []);

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
    setErrors,
    errors,
    persist,
    setPersist,
    likes,
    setLikes,
    auth,
    setAuth,
    handleLogout,
    cart,
    setCart,
    page,
    setPage,
    refreshPage,
    cartItems,
    setCartItems,
    currentProduct,
    setCurrentProduct,
    currency,
    setCurrency,
    language,
    reloadSession,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
