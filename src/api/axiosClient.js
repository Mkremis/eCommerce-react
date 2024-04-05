import axios from "axios";

// "https://ecommerce-users-api-node-express-dev-hjbp.2.us-1.fl0.io"
//http://localhost:8080

const client = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  crossDomain: true,
});

export default client;
