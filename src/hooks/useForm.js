import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleReset = () => {
    setValues(defaultValues);
  };

  const resetForm = () => setValues(defaultValues);

  return { values, handleChange, resetForm };
}
