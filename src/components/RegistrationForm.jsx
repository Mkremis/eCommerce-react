import React, { useState, useEffect, useContext } from "react";
import { registerUser, updateUser } from "../api/authRequests";

import TextInput from "./TextInput";
// import { StatusOnlineIcon } from "@heroicons/react/outline";
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
import { registerSchema } from "../schemas/users.schema";
import { useLoaderData } from "react-router-dom";
import { set } from "zod";

const FORM_DATA = {
  username: { type: "text", required: true, initialValue: "" },
  password: { type: "password", required: true, initialValue: "" },
  title: { type: "text", required: false, initialValue: "" },
  first: { type: "text", required: false, initialValue: "" },
  last: { type: "text", required: false, initialValue: "" },
  email: { type: "email", required: true, initialValue: "" },
  phone: { type: "tel", required: false, initialValue: "" },
  thumbnail: { type: "url", required: false, initialValue: "" },
  city: { type: "text", required: false, initialValue: "" },
  state: { type: "text", required: false, initialValue: "" },
  street_number: { type: "text", required: false, initialValue: "" },
  street: { type: "text", required: false, initialValue: "" },
  country: { type: "text", required: false, initialValue: "" },
  postcode: { type: "text", required: false, initialValue: "" },
};
const RegistrationForm = () => {
  const user = useLoaderData();

  const [isUpdate, setIsUpdate] = useState(false);
  const [message, setMessage] = useState([]);
  const [submitErrors, setSubmitErrors] = useState(false);

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
      (prev, curr) => ({ ...prev, [curr]: FORM_DATA[curr].initialValue }),
      {}
    ),
    validate: (values) => {
      const result = registerSchema.safeParse(values);
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
      formik.setValues(user);
      setIsUpdate(true);
    }
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
