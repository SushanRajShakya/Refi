import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import MaskedInput from 'react-text-mask';

import Header from '../shared/header';
import Footer from '../shared/footer';
import Spinner from '../shared/spinner';
import formUtils from '../../utils/forms';
import images from '../../constants/image';
import withErrorFocus from '../hoc/withErrorFocus';
import verificationForm from '../../constants/forms/verification';
import { verificationPageText } from '../../constants/texts/verificationPage';

const VerificationUI = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  userData,
}) => {
  const bannerImage = {
    backgroundImage: `url(${images.CAR2})`,
  };

  return (
    <div>
      <Spinner isLoading={isSubmitting} />
      <div>
        <Header fullName={userData.fullName} />
        <div className="banner" style={bannerImage}></div>
      </div>
      <div className="main">
        <div className="block-verification bg-primary">
          <div className="row m-0">
            <div className="col-md-12 block-verification__content text-center">
              <h2 className="text-center">
                {verificationPageText.TITLE}
                {userData.fullName}
              </h2>
              <form className="form-sm" autoComplete="off">
                <div
                  className={`${formUtils.getInputWrapperClassName(values.ssn, touched, errors, 'ssn')} form-group-sm`}>
                  <label
                    htmlFor={verificationForm.field.ssn.LABEL}
                    className="form-group__label form-group__label--text-lg">
                    {verificationForm.field.ssn.LABEL}
                  </label>
                  <div className="form-group-wrap">
                    <span>{verificationForm.field.ssn.PRE_TEXT}</span>
                    <MaskedInput
                      guide={false}
                      type="password"
                      name={'ssn'}
                      className="form-group__control"
                      placeholder={verificationForm.field.ssn.PLACEHOLDER}
                      value={values.ssn}
                      mask={verificationForm.field.ssn.MASK}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <ErrorMessage name={'ssn'}>
                    {errorMessage => <span className="help">{errorMessage}</span>}
                  </ErrorMessage>
                </div>
                <div
                  className={`${formUtils.getInputWrapperClassName(
                    values.dobMonth,
                    touched,
                    errors,
                    'dobMonth'
                  )} form-group-sm form-group-dob ${formUtils.getInputWrapperClassName(
                    values.dobDay,
                    touched,
                    errors,
                    'dobDay'
                  )}`}>
                  <label htmlFor="input1" className="form-group__label form-group__label--text-lg">
                    {verificationForm.field.dob.LABEL}
                  </label>
                  <div className="form-group-wrap">
                    <MaskedInput
                      guide={false}
                      type="password"
                      className="form-group__control"
                      name={'dobMonth'}
                      placeholder={verificationForm.field.dob.month.PLACEHOLDER}
                      value={values.dobMonth}
                      mask={verificationForm.field.dob.month.MASK}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <MaskedInput
                      guide={false}
                      type="password"
                      className="form-group__control"
                      name={'dobDay'}
                      placeholder={verificationForm.field.dob.day.PLACEHOLDER}
                      value={values.dobDay}
                      mask={verificationForm.field.dob.day.MASK}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span>{verificationForm.field.dob.POST_TEXT}</span>
                  </div>
                  <ErrorMessage name={'dobMonth'}>
                    {errorMessage => <span className="help">{errorMessage}</span>}
                  </ErrorMessage>
                  <ErrorMessage name={'dobDay'}>
                    {errorMessage => <span className="help">{errorMessage}</span>}
                  </ErrorMessage>
                </div>
                <div className="form-group text-center mt-68">
                  <input
                    name="submit"
                    type="submit"
                    className="btn btn--primary btn--lg mr-5 btn-verification"
                    disabled={isSubmitting}
                    value={verificationForm.button.NEXT}
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

VerificationUI.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

export default withErrorFocus(VerificationUI);
