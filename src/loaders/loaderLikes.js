import { likeRequests } from "../api/clientRequests";

const loaderLikes = async () => {
  try {
    const response = await likeRequests().getUserLikes();
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
export default loaderLikes;
