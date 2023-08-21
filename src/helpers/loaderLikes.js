import client from "../api/axiosClient";

export const loaderLikes = async ({ params }) => {
  try {
    const { username } = params;
    const response = await client.get(`/api/users/${username}/likes`);
    return response.data.user_likes;
  } catch (err) {
    console.error(err);
    return [];
  }
};
