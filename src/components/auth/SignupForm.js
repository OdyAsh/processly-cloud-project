import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import FormInputError from "../../UI/form/FormInputError";
import TextInput from "../../UI/form/TextInput";

const SignupForm = () => {
  const { register, handleSubmit, setError, formState } = useForm();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email) => {
    return email.match(/\S+@\S+\.\S+/);
  };
  const onEmailChange = (event) => {
    let emailTmp = event.target.value;
    setEmail(emailTmp);
    if (!isValidEmail(emailTmp)) {
      setError("email", {
        type: "custom",
        message: "Please enter a valid email.",
      });
    } else {
      setError("email", null);
    }
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };
  const onPasswordChange = (event) => {
    let passwordTmp = event.target.value;
    setPassword(passwordTmp);
    if (!isValidPassword(password)) {
      setError("password", {
        type: "custom",
        message: "Please enter at least 8 characters.",
      });
    } else {
      setError("password", null);
    }
  };

  const submitHandler = async (formData) => {
    try {
      if (location.pathname.includes("st/")) {
        formData["role"] = "st";
      } else if (location.pathname.includes("wh/")) {
        formData["role"] = "wh";
      } else {
        formData["role"] = "client";
      }
      console.log(formData);
      const response = await fetch(
        "https://processly101.herokuapp.com/auth/signup",
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
        label="Email"
        type="text"
        name="email"
        register={register}
        validation={{ required: true, onChange: onEmailChange }}
      />
      {formState.errors.email?.message && (
        <FormInputError>{formState.errors.email?.message}</FormInputError>
      )}

      <TextInput
        label="Password"
        type="password"
        name="password"
        register={register}
        validation={{ required: true, onChange: onPasswordChange }}
      />
      {formState.errors.password?.message && (
        <FormInputError>{formState.errors.password?.message}</FormInputError>
      )}

      <button type="submit" className="form-button">
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
