import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { helpHttp } from "../helpers/helpHttp";

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

  const handlePlusQ = (e) => setProductQ(productQ + 1);
  const handleMinusQ = (e) =>
    productQ === 0 ? false : setProductQ(productQ - 1);
    
  const handleAuth = async (e) => {
    const { username, psw } = e.target;
    if (auth) {
      setAuth(null);
    } else {
    const users =  await helpHttp().get("https://ecommerce-users-api-production.up.railway.app/api/users")
    console.log(users)
    const matchUsername = users.find(
      (user) => user.username === username.value
    );
    const matchPassword = 
            matchUsername.userData.login.password === psw.value ? true : false;

          if (matchUsername && matchPassword) {
            setUser(matchUsername.userData);
            matchUsername.cart && setCart(matchUsername.cart);
            setAuth(true);
          }
          if (!matchUsername && matchPassword) {
            alert(`Not user found with the username ${username.value}.`);
          }
          if (matchUsername && !matchPassword) {
            alert(`Wrong password, please try again.`);
          }
  
    }
  };


  useEffect(()=>{
    const username = user && user.login.username;
    if(username && cart){
     const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
      body: cart,
    };
    helpHttp().put(
    `https://ecommerce-users-api-production.up.railway.app/api/users/${username}/update-cart`,
    requestOptions
  );
}
  },[cart]);

  const handleLogout = () => {
    navigate("/");
    setAuth(initialAuth);
    setUser(initialUser);
    setCart(initialCart);
    setCartItems(0);
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
    cartItems,
    setCartItems
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
