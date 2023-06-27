export const likesUpdate = (likes, auth, user) => {
  if (auth) {
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(likes),
    };
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${user.login.username}/update-likes`;
    window
      .fetch(endpoint, options)
      // .then((res) => res.json())
      // .then((data) => console.log(data))
      .catch((err) =>
        console.error("Error updatting the user likes form the server", err)
      );
  } else {
    return false;
  }
  // localStorage.setItem("likes", JSON.stringify(likes));
};
