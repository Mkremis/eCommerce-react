import client from "../api/axiosClient";

const loaderDashboard = async ({ params }) => {
  try {
    const response = await client.get(`/api/users/dashboard`);
    if (response.status !== 200) throw new Error(responseUserData.message);
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
    alert(error);
    console.error(error);
    return [];
  }
};

export default loaderDashboard;
