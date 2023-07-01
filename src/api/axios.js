import axios from 'axios';
// axios.defaults.withCredentials = true
const BASE_URL = 'https://ecommerce-users-api-production.up.railway.app';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});