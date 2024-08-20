import React,{useContext} from "react";
import {AlertContext,CreateUser} from "./App";
import {Navigate} from "react-router-dom";
import Login from "./login.jsx";
import SignUp from "./signUp.jsx";
import ForgotPassword from "./forgotPassword.jsx"
  import ProductListPage from './productListPage';
  import ProductDetails from './productDetails';
import CartPage from './cartPage.jsx';

function NavigateHOC(IncomingComponent) {
  return (props) => {
    const { user } = useContext(CreateUser);
    if (user) {
      return <Navigate to="/" />;
    }
    return <IncomingComponent {...props} />;
  };
}

export default NavigateHOC(ProductListPage);
export const Detail=NavigateHOC(ProductDetails);
export const Cart=NavigateHOC(CartPage);