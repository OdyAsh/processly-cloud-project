import OrderSummary from "./OrderSummary";

const OrdersList = (props) => {
  return (
    <div className="grid grid-cols-2 gap-5 justify-center items-center">
      {props.products.map((p) => (
        <OrderSummary product={p} key={p._id} />
      ))}
    </div>
  );
};

export default OrdersList;
