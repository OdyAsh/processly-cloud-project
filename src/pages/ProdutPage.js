import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProdutPage = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // use the useParams hook in React Router to allow us to access dynamic segments in our dynamic route
  const params = useParams();
  // our dynamic segment was called productId, so we can access it as follows:
  const productId = params.productId;

  // now simply use useEffect to fetch the product's data

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchProductDetails = async () => {
      try {
        // send an HTTP GET request to the get products route we defined in our Express REST API
        const response = await fetch(
          `http://localhost:5000/products/${productId}`,
          {
            signal: fetchSignal
          }
        );
        // parse the response content to JSON and store it into data variable
        const data = await response.json();

        // If there is an HTTP error (the response is NOT ok), throw the error message we get from the REST API.
        if (!response.ok) {
          // remember, in our REST API we return an error message in our response that has the key 'error'.
          throw Error(data.error);
        }

        // we now need to set our component state to the products we fetched
        setProduct(data.product);

        // after we set the products' state, let's set the loading state to false
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProductDetails();

    return () => {
      fetchAbortController.abort();
    };
  }, [productId]);

  if (isLoading) {
    return <h1>Please wait while loading product details...</h1>;
  }

  if (!product) {
    return <h1>Couldn't find product...</h1>;
  }

  return (
    <div className="flex justify-center items-center w-screen gap-8 flex-wrap">
      <div className="flex flex-col justify-center items-center gap-10 bg-sky-800 text-white py-16 min-w-[500px] rounded-3xl">
        <h1 className="font-bold text-4xl">{product.name}</h1>
        <img
          src={product.imgURL}
          alt={product.name}
          className="object-scale-down h-[300px] bg-white p-10 rounded-3xl"
        />
        <p className="text-lg">{product.description}</p>
        <h3 className="text-lg font-bold">{product.price} EGP</h3>
      </div>
      <div className="flex flex-col justify-center items-center gap-10 bg-sky-800 text-white py-16 min-w-[500px] rounded-3xl">
        <h1 className="font-bold text-4xl">{product.supplierId.name}</h1>
        <img
          src={product.supplierId.imgURL}
          alt={product.supplierId.name}
          className="object-scale-down h-[300px] bg-white p-10 rounded-3xl"
        />
        <h2 className="text-lg">{product.supplierId.email} EGP</h2>
        <h2 className="text-lg">{product.supplierId.address}</h2>
      </div>
    </div>
  );
};

export default ProdutPage;
