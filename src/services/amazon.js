import React from 'react';
import _get from 'lodash.get';

import userService from './user';
import modalService from './modal';
import networkService from './network';
import { unMask } from '../constants/mask';
import { unMaskString } from '../utils/general';
import { userKeys } from '../constants/keys/user';
import { errorMessage } from '../constants/message';
import { httpConstants } from '../constants/network';
import { apiEndPoint } from '../configs/apiEndpoint';
import { amazonKeys } from '../constants/keys/amazon';
import { kissmetrics } from '../constants/texts/common';
import RedeemedBlock from '../components/amazonGiftCard/redeemedBlock';

/**
 * Handle form submission for amazon gift code verification from the backend.
 * Generates the required message for the frontend to display based on the response from the server.
 *
 * @param {object} values
 * @param {object} formikBag
 */
const handleSubmit = async (values, formikBag) => {
  const UNPROCESSABLE_ENTITY_STATUS_CODE = 422;
  const url = `${apiEndPoint.validateAmazonCode}`;
  const { props, setSubmitting, setStatus } = formikBag;

  try {
    const reqBody = {
      [amazonKeys.DMCUSTOMER_ID]: userService.getUserData(userKeys.DM_CUSTOMER_ID),
      [amazonKeys.CODE]: values.code.toUpperCase(),
      [amazonKeys.EMAIL]: values.email,
      [amazonKeys.PHONE]: unMaskString(values.phone, unMask.numbers),
    };

    await networkService.makeRequest(url, httpConstants.requestMethods.POST, reqBody);
    window._kmq.push([
      'record',
      kissmetrics.CLICK_GIFTCARD,
      { Hostname: document.location.hostname, 'Visit Site': window.location.pathname + window.location.search },
    ]);

    props.setIsGiftCardRedeemed(true);
    props.setRedemptionEmail(values.email);

    const updatedProps = {
      ...props,
      userData: { ...props.userData, isGiftCardRedeemed: true, redemptionEmail: values.email },
    };

    modalService.openModal({
      content: <RedeemedBlock {...updatedProps} />,
      className: 'block-amazon-modal',
    });
  } catch (error) {
    const errorStatusCode = _get(error, 'response.status', null);

    let message = _get(error, 'response.data.message', errorMessage.amazonGiftCard.VALIDATING_CODE);

    if (errorStatusCode === UNPROCESSABLE_ENTITY_STATUS_CODE) {
      message = errorMessage.amazonGiftCard.UNPROCESSABLE_ENTITY;
    }

    window._kmq.push([
      'record',
      kissmetrics.ERR_GIFTCARD,
      {
        Hostname: document.location.hostname,
        'Visit Site': window.location.pathname + window.location.search,
        message: message,
      },
    ]);

    setStatus({
      errorMessage: message,
    });
  } finally {
    setSubmitting(false);
  }
};

/**
 * Requests the server to resend the amazon gift code.
 */
const resendGiftCode = async () => {
  const url = `${apiEndPoint.validateAmazonCode}`;

  try {
    const reqBody = {
      [amazonKeys.DMCUSTOMER_ID]: userService.getUserData(userKeys.DM_CUSTOMER_ID),
    };

    await networkService.makeRequest(url, httpConstants.requestMethods.POST, reqBody);

    window._kmq.push([
      'record',
      kissmetrics.CLICK_RESEND_GIFTCARD,
      { Hostname: document.location.hostname, 'Visit Site': window.location.pathname + window.location.search },
    ]);

    return Promise.resolve(true);
  } catch (error) {
    const message = _get(error, 'response.data.message', errorMessage.amazonGiftCard.FAILED_RESEND);

    window._kmq.push([
      'record',
      kissmetrics.ERR_RESEND_GIFTCARD,
      {
        Hostname: document.location.hostname,
        'Visit Site': window.location.pathname + window.location.search,
        message: message,
      },
    ]);

    return Promise.reject(message);
  }
};

const amazonService = {
  handleSubmit,
  resendGiftCode,
};

export default amazonService;
