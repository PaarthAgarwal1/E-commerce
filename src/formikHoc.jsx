import React from 'react';
import {useField} from 'formik';

function FormikHOC (IncomingComponent){
  function OutgoingComponent({name, ...rest}){
    const field=useField(name);
    const [data,meta]=field;
    const {value,onChange,onBlur}=data;
    const {error,touched}=meta;
    let borderClass="border-gray-300 focus:border-indigo-500";
    if(error && touched){
      borderClass="border-red-500";
    }
    return(
      <IncomingComponent value={value} onChange={onChange} onBlur={onBlur} name={name} error={error} touched={touched} {...rest}
      />
    );
  }
  return OutgoingComponent;
}
export default FormikHOC;