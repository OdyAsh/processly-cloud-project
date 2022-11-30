import ProductSummary from './ProductSummary';

const ProductsList = (props) => {
  return (
    <div className="grid grid-cols-2 gap-5 justify-center items-center">
      {props.products.map((p) => (
        <ProductSummary product={p} key={p._id} />
      ))}
    </div>
  );
};

export default ProductsList;
