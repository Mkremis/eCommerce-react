import client from "../api/axiosClient";

export const verifyTokenRequest = async ({ params }) => {
  try {
    client.get(`/auth/verify`);
  } catch (err) {
    console.error(err);
    return [];
  }
};
