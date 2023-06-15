const loaderDashboard = async ({ params }) => {
  try {
    const { username } = params;
    const token = localStorage.getItem("auth");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${username}`;
    const response = await window.fetch(endpoint, options);

    const responseUserData = await response.json();
    if (response.status !== 200) throw new Error(responseUserData);
    const { user } = responseUserData;
    let data = {};
    user.login_password = "";
    delete user.user_cart;
    delete user.user_likes;
    for (const key in user) {
      let keys = key.split("_");
      let val = { [keys[1]]: user[key] };
      data[keys[0]] = { ...data[keys[0]], ...val };
    }
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default loaderDashboard;
