import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Input from '../shared/input';
import Header from '../shared/header';
import Footer from '../shared/footer';
import Spinner from '../shared/spinner';
import images from '../../constants/image';
import withErrorFocus from '../hoc/withErrorFocus';
import VehicleForm from './vehicleForm/VehicleForm';
import ApplicantForm from './applicantForm/ApplicantForm';
import { accordionConfig } from '../../configs/accordion';
import EmploymentForm from './employmentForm/EmploymentForm';
import applicationForm from '../../constants/forms/application';
import InputWithMask from '../shared/inputWithMask/InputWithMask';
import employmentForm from '../../constants/forms/application/employment';
import { applicationPageText } from '../../constants/texts/applicationPage';

const ApplicationUI = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
  handleSubmit,
  addEmployer,
  removeEmployer,
  isLoading,
  isSubmitting,
  stateOptions,
  userData,
  setFieldValue,
  setFieldTouched,
  headerTitle,
  status,
}) => {
  const bannerImage = {
    backgroundImage: `url(${images.CAR3})`,
  };

  const applicationFormFields = {
    ...applicationForm.field,
  };

  const _getApplicationFormHeader = header => {
    return <h3>{header}</h3>;
  };

  return (
    <div>
      <Spinner isLoading={isLoading || isSubmitting} />
      <div>
        <Header fullName={userData.fullName} />
        <div className="banner" style={bannerImage}>
          <div className="banner__content">{headerTitle}</div>
        </div>
      </div>
      <div className="main">
        <form className="block-application bg-primary" autoComplete="off">
          <div className="row">
            <div className="col-md-12">
              <h2 className="text-center">{applicationPageText.TITLE}</h2>
              <div className="form-lg">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-5 ml-lg-32">
                    <div className="form-block">
                      <Collapsible
                        trigger={_getApplicationFormHeader(applicationPageText.WHO_I_AM)}
                        triggerTagName="div"
                        {...accordionConfig.formAccordion}>
                        <div className="form-block__content">
                          <ApplicantForm
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            errors={errors}
                            touched={touched}
                            status={status}
                            values={values.applicant}
                            stateOptions={stateOptions}
                          />
                        </div>
                      </Collapsible>
                    </div>
                    <div className="form-block">
                      <Collapsible
                        trigger={_getApplicationFormHeader(applicationPageText.HOW_I_GET_AROUND)}
                        triggerTagName="div"
                        {...accordionConfig.formAccordion}>
                        <div className="form-block__content">
                          <VehicleForm
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                            values={values.vehicle}
                          />
                        </div>
                      </Collapsible>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12 col-lg-5 ml-lg-120">
                    <Collapsible
                      trigger={_getApplicationFormHeader(applicationPageText.WHAT_I_DO)}
                      triggerTagName="div"
                      {...accordionConfig.formAccordion}>
                      <div className="form-block">
                        <TransitionGroup appear={true}>
                          {values.employment.map((item, index) => (
                            <CSSTransition key={item.uniqueId} timeout={250} classNames="block">
                              <div className="form-block__content block-employer">
                                <EmploymentForm
                                  employeeId={index}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  errors={errors}
                                  touched={touched}
                                  values={item}
                                  stateOptions={stateOptions}
                                />
                                {values.employment.length > 1 && (
                                  <div className="form-group">
                                    <button
                                      name="removeButton"
                                      type="button"
                                      className="btn btn--default--outline btn--icon mr-5"
                                      onClick={() => removeEmployer(index, item.idEmployer)}>
                                      {employmentForm.button.REMOVE_EMPLOYER}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </CSSTransition>
                          ))}
                        </TransitionGroup>
                      </div>

                      <div className="form-block">
                        <div className="form-block__content">
                          <div className="form-group">
                            <button
                              name="addEmployer"
                              type="button"
                              className="btn btn--default--outline btn--icon mr-5"
                              onClick={addEmployer}>
                              <i className="fa fa-plus-circle" aria-hidden="true"></i>
                              {applicationForm.button.ADD_EMPLOYER}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="form-block">
                        <div className="form-block__content">
                          <div className="form-group">
                            <span className="help" style={{ fontSize: '16px' }}>
                              {applicationPageText.OTHER_INCOME_HINT}
                            </span>
                          </div>

                          <div className="row">
                            <div className="col-md-12">
                              <Input
                                label={applicationFormFields.sourceOfOtherIncome.LABEL}
                                name={`sourceOfOtherIncome`}
                                placeholder={applicationFormFields.sourceOfOtherIncome.PLACEHOLDER}
                                type={applicationFormFields.sourceOfOtherIncome.TYPE}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                                value={values.sourceOfOtherIncome}
                              />
                            </div>
                            <div className="col-md-12">
                              <InputWithMask
                                label={applicationFormFields.totalOtherIncome.LABEL}
                                name={`totalOtherIncome`}
                                placeholder={applicationFormFields.totalOtherIncome.PLACEHOLDER}
                                mask={applicationFormFields.totalOtherIncome.MASK}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                                value={values.totalOtherIncome}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Collapsible>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group text-center mt-68 mb-28">
                <input
                  name="submit"
                  type="submit"
                  className="btn btn--primary btn--lg mr-5 btn-application"
                  onClick={handleSubmit}
                  value={applicationForm.button.SUBMIT}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

ApplicationUI.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  addEmployer: PropTypes.func.isRequired,
  removeEmployer: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  stateOptions: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired,
};

export default withErrorFocus(ApplicationUI);
