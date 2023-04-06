import React from "react";
import { useForm } from "../hooks/useForm";
import Loader from "./Loader";
import Message from "./Message";
import "./ContactForm.css";
const initialForm = {
  name: "",
  email: "",
  subject: "",
  comments: ""
};
const validateForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü/\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;
  if (!form.name.trim()) {
    errors.name = `El campo 'Nombre' es requerido`;
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "escriba solo letras";
  } else if (!form.email.trim()) {
    errors.email = `El campo 'email' es requerido`;
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "escriba un email valido";
  } else if (!form.subject.trim()) {
    errors.subject = `El campo 'asunto' es requerido`;
  } else if (!form.comments.trim()) {
    errors.comments = `El campo 'comentarios' es requerido`;
  } else if (!regexComments.test(form.comments.trim())) {
    errors.comments = "maximo 255 caracteres";
  }

  return errors;
};
let styles = {
  fontWeight: "bold",
  color: "#dc3545"
};
const ContactForm = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(initialForm, validateForm);
  return (
    <div>
      <h2 className="contact_form-title">Formulario de Contacto</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Escribe tu nombre"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.name}
          pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü/\s]+$"
          required
        />
        {errors.name && <p style={styles}>{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Escribe tu email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.email}
          pattern="^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$"
          required
        />
        {errors.email && <p style={styles}>{errors.email}</p>}
        <input
          type="text"
          name="subject"
          placeholder="Asunto a tratar"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.subject}
          required
        />
        {errors.subject && <p style={styles}>{errors.subject}</p>}
        <textarea
          name="comments"
          cols="50"
          rows="5"
          placeholder="escribe tus comentarios"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.comments}
          pattern="^.{1,255}$"
          required
        />
        {errors.comments && <p style={styles}>{errors.comments}</p>}
        <input type="submit" value="Enviar" />
      </form>
      {loading && <Loader />}
      {response && <Message msg="los datos han sido enviados" bgColor="#198" />}
    </div>
  );
};

export default ContactForm;
