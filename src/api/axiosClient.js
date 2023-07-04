import axios from 'axios';
// // axios.defaults.withCredentials = true

const client = axios.create({
    baseURL: 'https://ecommerce-users-api-production.up.railway.app'
  });
  
export default client