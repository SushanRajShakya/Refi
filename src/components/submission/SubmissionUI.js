import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import MaskedInput from 'react-text-mask';

import Header from '../shared/header';
import Footer from '../shared/footer';
import Spinner from '../shared/spinner';
import formUtils from '../../utils/forms';
import images from '../../constants/image';
import userService from '../../services/user';
import withErrorFocus from '../hoc/withErrorFocus';
import submissionForm from '../../constants/forms/submission';
import { submissionPageText } from '../../constants/texts/submissionPage';

const SubmissionUI = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isLoading,
  isSubmitting,
  isFormSubmitted,
  userData,
}) => {
  const bannerImage = {
    backgroundImage: `url(${images.CAR4})`,
  };
  const firstName = userService.getFirstName(userData.fullName);

  const _getSubmissionForm = () => (
    <form className="content-xs text-left">
      <div
        className={`${formUtils.getInputWrapperClassName(
          values.phone,
          touched,
          errors,
          'phone'
        )} ${formUtils.getInputWrapperClassName(values.primaryContact, touched, errors, 'primaryContact')}`}>
        <div className="row">
          <div className="col-2 col-md-1">
            <div className="form-group radio-square mt-24">
              <input
                type="radio"
                name={'primaryContact'}
                value={submissionForm.primaryContact.PHONE}
                checked={values.primaryContact === submissionForm.primaryContact.PHONE}
                className="form-group__radio mr-10"
                onBlur={handleBlur}
                id="radio1"
                onChange={handleChange}></input>
              <label htmlFor="radio1" className="form-group__label form-group__label--nomargin"></label>
            </div>
          </div>
          <div className="col-10 col-md-10">
            <label className="form-group__label">{submissionForm.field.phone.LABEL}</label>
            <MaskedInput
              guide={false}
              type="text"
              className="form-group__control"
              name={'phone'}
              placeholder={submissionForm.field.phone.PLACEHOLDER}
              value={values.phone}
              mask={submissionForm.field.phone.MASK}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={true}
            />
            <ErrorMessage name={'phone'}>{errorMessage => <span className="help">{errorMessage}</span>}</ErrorMessage>
            <ErrorMessage name={'primaryContact'}>
              {errorMessage => <span className="help">{errorMessage}</span>}
            </ErrorMessage>
          </div>
        </div>
      </div>
      <div
        className={`${formUtils.getInputWrapperClassName(
          values.email,
          touched,
          errors,
          'email'
        )} ${formUtils.getInputWrapperClassName(values.primaryContact, touched, errors, 'primaryContact')}`}>
        <div className="row">
          <div className="col-2 col-md-1">
            <div className="form-group radio-square mt-24">
              <input
                type="radio"
                name={'primaryContact'}
                value={submissionForm.primaryContact.EMAIL}
                checked={values.primaryContact === submissionForm.primaryContact.EMAIL}
                className="form-group__radio mr-10"
                onBlur={handleBlur}
                id="radio2"
                onChange={handleChange}></input>
              <label htmlFor="radio2" className="form-group__label form-group__label--nomargin"></label>
            </div>
          </div>
          <div className="col-10 col-md-10">
            <label className="form-group__label">{submissionForm.field.email.LABEL}</label>
            <input
              type="text"
              className="form-group__control"
              name={'email'}
              placeholder={submissionForm.field.email.PLACEHOLDER}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={true}
            />
            <ErrorMessage name={'email'}>{errorMessage => <span className="help">{errorMessage}</span>}</ErrorMessage>
            <ErrorMessage name={'primaryContact'}>
              {errorMessage => <span className="help">{errorMessage}</span>}
            </ErrorMessage>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group text-center mt-68">
            <input
              name="submit"
              type="submit"
              className="btn btn--primary btn--lg mr-5 btn-submission"
              onClick={handleSubmit}
              value={submissionForm.button.SUBMIT}
            />
          </div>
        </div>
      </div>
    </form>
  );

  const _getSubmissionBlockDescription = () => {
    if (isFormSubmitted) {
      return <h2>{submissionPageText.submittedBlock.CONTACT}</h2>;
    } else {
      return <h2>{submissionPageText.DESCRIPTION}</h2>;
    }
  };

  return (
    <div>
      <Spinner isLoading={isLoading || isSubmitting} />
      <div>
        <Header fullName={userData.fullName} />
        <div className="banner" style={bannerImage}></div>
      </div>
      <div className="main">
        <div className="content-narrow bg-primary">
          <div className="text-center text-uppercase pt-68">
            <h1>
              {isFormSubmitted
                ? submissionPageText.submittedBlock.TITLE(firstName)
                : submissionPageText.TITLE(firstName)}
            </h1>
          </div>
          <div className="row mb-68">
            <div className="col-md-12 text-center">{_getSubmissionBlockDescription()}</div>
          </div>
          <div className="row mb-8">
            <div className="col-md-12">
              <div className="text-center">
                <h3>{!isFormSubmitted && submissionPageText.QUESTION}</h3>
              </div>
            </div>
          </div>
          {!isFormSubmitted && _getSubmissionForm()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

SubmissionUI.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isFormSubmitted: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

export default withErrorFocus(SubmissionUI);
