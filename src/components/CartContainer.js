import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";

import "./CartContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadCry } from "@fortawesome/free-solid-svg-icons";

export const CartContainer = () => {
  const { cartProducts, clearCartProducts, getTotalPrice, getTotalProducts } =
    useContext(CartContext);

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      <div className="product-detail">
        {cartProducts.length > 0 ? (
          <>
            <table>
              <tbody>
                {cartProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <CartItem product={product} />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <div className="product-detail-summary">
                      <p>
                        Total Productos: <span>{getTotalProducts()}</span>
                      </p>
                      <p>
                        Monto Total: <span>${getTotalPrice()}</span>
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />

            <div className="finalize-wrapper">
              <button className="empty-button" onClick={clearCartProducts}>
                Vaciar el carrito
              </button>
              <Link className="finalize-button" to="/payment">
                Finalizar Compra
              </Link>
            </div>
          </>
        ) : (
          <div>
            <h4>Carrito Vacío</h4>
            <p className="emptyCartIcon">
              <FontAwesomeIcon icon={faSadCry} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
