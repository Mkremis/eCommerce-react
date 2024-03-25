import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useLoaderData } from "react-router-dom";

import { userRequests } from "../api/clientRequests";
import { updateSchema } from "../schemas/users.schema";
import constants from "../utils/constants";
import handleTogglePass from "../utils/handleTogglePass";

import "./DashboardForm.css";

const DashboardForm = () => {
  const FORM_DATA = constants.DASH_FORM_DATA;
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
      let initialData = user ? user[curr] : "";
      return { ...prev, [curr]: initialData };
    }, {})
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    const formErrors = Object.keys(inputErrors).some(
      (input) => inputErrors[input]
    );
    if (formErrors) {
      setSubmitErrors(true);
      setMessages(["You have errors in your form"]);
      return;
    }

    try {
      // Update user data
      const response = await userRequests().updateDashboard(formData);
      setSubmitErrors(false);
      setMessages(["User updated successfully"]);
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

  const handleChange = (e) => {
    // Update form data on change
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate field
    try {
      const field = updateSchema.shape[name];
      field.parse(value);
      setInputErrors({ ...inputErrors, [name]: false });
    } catch (error) {
      let errorMessage = error.message;
      // Parse the error message if it's JSON
      if (error.message.startsWith("[")) {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError[0].message;
      } else {
        console.error(error);
      }
      setInputErrors({ ...inputErrors, [name]: errorMessage });
    }
  };

  useEffect(() => {
    // Initialize form data from userDashboard
    if (user && userDashboard) {
      const initialFormData = {};
      Object.keys(userDashboard).forEach((key) => {
        initialFormData[key] = userDashboard[key];
      });
      initialFormData.email = user.email;
      initialFormData.username = user.userName;

      setFormData(initialFormData);
    }
  }, [userDashboard, user]);

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h4>User Dashboard</h4>
      <div className="input-container">
        {Object.entries(FORM_DATA).map(([fieldName, fieldProps], idx) => {
          const fieldId = `${fieldName}_${idx}`;
          return (
            <div className="input-wrapper" key={fieldId}>
              <label htmlFor={fieldId} className="label">
                {fieldName}:
              </label>
              <div className="input-container">
                <div className="text-input-container">
                  <input
                    type={fieldProps.type}
                    name={fieldName}
                    id={fieldId}
                    defaultValue={formData[fieldName] || ""}
                    onChange={handleChange}
                    placeholder={`Type the ${fieldName} here`}
                    required={fieldProps.required}
                    readOnly={fieldProps.readOnly}
                    autoComplete="new-password"
                  />
                  {fieldProps.type === "password" && (
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
                  )}
                </div>

                <p className="error-message">
                  {inputErrors[fieldName] && (
                    <span>{inputErrors[fieldName]}</span>
                  )}
                </p>
              </div>
              <div className="error-alert">
                {inputErrors[fieldName] && (
                  <p style={{ padding: "auto", textAlign: "center" }}>
                    <span
                      className="material-symbols-outlined"
                      style={{ color: "red" }}
                    >
                      error
                    </span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
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
