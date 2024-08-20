import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from './api';
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import Loading from './loading';
import NotFound from './DataNotFound';

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        console.log(response);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCountChange = (event) => {
    setCount(Math.max(1, +event.target.value));
  };

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product.id, count);
    }
  };

  const handleNextAndPrevious = () => {
    setCount(1);
  };

  if (loading) {
    return <Loading />;
  }

  

  return (
    <div className="flex justify-center items-center bg-gray-200 px-8 h-full">
      <div className="relative h-11/12 w-11/12 bg-white items-center flex flex-col lg:flex-row px-10 py-8 lg:px-20">
        <Link to="/" className="flex items-center absolute top-0 left-0 p-2 lg:p-4">
          <IoMdArrowDropleft className="text-xl lg:text-3xl" />
          Back
        </Link>
        <div className="lg:w-1/2 flex justify-center">
          <img className="max-h-[500px]" src={product.images[0]} alt={product.title} />
        </div>
        <div className="px-2 py-4 lg:py-0 lg:flex lg:flex-col lg:items-start lg:justify-start lg:px-8 lg:w-1/2">
          <h1 className="text-2xl text-center lg:text-left lg:text-4xl font-bold text-gray-500">{product.title}</h1>
          <p className="text-center lg:pt-2 text-lg lg:text-xl text-gray-400">{product.category}</p>
          <h2 className="lg:py-4 text-lg text-center font-medium sm:text-xl md:text-2xl lg:text-left lg:text-3xl">${product.price}</h2>
          <p className="text-gray-500 text-center text-sm lg:text-md mt-2 lg:text-justify">{product.description}</p>
          <div className="flex lg:flex-col gap-2 mt-6 mb-2 sm:flex-row justify-center">
            <input value={count} onChange={handleCountChange} className="border w-16 pl-4 text-xl" type="number" />
            <button onClick={handleAddToCart} className="py-2 px-5 text-white rounded-md md:px-8 md:py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300">
              ADD TO CART
            </button>
          </div>
        </div>
        {product.id > 1 && (
          <button onClick={handleNextAndPrevious}>
            <Link to={`/product/${product.id - 1}`} className="text-sm lg:text-md bg-orange-400 shadow text-white flex items-center absolute bottom-0 left-0 p-1 m-2 rounded-md">
              <IoMdArrowDropleft className="text-xl lg:text-3xl" />
              Previous
            </Link>
          </button>
        )}
        {product.id < 100 && (
          <button onClick={handleNextAndPrevious}>
            <Link to={`/product/${product.id + 1}`} className="text-sm lg:text-md flex items-center absolute bottom-0 right-0 p-1 bg-orange-400 shadow rounded-md text-white m-2">
              Next
              <IoMdArrowDropright className="text-xl lg:text-3xl" />
            </Link>
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
