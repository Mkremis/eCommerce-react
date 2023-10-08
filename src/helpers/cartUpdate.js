import client from "../api/axiosClient";

export const cartUpdate = (cart, user) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  client
    .put(
      `/api/users/${user.username}/update-cart`,
      JSON.stringify({ cart }),
      options
    )
    .catch((err) =>
      console.error("Error updatting the user cart form the server", err)
    );
};
