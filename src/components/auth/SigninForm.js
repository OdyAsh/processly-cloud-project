import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import FormInputError from "../../UI/form/FormInputError";
import TextInput from "../../UI/form/TextInput";
import { useLocation } from "react-router-dom";

const SigninForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (formData) => {
    try {
      const response = await fetch(
        "https://processly101.herokuapp.com/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw Error(data.error);
      }
      console.log("signed in... data:");
      console.log(data);
      // invoke the login function in our auth context
      authContext.login(
        data.userId,
        data.name,
        data.email,
        data.role,
        data.jwt
      );

      // have to use "data.role" not "authContext.role", as "authContext.login()" makes "authContext" update in the next render, which happens after the render of this page ends
      if (data.role === "client") {
        // navigate to the client's home page
        navigate("/");
      } else if (data.role === "st") {
        // navigate to the sales-team's home page
        navigate("/st");
      } else if (data.role === "wh") {
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
        label="Email"
        type="text"
        name="email"
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.email && (
        <FormInputError>Email must not be empty.</FormInputError>
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
