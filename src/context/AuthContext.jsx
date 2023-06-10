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
      body: JSON.stringify(loginData),
    };
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/login`;
    try {
      const response = await fetch(endpoint, options).then((res) =>
        res.ok ? res.json() : Promise.reject("INCORRECT PASSWORD")
      );
      const userData = await response.user;
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
      setAuth(response.token);
      localStorage.setItem("auth", response.token);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      alert(error);
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
    console.log(userData, token);
  }, []);
  useEffect(() => {
    if (auth && user.login.username) {
      let userCart = cart === "" ? {} : cart;
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCart),
      };
      fetch(
        `https://ecommerce-users-api-production.up.railway.app/api/users/${user.login.username}/update-cart`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
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
