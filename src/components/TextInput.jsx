import { TextInput } from "@tremor/react";

export default function Text_Input({
  value,
  handleChange,
  errorMessage,
  type,
  name,
  // isReadOnly,
}) {
  return (
    <TextInput
      type={type}
      value={value}
      // readOnly={isReadOnly}
      error={errorMessage}
      errorMessage={errorMessage}
      onChange={handleChange}
      placeholder={`Type the ${name} here`}
      name={name}
      autoComplete="false"
    />
  );
}
