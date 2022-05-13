import React from 'react';
import _get from 'lodash.get';
import { withFormik } from 'formik';
import _isEmpty from 'lodash.isempty';
import { withRouter, Redirect } from 'react-router-dom';

import SubmissionUI from './SubmissionUI';
import toastUtils from '../../utils/toast';
import withUserData from '../hoc/withUserData';
import { routes } from '../../constants/routes';
import { setDocumentTitle } from '../../utils/general';
import submissionForm from '../../constants/forms/submission';
import submissionFormSchema from '../../schema/submissionForm';
import submissionFormService from '../../services/forms/submission';
import { submissionPageText } from '../../constants/texts/submissionPage';

class Submission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isFormSubmitted: false,
    };
  }

  componentDidMount = () => {
    setDocumentTitle(submissionPageText.DOCUMENT_TITLE);
    this._initializeSubmissionForm();
  };

  render = () => {
    const { isLoading, isFormSubmitted } = this.state;
    const { userData } = this.props;
    const isCompleted = _get(userData, 'isCompleted', false);

    return isCompleted ? (
      <SubmissionUI
        {...this.props}
        isLoading={isLoading}
        isFormSubmitted={isFormSubmitted}
        setFormSubmissionFlag={this.setFormSubmissionFlag}
      />
    ) : (
      <Redirect to={routes.APPLICATION} />
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
   * Set state for isFormSubmitted Flag to allow or prevent the form to be submitted.
   *
   * @param {boolean} value
   */
  setFormSubmissionFlag = value => {
    this.setState({
      isFormSubmitted: value,
    });
  };

  /**
   * Initialize the submission formik values with the values from the backend.
   */
  _initializeSubmissionForm = async () => {
    const { userData } = this.props;

    if (userData && userData.isCompleted) {
      this._setIsLoading();
      try {
        const result = await submissionFormService.getSubmissionFormValues();

        this.props.setValues(result);
        this.setFormSubmissionFlag(!_isEmpty(result.primaryContact));
      } catch (err) {
        toastUtils.displayError(err);
      } finally {
        this._setIsLoading(false);
      }
    }
  };
}

/* eslint-disable */
export default withUserData(
  withFormik({
    displayName: submissionForm.name,
    enableReinitialize: true,
    mapPropsToValues: props => submissionForm.initialValues,
    validationSchema: submissionFormSchema,
    handleSubmit: submissionFormService.handleSubmit,
  })(withRouter(Submission))
);
/* eslint-enable */
