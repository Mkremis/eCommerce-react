import client from "./axiosClient";

export const login = async (username, password) =>
  client.post(`/api/users/login`, {
    username,
    password,
  });
export const registerUser = async (userData) =>
  client.post("/api/users/register", JSON.stringify(userData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const updateUser = async (userData) =>
  client.patch("/api/users/update", JSON.stringify(userData), {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const reloadSession = async () => client.get(`/api/users/reload`);

export const serverLogout = async () => {
  try {
    const response = await client.get(`/api/users/logout`);
    if ((response.status = "200")) alert(response.data.message);
  } catch (err) {
    console.error(err);
  }
};

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
