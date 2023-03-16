import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
    <div className="product-item">
      <img src={product.imageUrl} alt="product_image" />
      <h4 className="product-item-name">{product.product_name}</h4>
      <p className="product-item-price">${product.price}</p>
      <Link className="product-item-button" to={`/product/${product.id}`}>
        Ver Detalle
      </Link>
    </div>
  );
};

export default Item;
