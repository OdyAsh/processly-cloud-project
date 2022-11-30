import { useState, useEffect } from 'react';

import AddProductForm from '../components/products/AddProductForm';

const AddProductPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/suppliers', {
          signal: fetchSignal
        });
        const data = await response.json();

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

  if (isLoading) {
    return <p>Loading list of existing suppliers...</p>;
  }

  return (
    <div>
      <AddProductForm suppliers={suppliers} />
    </div>
  );
};

export default AddProductPage;
