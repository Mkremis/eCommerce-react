import React, { useState, useEffect } from "react";
import { registerUser, updateUser } from "../api/authRequests";

import TextInput from "./TextInput";
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Title,
  Button,
} from "@tremor/react";
import { registerSchema, updateSchema } from "../schemas/users.schema";
import { useLoaderData } from "react-router-dom";

const FORM_DATA = {
  username: { type: "text" },
  password: { type: "password" },
  title: { type: "text" },
  first: { type: "text" },
  last: { type: "text" },
  email: { type: "email" },
  phone: { type: "tel" },
  thumbnail: { type: "url" },
  city: { type: "text" },
  state: { type: "text" },
  street_number: { type: "text" },
  street: { type: "text" },
  country: { type: "text" },
  postcode: { type: "text" },
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
    if (value.trim() !== "") {
      // Realiza la validación usando el esquema correspondiente (updateSchema)
      const schema = updateSchema;
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
    } else {
      // Si el campo está vacío, marca el campo como válido
      setInputErrors({ ...inputErrors, [name]: false });
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
    <form onSubmit={handleSubmit}>
      <Card>
        <Title>User Dashboard</Title>
        <Table className="mt-5">
          <TableBody>
            {Object.entries(formData).map(([name, value]) => (
              <TableRow key={name}>
                <TableCell className="capitalize">{name}</TableCell>
                <TableCell>
                  <TextInput
                    errorMessage={inputErrors[name]}
                    value={value}
                    handleChange={(e) => handleChange(name, e.target.value)}
                    type={FORM_DATA[name].type}
                    name={name}
                    // isReadOnly={isUpdate && name === "username"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center">
          <Button size="xl" type="submit" className="ml-5">
            <span>{isUpdate ? "Update Profile" : "Register"}</span>
          </Button>
          <div className="ml-5">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`text-xl font-bold ${
                  submitErrors ? "text-red-800" : "text-green-800"
                }`}
              >
                {message}
              </p>
            ))}
          </div>
        </div>
      </Card>
    </form>
  );
};

export default RegistrationForm;
