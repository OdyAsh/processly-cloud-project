import OrderSummary from "./OrderSummary";

const OrdersList = (props) => {
  let className = "orders-list";
  if ("className" in props) {
    className = props.className;
  }
  return (
    <div className={className}>
      {props.orders.map((o) => (
        <OrderSummary order={o} key={o._id} />
      ))}
    </div>
  );
};

export default OrdersList;
