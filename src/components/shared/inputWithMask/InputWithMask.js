import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import MaskedInput from 'react-text-mask';

import formUtils from '../../../utils/forms';

const InputWithMask = ({
  label,
  name,
  placeholder,
  mask,
  value,
  handleChange,
  handleBlur,
  errors,
  touched,
  textTransform,
}) => {
  const style = formUtils.getTextTransformStyle(textTransform);

  return (
    <div className={formUtils.getInputWrapperClassName(value, touched, errors, name)}>
      {label && (
        <label htmlFor={label} className="form-group__label">
          {label}
        </label>
      )}
      <MaskedInput
        style={style}
        guide={false}
        type="text"
        name={name}
        className="form-group__control"
        placeholder={placeholder}
        value={value}
        mask={mask}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ErrorMessage name={name}>{errorMessage => <span className="help">{errorMessage}</span>}</ErrorMessage>
    </div>
  );
};

InputWithMask.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  mask: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  textTransform: PropTypes.string,
};

export default InputWithMask;
