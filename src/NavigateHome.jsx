import React, {useContext} from "react";
import {AlertContext} from "./App";
import {UserContext} from "./UserProvider";
import {Navigate} from "react-router-dom";
import Login from "./login.jsx";
import SignUp from "./signUp.jsx";
import ForgotPassword from "./forgotPassword.jsx";

function NavigateHOC(IncomingComponent){
  return(()=>{
    const {user,setUser}=useContext(UserContext);
    const {alert,setAlert}=useContext(AlertContext);
    if(user){
      return <Navigate to="/" />
    }
    return (
      <IncomingComponent setUser={setUser} setAlert={setAlert}/>
    )
  })
}
export default NavigateHOC(Login);
export const SignUP=NavigateHOC(SignUp);
export const ForgoT=NavigateHOC(ForgotPassword);
