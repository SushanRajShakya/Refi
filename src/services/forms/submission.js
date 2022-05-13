import _get from 'lodash.get';
import _toString from 'lodash.tostring';
import { conformToMask } from 'react-text-mask';

import userService from '../user';
import networkService from '../network';
import toastUtils from '../../utils/toast';
import { mask } from '../../constants/mask';
import { routes } from '../../constants/routes';
import { userKeys } from '../../constants/keys/user';
import { errorMessage } from '../../constants/message';
import { apiEndPoint } from '../../configs/apiEndpoint';
import { httpConstants } from '../../constants/network';
import { kissmetrics } from '../../constants/texts/common';
import submissionForm from '../../constants/forms/submission';
import { submissionFormKeys } from '../../constants/keys/submissionForm';

/**
 * Prepare the required body from the formik values and save the primary contact in the backend.
 *
 * @param {object} values
 * @param {object} formikBag
 */
const handleSubmit = async (values, formikBag) => {
  const { setSubmitting, props } = formikBag;
  const url = `${apiEndPoint.savePrimaryContact}`;
  const postBody = {
    [userKeys.DM_CUSTOMER_ID]: userService.getUserData(userKeys.DM_CUSTOMER_ID),
    [submissionFormKeys.PHONE]: values.primaryContact === submissionForm.primaryContact.PHONE ? 1 : 0,
    [submissionFormKeys.EMAIL]: values.primaryContact === submissionForm.primaryContact.EMAIL ? 1 : 0,
  };

  try {
    await networkService.makeRequest(url, httpConstants.requestMethods.POST, postBody);
    window._kmq.push([
      'record',
      kissmetrics.CLICK_SUBMISSION,
      { Hostname: document.location.hostname, 'Visit Site': window.location.pathname + window.location.search },
    ]);

    props.history.push(routes.APPLICATION);
  } catch (err) {
    toastUtils.displayError(errorMessage.submissionForm.SUBMITTING_APPLICATION_FORM);
  } finally {
    setSubmitting(false);
  }
};

/**
 * Get the primary contact along with details of phone and email.
 */
const getSubmissionFormValues = async () => {
  const url = `${apiEndPoint.getPrimaryContact}${userService.getUserData(userKeys.DM_CUSTOMER_ID)}${
    httpConstants.DEFAULT_LIMIT
  }`;

  try {
    const result = await networkService.makeRequest(url, httpConstants.requestMethods.GET);
    const data = _get(result, 'data.items[0]', null);

    return Promise.resolve(data ? submissionFormService.prepareSubmissionFormValues(data) : {});
  } catch (err) {
    return Promise.reject(errorMessage.submissionForm.FETCHING_SUBMISSION_FORM);
  }
};

/**
 * Returns an object which maps to the formik values for Submission form.
 *
 * @param {object} data
 */
const prepareSubmissionFormValues = data => ({
  phone: conformToMask(_toString(data[submissionFormKeys.PHONE]), mask.PHONE).conformedValue,
  primaryContact: _toString(data[submissionFormKeys.PRIMARY_CONTACT]),
  email: _toString(data[submissionFormKeys.EMAIL]),
});

const submissionFormService = {
  handleSubmit,
  getSubmissionFormValues,
  prepareSubmissionFormValues,
};

export default submissionFormService;
