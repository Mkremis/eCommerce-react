import axios from "axios";
import { SERVER_ENDPOINT } from "../config";

const client = axios.create({
  baseURL: SERVER_ENDPOINT,
  withCredentials: true,
  crossDomain: true,
});

export default client;
