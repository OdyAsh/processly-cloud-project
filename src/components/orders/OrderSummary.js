import { useNavigate } from "react-router-dom";
import GetDate from "./../utils/GetDate";

const OrderSummary = (props) => {
  const navigate = useNavigate();
  const goToAnOrder = () => {
    // navigate to a specific order
    navigate(`${props.order.orderId}`, { state: props.order }); // you have to write "state" to be able to pass objects using navigate() and location... source: https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component#:~:text=version%206%20react%2Drouter%2Ddom
  };

  return (
    <div className="summary-card" onClick={goToAnOrder}>
      <div className="left-summary-card">
        <img
          src={props.order.imgUrl}
          alt={props.order.productType}
          className="order-img"
          width="100"
        />
      </div>
      <div className="right-summary-card">
        <div>Order ID: {props.order.orderId}</div>
        <div>Created On: {GetDate(props.order.createdAt)}</div>
        <div>Status: {props.order.status}</div>
      </div>
    </div>
  );
};

export default OrderSummary;
