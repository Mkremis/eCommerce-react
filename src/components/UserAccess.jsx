import React, { useState,  useContext } from 'react';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import LoginForm from './LoginForm';
import AuthContext from '../context/AuthContext';
import Dashboard from './Dashboard';

const UserAccess = () => {
  const { auth, handleAuth, user, handleLogout } = useContext(AuthContext);
  const [isOpenModalLogin, openModalLogin, closeModalModalLogin] =
    useModal(false);
  const [isOpenDash, openDash, closeDash] = useModal();
  const [avatar, setAvatar] = useState(null);
  
  if (auth && isOpenModalLogin) closeModalModalLogin(true);
  const handleLogin = () => {
    if (!auth) {
      if (isOpenModalLogin) {
        closeModalModalLogin(true);
        setAvatar(null)
      } else {
        openModalLogin(true);
      }
    } else {
      console.log(user.userData.picture.thumbnail)
     setAvatar(user.userData.picture.thumbnail);
      if (isOpenDash) {
        closeDash(true);
      } else {
        openDash(true);
      }
    }

  };

  return (
    <>
      <div className="header__user">
        {user ? (
          <img
            src={avatar}
            className="header__user-avatar"
            alt="user avatar"
            onClick={handleLogin}
          />
        ) : (
          <span className="material-symbols-outlined" onClick={handleLogin}>
            account_circle
          </span>
        )}
      </div>
      <Modal
        isOpen={isOpenModalLogin}
        closeModal={closeModalModalLogin}
        addClass="animate"
      >
        <LoginForm handleAuth={handleAuth} auth={auth} />
      </Modal>
      {user && (
        <Dashboard
          isOpen={isOpenDash}
          closeDash={closeDash}
          user={user}
          logout={handleLogout}
        />
      )}
    </>
  );
};

export default UserAccess;
