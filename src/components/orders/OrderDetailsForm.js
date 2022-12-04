import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../store/authContext";
import TextAreaInput from "../../UI/form/TextAreaInput";

const OrderDetailsForm = (props) => {
  const { register } = useForm();
  const authContext = useContext(AuthContext);
  const [dn, setDn] = useState("");

  const onDnChange = (e) => {
    let dnTmp = e.target.value;
    setDn(dnTmp);
  };
  console.log("from OrderDetailsForm.js");
  console.log(props);
  const onOrderChange = async (task) => {
    try {
      const response = await fetch(
        `http://localhost:5000/orders/${props.order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `BEARER ${authContext.token}`,
          },
          body: JSON.stringify(
            task === "update" ? { deliveryNote: dn } : { status: "canceled" }
          ),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw Error(data.error);
      }
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  if ("deliveryNote" in props.order) {
    let dnTmp = props.order.deliveryNote;
    setDn(dnTmp);
  }

  return (
    <form classname="form">
      <div className="form-top">
        <div className="form-left">
          <div className="form-label-and-sublabel">
            <label className="form-label">Product Name</label>
            <label className="form-sublabel">{props.order.productName}</label>
          </div>

          <div className="form-label-and-sublabel">
            <label className="form-label"> Quantity</label>
            <label className="form-sublabel">{props.order.quantity}</label>
          </div>

          {"productSize" in props.order && (
            <div className="form-label-and-sublabel">
              <label className="form-label">Chosen Size</label>
              <label className="form-sublabel">{props.order.productSize}</label>
            </div>
          )}
        </div>
        <div className="form-right">
          <img
            src={props.order.imgUrl}
            alt={props.order.productName}
            width="300"
            className="product-img"
          />
        </div>
      </div>
      <div className="form-bottom">
        <label
          name="totalPrice"
          className="form-label"
        >{`Total Price: ${props.order.totalPrice} EGP`}</label>

        {(props.order.status !== "delivered" && (
            <TextAreaInput
              label="Delivery Note"
              name="deliveryNote"
              value={dn}
              onChange={onDnChange}
              register={register}
            />
          ) && (
            <div className="order-details-buttons">
              {props.order.deliveryNote !== dn && (
                <button
                  type="submit"
                  className="form-button"
                  onChange={() => onOrderChange("update")}
                >
                  Update Order
                </button>
              )}

              <button
                type="submit"
                className="form-button"
                onChange={() => onOrderChange("cancel")}
              >
                Cancel Order
              </button>
            </div>
          )) || ( // create a static delivery note field (label) if props.order.status is delivered
          <label className="form-sub-label"> Delivery Note: {dn} </label>
        )}
      </div>
    </form>
  );
};

export default OrderDetailsForm;
