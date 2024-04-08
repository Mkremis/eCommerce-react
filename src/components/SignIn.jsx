import {
  cartRequests,
  likeRequests,
  userRequests,
} from "../api/clientRequests";
import handleTogglePass from "../utils/handleTogglePass";

export default function SignIn({
  setErrors,
  setAuth,
  likes,
  setLikes,
  cart,
  setCart,
  errors,
  togglePersist,
  persist,
}) {
  const handleAuth = async (e) => {
    try {
      let { userName, password } = e.target;
      const loginResponse = await userRequests().loginUser(
        userName.value,
        password.value
      );
      setAuth(loginResponse.data.userData);

      if (cart.length) {
        const userCartResponse = await Promise.all(
          cart.map(async (item) => await cartRequests().updateUserCart(item))
        );
        const updatedUserCart = userCartResponse[0].data;
        setCart(updatedUserCart);
      } else {
        setCart(loginResponse.data.userCart || []);
      }
      if (likes.length) {
        likes.forEach(async (like) => await likeRequests().createLike(like));
        const userLikesResponse = await likeRequests().getUserLikes();
      } else {
        setLikes(loginResponse.data.userLikes || []);
      }
    } catch (err) {
      console.error(err);
      setErrors([err.response.data.message] || [err.message]);
    }
  };

  return (
    <article className="form-container sign-in-container">
      <div
        style={{
          backgroundColor: "red",
          color: "white",
          fontSize: 12,
          width: "100%",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {errors.map((error, i) => (
          <p style={{ margin: "6px 0" }} key={i}>
            {error}
          </p>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth(e);
        }}
      >
        <h1>Sign In</h1>
        <div>
          <input type="text" name="userName" placeholder="username" />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input type="password" name="password" placeholder="password" />
          <span
            className="material-symbols-outlined"
            id="togglePassword"
            style={{
              marginLeft: "-30px",
              cursor: "pointer",
              color: "#2780e3",
              zIndex: 100,
            }}
            onClick={handleTogglePass}
          >
            visibility
          </span>
        </div>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
        <input type="submit" value="Sign In" />
      </form>
    </article>
  );
}
