import { useEffect, useState } from "react";
import OrdersList from "../../components/orders/OrdersList";
import Loading from "../../components/media/Loading";

const OrdersPage = () => {
  // let's define a state for orders
  const [orders, setOrders] = useState([
    // to do: delete this and make it []
    {
      orderId: "78",
      email: "bavshehata@gmail.com",
      productName: "Flag",
      quantity: "3",
      size: "XS",
      deliveryNote: "random text yaaaaaay",
      totalPrice: "100",
      imgUrl: "https://i.imgur.com/IGh0FoV.jpg",
      status: "pending",
    },
    {
      orderId: "3",
      email: "ash@gmail.com",
      productName: "kajfslj",
      quantity: "3",
      size: "XS",
      deliveryNote: "random text yaaaaaay",
      totalPrice: "100",
      imgUrl: "https://i.imgur.com/IGh0FoV.jpg",
      status: "pending",
    },
  ]);

  // let's define a state for loading
  const [isLoading, setIsLoading] = useState(true);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // source: https://bobbyhadz.com/blog/react-sleep-function

  const content = (isLoading, orders) => {
    if (isLoading) {
      return <Loading />;
    }
    return <OrdersList orders={orders} />;
  };

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchOrders = async () => {
      try {
        // send an HTTP GET request to the get orders route we defined in our Express REST API
        const response = await fetch(
          "https://processly.azurewebsites.net/orders/:userid",
          {
            signal: fetchSignal,
          }
        );
        // parse the response content to JSON and store it into data variable
        const data = await response.json();
        await sleep(1000);
        // If there is an HTTP error (the response is NOT ok), throw the error message we get from the REST API.
        if (!response.ok) {
          // remember, in our REST API we return an error message in our response that has the key 'error'.
          throw Error(data.error);
        }

        // we now need to set our component state to the orders we fetched
        setOrders(data.orders);

        // after we set the orders' state, let's set the loading state to false
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    // fetchOrders(); // to do: uncomment this
    setIsLoading(false); // to do: delete this

    return () => {
      fetchAbortController.abort();
    };
  }, []);

  return <div>{content(isLoading, orders)}</div>;
};

export default OrdersPage;
