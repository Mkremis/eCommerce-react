import React from "react";
import { createHashRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ReviewProduct from "../pages/ReviewProduct";
import SortProduct from "../pages/SortProducts";
import Checkout from "../pages/Checkout";
import SuccessPayment from "../pages/SuccessPayment";
import Purchases from "../pages/Purchases";
import DashboardForm from "../components/DashboardForm";
import {
  loaderHome,
  loaderDetails,
  loaderSort,
  loaderDashboard,
  loaderPurchases,
  loaderLikes,
  loaderTransaction,
} from "../loaders";
import Dashboard from "../pages/Dashboard";
import Likes from "../pages/Likes";
import FailPayment from "../pages/FailPayment";
import Transaction from "../pages/Transaction";
Transaction;
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: loaderHome,
      },
      {
        path: "/:root/:id",
        element: <ReviewProduct />,
        loader: loaderDetails,
      },
      {
        path: "/:root/category/:category/sortBy/:sortBy/filter/:filter/search/:search/offset/:offset",
        element: <SortProduct />,
        loader: loaderSort,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: ":username",
            element: <DashboardForm />,
            loader: loaderDashboard,
          },
          {
            path: "purchases/:username",
            element: <Purchases />,
            loader: loaderPurchases,
          },
          {
            path: "likes/:username",
            element: <Likes />,
            loader: loaderLikes,
          },
          {
            path: "newuser",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/success-payment",
        element: <SuccessPayment />,
      },
      {
        path: "/fail-payment",
        element: <FailPayment />,
      },
      {
        path: "/transaction/:merchant_order_id",
        element: <Transaction />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
