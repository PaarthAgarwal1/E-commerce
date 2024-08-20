import React, { memo, useState, useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoPersonCircle } from "react-icons/io5";
import  {UserContext}  from './UserProvider';

function NavBar({ productCount}) {
  const { user } = useContext(UserContext);
  const { logout } = useContext(UserContext)
  console.log("navbar data",user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  // const handleLogout = () => {
  //   logout();
  // };

  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  let logoutClass = "";
  let loginClass = "hidden";
  if (!user) {
    logoutClass = "hidden";
    loginClass = "";
  }

  return (
    <div className="py-2 px-5 lg:px-20 flex justify-between items-center">
      <div className="h-10 lg:h-20 flex items-center">
        <Link to="/">
          <img className="h-20 lg:h-36 object-cover" src="https://img.freepik.com/premium-vector/gradient-online-shop-logo-design_852937-162.jpg?w=2000" />
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <Link to="/cart" className={logoutClass}>
          <div className="relative flex hover:text-red-500">
            <HiOutlineShoppingBag className="text-xl lg:text-4xl text-red-500" />
            {productCount > 0 && <span className="absolute text-sm flex items-center justify-center w-full bottom-0.5 text-red-500">{productCount}</span>}
          </div>
        </Link>

        {user ? (
          <div className="relative ml-4">
            <button
              onClick={toggleDropdown}
              className="relative flex items-center justify-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <img
                className="h-8 w-8 rounded-full"
                src="https://conqueror.ae/images/profile.png"
                alt="User profile"
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <button
                  onClick={logout}
                  className="w-full px-2 py-1 text-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md transition duration-150 ease-in-out"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Logout {user.full_name}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className={loginClass}>
            <IoPersonCircle className="ml-4 text-2xl lg:text-4xl text-gray-500 hover:text-gray-600" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default memo(NavBar);
