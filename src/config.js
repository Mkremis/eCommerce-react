console.log(process.env.NODE_ENV);

const MERCADOPAGO_KEY = import.meta.env.VITE_MERCADOPAGO_KEY;
const SERVER_ENDPOINT =
  import.meta.env.SERVER_ENDPOINT || "http://localhost:8080";
export { MERCADOPAGO_KEY, SERVER_ENDPOINT };
