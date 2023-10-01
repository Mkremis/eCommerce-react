import client from "../api/axiosClient";
import { processUserData } from "./processUserData";

const loaderDashboard = async ({ params }) => {
  try {
    const response = await client.get(`/api/users/dashboard`);
    if (response.status !== 200) throw new Error(responseUserData.message);
    const user_data = processUserData(response.data);
    console.log(user_data);
    return user_data;
  } catch (error) {
    alert(error);
    console.error(error);
    return [];
  }
};

export default loaderDashboard;
