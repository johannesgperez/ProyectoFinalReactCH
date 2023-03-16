import { createContext, useReducer, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const initialState = {
  cartProducts: [],
  products: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const { product, qty } = action.payload;
      const newList = [...state.cartProducts];
      const existingProduct = state.cartProducts.find(
        (p) => p.id === product.id
      );

      if (existingProduct) {
        const productIndex = state.cartProducts.findIndex(
          (element) => element.id === product.id
        );
        newList[productIndex].quantity = newList[productIndex].quantity + qty;
        newList[productIndex].totalPrice =
          newList[productIndex].quantity * newList[productIndex].price;
      } else {
        const newProduct = {
          ...product,
          quantity: qty,
          totalPrice: qty * product.price,
        };
        newList.push(newProduct);
      }

      return {
        ...state,
        cartProducts: newList,
      };

    case "REMOVE_PRODUCT":
      const newCartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        cartProducts: newCartProducts,
      };

    case "CLEAR_CART_PRODUCTS":
      return {
        ...state,
        cartProducts: [],
      };

    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const getTotalPrice = () => {
    const totalPrice = state.cartProducts.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    return totalPrice;
  };

  const getTotalProducts = () => {
    const totalProducts = state.cartProducts.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return totalProducts;
  };

  const addProduct = (product, qty) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        product,
        qty,
      },
    });
  };

  const removeProduct = (productId) => {
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: productId,
    });
  };

  const clearCartProducts = () => {
    dispatch({
      type: "CLEAR_CART_PRODUCTS",
    });
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsCollection = collection(db, "ecommerce");
        const data = await getDocs(productsCollection);
        const productsData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch({
          type: "SET_PRODUCTS",
          payload: productsData,
        });
      } catch (error) {
        console.error("Error getting products:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts: state.cartProducts,
        addProduct,
        removeProduct,
        clearCartProducts,
        getTotalProducts,
        getTotalPrice,
        products: state.products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
