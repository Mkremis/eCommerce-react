import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fakeUser from '../test/fakeUser';

const AuthContext = createContext();
const initialAuth = null;
const initialUser = null;
const initialProductQ = 0;
const initialCart = '';

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
      if (
        username.value === fakeUser.login.username &&
        psw.value === fakeUser.login.password
      ) {
        setUser(fakeUser);
        setAuth(true);
      } else {
        alert('wrong user email or password');
      }
    }
  };
  const handleLogout = () => {
    navigate('/');
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
