import React, { useState, useEffect, useContext } from "react";
import { userRequests } from "../api/clientRequests";

import TextInput from "./TextInput";

import { updateSchema } from "../schemas/users.schema";
import { useLoaderData } from "react-router-dom";
import "./DashboardForm.css";
import AuthContext from "../context/AuthContext";

const FORM_DATA = {
  username: {
    type: "text",
    pattern: "^[a-zA-Z0-9]{1,15}$",
    title: "Username must be alphanumeric and up to 15 characters",
    readOnly: true,
  },
  password: {
    type: "password",
    pattern: "^.{6,}$",
    title: "Password must be at least 6 characters",
  },
  confirmPassword: {
    type: "password",
    pattern: "^.{6,}$",
    title: "Confirm Password must be at least 6 characters",
  },
  title: {
    type: "text",
    pattern: "^.{1,5}$",
    title: "Title must be up to 5 characters",
  },
  first: {
    type: "text",
    pattern: "^.{1,30}$",
    title: "First name must be up to 30 characters",
  },
  last: {
    type: "text",
    pattern: "^.{1,30}$",
    title: "Last name must be up to 30 characters",
  },
  email: {
    type: "email",
    required: true,
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    title: "Enter a valid email address",
  },
  phone: {
    type: "tel",
    required: true,
    pattern: "^[0-9]{1,10}$",
    title: "Phone number must be numeric and up to 10 digits",
  },
  thumbnail: {
    type: "url",
    pattern: "^https?://.+",
    title: "Enter a valid URL starting with 'http://' or 'https://'",
  },
  city: {
    type: "text",
    pattern: "^.{1,20}$",
    title: "City must be up to 20 characters",
  },
  state: {
    type: "text",
    pattern: "^.{1,20}$",
    title: "State must be up to 20 characters",
  },
  streetNumber: {
    type: "text",
    pattern: "^.{1,20}$",
    title: "Location number must be up to 20 characters",
  },
  street: {
    type: "text",
    pattern: "^.{1,20}$",
    title: "Street must be up to 20 characters",
  },
  country: {
    type: "text",
    pattern: "^.{1,20}$",
    title: "Country must be up to 20 characters",
  },
  postcode: {
    type: "text",
    pattern: "^[0-9]{1,10}$",
    title: "Postcode must be numeric and up to 10 digits",
  },
};

const DashboardForm = () => {
  const userDashboard = useLoaderData();
  const { auth: user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [submitErrors, setSubmitErrors] = useState(false);
  const [inputErrors, setInputErrors] = useState(
    Object.keys(FORM_DATA).reduce(
      (prev, curr) => ({ ...prev, [curr]: false }),
      {}
    )
  );
  const [formData, setFormData] = useState(
    Object.keys(FORM_DATA).reduce((prev, curr) => {
      let initialData = user[curr] ? user[curr] : "";
      return { ...prev, [curr]: initialData };
    }, {})
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = Object.keys(inputErrors).some(
      (input) => inputErrors[input]
    );

    if (formErrors) {
      setSubmitErrors(true);
      setMessages(["You have errors in your form"]);
      return;
    }
    try {
      const updateData = Object.keys(formData).reduce(
        (prev, curr) =>
          formData[curr] ? { ...prev, [curr]: formData[curr] } : prev,
        {}
      );
      const response = await userRequests().updateDashboard(updateData);
      setSubmitErrors(false);
      setMessages([`User updated successfully`]);
      setTimeout(() => {
        setMessages([]);
      }, 4000);
      return response;
    } catch (error) {
      console.log(error);
      setSubmitErrors(true);
      setMessages([error.response.data]);
    }
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Verifica si el valor no es nulo ni vacío antes de validar
    if (value === "" || value === null) {
      setInputErrors({ ...inputErrors, [name]: false });
      return;
    }

    const field =
      name === "confirmPassword"
        ? updateSchema.shape["password"]
        : updateSchema.shape[name];

    try {
      // Intenta validar el valor ingresado
      field.parse(value);
      // Si no hay errores de validación, marca el campo como válido
      setInputErrors({ ...inputErrors, [name]: false });

      // Verificar si las contraseñas coinciden al escribir en confirmPassword
      if (name === "confirmPassword" && formData.password !== value) {
        setInputErrors({ ...inputErrors, [name]: "Passwords do not match" });
      } else {
        setInputErrors({ ...inputErrors, [name]: false });
      }
    } catch (error) {
      // Si hay errores de validación, marca el campo como inválido y muestra el mensaje de error
      const errorMessage = JSON.parse(error)[0].message;
      setInputErrors({ ...inputErrors, [name]: errorMessage });
    }
  };

  useEffect(() => {
    if (userDashboard) {
      delete userDashboard.id;
      userDashboard.password = "";
      setFormData(userDashboard);
    } else {
      //actualizar para que redireccione a SignUp
    }
  }, [userDashboard]);

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h4>User Dashboard</h4>
      <div className="input-container">
        {Object.entries(FORM_DATA).map(([name, value]) => (
          <TextInput
            key={name}
            labelText={name}
            name={name}
            value={formData[name]}
            type={FORM_DATA[name].type}
            handleChange={(e) => handleChange(name, e.target.value)}
            isRequired={FORM_DATA[name].required}
            errorMessage={inputErrors[name]}
            isReadOnly={FORM_DATA[name].readOnly}
          />
        ))}
      </div>

      <div className="button-container">
        <button type="submit">Update Profile</button>
        <div className="message-container">
          {messages.map((message, index) => (
            <p
              key={index}
              className={`${submitErrors ? "text-error" : "text-success"}`}
            >
              {message}
            </p>
          ))}
        </div>
      </div>
    </form>
  );
};

export default DashboardForm;
