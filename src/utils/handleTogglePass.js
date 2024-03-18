const handleTogglePass = (e) => {
  const togglePassword = e.target;
  const password = togglePassword.previousSibling;
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  type === "password"
    ? (togglePassword.textContent = "visibility")
    : (togglePassword.textContent = "visibility_off");
};

export default handleTogglePass;
