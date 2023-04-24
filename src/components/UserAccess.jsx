import React, { useContext } from 'react';
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
     console.log(user)
//     console.log(user.userData.picture.thumbnail)
  };

  return (
    <>
      <div className="header__user">
        {auth ? (
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2FElvis%2F&psig=AOvVaw1L8ZARZXyxroVKftCmUHAZ&ust=1682387411183000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIjAsNKzwf4CFQAAAAAdAAAAABAE"
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
