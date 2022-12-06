import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import AuthContext from "../../store/authContext";
import AllowAccessToPage from "../../store/AllowAccessToPage";
import TextInput from "./../../UI/form/TextInput";
import OrdersList from "../../components/orders/OrdersList";

const StViewAllOrders = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [orders, setOrders] = useState([
    // to do: change below dummy data to []
    {
      _id: "78",
      username: "anaUser",
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
      username: "4",
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
  if (!AllowAccessToPage("st")) {
    navigate("/st/signin");
  }

  const submitHandler = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/orders/${formData["username"]}`,
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
            label="Username"
            type="text"
            name="username"
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
