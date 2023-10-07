import { TextInput } from "@tremor/react";

export default function Text_Input({
  value,
  handleChange,
  errorMessage,
  type,
  name,
}) {
  return (
    <TextInput
      type={type}
      value={value}
      readOnly={name === "username"}
      error={errorMessage}
      errorMessage={errorMessage}
      onChange={handleChange}
      placeholder={`Type the ${name} here`}
      name={name}
      autoComplete="false"
    />
  );
}
