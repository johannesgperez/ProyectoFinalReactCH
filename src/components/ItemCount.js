import { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

import "./ItemCount.css";

const ItemCount = ({ stock, onAdd, initial }) => {
  const [count, setCount] = useState(initial);
  const [remainingStock, setRemainingStock] = useState(stock);

  useEffect(() => {
    setCount(Math.min(initial, remainingStock));
  }, [initial, remainingStock]);

  const incrementProduct = useCallback(() => {
    if (count < remainingStock) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [count, remainingStock]);

  const decrementProduct = useCallback(() => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  }, [count]);

  const addToCart = useCallback(() => {
    onAdd(count);
    setRemainingStock(remainingStock - count);
  }, [count, onAdd, remainingStock]);

  const isOutOfStock = remainingStock === 0;

  return (
    <div className="item-count">
      <p>Stock Disponible: {remainingStock}</p>
      <div>
        <div className="item-count-buttons-wrapper">
          <button disabled={isOutOfStock} onClick={decrementProduct}>
            <FontAwesomeIcon icon={faSquareMinus} size="2x" color="red" />
          </button>
          <span>{count}</span>
          <button disabled={isOutOfStock} onClick={incrementProduct}>
            <FontAwesomeIcon icon={faSquarePlus} size="2x" color="blue" />
          </button>
        </div>

        <button
          className="item-count-button"
          disabled={isOutOfStock}
          onClick={addToCart}
          color="green"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ItemCount;
