import { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "@firebase/firestore";
import { db } from "../firebaseConfig/firebase";

import ItemList from "./ItemList";

import { useParams } from "react-router-dom";

import "./ItemListContainer.css";

const ItemListContainer = () => {
  const { productCategory } = useParams();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const q = productCategory
        ? query(
            collection(db, "ecommerce"),
            where("category", "==", productCategory)
          )
        : collection(db, "ecommerce");

      const data = await getDocs(q);

      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [productCategory]);

  return (
    <>
      <h2 className="page-title">{productCategory || "Lista de Productos"}</h2>
      <div className="products-container">
        <div className="product-list">
          <ItemList products={products} />
        </div>
      </div>
    </>
  );
};

export default ItemListContainer;
