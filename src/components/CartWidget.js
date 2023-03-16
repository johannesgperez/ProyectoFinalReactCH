import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext.js";

import "./CartWidget.css";

export const CartWidget = () => {
  const { getTotalProducts, cartProducts } = useContext(CartContext);

  return (
    <div className="cart-icon">
      {cartProducts && (
        <>
          <Link to="/shoppingCart">
            <FontAwesomeIcon icon={faCartShopping} size="2x" color="black" />
          </Link>
          <div className="cart-item-count">
            <span>{getTotalProducts()}</span>
          </div>
        </>
      )}
    </div>
  );
};
