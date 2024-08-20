import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductListPage from './productListPage';
import ProductDetails from './productDetails';
import NavBar from './navbar';
import Footer from './footer';
import NotFound from './DataNotFound';
import Login, { SignUP, ForgoT } from "./NavigateHome.jsx";
import CartPage from './cartPage.jsx';
import axios from "axios";
import Alert from './alert';
import UserProvider from "./UserProvider";
import Loading from './loading';

export const CreateContext = React.createContext();
export const AlertContext = React.createContext();

function App() {
  const savedDataString = localStorage.getItem("my-cart") || "{}";
  const savedData = JSON.parse(savedDataString);
  const [cart, setCart] = useState(savedData);
  const [alert, setAlert] = useState();
  
  
  const navigate = useNavigate();

  

  const updateCart = useCallback(function (UpdateCart) {
    const temp = { ...UpdateCart };
    setCart(temp);
    localStorage.setItem("my-cart", JSON.stringify(temp));
  }, []);

  const totalcount = useMemo(() => {
    return Object.keys(cart).reduce((output, current) => output + cart[current], 0);
  }, [cart]);

  

  

  function handleAddToCart(productId, count) {
    let oldCount = cart[productId] || 0;
    const newCart = { ...cart, [productId]: oldCount + count };
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("my-cart", cartString);
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <CreateContext.Provider value={updateCart}>
        <UserProvider>
          <AlertContext.Provider value={{ alert, setAlert }}>
            <NavBar productCount={totalcount} />
            <div className="grow justify-center">
              <Alert />
              <Routes>
                <Route index element={<ProductListPage />} />
                <Route path="/product/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<Login setAlert={setAlert} />} />
                <Route path="/signup" element={<SignUP  setAlert={setAlert} />} />
                <Route path="/ForgotPassword" element={<ForgoT setAlert={setAlert} />} />
                <Route path="/cart" element={<CartPage cart={cart} recentCart={updateCart} newCart={setCart} />} />
              </Routes>
            </div>
            <Footer />
          </AlertContext.Provider>
        </UserProvider>
      </CreateContext.Provider>
    </div>
  );
}

export default App;
