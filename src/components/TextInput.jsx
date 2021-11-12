import React from 'react';
import { useField } from 'formik';

export default ({ label, forwardedRef, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-floating mb-3 form-group">
      <input ref={forwardedRef} {...field} {...props}/>
      <label className="form-label" htmlFor={props.name}>{label}</label>
      {meta.touched && meta.error ? (
         <div className="invalid-tooltip">{meta.error}</div>
       ) : null}
    </div>
  );
};