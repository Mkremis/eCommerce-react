import client from "../api/axiosClient";

export const handleLogout = async () => {
  try {
    const response = await client.get(`/api/users/logout`);
    if (response.status === "200") alert(response.data.message);
  } catch (err) {
    console.error(err);
  }
};
