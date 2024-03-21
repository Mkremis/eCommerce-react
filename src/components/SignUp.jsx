import { userRequests } from "../api/clientRequests";
import handleTogglePass from "../utils/handleTogglePass";

export default function SignUp({ setErrors, errors, setIsLogin }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password } = e.target;
      await userRequests().registerUser(
        username.value,
        email.value,
        password.value
      );
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      setErrors(
        err.response.data.message ? [err.response.data.message] : [err.message]
      );
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
          handleSubmit(e);
        }}
      >
        <h1>Sign Up</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label htmlFor="reg_username">Username:</label>
          <input
            id="reg_username"
            type="text"
            name="username"
            placeholder="username"
            required
            pattern="^[a-zA-Z0-9]{1,15}$"
            title="Username must be alphanumeric and up to 15 characters"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="reg_email">Email:</label>
          <input
            id="reg_email"
            type="email"
            name="email"
            placeholder="email"
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="reg_password">Password:</label>
          <input
            id="reg_password"
            type="password"
            name="password"
            placeholder="password"
            required
            pattern="^.{6,}$"
            title="Password must be at least 6 characters"
          />
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

        <input type="submit" value="Sign Up" />
      </form>
    </article>
  );
}
