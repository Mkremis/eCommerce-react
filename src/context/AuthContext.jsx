import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [cartItems, setCartItems] = useState(0);
  const [page, setPage] = useState(1);
  const refreshPage = (newPage = null) => {
    setPage(1);
    navigate(newPage);
  };
  const handlePlusQ = () => setProductQ(productQ + 1);
  const handleMinusQ = () =>
    productQ === 0 ? false : setProductQ(productQ - 1);
  const handleAuth = async (e) => {
    let { username, psw } = e.target;
    let login_username = username.value;
    let login_password = psw.value;
    const loginData = { login_username, login_password };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: loginData,
    };
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/login`;

    const responseLogin = await window.fetch(endpoint, options);
    const userData = responseLogin && responseLogin.user;
    if (userData) {
      let data = {};
      for (const key in userData) {
        if (key !== "user_cart") {
          let keys = key.split("_");
          let val = { [keys[1]]: userData[key] };
          data[keys[0]] = { ...data[keys[0]], ...val };
        }
      }
      userData.user_cart && setCart(userData.user_cart);
      setUser(data);
      setAuth(responseLogin.token);
      localStorage.setItem("auth", responseLogin.token);
      localStorage.setItem("user", JSON.stringify(data));
    }
  };
  const handleLogout = () => {
    navigate("/");
    setAuth(initialAuth);
    localStorage.removeItem("auth");
    setUser(initialUser);
    localStorage.removeItem("user");
    setCart(initialCart);
    setCartItems(0);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("auth");
    if (userData && token) {
      setUser(userData);
      setAuth(token);
    }
  }, []);

  useEffect(() => {
    if (auth) {
      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      };
      const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${user.login.username}/update-cart`;
    const responseUpdateCart = await window.fetch(endpoint, options);
    console.log(responseUpdateCart)
    }
  }, [cart]);

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
    cartItems,
    setCartItems,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
