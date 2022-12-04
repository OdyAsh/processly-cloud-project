import OrderSummary from "./OrderSummary";

const OrdersList = (props) => {
  return (
    <div className="orders-list">
      {props.orders.map((o) => (
        <OrderSummary order={o} key={o._id} />
      ))}
    </div>
  );
};

export default OrdersList;
