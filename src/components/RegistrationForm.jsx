import React, { useState, useEffect, useContext } from "react";
import { registerUser, updateUser } from "../api/authRequests";

import TextInput from "./TextInput";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
  Button,
} from "@tremor/react";
import { useFormik } from "formik";
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
  const [message, setMessage] = useState([]);
  const [submitErrors, setSubmitErrors] = useState(false);
  const [schema, setSchema] = useState(updateSchema);

  const formik = useFormik({
    onSubmit: async (values) => {
      try {
        const response = isUpdate
          ? await updateUser(values)
          : await registerUser(values);
        if (response.status === 200) {
          setSubmitErrors(false);
          setMessage([`User ${isUpdate ? "updated" : "created"} successfully`]);
          setTimeout(() => {
            setMessage([]);
          }, 4000);
        } else {
          setMessage(response.data.message);
        }
        return response;
      } catch (error) {
        setSubmitErrors(true);
        setMessage(error.response.data.message);
      }
    },
    initialValues: Object.keys(FORM_DATA).reduce(
      (prev, curr) => ({ ...prev, [curr]: "" }),
      {}
    ),
    validate: (values) => {
      const result = schema.safeParse(values);
      if (result.success) return;
      const errors = result.error.issues.reduce(
        (prev, curr) => ({ ...prev, [curr.path[0]]: curr.message }),
        {}
      );
      return errors;
    },
  });

  useEffect(() => {
    if (user) {
      setSchema(updateSchema);
      user.password = null;
      formik.setValues(user);
      setIsUpdate(true);
    } else {
      setSchema(registerSchema);
      setIsUpdate(false);
    }
    console.log("formik.values.password:", formik.values.password);
  }, [user]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <Title>User Dashboard</Title>
        <Table className="mt-5">
          <TableBody>
            {Object.keys(FORM_DATA).map((input) => (
              <TableRow key={input}>
                <TableCell className="capitalize">{input}</TableCell>
                <TableCell>
                  <TextInput
                    errorMessage={formik.errors[input]}
                    value={formik.values[input]}
                    handleChange={formik.handleChange}
                    type={FORM_DATA[input].type}
                    name={input}
                    isRequired={false}
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
            {message.map((message, index) => (
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
