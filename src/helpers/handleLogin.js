import client from "../api/axiosClient";
import { processUserData } from "./processUserData";

export const handleLogin = async (login_username, login_password) => {
  const response = await client.post(`/api/users/login`, {
    login_username,
    login_password,
  });
  const { userData } = response?.data;
  const userCart = userData.user_cart;
  const userLikes = userData.user_likes;
  const userInfo = processUserData({ userData });
  return { userInfo, userCart, userLikes };
};
