import axios from "axios";

// "https://ecommerce-users-api-node-express-dev-hjbp.2.us-1.fl0.io"
// http://localhost:8090

const client = axios.create({
  baseURL: "https://ecommerce-users-api-node-express-dev-hjbp.2.us-1.fl0.io",
  withCredentials: true,
  crossDomain: true,
});

export default client;
