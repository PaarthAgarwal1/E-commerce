import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {FormikInput} from './input';
import * as Yup from 'yup';

function ForgotPassword({setAlert}) {
  function sendData(values) {
    setAlert({
      type: 'success',
      message: `A reset link has been sent to ${values.email}`,
    });
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const initialValues = {
    email: '',
  };

  return (
    <div className="flex justify-center items-center flex-col bg-gray-200 h-full">
      <Formik initialValues={initialValues} onSubmit={sendData} validationSchema={schema} validateOnMount>
        <Form className="w-11/12 lg:w-1/3 flex flex-col gap-4 bg-white shadow rounded-md p-4">
          <h1 className="text-3xl mb-4 text-gray-400 font-bold">Forgot Password</h1>
          <FormikInput label="Email address" id="email-address" name="email" type="email" required autoComplete="email" placeholder="Email or username" className="rounded" />
          <button className="my-6 border rounded-md bg-blue-600 text-white text-xl py-2 shadow disabled:bg-blue-300" type="submit">Send Reset Link</button>
          <p className="self-center">
            Remember Your Password? <Link className="text-blue-600" to="/login">Login</Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}

export default ForgotPassword;
