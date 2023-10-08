import client from "../api/axiosClient";

export const likesUpdate = (likes, user) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  client
    .put(
      `/api/users/${user.username}/update-likes`,
      JSON.stringify({ likes }),
      options
    )
    .catch((err) =>
      console.error("Error updatting the user likes form the server", err)
    );
};
