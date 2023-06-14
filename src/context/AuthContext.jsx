import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const initialAuth = localStorage.getItem("auth") || null;
const initialUser = JSON.parse(localStorage.getItem("user")) || null;
const initialProductQ = 0;
const initialCart = null;
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

  const handleAuth = async (e) => {
    try {
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
      const login = await window.fetch(endpoint, options);
      const responseLogin = await login.json();
      if (login.status !== 200) throw new Error(responseLogin.message);
      const userData = responseLogin.user;
      let data = {};
      for (const key in userData) {
        if (key !== "user_cart") {
          let keys = key.split("_");
          let val = { [keys[1]]: userData[key] };
          data[keys[0]] = { ...data[keys[0]], ...val };
        }
        localStorage.setItem("auth", responseLogin.token);
        localStorage.setItem("user", JSON.stringify(data));
        userData.user_cart && setCart(userData.user_cart);
        setUser(data);
        setAuth(responseLogin.token);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("auth");
    setAuth(null);
    localStorage.removeItem("user");
    setUser(null);
    setCart(null);
    setCartItems(0);
  };

  useEffect(() => {
    if (auth) {
      if (likes) {
        const options = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(likes),
        };
        const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${user.login.username}/update-likes`;
        window
          .fetch(endpoint, options)
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) =>
            console.log("Error updatting the user likes form the server", err)
          );
      }
    } else {
      sessionStorage.setItem("likes", JSON.stringify(likes));
    }
  }, [likes]);

  useEffect(() => {
    if (auth) {
      if (cart) {
        const options = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        };
        const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${user.login.username}/update-cart`;
        window
          .fetch(endpoint, options)
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) =>
            console.log("Error updatting the user cart form the server", err)
          );
      }
    } else {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (auth) {
      const options = {
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",
        },
      };
      const endpointCart = `https://ecommerce-users-api-production.up.railway.app/api/users/${user.login.username}/cart`;
      const endpointLikes = `https://ecommerce-users-api-production.up.railway.app/api/users/${user.login.username}/likes`;
      Promise.all([
        window.fetch(endpointCart, options),
        window.fetch(endpointLikes, options),
      ])
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then(([cart, likes]) => {
          if (cart.user_cart) setCart(cart.user_cart);
          setLikes(likes.user_likes);
        });
    }
  }, [auth]);

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
