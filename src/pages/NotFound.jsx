import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h2>404</h2>
      <p>Page Not Found</p>

      <Link to="/">Volver al Home</Link>
    </div>
  );
};

export default NotFound;
