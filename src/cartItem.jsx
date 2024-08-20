import React, { useState, useEffect } from 'react';
import { RxCrossCircled } from "react-icons/rx";

function CartItem({ id, thumbnail, title, price, set, remove, change }) {
  const [quantity, setQuantity] = useState(set[id]);

  useEffect(() => {
    setQuantity(set[id]);
  }, [set, id]);

  function handleChange(event) {
    const value = Math.max(0, +event.target.value);
    setQuantity(value);
    change(id, value);
  }

  function handleRemove() {
    remove(id);
  }

  return (
    <tr className="odd:bg-white even:bg-slate-50">
      <td className="px-2">
        <button onClick={handleRemove}>
          <RxCrossCircled />
        </button>
      </td>
      <td><img src={thumbnail} className="h-12" alt={title} /></td>
      <td className="pl-4">{title}</td>
      <td>${price}</td>
      <td className="text-center">
        <input type="number" min="1" value={quantity} onChange={handleChange} className="w-16 border px-1" />
      </td>
      <td className="">${(quantity * price).toFixed(2)}</td>
    </tr>
  );
}

export default CartItem;
