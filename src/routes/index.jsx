import React from 'react';
import { createHashRouter } from 'react-router-dom';
import App from '../App';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import ReviewProduct from '../pages/ReviewProduct';
import SortProduct from '../pages/SortProducts';
import UserDashboard from '../pages/UserDashboard';
import loaderSort from '../helpers/loaderSort';
import loaderDetails from '../helpers/loaderDetails';
import loaderHome from '../helpers/loaderHome';
import Checkout from '../pages/Checkout';
import loaderDashboard from '../helpers/loaderDashboard';
import SuccessPayment from '../pages/SuccessPayment';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />, 
    children: [
      {
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Home />, loader: loaderHome },

          {
            path: '/:root/:id',
            element: <ReviewProduct />,
            loader: loaderDetails,
          },
          {
            path: '/:root/sortBy/:sortBy/filter/:filter/search/:search/offset/:offset',
            element: <SortProduct />,
            loader: loaderSort,
          },
          {
            path: '/dashboard/:username/token/:token',
            element: <UserDashboard newUser={null}/>,
            loader: loaderDashboard,
          },
          {
            path: '/dashboard/newuser',
            element: <UserDashboard newUser={"newuser"}/>,
          },
          {
            path: '/about',
            element: <About />,
          },
          {
            path: '/checkout',
            element: <Checkout />,
          },
          {
            path: '/contact',
            element: <Contact />,
          },
          {
            path: '/success-payment',
            element: <SuccessPayment/>,
          },
        ],
      },
    ],
  },
]);

export default router;
