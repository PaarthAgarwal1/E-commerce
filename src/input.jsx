  import React from 'react';
  import FormikHOC from './formikHoc';

  function Input({ name, label, id, className,touched, error, ...rest }) {
    let borderClass = "border-gray-300  focus:border-indigo-500";
    if (error && touched) {
      borderClass = "border-red-500";
    }

    return (
      <div>
        <label htmlFor={id} className="sr-only">{label}</label>
        <input
          id={id}
          name={name}
          className={`w-full py-1 pl-2 border rounded-md ${className} ${borderClass}`}
          {...rest}
        />
        {touched && error && <div className="text-red-500">{error}</div>}
      </div>
    );
  }

  export const FormikInput=FormikHOC(Input);
  export default Input;
