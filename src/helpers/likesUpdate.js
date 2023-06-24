export const likesUpdate = ({ likes, auth, user }) => {
  const likesToUpdate = likes.length === 0 ? null : likes;
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(likesToUpdate),
  };
  const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${user.login.username}/update-likes`;
  window
    .fetch(endpoint, options)
    // .then((res) => res.json())
    // .then((data) => console.log(data))
    .catch((err) =>
      console.error("Error updatting the user likes form the server", err)
    );
  // localStorage.setItem("likes", JSON.stringify(likes));
};
