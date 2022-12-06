import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import AuthContext from "../../store/authContext";
import TextInput from "./../../UI/form/TextInput";
import OrdersList from "../../components/orders/OrdersList";

const StViewAllOrders = () => {
  const authContext = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [orders, setOrders] = useState([
    // to do: change below dummy data to []
    {
      _id: "78",
      email: "bavshehata@gmail.com",
      productName: "Flag",
      quantity: "3",
      size: "XS",
      deliveryNote: "random text yaaaaaay",
      totalPrice: "100",
      imgUrl: "https://i.imgur.com/IGh0FoV.jpg",
      date: "1/1/2001",
      time: "12H:23M:34S",
      status: "pending",
    },
    {
      _id: "3",
      email: "ash@gmail.com",
      productName: "kajfslj",
      quantity: "3",
      size: "XS",
      deliveryNote: "random text yaaaaaay",
      totalPrice: "100",
      imgUrl: "https://i.imgur.com/IGh0FoV.jpg",
      date: "1/1/2001",
      time: "12H:23M:34S",
      status: "pending",
    },
  ]);

  const submitHandler = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/orders/${formData["email"]}`,
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
      setOrders(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="view-all-orders">
      <div className="row-center-content">
        <form className="form" onSubmit={handleSubmit(submitHandler)}>
          <TextInput
            label="Email"
            type="text"
            name="email"
            register={register}
            validation={{ required: false }}
          />

          <button type="submit" className="form-button">
            View Orders
          </button>
        </form>
      </div>
      <div className="bottom">
        <div>
          <OrdersList className="grid" orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default StViewAllOrders;
