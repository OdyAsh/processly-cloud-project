import { useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";

const OrdersList = (props) => {
  const navigate = useNavigate();
  const goToAnOrder = (event, orderId) => {
    // navigate to a specific order
    console.log(orderId);
    navigate(`orders/view/${orderId}`);
  };

  return (
    <div className="orders-list">
      {props.orders.map((o) => (
        <OrderSummary
          order={o}
          key={o._id}
          onClick={(e) => goToAnOrder(e, o._id)}
        />
      ))}
    </div>
  );
};

export default OrdersList;
