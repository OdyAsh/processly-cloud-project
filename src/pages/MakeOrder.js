import { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";

import MakeOrderForm from "../components/orders/MakeOrderForm";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // source: https://bobbyhadz.com/blog/react-sleep-function

const content = (isLoading, suppliers) => {
  if (isLoading) {
    return (
      <ColorRing // source: https://mhnpd.github.io/react-loader-spinner/docs/components/color-ring
        visible={true}
        height="200"
        width="200"
        ariaLabel="loading-arialabel"
        wrapperStyle={{}}
        wrapperClassName="loading-wrapper"
        colors={["#1B9D2C", "#0841C2", "#B0C000", "#BD0105", "#1B9D2C"]} //green, red, blue, yellow, green
      />
    );
  }
  return <MakeOrderForm suppliers={suppliers} />;
};

const AddProductPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products", {
          signal: fetchSignal,
        });
        const data = await response.json();
        await sleep(1000);
        if (!response.ok) {
          throw Error(data.error);
        }

        setSuppliers(data.suppliers);
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

  return <div className="center-content">{content(isLoading, suppliers)}</div>;
};

export default AddProductPage;
