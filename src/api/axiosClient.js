import axios from "axios";

const client = axios.create({
  baseURL: "https://ecommerce-users-api-production.up.railway.app",
  withCredentials: true,
});

export default client;
