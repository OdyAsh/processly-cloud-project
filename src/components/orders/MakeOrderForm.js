import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../store/authContext";
import FormInputError from "../../UI/form/FormInputError";
import SelectInput from "../../UI/form/SelectInput";
import TextAreaInput from "../../UI/form/TextAreaInput";
import TextInput from "../../UI/form/TextInput";
import GetDate from "../utils/GetDate";
import GetTime from "../utils/GetTime";

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

  // const productsNamesTmp = props.products.map((s) => {
  //   return { name: s.name, value: s._id };
  // }); // to do: uncomment this and delete dummy list below
  // const [productsNames] = useState(productsNamesTmp);

  const [productsNames] = useState([
    // dummy data
    { name: "aname", value: "aval" },
    { name: "Flag", value: "flagval" },
  ]);

  // spn means selected product name
  const [spn, setSPN] = useState(""); // useState(props.products[0].name); // to do: uncomment this
  const [spq, setSPQ] = useState(1);
  const [spSizes, setSPSizes] = useState(["xs"]); // useState(props.products[0].sizes);
  const [spImg, setSPImg] = useState("https://i.imgur.com/ShCVXml.png"); // useState(props.products[0].imgUrl);
  const [spPrice, setSPPrice] = useState(2); // useState(props.products[0].price);
  const productsSizes = [
    // dummy data
    { name: "XS", value: 1 },
    { name: "S", value: 2 },
    { name: "M", value: 3 },
    { name: "L", value: 4 },
    { name: "XL", value: 5 },
  ];

  const onPtChange = (e) => {
    let spnTmp = e.target.options[e.target.selectedIndex].text; // creating spnTmp, as useState is 1 cycle late, so if we used "spn" in this function, it will be hold the previous "spn" value
    setSPN(spnTmp);
    // setSPSizes(props.products[e.target.selectedIndex].sizes); to do: uncomment this and delete dummy data
    // setSPImg(props.products[e.target.selectedIndex].imgUrl);
    // setSPPrice(props.products[e.target.selectedIndex].price);
    setSPSizes(productsSizes);

    if (spnTmp.toLowerCase() === "flag") {
      // to do: remove this
      setSPImg("https://i.imgur.com/IGh0FoV.jpg");
    } else {
      setSPImg("https://i.imgur.com/ShCVXml.png");
    }
    setSPPrice(4);
    return;
  };

  const onQChange = (e) => {
    let q = parseInt(e.target.value);
    if (isNaN(q) || q < 1) {
      q = 1;
    } else if (q > 9999) {
      q = 9999;
    }
    setSPQ(q);
    return;
  };

  const submitHandler = async (formData) => {
    try {
      formData["userName"] = authContext.username;
      formData["imgUrl"] = spImg; // adding product's img URL to Order object
      formData["date"] = GetDate(); // adding order's date and time to Order object
      formData["time"] = GetTime();
      formData["status"] = "pending"; // adding order's status as "pending"
      console.log(formData);
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

  console.log(spn);
  return (
    <form className="form" onSubmit={handleSubmit(submitHandler)}>
      <div className="form-top">
        <div className="form-left">
          <SelectInput
            label="Product Name"
            name="productName"
            register={register}
            required={true}
            options={productsNames}
            onChange={onPtChange}
          />
          {formState.errors.productName && (
            <FormInputError>Product name must not be empty.</FormInputError>
          )}

          <TextInput
            label="Quantity"
            type="number"
            name="quantity"
            value={spq}
            register={register}
            validation={{ required: true, onChange: onQChange }}
          />
          {formState.errors.quantity && (
            <FormInputError>Product quantity must be stated</FormInputError>
          )}

          {spn.toLowerCase() === "flag" && (
            <SelectInput
              label="Product Size"
              name="productSize"
              register={register}
              validation={{ required: true }}
              options={spSizes}
            />
          )}
          {formState.errors.productSize && (
            <FormInputError>Product size must not be empty.</FormInputError>
          )}
        </div>

        <div className="form-right">
          <img
            src={spImg}
            alt={`${spn} product`}
            width="300"
            className="product-img"
          />
        </div>
      </div>

      <div className="form-bottom">
        <TextAreaInput
          label="Delivery Note"
          name="deliveryNote"
          register={register}
        />
        {formState.errors.description && (
          <FormInputError>Product description must not be empty</FormInputError>
        )}

        <label
          name="totalPrice"
          className="form-label"
        >{`Total Price: ${spPrice} x ${spq} = ${spPrice * spq} EGP`}</label>

        <button type="submit" className="form-button">
          Create Order
        </button>
      </div>
    </form>
  );
  // to do: remove this: bg-white rounded-xl my-4 py-2 px-8 self-center
};

export default MakeOrderForm;
