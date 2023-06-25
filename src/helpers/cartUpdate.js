export const cartUpdate = (auth, cart, user) => {
  if (auth) {
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    };
    console.log(options.body);
    const endpoint = `https://ecommerce-users-api-production.up.railway.app/api/users/${user.login.username}/update-cart`;
    window
      .fetch(endpoint, options)
      // .then((res) => res.json())
      // .then((data) => console.log(data))
      .catch((err) =>
        console.error("Error updatting the user cart form the server", err)
      );
  } else {
    return false;
  }
  // localStorage.setItem("cart", JSON.stringify(cart));
};
