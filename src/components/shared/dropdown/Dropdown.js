import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

import formUtils from '../../../utils/forms';

/**
 * Common single dropdown component.
 *
 * @param {object} props
 */
const Dropdown = ({ label, name, placeholder, value, handleChange, handleBlur, errors, touched, options }) => {
  return (
    <div className={formUtils.getInputWrapperClassName(value, touched, errors, name)}>
      {label && (
        <label htmlFor={label} className="form-group__label">
          {label}
        </label>
      )}

      <select name={name} className="form-group__control" onChange={handleChange} onBlur={handleBlur} value={value}>
        <option value="">{placeholder}</option>
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <ErrorMessage name={name}>{errorMessage => <span className="help">{errorMessage}</span>}</ErrorMessage>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object,
  options: PropTypes.array,
  touched: PropTypes.object,
  value: PropTypes.string.isRequired,
};

export default Dropdown;
