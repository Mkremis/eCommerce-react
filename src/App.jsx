// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import { Outlet, useNavigation } from 'react-router-dom';
import Aside from './components/Aside';
import MediaQuery from 'react-responsive';
import Loader from './components/Loader';

function App() {
  const navigation = useNavigation();
  return (
    <main>
      <AuthProvider>
        <Header />
        <MediaQuery query="(min-width: 415px)">
          <Aside />
        </MediaQuery>

        {navigation.state === 'loading' && <Loader />}

        <Outlet />
      </AuthProvider>
    </main>
  );
}

export default App;