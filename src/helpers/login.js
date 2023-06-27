export const login = async (login_username, login_password, handleLogout) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ login_username, login_password }),
    };
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/login`;
    const login = await window.fetch(endpoint, options);
    const responseLogin = await login.json();
    if (login.status !== 200) throw new Error(responseLogin.message);
    const userData = responseLogin.user;
    let data = {};
    for (const key in userData) {
      if (key !== "user_cart") {
        let keys = key.split("_");
        let val = { [keys[1]]: userData[key] };
        data[keys[0]] = { ...data[keys[0]], ...val };
      }
    }
    const token = responseLogin.token;
    const userCart = userData.user_cart;
    const userLikes = userData.user_likes;
    return { token, data, userCart, userLikes };
  } catch (error) {
    alert(error);
    handleLogout();
  }
};
