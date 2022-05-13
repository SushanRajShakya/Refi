import userService from '../user';
import networkService from '../network';
import toastUtils from '../../utils/toast';
import { routes } from '../../constants/routes';
import { userKeys } from '../../constants/keys/user';
import { errorMessage } from '../../constants/message';
import { apiEndPoint } from '../../configs/apiEndpoint';
import { httpConstants } from '../../constants/network';
import { kissmetrics } from '../../constants/texts/common';

/**
 * Verifies whether the ssn and dob entered is valid or not.
 * Executes necessary operation based on the response from the server.
 *
 * @param {object} values
 * @param {object} formikBag
 */
const handleSubmit = async (values, formikBag) => {
  const { props, setSubmitting } = formikBag;

  const dmCustomerId = userService.getUserData(userKeys.DM_CUSTOMER_ID);
  const url = `${apiEndPoint.validateSsnDob}${dmCustomerId}/${values.ssn}/${values.dobMonth}/${values.dobDay}`;

  try {
    const result = await networkService.makeRequest(url, httpConstants.requestMethods.GET);

    userService.setVerifiedUserData({
      [userKeys.APPLICATION_ID]: result.data[userKeys.APPLICATION_ID],
      [userKeys.PROSPECT_ID]: result.data[userKeys.PROSPECT_ID],
    });

    window._kmq.push([
      'record',
      kissmetrics.CLICK_VERIFICATION,
      { Hostname: document.location.hostname, 'Visit Site': window.location.pathname + window.location.search },
    ]);

    toastUtils.dismissAll();
    props.history.push(routes.APPLICATION);
  } catch (error) {
    let message = errorMessage.VERIFYING_SSN_DOB;

    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }

    window._kmq.push([
      'record',
      kissmetrics.ERR_CLICK_VERIFICATION,
      {
        Hostname: document.location.hostname,
        'Visit Site': window.location.pathname + window.location.search,
        message: message,
      },
    ]);

    toastUtils.displayError(message, {
      autoClose: false,
    });
  } finally {
    setSubmitting(false);
  }
};

const verificationFormService = {
  handleSubmit,
};

export default verificationFormService;
