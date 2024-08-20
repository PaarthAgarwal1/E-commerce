import React ,{useContext}from 'react';
import { Formik, Form } from 'formik';
import {FormikInput} from './input';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
import  {UserContext}  from './UserProvider';

function SignUp({ setAlert }) {
  const {setUser}=useContext(UserContext);
  const navigate = useNavigate();
  function sendData(values) {
    axios.post('https://myeasykart.codeyogi.io/signup', {
      fullName: values.userName,
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      console.log(response.data);
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      setAlert({ type: "success", message: "Signup Successful! Welcome " + user.full_name + "!" });
      navigate('/');
    })
    .catch((error) => {
      console.error("Signup Error:", error.response?.data || error.message);
      setAlert({ type: "error", message: "Signup Failed: " + (error.response?.data?.message || "Unknown error") });
    });
  }

  const schema = Yup.object().shape({
    userName: Yup.string().required("User Name is required"),
    email: Yup.string().email('Invalid email format').required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-screen bg-gray-200">
      <Formik initialValues={initialValues} onSubmit={sendData} validationSchema={schema} validateOnMount>
        <Form className="w-11/12 lg:w-1/3 flex flex-col gap-2 bg-white rounded-md p-4 shadow">
          <h1 className="text-3xl text-gray-400 mb-4 font-bold">Sign Up</h1>
          <FormikInput label="User Name" id="userName" name="userName" type="text" required autoComplete="given-name" placeholder="Enter your full name" className="rounded-b-none" />
          <FormikInput label="Email address" id="email" name="email" type="email" required autoComplete="email" placeholder="Email or username" className="rounded-b-none" />
          <FormikInput label="Password" id="password" name="password" type="password" required autoComplete="new-password" placeholder="Password" className="rounded-t-none" />
          <FormikInput label="Confirm Password" id="confirmPassword" name="confirmPassword" type="password" required autoComplete="new-password" placeholder="Confirm your password" className="rounded-t-none" />
          <button type="submit" className="my-6 border rounded-md bg-blue-600 text-white text-xl py-2 shadow disabled:bg-blue-300">Sign up</button>
          <p className="self-center">
            Already have an account? <Link className="text-blue-600" to="/login">Login</Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUp;
