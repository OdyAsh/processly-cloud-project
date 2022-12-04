const OrderSummary = (props) => {
  console.log(props);
  return (
    <div className="summary-card" onClick={props.onClick}>
      <div class="left-summary-card">
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
