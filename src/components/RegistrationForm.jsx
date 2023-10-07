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

  const handleChange = (name, value) => {
    const schema = isUpdate ? updateSchema : registerSchema;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    let inputValidate;
    if (isUpdate && !value) return;
    inputValidate = schema.safeParse({ [name]: value });
    const errorMessage = inputValidate?.error?.issues[0]?.message;

    if (errorMessage) {
      setInputErrors((prevInputErrors) => ({
        ...prevInputErrors,
        [name]: errorMessage,
      }));
    } else {
      setInputErrors((prevInputErrors) => ({
        ...prevInputErrors,
        [name]: false,
      }));
    }
  };

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
      if (response.status === 200) {
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
