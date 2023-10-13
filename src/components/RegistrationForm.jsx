import React, { useState, useEffect } from "react";
import { registerUser, updateUser } from "../api/clientRequests";

import TextInput from "./TextInput";

import { registerSchema, updateSchema } from "../schemas/users.schema";
import { useLoaderData } from "react-router-dom";
import "./RegistrationForm.css";

const FORM_DATA = {
  username: {
    type: "text",
    required: true,
    pattern: "^[a-zA-Z0-9]{1,15}$",
    title: "Username must be alphanumeric and up to 15 characters",
  },
  password: {
    type: "password",
    required: true,
    pattern: "^.{6,}$",
    title: "Password must be at least 6 characters",
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
  street_number: {
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

const RegistrationForm = () => {
  const user = useLoaderData();

  const [isUpdate, setIsUpdate] = useState(false);
  const [messages, setMessages] = useState([]);
  const [submitErrors, setSubmitErrors] = useState(false);
  const [inputErrors, setInputErrors] = useState(
    Object.keys(FORM_DATA).reduce(
      (prev, curr) => ({ ...prev, [curr]: false }),
      {}
    )
  );
  const [formData, setFormData] = useState(
    Object.keys(FORM_DATA).reduce((prev, curr) => ({ ...prev, [curr]: "" }), {})
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
      const response = isUpdate
        ? await updateUser(updateData)
        : await registerUser(formData);
      if (response.status === 204) {
        setSubmitErrors(false);
        setMessages([`User ${isUpdate ? "updated" : "created"} successfully`]);
        setTimeout(() => {
          setMessages([]);
        }, 4000);
      } else {
        setMessages(response.data.message);
      }
      return response;
    } catch (error) {
      console.log(error);
      setSubmitErrors(true);
      setMessages(error.response.data.message);
    }
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Verifica si el valor no es nulo ni vacío antes de validar
    if (isUpdate && (value === "" || value === null)) {
      setInputErrors({ ...inputErrors, [name]: false });
      return;
    }
    const schema = isUpdate ? updateSchema : registerSchema;
    const field = schema.shape[name];

    try {
      // Intenta validar el valor ingresado
      field.parse(value);
      // Si no hay errores de validación, marca el campo como válido
      setInputErrors({ ...inputErrors, [name]: false });
    } catch (error) {
      // Si hay errores de validación, marca el campo como inválido y muestra el mensaje de error
      const errorMessage = JSON.parse(error)[0].message;
      setInputErrors({ ...inputErrors, [name]: errorMessage });
    }
  };

  useEffect(() => {
    if (user) {
      delete user.id;
      user.password = "";
      setFormData(user);
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h4>{isUpdate ? "User Dashboard" : "User Registration"}</h4>
      <div className="input-container">
        {Object.entries(formData).map(([name, value]) => (
          <TextInput
            key={name}
            labelText={name}
            errorMessage={inputErrors[name]}
            value={value}
            handleChange={(e) => handleChange(name, e.target.value)}
            type={FORM_DATA[name].type}
            name={name}
            isRequired={!isUpdate && FORM_DATA[name].required}
          />
        ))}
      </div>

      <div className="button-container">
        <button type="submit">
          {isUpdate ? "Update Profile" : "Register"}
        </button>
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

export default RegistrationForm;
