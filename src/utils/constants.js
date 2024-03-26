const DASH_FORM_DATA = {
  userName: {
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

export default { DASH_FORM_DATA };
