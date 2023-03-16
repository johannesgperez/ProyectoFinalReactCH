import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";
import "./ItemDetail.css";

export const ItemDetail = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  const onAdd = (count) => {
    addProduct(product, count);
    setQuantity(count);
  };

  return (
    <>
      {product.product_name ? (
        <div className="product-detail">
          <h2>{product.product_name}</h2>
          <div className="product-detail-info">
            <div>
              <img src={product.imageUrl} alt="product_image" />
              <h5>Categoria: {product.category}</h5>
            </div>
            <div>
              <h4 className="product-detail-info-price">${product.price}</h4>
              <ItemCount initial={1} stock={product.stock} onAdd={onAdd} />
              {quantity > 0 && (
                <Link className="product-detail-info-button" to="/shoppingCart">
                  Ir al Carrito
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
        <p>El producto no existe</p>
        </div>
      )}
    </>
  );
};

export default ItemDetail;

