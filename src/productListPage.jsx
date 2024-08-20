import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import ProductList from './productList';
import { getProducts } from './api';
import Loading from './loading';
import NotFound from './DataNotFound';
import { IoSearchSharp } from "react-icons/io5";

function ProductListPage() {
  const [data, setData] = useState(null);
  const products = data?.products || [];
  const PRODUCTS_PER_PAGE = 20; // Display 20 products per page
  const lastPage = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;
  const sortBy = searchParams.get("sortBy") || "default";
  const order = searchParams.get("order") || "asc";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getProducts(search, sortBy, order);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        // Handle error, possibly navigate to 404 page
      }
    }
    fetchData();
  }, [search, sortBy, order]);

  if (lastPage !== 0 && page > lastPage) {
    return <Navigate to="/404" replace />;
  }

  const handleSearchChange = useCallback((event) => {
    setSearchParams((prev) => {
      prev.set("search", event.target.value);
      prev.set("page", 1);
      return prev;
    });
  }, []);

  const handleSortChange = useCallback((event) => {
    const [sortBy, order] = event.target.value.split(" ");
    setSearchParams((prev) => {
      prev.set("sortBy", sortBy);
      prev.set("order", order);
      return prev;
    });
  }, []);

  return (
    <div className="w-screen">
      <div className="flex grow bg-gray-200 py-10">
        <div className="mx-4 grow lg:mx-20 flex flex-col flex-wrap gap-2 justify-center bg-white lg:p-10">
          <div className="m-2 bg-gray-200 p-1">
            <div className="bg-white mx-4 my-4 px-4 py-2 shadow gap-2 flex flex-col lg:flex-row justify-between lg:rounded-full">
              <div className="flex">
                <IoSearchSharp className="text-xl text-gray-400 mr-2" />
                <input
                  value={search}
                  placeholder="Search and filter"
                  className="focus:outline-none focus:ring-0 lg:w-[780px]"
                  onChange={handleSearchChange}
                />
              </div>

              <select
                value={sortBy + " " + order}
                onChange={handleSortChange}
                className="min-w-32 font-bold text-right px-2 focus:outline-none focus:ring-0"
              >
                <option value="default asc">Default sorting</option>
                <option value="title asc">Sort by title</option>
                <option value="price asc">Sort by price: low to high</option>
                <option value="price desc">Sort by price: high to low</option>
              </select>
            </div>
          </div>

          <div className="flex px-4 justify-center">
            {loading ? (
              <Loading />
            ) : products.length === 0 ? (
              <NotFound />
            ) : (
              <ProductList products={products.slice(page * PRODUCTS_PER_PAGE - PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)} />
            )}
          </div>

          <div className="flex flex-wrap gap-2 my-8 text-red-500">
            {[...Array(lastPage)].map((_, i) => (
              <button
                key={i}
                className={`hover:bg-red-500 border-2 border-red-500 hover:text-white px-4 py-2 transition duration-300 ease-in-out ${
                  i + 1 === page ? 'bg-red-500 text-white' : ''
                }`}
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("page", i + 1);
                    return prev;
                  });
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
