import Item from "./Item";

import "./ItemList.css";

const ItemList = ({ products }) => {
  return (
    <div className="product-list-inner">
      {products.map((product) => (
        <Item className="product-item" key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;
