import client from "../api/axiosClient";

export const verifySession = async () => client.get(`/api/verify`);
