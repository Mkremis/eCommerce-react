import client from "../api/axiosClient";

export const handleLogin = async (login_username, login_password) => {
  try {
    const response = await client.post(`/api/users/login`, {
      login_username,
      login_password,
    });

    const userData = response?.data?.userData;
    let data = {};
    for (const key in userData) {
      if (key !== "user_cart") {
        let keys = key.split("_");
        let val = { [keys[1]]: userData[key] };
        data[keys[0]] = { ...data[keys[0]], ...val };
      }
    }
    const userCart = userData.user_cart;
    const userLikes = userData.user_likes;

    return { data, userCart, userLikes };
  } catch (err) {
    console.error(err);
  }
};
