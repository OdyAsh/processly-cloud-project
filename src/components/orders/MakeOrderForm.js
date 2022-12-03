import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../store/authContext";
import FormInputError from "../../UI/form/FormInputError";
import SelectInput from "../../UI/form/SelectInput";
import TextAreaInput from "../../UI/form/TextAreaInput";
import TextInput from "../../UI/form/TextInput";

/*
  data to consider in form:
  merch-name
  merch-quantity
  merch-size
  pic to display merch based on merch-name selected
  "Create Order" button
*/

const MakeOrderForm = (props) => {
  const { register, handleSubmit, formState } = useForm();

  const authContext = useContext(AuthContext);

  // const productsTypes = props.products.map((s) => {
  //   return { name: s.name, value: s._id };
  // }); // to do: uncomment this and delete dummy list below
  const [productsTypes] = useState([
    { name: "a", value: "flag" },
    { name: "Flag", value: "b" },
  ]);
  const [selectedProductType, setSPT] = useState("");

  const productsSizes = [
    [
      { name: "XS", value: 1 },
      { name: "S", value: 2 },
      { name: "M", value: 3 },
      { name: "L", value: 4 },
      { name: "XL", value: 5 },
    ],
  ];

  const handleChange = (e) => {
    let selectedProductType = e.target.options[e.target.selectedIndex].text;
    setSPT(selectedProductType);
    console.log(selectedProductType);
    return;
  };

  const submitHandler = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `BEARER ${authContext.token}`,
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
    <form
      className="flex  flex-col p-10 gap-5 bg-gray-800 w-fit"
      onSubmit={handleSubmit(submitHandler)}
    >
      <SelectInput
        label="Product Type"
        name="product_type"
        register={register}
        required={true}
        options={productsTypes}
        onChange={handleChange}
      />
      {formState.errors.product_type && (
        <FormInputError>Product type must not be empty.</FormInputError>
      )}

      <TextInput
        label="Quantity"
        type="number"
        name="quantity"
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.quantity && (
        <FormInputError>Product quantity must be stated</FormInputError>
      )}

      {selectedProductType.toLowerCase() === "flag" && (
        <SelectInput
          label="Product Size"
          name="product_size"
          register={register}
          validation={{ required: true }}
          options={productsSizes}
        />
      )}
      {formState.errors.product_size && (
        <FormInputError>Product size must not be empty.</FormInputError>
      )}

      <TextAreaInput
        label="Description"
        name="description"
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.description && (
        <FormInputError>Product description must not be empty</FormInputError>
      )}

      <TextInput
        label="Price"
        type="number"
        name="price"
        register={register}
        validation={{ required: true, min: 0 }}
      />
      {formState.errors.price && (
        <FormInputError>Product price must be greater than 0.</FormInputError>
      )}

      <button
        type="submit"
        className="bg-white rounded-xl my-4 py-2 px-8 self-center"
      >
        Add Product
      </button>
    </form>
  );
};

export default MakeOrderForm;
