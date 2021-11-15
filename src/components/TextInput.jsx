import React from 'react';
import { useField } from 'formik';
import cn from 'classnames';

export default ({ label, forwardedRef, isInvalid, ...props }) => {
  const [field] = useField(props);
  const inputClassName = cn('form-control', {
    'is-invalid': isInvalid
  });
  return (
    <div className="form-floating mb-3 form-group">
      <input className={inputClassName} ref={forwardedRef} {...field} {...props}/>
      <label className="form-label" htmlFor={props.name}>{label}</label>
      {props.error ? (
         <div className="invalid-tooltip">{props.error}</div>
       ) : null}
    </div>
  );
};