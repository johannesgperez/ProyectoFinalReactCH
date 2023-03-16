import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

import "./CartItem.css";

export const CartItem = ({ product }) => {
  const { removeProduct } = useContext(CartContext);

  return (
    <div className="cart-item">
      <div>
        <img src={product.imageUrl} alt={product.product_name} />
      </div>
      <div>
        <p className="cart-item-name">{product.product_name}</p>
        <p className="cart-item-price">Precio: ${product.price}</p>
        <p className="cart-item-quantity">Cantidad: {product.quantity}</p>
        <p className="cart-item-total">Precio total: ${product.totalPrice}</p>
        <button
          className="cart-item-button"
          onClick={() => removeProduct(product.id)}
        >
          Eliminar producto
        </button>
      </div>
    </div>
  );
};
