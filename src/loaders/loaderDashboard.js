import client from "../api/axiosClient";
import { userRequests } from "../api/clientRequests";

const loaderDashboard = async ({ params }) => {
  try {
    const response = await userRequests().getDashboard();
    return response.data;
  } catch (error) {
    alert(error);
    console.error(error);
    return {};
  }
};

export default loaderDashboard;
