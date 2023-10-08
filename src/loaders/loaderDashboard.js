import client from "../api/axiosClient";

const loaderDashboard = async ({ params }) => {
  try {
    const response = await client.get(`/api/users/dashboard`);
    if (response.status !== 200) throw new Error(responseUserData.message);
    return response.data;
  } catch (error) {
    alert(error);
    console.error(error);
    return [];
  }
};

export default loaderDashboard;
