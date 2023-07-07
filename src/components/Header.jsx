import React, { useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { useModal } from '../hooks/useModal';
import ModalTop from './ModalTop';
import MediaQuery from 'react-responsive';
import Navbar from './Navbar';
import Aside from './Aside';
import SearchBar from './SearchBar';
import UserAccess from './UserAccess';
import CartNotification from './CartNotification';
import logo from '../assets/logo.png';
import GenderHeader from './GenderHeader';
import AuthContext from '../context/AuthContext';
import useRefreshToken from '../hooks/useRefreshToken';

const Header = () => {
  const navigate = useNavigate();
  const handleMenu = () =>
    isOpenModalTop ? closeModalModalTop(true) : openModalTop(true);

  const [isOpenModalTop, openModalTop, closeModalModalTop] = useModal(false);

  const refresh = useRefreshToken();
  const {auth, setAuth, setCart, setLikes, persist} = useContext(AuthContext)
    useEffect(() => {
        const verifyRefreshToken = async () => {
        try {
          await refresh(setAuth, setCart, setLikes);
        } catch (err) {
          console.error(err);
        } 
      };
      !auth && persist && verifyRefreshToken() 
    }, []);

  return (
    <header className="header">
      <div className="header__navigation">
        <div className="header__menu-container">
          {
            <span className="material-symbols-outlined" onClick={handleMenu}>
              {isOpenModalTop ? 'menu_open' : 'menu'}
            </span>
          }
        </div>
        <img
          className="header__logo"
          src={logo}
          width={150}
          height={50}
          alt="logo"
          onClick={() => navigate('/')}
        />
        {/* navbar mobile */}
        <MediaQuery query="(max-width: 415px)">
          <ModalTop
            isOpen={isOpenModalTop}
            closeModal={closeModalModalTop}
            stylesModal={{
              justifyContent: 'left',
              alignItems: 'flex-start',
            }}
            stylesClose={{ left: '100%' }}
          >
            {/* <Navbar /> */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <GenderHeader gender={'women'} />
              <GenderHeader gender={'men'} />
            </div>
            <Aside />
          </ModalTop>
        </MediaQuery>
        {/* navbar desktop */}
        <MediaQuery query="(min-width: 415px)">
          <Navbar />
        </MediaQuery>
      </div>
      <SearchBar />

      <CartNotification />
      <UserAccess />
    </header>
  );
};

export default Header;
