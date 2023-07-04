import axios from 'axios';
// // axios.defaults.withCredentials = true

const BASE_URL = 'https://mkremis-super-waffle-gvgwrqvrwwp397j7-3500.preview.app.github.dev';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});