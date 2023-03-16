import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";

import { CartProvider } from "./context/CartContext";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { CartContainer } from "./components/CartContainer";
import Contact from "./components/Contact";
import Payment from "./components/Payment";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route
              path="/products/:productCategory"
              element={<ItemListContainer />}
            />
            <Route
              path="/product/:productId"
              element={<ItemDetailContainer />}
            />
            <Route path="/shoppingCart" element={<CartContainer />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
