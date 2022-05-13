import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

import formUtils from '../../../utils/forms';

const Input = ({ label, name, placeholder, type, value, handleChange, handleBlur, errors, touched }) => {
  return (
    <div className={formUtils.getInputWrapperClassName(value, touched, errors, name)}>
      {label && (
        <label htmlFor={label} className="form-group__label">
          {label}
        </label>
      )}
      <input
        autoComplete="false"
        type={type}
        name={name}
        className="form-group__control"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ErrorMessage name={name}>{errorMessage => <span className="help">{errorMessage}</span>}</ErrorMessage>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
  value: PropTypes.any.isRequired,
};

export default Input;
