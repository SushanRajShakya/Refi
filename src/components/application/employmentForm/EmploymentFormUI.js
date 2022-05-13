import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../shared/input';
import Dropdown from '../../shared/dropdown';
import applicationForm from '../../../constants/forms/application';
import InputWithMask from '../../shared/inputWithMask/InputWithMask';
import YearAndMonthDropdown from '../../shared/dropdown/yearAndMonth';
import { payPeriodOptions } from '../../../constants/dropdowns/payPeriod';
import { employmentTypeOptions } from '../../../constants/dropdowns/employementType';

const EmploymentFormUI = ({ employeeId, handleChange, handleBlur, errors, touched, values, stateOptions }) => {
  const employmentFormField = applicationForm.employment.field;

  return (
    <div>
      <Input
        label={employmentFormField.employer.LABEL}
        name={`employment[${employeeId}].employer`}
        placeholder={employmentFormField.employer.PLACEHOLDER}
        type={employmentFormField.employer.TYPE}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.employer}
      />

      <Input
        label={employmentFormField.jobTitle.LABEL}
        name={`employment[${employeeId}].jobTitle`}
        placeholder={employmentFormField.jobTitle.PLACEHOLDER}
        type={employmentFormField.jobTitle.TYPE}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.jobTitle}
      />

      <Input
        label={employmentFormField.contactName.LABEL}
        name={`employment[${employeeId}].contactName`}
        placeholder={employmentFormField.contactName.PLACEHOLDER}
        type={employmentFormField.contactName.TYPE}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.contactName}
      />

      <InputWithMask
        label={employmentFormField.contactPhone.LABEL}
        name={`employment[${employeeId}].contactPhone`}
        placeholder={employmentFormField.contactPhone.PLACEHOLDER}
        mask={employmentFormField.contactPhone.MASK}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.contactPhone}
      />

      <div className="row">
        <div className="col-md-5">
          <Dropdown
            label={employmentFormField.employmentType.LABEL}
            name={`employment[${employeeId}].employmentType`}
            placeholder={employmentFormField.employmentType.PLACEHOLDER}
            type={employmentFormField.employmentType.TYPE}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.employmentType}
            options={employmentTypeOptions}
          />
        </div>
        <div className="col-md-3">
          <InputWithMask
            label={employmentFormField.income.LABEL}
            name={`employment[${employeeId}].income`}
            placeholder={employmentFormField.income.PLACEHOLDER}
            mask={employmentFormField.income.MASK}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.income}
          />
        </div>
        <div className="col-md-4">
          <Dropdown
            label={employmentFormField.payPeriod.LABEL}
            name={`employment[${employeeId}].payPeriod`}
            placeholder={employmentFormField.payPeriod.PLACEHOLDER}
            type={employmentFormField.payPeriod.TYPE}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.payPeriod}
            options={payPeriodOptions}
          />
        </div>
      </div>
      <Input
        label={employmentFormField.address.LABEL}
        name={`employment[${employeeId}].address`}
        placeholder={employmentFormField.address.PLACEHOLDER}
        type={employmentFormField.address.TYPE}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.address}
      />
      <Input
        label={employmentFormField.address2.LABEL}
        name={`employment[${employeeId}].address2`}
        placeholder={employmentFormField.address2.PLACEHOLDER}
        type={employmentFormField.address2.TYPE}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.address2}
      />
      <div className="row">
        <div className="col-md-5">
          <Input
            label={employmentFormField.city.LABEL}
            name={`employment[${employeeId}].city`}
            placeholder={employmentFormField.city.PLACEHOLDER}
            type={employmentFormField.city.TYPE}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.city}
          />
        </div>
        <div className="col-md-3">
          <Dropdown
            label={employmentFormField.state.LABEL}
            name={`employment[${employeeId}].state`}
            placeholder={employmentFormField.state.PLACEHOLDER}
            type={employmentFormField.state.TYPE}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.state}
            options={stateOptions}
          />
        </div>
        <div className="col-md-4">
          <InputWithMask
            label={employmentFormField.zip.LABEL}
            name={`employment[${employeeId}].zip`}
            placeholder={employmentFormField.zip.PLACEHOLDER}
            mask={employmentFormField.zip.MASK}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.zip}
          />
        </div>
      </div>
      <YearAndMonthDropdown
        label={employmentFormField.work.LABEL}
        year={{
          name: `employment[${employeeId}].workedYear`,
          placeholder: employmentFormField.work.workedYear.PLACEHOLDER,
          value: values.workedYear,
        }}
        month={{
          name: `employment[${employeeId}].workedMonth`,
          placeholder: employmentFormField.work.workedMonth.PLACEHOLDER,
          value: values.workedMonth,
        }}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
    </div>
  );
};

EmploymentFormUI.propTypes = {
  employeeId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  stateOptions: PropTypes.array.isRequired,
};

export default EmploymentFormUI;
