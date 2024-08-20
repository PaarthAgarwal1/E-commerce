import React ,{useContext}from 'react';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormikInput } from './input';
import axios from "axios";
import  {UserContext}  from './UserProvider';

function LoginPage({ setAlert }) {
  const {setUser}=useContext(UserContext);
  const navigate = useNavigate(); // Hook for programmatic navigation

  function sendData(values) {
    axios.post("https://myeasykart.codeyogi.io/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      setAlert({ type: "success", message: "Login Successful! Welcome back " + user.full_name + "!" });
      navigate('/'); // Redirect to ProductListPage or home after successful login
    }).catch((error) => {
      setAlert({ type: "error", message: "Invalid Credentials" });
    });
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required("Please enter your Email"),
    password: Yup.string().required("Enter your password"),
  });

  const initialValues = {
    email: "",
    password: ""
  };

  return (
    <div className="flex bg-gray-200 h-full w-screen justify-center items-center">
      <Formik initialValues={initialValues} onSubmit={sendData} validationSchema={schema} validateOnMount>
        <Form className="w-11/12 lg:w-1/3 flex flex-col gap-2 bg-white rounded-md p-4 shadow">
          <h2 className="text-3xl mb-4 text-gray-400 font-bold">Sign in</h2>
          <FormikInput label="Email address" id="email-address" name="email" type="email" required autoComplete="email" placeholder="Email or username" className="rounded-b-none" />
          <FormikInput label="Password" id="password" name="password" type="password" required autoComplete="current-password" placeholder="Password" className="rounded-t-none" />
          <Link to="/forgotPassword" className="text-blue-600">Forgot Password?</Link>
          <button type="submit" className="my-6 border rounded-md bg-blue-600 text-white text-xl py-2 shadow disabled:bg-blue-300">Log in</button>
          <p className="self-center">New User? Create Account <Link className="text-blue-600" to="/signUp">Sign up</Link></p>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginPage;
