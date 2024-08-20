import React, { useState, useEffect } from 'react';
import CartList from './cartList';
import { getProduct } from './api';
import Loading from './loading';

function CartPage({ cart, recentCart }) {
  const [cartItems, setCartItems] = useState([]);
  const [tempCart, setTempCart] = useState(cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setTempCart(cart);
  }, [cart]);

  useEffect(() => {
    setLoading(true);
    const keysArray = Object.keys(tempCart);
    const promises = keysArray.map(id => getProduct(id));

    Promise.all(promises).then(products => {
      setCartItems(products.map(product => ({ ...product, id: product.id })));
      setLoading(false);
    });
  }, [tempCart]);

  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * tempCart[item.id];
    });
    setTotalAmount(total.toFixed(2));
  }, [cartItems, tempCart]);

  function handleUpdate() {
    setIsUpdating(true);
    recentCart(tempCart);
    setIsUpdating(false);
  }

  function handleRemove(prodId) {
    const newCart = { ...tempCart };
    delete newCart[prodId];
    setTempCart(newCart);
  }

  function handleChange(prodId, val) {
    const newCart = { ...tempCart, [prodId]: val };
    if (val > 0) {
      setTempCart(newCart);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-200 w-screen h-full flex justify-center items-center">
      <div className="bg-white w-11/12 my-4 p-8">
        <div className="flex flex-col">
          <div className="w-2/3 bg-white mx-auto">
            <CartList cartItems={cartItems} cart={tempCart} remove={handleRemove} change={handleChange} />
          </div>

          <div className="border p-2 flex w-2/3 mx-auto justify-between">
            <div className="space-x-2">
              <input className="border py-2 px-2 text-center" type="text" placeholder="Coupon Code" />
              <button className="shadow font-semibold border bg-red-400 hover:bg-red-500 active:bg-red-600 py-2 px-6 text-white rounded-md">
                APPLY COUPON
              </button>
            </div>
            <button onClick={handleUpdate} className="border shadow bg-red-400 hover:bg-red-500 active:bg-red-600 active:text-white font-bold py-2 px-6 text-gray-500 rounded-md">
              UPDATE CART
            </button>
          </div>
        </div>

        <div className="w-2/3 flex mx-auto justify-end mt-8">
          <div className="w-1/2">
            <h1 className="bg-gray-100 border font-bold p-2">Cart totals</h1>
            <div className="border p-1">
              <div className="flex border-b-2 mx-2 mt-2 gap-x-4 md:gap-x-12">
                <h2 className="font-bold w-[70%]">Subtotal</h2>
                <h2>{totalAmount}</h2>
              </div>
              <div className="flex border-b-2 mx-2 mt-2 gap-x-4 md:gap-x-12">
                <h2 className="font-bold w-[70%]">Total</h2>
                <h2>{totalAmount}</h2>
              </div>
              <div className="mx-2 mt-6">
                <button className="w-full bg-red-400 hover:bg-red-500 active:bg-red-600 shadow text-white font-bold rounded-md px-6 py-2">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
