import client from "../api/axiosClient";

export const reloadSession = async () => client.get(`/api/users/reload`);
