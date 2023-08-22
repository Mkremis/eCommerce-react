import { dashboard } from "../api/authRequests";

const loaderDashboard = async () => {
  try {
    const response = await dashboard();
    const { user } = response.data;
    let data = {};
    user.login_password = "";
    delete user.user_cart;
    delete user.user_likes;
    delete user.refresh_token;
    for (const key in user) {
      let keys = key.split("_");
      let val = { [keys[1]]: user[key] };
      data[keys[0]] = { ...data[keys[0]], ...val };
    }
    return data;
  } catch (error) {
    alert(error.message);
    console.error(error);
    return [];
  }
};
