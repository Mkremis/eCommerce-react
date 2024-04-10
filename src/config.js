console.log(process.env.NODE_ENV);

const API_KEY = import.meta.env.VITE_API_KEY;

const MERCADOPAGO_KEY = import.meta.env.VITE_MERCADOPAGO_KEY;

const SERVER_ENDPOINT =
  import.meta.env.VITE_SERVER_ENDPOINT || "http://localhost:8080";

export { API_KEY, MERCADOPAGO_KEY, SERVER_ENDPOINT };
