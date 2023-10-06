import { TextInput } from "@tremor/react";

export default function Text_Input({
  value,
  handleChange,
  errorMessage,
  type,
  name,
  isRequired,
}) {
  // const isError = errorMessage ? true : false;
  // console.log(errorMessage);
  return (
    <TextInput
      type={type}
      value={value}
      error={errorMessage}
      errorMessage={errorMessage}
      onChange={handleChange}
      placeholder={`Type the ${name} here`}
      name={name}
      autoComplete="false"
      required={isRequired}
    />
  );
}
