console.log(process.env.NODE_ENV);

const MP_KEY = import.meta.env.VITE_MP_KEY;
const SERVER_ENDPOINT = import.meta.env.VITE_SERVER || "http://localhost:8080";
export { MP_KEY, SERVER_ENDPOINT };
