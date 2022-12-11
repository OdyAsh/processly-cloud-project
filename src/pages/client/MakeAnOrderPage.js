import { useState, useEffect, useContext } from "react";

import AuthContext from "../../store/authContext";
import MakeOrderForm from "../../components/orders/MakeOrderForm";
import Forbidden from "../../components/auth/Forbidden";
import Loading from "../../components/media/Loading";

const MakeOrder = () => {
  const authContext = useContext(AuthContext);
  console.log("in MakeAnOrderPage.js:");
  console.log(authContext);
  const [products, setProducts] = useState([
    // to do: remove dummy data
    {
      productId: 1,
      name: "flag",
      price: 600,
      imgUrl: "https://i.imgur.com/IGh0FoV.jpg",
    },
    {
      productId: 1,
      name: "hoodie",
      sizes: ["XS, S, M, L, XL"],
      price: 400,
      imgUrl: "https://i.imgur.com/76qddiu.png",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // source: https://bobbyhadz.com/blog/react-sleep-function

  const content = (isLoading, products) => {
    if (isLoading) {
      return <Loading />;
    }

    if (false && authContext.role !== "client") {
      // to do: remove "false &&"
      return <Forbidden role={authContext.role} />;
    }
    return <MakeOrderForm products={products} />;
  };

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchProducts = async () => {
      try {
        await sleep(1000);
        const response = await fetch(
          "https://processly101.herokuapp.com/products",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `BEARER ${authContext.token}`,
            },
            signal: fetchSignal,
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw Error(data.error);
        }

        setProducts(data.products);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProducts();

    return () => {
      fetchAbortController.abort();
    };
  }, []);

  return (
    <div className="row-center-content">{content(isLoading, products)}</div>
  );
};

export default MakeOrder;
