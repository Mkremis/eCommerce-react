export const loaderLikes = async ({ params }) => {
  try {
    const { username } = params;
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        "Content-Type": "application/json",
      },
    };
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${username}/likes`;
    const response = await window.fetch(endpoint, options);
    const responseLikes = await response.json();
    if (response.status !== 200) throw new Error(responseOrders.message);
    return responseLikes.user_likes;
  } catch (error) {
    alert(error);
    console.error(error);
    return null;
  }
};
