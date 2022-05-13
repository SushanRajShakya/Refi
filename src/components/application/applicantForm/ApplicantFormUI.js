import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../shared/input';
import Dropdown from '../../shared/dropdown';
import MaskedSsn from '../../shared/maskedSsn';
import MaskedDob from '../../shared/maskedDob';
import applicationForm from '../../../constants/forms/application';
import InputWithMask from '../../shared/inputWithMask/InputWithMask';
import YearAndMonthDropdown from '../../shared/dropdown/yearAndMonth';
import applicationFormService from '../../../services/forms/application';
import { applicationPageText } from '../../../constants/texts/applicationPage';
import { residentialStatusOptions } from '../../../constants/dropdowns/residentialStatus';

const ApplicantFormUI = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
  stateOptions,
  setFieldValue,
  setFieldTouched,
  status,
}) => {
  const applicantFormField = {
    ...applicationForm.applicant.field,
  };

  const getPreviousAddressFormFields = () => (
    <React.Fragment>
      <div className="form-group">
        <span className="help">{applicationForm.errors.MIN_HOUSING_HISTORY}</span>
      </div>

      <div className="form-group">{applicationPageText.PREVIOUS_ADDRESS}</div>

      <Input
        label={applicantFormField.prevAddress.LABEL}
        name={`applicant.prevAddress`}
        placeholder={applicantFormField.prevAddress.PLACEHOLDER}
        type={applicantFormField.prevAddress.TYPE}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.prevAddress}
      />

      <Input
        label={applicantFormField.prevAddress2.LABEL}
        name={`applicant.prevAddress2`}
        placeholder={applicantFormField.prevAddress2.PLACEHOLDER}
        type={applicantFormField.prevAddress2.TYPE}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.prevAddress2}
      />

      <div className="row">
        <div className="col-md-5">
          <Input
            label={applicantFormField.prevCity.LABEL}
            name={`applicant.prevCity`}
            placeholder={applicantFormField.prevCity.PLACEHOLDER}
            type={applicantFormField.prevCity.TYPE}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.prevCity}
          />
        </div>

        <div className="col-md-3">
          <Dropdown
            label={applicantFormField.prevState.LABEL}
            name={`applicant.prevState`}
            placeholder={applicantFormField.prevState.PLACEHOLDER}
            type={applicantFormField.prevState.TYPE}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.prevState}
            options={stateOptions}
          />
        </div>

        <div className="col-md-4">
          <InputWithMask
            label={applicantFormField.prevZip.LABEL}
            name={`applicant.prevZip`}
            placeholder={applicantFormField.prevZip.PLACEHOLDER}
            mask={applicantFormField.prevZip.MASK}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.prevZip}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <Dropdown
            label={applicantFormField.prevResidentialStatus.LABEL}
            name={`applicant.prevResidentialStatus`}
            placeholder={applicantFormField.prevResidentialStatus.PLACEHOLDER}
            type={applicantFormField.prevResidentialStatus.TYPE}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.prevResidentialStatus}
            options={residentialStatusOptions}
          />
        </div>
        <div className="col-md-7">
          <InputWithMask
            label={applicantFormField.prevRentMortgagePerMonth.LABEL}
            name={`applicant.prevRentMortgagePerMonth`}
            placeholder={applicantFormField.prevRentMortgagePerMonth.PLACEHOLDER}
            mask={applicantFormField.prevRentMortgagePerMonth.MASK}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.prevRentMortgagePerMonth}
          />
        </div>
      </div>

      <YearAndMonthDropdown
        label={applicantFormField.prevResidence.LABEL}
        year={{
          name: `applicant.prevResidenceYear`,
          placeholder: applicantFormField.prevResidence.year.PLACEHOLDER,
          value: values.prevResidenceYear,
        }}
        month={{
          name: `applicant.prevResidenceMonth`,
          placeholder: applicantFormField.prevResidence.month.PLACEHOLDER,
          value: values.prevResidenceMonth,
        }}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-4">
              <Input
                label={applicantFormField.firstName.LABEL}
                name={`applicant.firstName`}
                placeholder={applicantFormField.firstName.PLACEHOLDER}
                type={applicantFormField.firstName.TYPE}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                value={values.firstName}
              />
            </div>
            <div className="col-md-4">
              <Input
                label={applicantFormField.middleName.LABEL}
                name={`applicant.middleName`}
                placeholder={applicantFormField.middleName.PLACEHOLDER}
                type={applicantFormField.middleName.TYPE}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                value={values.middleName}
              />
            </div>
            <div className="col-md-4">
              <Input
                label={applicantFormField.lastName.LABEL}
                name={`applicant.lastName`}
                placeholder={applicantFormField.lastName.PLACEHOLDER}
                type={applicantFormField.lastName.TYPE}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                value={values.lastName}
              />
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <Input
            label={applicantFormField.suffix.LABEL}
            name={`applicant.suffix`}
            placeholder={applicantFormField.suffix.PLACEHOLDER}
            type={applicantFormField.suffix.TYPE}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.suffix}
          />
        </div>
      </div>

      <InputWithMask
        label={applicantFormField.phone.LABEL}
        name={`applicant.phone`}
        placeholder={applicantFormField.phone.PLACEHOLDER}
        mask={applicantFormField.phone.MASK}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.phone}
      />

      <Input
        label={applicantFormField.email.LABEL}
        name={`applicant.email`}
        placeholder={applicantFormField.email.PLACEHOLDER}
        type={applicantFormField.email.TYPE}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.email}
      />

      <div className="row">
        <div className="col-sm-12 col-md-6">
          <MaskedSsn
            label={applicantFormField.ssn.LABEL}
            name={`applicant.ssn`}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            errors={errors}
            touched={touched}
            value={values.ssn}
            status={status}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <MaskedDob
            label={applicantFormField.dob.LABEL}
            name={`applicant.dob`}
            status={status}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            errors={errors}
            touched={touched}
            value={values.dob}
          />
        </div>
      </div>

      <Input
        label={applicantFormField.address.LABEL}
        name={`applicant.address`}
        placeholder={applicantFormField.address.PLACEHOLDER}
        type={applicantFormField.address.TYPE}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.address}
      />

      <Input
        label={applicantFormField.address2.LABEL}
        name={`applicant.address2`}
        placeholder={applicantFormField.address2.PLACEHOLDER}
        type={applicantFormField.address2.TYPE}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        value={values.address2}
      />

      <div className="row">
        <div className="col-md-5">
          <Input
            label={applicantFormField.city.LABEL}
            name={`applicant.city`}
            placeholder={applicantFormField.city.PLACEHOLDER}
            type={applicantFormField.city.TYPE}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.city}
          />
        </div>

        <div className="col-md-3">
          <Dropdown
            label={applicantFormField.state.LABEL}
            name={`applicant.state`}
            placeholder={applicantFormField.state.PLACEHOLDER}
            type={applicantFormField.state.TYPE}
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
            label={applicantFormField.zip.LABEL}
            name={`applicant.zip`}
            placeholder={applicantFormField.zip.PLACEHOLDER}
            mask={applicantFormField.zip.MASK}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.zip}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <Dropdown
            label={applicantFormField.residentialStatus.LABEL}
            name={`applicant.residentialStatus`}
            placeholder={applicantFormField.residentialStatus.PLACEHOLDER}
            type={applicantFormField.residentialStatus.TYPE}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.residentialStatus}
            options={residentialStatusOptions}
          />
        </div>
        <div className="col-md-7">
          <InputWithMask
            label={applicantFormField.rentMortgagePerMonth.LABEL}
            name={`applicant.rentMortgagePerMonth`}
            placeholder={applicantFormField.rentMortgagePerMonth.PLACEHOLDER}
            mask={applicantFormField.rentMortgagePerMonth.MASK}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            value={values.rentMortgagePerMonth}
          />
        </div>
      </div>

      <div className="form-group">
        <YearAndMonthDropdown
          label={applicantFormField.residence.LABEL}
          year={{
            name: `applicant.residenceYear`,
            placeholder: applicantFormField.residence.year.PLACEHOLDER,
            value: values.residenceYear,
          }}
          month={{
            name: `applicant.residenceMonth`,
            placeholder: applicantFormField.residence.month.PLACEHOLDER,
            value: values.residenceMonth,
          }}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
      </div>
      {values.residenceMonth &&
        applicationFormService.calculateHousingHistory(values) < 12 &&
        getPreviousAddressFormFields()}
    </React.Fragment>
  );
};

ApplicantFormUI.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  stateOptions: PropTypes.array.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

export default ApplicantFormUI;
