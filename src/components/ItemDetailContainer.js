import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const productDoc = doc(db, "ecommerce", productId);
    const productData = await getDoc(productDoc);
    setProduct({ ...productData.data(), id: productData.id });
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  return <div>{product && <ItemDetail product={product} />}</div>;
};

export default ItemDetailContainer;
