import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../components/media/Loading";
import OrderDetailsForm from "../components/orders/OrderDetailsForm";

const OrderDetailsPage = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // use the useParams hook in React Router to allow us to access dynamic segments in our dynamic route
  const params = useParams();
  // our dynamic segment was called orderId, so we can access it as follows:
  const orderId = params.orderId;
  console.log("from OrderDetailsPage.js");
  console.log(orderId);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // source: https://bobbyhadz.com/blog/react-sleep-function

  const content = (isLoading, order) => {
    if (isLoading) {
      return <Loading />;
    }
    if (!order) {
      return <h1 className="order-not-found">Order Not Found...</h1>;
    }
    return <OrderDetailsForm order={order} />;
  };

  // now simply use useEffect to fetch the order's data
  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchOrderDetails = async () => {
      try {
        await sleep(1000);
        const response = await fetch(
          `http://localhost:5000/orders/${orderId}`,
          {
            signal: fetchSignal,
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw Error(data.error);
        }
        setOrder(data.order);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    //fetchOrderDetails(); //to do: uncomment this

    return () => {
      fetchAbortController.abort();
    };
  }, [orderId]);

  /* to do: delete following lines */
  setOrder({
    _id: "1",
    userName: "anaUser",
    productName: "Flag",
    quantity: "3",
    size: "XS",
    deliveryNote: "random text yaaaaaay",
    totalPrice: "100",
    imgUrl: "https://i.imgur.com/IGh0FoV.jpg",
    date: "1/1/2001",
    time: "12H:23M:34S",
    status: "pending",
  });
  setIsLoading(false); // also delete this

  return <div className="row-center-content">{content(isLoading, order)}</div>;
};

export default OrderDetailsPage;
