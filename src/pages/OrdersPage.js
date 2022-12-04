import { useEffect, useState, useContext } from "react";
import OrdersList from "../components/orders/OrdersList";
import Loading from "../components/media/Loading";
import AuthContext from "../store/authContext";
import Forbidden from "../components/auth/Forbidden";

const OrdersPage = () => {
  const authContext = useContext(AuthContext);
  // let's define a state for orders
  const [orders, setOrders] = useState([]);

  // let's define a state for loading
  const [isLoading, setIsLoading] = useState(true);

  const content = (isLoading, orders) => {
    if (isLoading) {
      return <Loading />;
    }

    if (false && authContext.role !== "client") {
      // to do: remove "false &&"
      return <Forbidden role={authContext.role} />;
    }
    return <OrdersList Orders={orders} />;
  };

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchOrders = async () => {
      try {
        // send an HTTP GET request to the get orders route we defined in our Express REST API
        const response = await fetch("http://localhost:5000/orders/:userid", {
          signal: fetchSignal,
        });
        // parse the response content to JSON and store it into data variable
        const data = await response.json();

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

    fetchOrders();

    return () => {
      fetchAbortController.abort();
    };
  }, []);

  return <div className="col-center-content">{content(isLoading, orders)}</div>;
  // to do: delete this comment: <ProductsList products={products} />
};

export default OrdersPage;
