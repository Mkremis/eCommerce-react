import { helpAuth } from "./helpAuth";

const loaderDashboard = async ({ params }) => {
  const { username } = params;
  const token = localStorage.getItem("auth");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${username}`;
  const response = await helpAuth().get(endpoint, options);
  const userData = response && response.user;
  let user = {};
  for (const key in userData) {
    if (key !== "user_cart") {
      let keys = key.split("_");
      let val = { [keys[1]]: userData[key] };
      user[keys[0]] = { ...user[keys[0]], ...val };
    }
  }
  return user;
};
export default loaderDashboard;
