import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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

  // const productsNamesTmp = props.products.map((p) => {
  //   return { name: p.name, value: p.productId };
  // }); // to do: uncomment this and delete dummy list below
  // const [productsNames] = useState(productsNamesTmp);

  const [productsNames] = useState([
    // dummy data
    { name: "aname", value: "1" },
    { name: "Flag", value: "2" },
  ]);

  // spn, and spq means selected product name, and quantity
  const [spn, setSPN] = useState(""); // useState(props.products[0].name); // to do: uncomment this
  const [spq, setSPQ] = useState(1);
  const [spo, setSPO] = useState(null);
  const [dn, setDn] = useState(""); // dn means Delivery Note
  const [pSizes, setPSizes] = useState(["xs", "s", "dff"]); // to do: useState(props.products[0].sizes);

  const [spSize, setSPSize] = useState("xs"); // delete "xs" this and uncomment if logic below
  // if ('sizes' in props.products[0] && props.products[0].sizes.length > 0) {
  //   setSPSize(props.products[0].sizes[0]);
  // }

  const [spImg, setSPImg] = useState("https://i.imgur.com/ShCVXml.png"); // useState(props.products[0].imgUrl);
  const [spPrice, setSPPrice] = useState(2); // useState(props.products[0].price);

  const onPtChange = (e) => {
    let idx = e.target.selectedIndex;
    let spnTmp = e.target.options[idx].text; // creating spnTmp, as useState is 1 cycle late, so if we used "spn" in this function, it will be hold the previous "spn" value
    let spoTmp = props.products.find((obj) => {
      return obj.name.toLowerCase() === spnTmp.toLowerCase();
    });
    setSPO(spoTmp);
    setSPN(spnTmp);
    let pSizesTmp = [];
    let spSizeTmp = "";

    // if ('sizes' in spoTmp && spoTmp.sizes.length > 0) {
    //   pSizesTmp = spoTmp.sizes;
    //   spSizeTmp = spoTmp.sizes[0];
    //   setSPSize(spSizeTmp);
    // }
    // setSPImg(props.products[idx].imgUrl);
    // setSPPrice(props.products[idx].price);
    setPSizes(pSizesTmp); // to do: delete this, and uncomment all of the above

    if (spnTmp.toLowerCase() === "flag") {
      // to do: remove this
      setSPImg("https://i.imgur.com/IGh0FoV.jpg");
    } else {
      setSPImg("https://i.imgur.com/ShCVXml.png");
    }
    setSPPrice(4); // to do: spoTmp.price
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

  const onSzChange = (e) => {
    let chosenSize = e.target.value;
    setSPSize(chosenSize);
  };

  const onDnChange = (e) => {
    let dnTmp = e.target.value;
    setDn(dnTmp);
  };

  const submitHandler = async (formData) => {
    try {
      formData["productId"] = 123; // to do: spo.productId
      formData["email"] = authContext.email;
      formData["date"] = GetDate(); // adding order's date and time to Order object
      formData["time"] = GetTime();
      formData["status"] = "pending"; // adding order's status as "pending"
      formData["totalPrice"] = spPrice * spq;
      if (spSize === "") {
        delete formData["productSize"];
      }
      if (dn === "") {
        delete formData["deliveryNote"];
      }

      console.log("from MakeOrderForm.js");
      console.log(formData);

      const response = await fetch(
        "https://processly101.herokuapp.com/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `BEARER ${authContext.token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw Error(data.error);
      }
      console.log(data);

      toast.success("Order made successfully! 💪", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err.message);
      toast.error(err.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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

          {pSizes.length > 0 && (
            <SelectInput
              label="Product Size"
              name="productSize"
              register={register}
              required={true}
              onChange={onSzChange}
              options={pSizes}
            />
          )}
          {pSizes.length > 0 && formState.errors.productSize && (
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
          value={dn}
          onChange={onDnChange}
          register={register}
        />

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
