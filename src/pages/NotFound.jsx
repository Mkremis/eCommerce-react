import React from "react";
import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h2>404</h2>
      <p>Page Not Found</p>
      <p>{error.statusText || error.message}</p>
      <Link to="/">Volver al Home</Link>
    </div>
  );
};

export default NotFound;
