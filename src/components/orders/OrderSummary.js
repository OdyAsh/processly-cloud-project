import { useNavigate } from "react-router-dom";

const OrderSummary = (props) => {
  const navigate = useNavigate();
  const goToAnOrder = () => {
    // navigate to a specific order
    navigate(`/orders/view/${props.order._id}`);
    console.log(props.order._id);
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
        <div>Order ID: {props.order._id}</div>
        <div>Created On: {props.order.date}</div>
        <div>Status: {props.order.status}</div>
      </div>
    </div>
  );
};

export default OrderSummary;
