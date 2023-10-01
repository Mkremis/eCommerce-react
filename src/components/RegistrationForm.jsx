import React, { useState, useEffect } from "react";

const RegistrationForm = ({ onSubmit, user }) => {
  const [formData, setFormData] = useState({
    login_username: "",
    login_password: "",
    fullname_title: "",
    fullname_first: "",
    fullname_last: "",
    contact_email: "",
    contact_phone: "",
    picture_thumbnail: "",
    location_city: "",
    location_state: "",
    location_number: "",
    location_street: "",
    location_country: "",
    location_postcode: "",
  });

  const [errors, setErrors] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(user); // Si hay datos de usuario, rellena el formulario con ellos
      setIsUpdate(true);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData, isUpdate);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.login_username.trim()) {
      errors.login_username = "Username is required";
    }

    if (!data.login_password.trim()) {
      errors.login_password = "Password is required";
    }

    if (!data.contact_email.trim()) {
      errors.contact_email = "Email is required";
    } else if (!emailRegex.test(data.contact_email)) {
      errors.contact_email = "Invalid email format";
    }

    // Aquí puedes agregar más validaciones para otros campos si es necesario

    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login_username">Username *</label>
        <input
          type="text"
          id="login_username"
          name="login_username"
          value={formData.login_username}
          onChange={handleChange}
        />
        {errors.login_username && <p>{errors.login_username}</p>}
      </div>
      <div>
        <label htmlFor="login_password">Password *</label>
        <input
          type="password"
          id="login_password"
          name="login_password"
          value={formData.login_password}
          onChange={handleChange}
        />
        {errors.login_password && <p>{errors.login_password}</p>}
      </div>
      <div>
        <label htmlFor="fullname_title">Title</label>
        <input
          type="text"
          id="fullname_title"
          name="fullname_title"
          value={formData.fullname_title}
          onChange={handleChange}
        />
        {/* Aquí puedes mostrar un mensaje de error si es necesario */}
      </div>
      <div>
        <label htmlFor="fullname_first">First Name</label>
        <input
          type="text"
          id="fullname_first"
          name="fullname_first"
          value={formData.fullname_first}
          onChange={handleChange}
        />
        {/* Aquí puedes mostrar un mensaje de error si es necesario */}
      </div>
      {/* Agrega más campos aquí para los demás datos del usuario */}
      <div>
        <button type="submit">
          {isUpdate ? "Update Profile" : "Register"}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
