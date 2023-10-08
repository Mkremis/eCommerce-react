import client from "../../api/axiosClient";

const loaderLikes = async ({ params }) => {
  try {
    const { username } = params;
    const response = await client.get(`/api/users/${username}/likes`);
    console.log(response);

    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
export default loaderLikes;
