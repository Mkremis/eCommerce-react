import axios from "axios";
// // axios.defaults.withCredentials = true

const client = axios.create({
  // 'https://ecommerce-users-api-production.up.railway.app'
  baseURL: "https://ecommerce-users-api-production.up.railway.app",
  withCredentials: true,
});

export default client;
