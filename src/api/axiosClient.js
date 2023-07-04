import axios from 'axios';
// // axios.defaults.withCredentials = true

const client = axios.create({
    baseURL: 'https://mkremis-super-waffle-gvgwrqvrwwp397j7-3500.preview.app.github.dev'
  });
  
export default client