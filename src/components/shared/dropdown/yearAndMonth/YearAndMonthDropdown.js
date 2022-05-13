import React from 'react';
import PropTypes from 'prop-types';

import { ErrorMessage } from 'formik';
import formUtils from '../../../../utils/forms';

/**
 * Form Group with both year and month dropdowns configured together.
 *
 * @param {object} props
 */
const YearAndMonthDropdown = ({ label, year, month, handleChange, handleBlur, errors, touched }) => {
  return (
    <div
      className={`${formUtils.getInputWrapperClassName(
        year.value,
        touched,
        errors,
        year.name
      )} ${formUtils.getInputWrapperClassName(month.value, touched, errors, month.name)}`}>
      {label && (
        <label htmlFor={label} className="form-group__label">
          {label}
        </label>
      )}

      <div className="row">
        <div className="col-6 col-sm-6 col-md-4">
          <select
            name={year.name}
            className="form-group__control"
            onChange={handleChange}
            onBlur={handleBlur}
            value={year.value}>
            <option value="">{year.placeholder}</option>
            <option value="0">0 years</option>
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
            <option value="6">6 years</option>
            <option value="7">7 years</option>
            <option value="8">8 years</option>
            <option value="9">9 years</option>
            <option value="10">10 years</option>
            <option value="11">More than 10 years</option>
          </select>
        </div>
        <div className="col-6 col-sm-6 col-md-4">
          <select
            name={month.name}
            className="form-group__control"
            onChange={handleChange}
            onBlur={handleBlur}
            value={month.value}>
            <option value="">{month.placeholder}</option>
            <option value="0">0 months</option>
            <option value="1">1 month</option>
            <option value="2">2 months</option>
            <option value="3">3 months</option>
            <option value="4">4 months</option>
            <option value="5">5 months</option>
            <option value="6">6 months</option>
            <option value="7">7 months</option>
            <option value="8">8 months</option>
            <option value="9">9 months</option>
            <option value="10">10 months</option>
            <option value="11">11 months</option>
          </select>
        </div>
      </div>

      <ErrorMessage name={year.name}>{errorMessage => <span className="help">{errorMessage}</span>}</ErrorMessage>
      <ErrorMessage name={month.name}>{errorMessage => <span className="help">{errorMessage}</span>}</ErrorMessage>
    </div>
  );
};

YearAndMonthDropdown.propTypes = {
  label: PropTypes.string,
  year: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  }).isRequired,
  month: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  }).isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
};

export default YearAndMonthDropdown;
