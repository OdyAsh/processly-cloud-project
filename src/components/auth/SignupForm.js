import { useForm } from "react-hook-form";
import FormInputError from "../../UI/form/FormInputError";
import TextInput from "../../UI/form/TextInput";
import { useLocation } from "react-router-dom";

const SignupForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const location = useLocation();
  const submitHandler = async (formData) => {
    try {
      if (location.pathname.includes("st/")) {
        formData["role"] = "st";
      } else if (location.pathname.includes("wh/")) {
        formData["role"] = "wh";
      } else {
        formData["role"] = "client";
      }
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw Error(data.error);
      }

      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(submitHandler)}>
      <TextInput
        label="Name"
        type="text"
        name="name"
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.name && (
        <FormInputError>Name must not be empty</FormInputError>
      )}

      <TextInput
        label="Username"
        type="text"
        name="username"
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.username && (
        <FormInputError>Username must not be empty.</FormInputError>
      )}

      <TextInput
        label="Password"
        type="password"
        name="password"
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.password && (
        <FormInputError>Password must not be empty.</FormInputError>
      )}

      <button type="submit" className="form-button">
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
