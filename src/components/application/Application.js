import React from 'react';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import _isEmpty from 'lodash.isempty';

import toastUtils from '../../utils/toast';
import ApplicationUI from './ApplicationUI';
import userService from '../../services/user';
import { setIsCompleted } from '../../action/user';
import dropdownService from '../../services/dropdown';
import { setDocumentTitle } from '../../utils/general';
import { storeStateOptions } from '../../action/options';
import verifyOfferStatus from '../hoc/verifyOfferStatus';
import withSsnVerification from '../hoc/withSsnVerification';
import applicationFormSchema from '../../schema/appliationForm';
import applicationForm from '../../constants/forms/application';
import applicationFormService from '../../services/forms/application';
import { errorMessage, successMessage } from '../../constants/message';
import { applicationPageText } from '../../constants/texts/applicationPage';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };

    this.isFetchingStateOptions = false;
    this.isFetchingFormData = false;
    this.headerTitle = '';
  }

  componentDidUpdate = () => {
    this._verifyFormStatus();
  };

  componentDidMount = () => {
    setDocumentTitle(applicationPageText.DOCUMENT_TITLE);
    this.headerTitle = successMessage.VALIDATION_SUCCESS(userService.getFirstName(this.props.userData.fullName));
    this._initializeApplicationForm();
    this._getStateOptions();
  };

  render = () => {
    const { isLoading } = this.state;
    const { stateOptions } = this.props;

    return (
      <ApplicationUI
        {...this.props}
        headerTitle={this.headerTitle}
        isLoading={isLoading}
        addEmployer={this.addEmployer}
        removeEmployer={this.removeEmployer}
        stateOptions={stateOptions}
        setIsCompleted={this.setIsCompleted}
      />
    );
  };

  /**
   * Set state isLoading for the loader.
   *
   * @param {boolean} value
   */
  _setIsLoading = (value = true) => {
    this.setState({
      isLoading: value,
    });
  };

  /**
   * Add an employer section in the application form.
   */
  addEmployer = () => {
    const { values } = this.props;

    values.employment.push(applicationFormService.getEmploymentFormInitialValues());

    this.props.setValues(values);
  };

  /**
   * Remove employer from backend if stored in backend or else remove from just the frontend.
   *
   * @param {number} employerIndex
   * @param {strings} employerId
   */
  removeEmployer = async (employerIndex, employerId) => {
    this._setIsLoading();
    try {
      await applicationFormService.removeEmployer(employerId);

      const { values } = this.props;

      values.employment.splice(employerIndex, 1);

      this.props.setValues(values);
    } catch (err) {
      toastUtils.displayError(errorMessage.applicationForm.REMOVING_EMPLOYER);
    } finally {
      this._setIsLoading(false);
    }
  };

  /**
   * Pre-fill the application form based on the values received from the backend.
   */
  _initializeApplicationForm = async () => {
    this._setIsLoading();
    this.isFetchingFormData = true;
    try {
      const applicationFormValues = await applicationFormService.populateForm();

      this.props.setValues(applicationFormValues);
    } catch (err) {
      toastUtils.displayError(err.error);
    } finally {
      this.isFetchingFormData = false;
      !this.isFetchingStateOptions && this._setIsLoading(false);
    }
  };

  /**
   * Verify whether the form submission has been successful or not.
   * Update the form values if submission unsuccessfull to update the latest IDs for the applicant, employer and vehicle detail.
   */
  _verifyFormStatus = () => {
    const { status, setStatus } = this.props;

    if (status && status.submissionFailed) {
      setStatus(null);
      this._initializeApplicationForm();
    }
  };

  /**
   * Gets state options from REDUX if present or fetches it from the backend.
   */
  _getStateOptions = async () => {
    const { stateOptions, storeStateOptions } = this.props;

    if (_isEmpty(stateOptions)) {
      this._setIsLoading();
      this.isFetchingStateOptions = true;
      try {
        const result = await dropdownService.getStateOptions();

        storeStateOptions(result);
      } catch (err) {
        toastUtils.displayError(err);
      } finally {
        this.isFetchingStateOptions = false;
        !this.isFetchingFormData && this._setIsLoading(false);
      }
    }
  };
}

const mapStateToProps = state => ({
  stateOptions: state.options.states,
});

const mapDispatchToProps = dispatch => ({
  storeStateOptions: options => dispatch(storeStateOptions(options)),
  setIsCompleted: value => dispatch(setIsCompleted(value)),
});

/* eslint-disable */
export default verifyOfferStatus(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    withSsnVerification(
      withFormik({
        displayName: applicationForm.name,
        enableReinitialize: true,
        mapPropsToValues: props => applicationForm.initialValues,
        validationSchema: applicationFormSchema,
        handleSubmit: applicationFormService.handleSubmit,
      })(Application)
    )
  )
);
/* eslint-enable */
