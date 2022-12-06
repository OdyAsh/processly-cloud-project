import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import FormInputError from "../../UI/form/FormInputError";
import TextInput from "../../UI/form/TextInput";

const SigninForm = () => {
  const { register, handleSubmit, formState } = useForm();

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/auth/signin", {
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

      // invoke the login function in our auth context
      authContext.login(data.userId, data.username, data.role, data.jwt);

      if (authContext.role === "client") {
        // navigate to the client's home page
        navigate("/");
      } else if (authContext.role === "st") {
        // navigate to the sales-team's home page
        navigate("/st");
      } else if (authContext.role === "wh") {
        // navigate to the warehouse's home page
        navigate("/wh");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(submitHandler)}>
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
        Sign in
      </button>
    </form>
  );
};

export default SigninForm;
