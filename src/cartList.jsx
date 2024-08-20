import React from 'react';
import CartItem from './cartItem';
import { IoIosCart } from "react-icons/io";

function CartList({ cartItems, cart, remove, change, update }) {
  if (cartItems.length === 0) {
    return (
      <div className="self-center flex items-center gap-3">
        <h1 className="text-2xl text-gray-400 font-semibold py-2">Your Cart is Empty Add Some Items</h1>
        <IoIosCart className="text-3xl text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr className="h-8">
            <th></th>
            <th className="text-center">Images</th>
            <th>Product</th>
            <th className="text-left">Price</th>
            <th>Quantity</th>
            <th className="text-left">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} set={cart} remove={remove} change={change} update={update} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartList;
