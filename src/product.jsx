import React, {memo} from 'react';
import {Link} from 'react-router-dom';

function Product({id, images, discountPercentage, title, category, price, rating }) {
  return (
    <div className="shadow relative bg-white p-2 w-40 lg:w-[276px] lg:text-base text-sm">
      <img className="max-w-60 max-h-60 object-cover" src={images[0]}/>
      {discountPercentage>15 && (
        <div className="w-12 h-12  flex items-center justify-center text-xs bg-red-600 text-white rounded-full absolute right-0 top-0">
          %{discountPercentage}
        </div>
      )}
      <p className="text-gray-500">{category}</p>
      <h1 className="font-bold">{title}</h1>
      
      <div className="flex items-center">
        <p className="bg-green-700 text-white font-bold rounded px-1">{rating} ★</p>
      </div>
      <h1 className="font-bold">${price}</h1>
      <Link className="text-blue-700" to={"/product/"+id}>View more...</Link>
    </div>
  );
}

export default memo(Product);
