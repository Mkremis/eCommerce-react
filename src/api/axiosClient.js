import axios from "axios";

// "https://ecommerce-users-api-7qkr-dev.fl0.io"
// http://localhost:3000

const client = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default client;
