export const validate = {
  password: {
    pattern: "^[A-Za-z0-9]{8}$",
    title:
      "Valid password: 8 characters accept uppercase letters, lowercase letters and numbers",
  },
  username: {
    pattern: "^[a-z0-9_]{6,15}$",
    title:
      "Valid username: only lowercase letters, numbers, and underscores. 6 to 15 characters",
  },
  title: {
    pattern: "[A-Za-z]{1,5}",
    title: "only letters max 5 characters",
  },
  first: {
    pattern: "[A-Za-z]{1,30}",
    title: "only letters max 30 characters",
  },
  last: {
    pattern: "[A-Za-z]{1,30}",
    title: "only letters max 30 characters",
  },

  phone: {
    pattern: "((+|00)?[1-9]{2}|0)[1-9]( ?[0-9]){10}",
    title: "only numbers and spaces max 10 characters",
  },
  thumbnail: {
    pattern: "https?://.+",
    title: "Include http://",
  },
  city: {
    pattern: "[A-Za-z ]{1,20}",
    title: "only letters max 20 characters",
  },
  state: {
    pattern: "[A-Za-z ]{1,20}",
    title: "only letters max 20 characters",
  },
  // number: {
  //   pattern: "^[A-Za-z][A-Za-z0-9]{1,20}$",
  //   title: "numbers and letters max 20 characters",
  // },
  street: {
    pattern: "^[A-Za-z0-9 ]{1,20}$",
    title: "numbers and letters max 20 characters",
  },
  country: {
    pattern: "[A-Za-z ]{1,20}",
    title: "only letters max 20 characters",
  },
  postcode: {
    pattern: "^(d{5}([-]d{4})?)",
    title: "format is nnnnn or nnnnn-nnnn",
  },
};
