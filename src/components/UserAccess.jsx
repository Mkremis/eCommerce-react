import React, { useEffect, useState, useContext } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import AuthContext from "../context/AuthContext";
import UserPanel from "./UserPanel";

const UserAccess = () => {
  const { auth, handleAuth, handleLogout } = useContext(AuthContext);
  const [isOpenModalLogin, openModalLogin, closeModalModalLogin] =
    useModal(false);
  const [isOpenDash, openDash, closeDash] = useModal();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (auth) {
      setAvatar(auth.thumbnail);
    } else {
      setAvatar(null);
    }
  }, [auth]);

  if (auth && isOpenModalLogin) closeModalModalLogin(true);
  const handleLogin = () => {
    if (!auth) {
      if (isOpenModalLogin) {
        closeModalModalLogin(true);
      } else {
        openModalLogin(true);
      }
    } else {
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
        {avatar ? (
          <img
            src={avatar}
            className="header__user-avatar"
            alt="user avatar"
            style={{ width: 39, height: 39 }}
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
        <LoginForm
          handleAuth={handleAuth}
          closeModalLogin={closeModalModalLogin}
        />
      </Modal>
      {auth && (
        <UserPanel
          isOpen={isOpenDash}
          closeDash={closeDash}
          user={auth}
          logout={handleLogout}
        />
      )}
    </>
  );
};

export default UserAccess;
