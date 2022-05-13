import _get from 'lodash.get';

import networkService from './network';
import storageUtils from '../utils/storage';
import { userKeys } from '../constants/keys/user';
import { isUserValid } from '../constants/general';
import { errorMessage } from '../constants/message';
import { httpConstants } from '../constants/network';
import { apiEndPoint } from '../configs/apiEndpoint';
import { storageKeys } from '../constants/keys/storage';
import { landingPageKeys } from '../constants/keys/landingPage';

/**
 * Returns user data from session storage for the key.
 * If key is not provided then send the whole user data in the form of object.
 *
 * @param {string} key
 */
const getUserData = (key = null) => {
  const userData = JSON.parse(storageUtils.getItemFromSessionStorage(storageKeys.USER));

  if (key) {
    return userData[key];
  }

  return userData;
};

/**
 * Stores the user data object(parses object to JSON stringify) to the session storage.
 *
 * @param {string} userData
 */
const setUserData = userData => {
  storageUtils.setItemToSessionStorage(storageKeys.USER, JSON.stringify(userData));
};

/**
 * Returns the first name of the user from the fullname.
 *
 * @param {string} fullName
 */
const getFirstName = fullName => {
  let name = '';

  if (fullName) {
    name = fullName.split(' ')[0];
  }

  return name;
};

/**
 * Updates a specific user data in the storage.
 *
 * @param {string} key
 * @param {string} value
 */
const setSpecificUserData = (key, value) => {
  const userData = userService.getUserData();

  userData[key] = value;
  userService.setUserData(userData);
};

/**
 * Returns verified user data from session storage for the key.
 * If key is not provided then send the whole verified user data in the form of object.
 *
 * @param {string} key
 */
const getVerifiedUserData = (key = null) => {
  const verifiedUserData = JSON.parse(storageUtils.getItemFromSessionStorage(storageKeys.VERIFIED_USER));

  if (key) {
    return verifiedUserData[key];
  }

  return verifiedUserData;
};

/**
 * Stores the verified user data object(parses object to JSON stringify) to the sessionStorage.
 *
 * @param {string} verifiedUserData
 */
const setVerifiedUserData = verifiedUserData => {
  storageUtils.setItemToSessionStorage(storageKeys.VERIFIED_USER, JSON.stringify(verifiedUserData));
};

/**
 * Validates the customer token from the backend.
 *
 * @param {string} token
 */
const validateCustomerToken = async token => {
  const url = `${apiEndPoint.validateCustomerToken}${token}`;

  try {
    const result = await networkService.makeRequest(url, httpConstants.requestMethods.GET);

    let offerExpiryDate = result.data[userKeys.OFFER_EXPIRY_DATE];

    offerExpiryDate = offerExpiryDate.slice(0, 1) + offerExpiryDate.slice(1, offerExpiryDate.length).toLowerCase();

    window._kmq.push(['identify', token]);

    return Promise.resolve({
      [userKeys.FULL_NAME]: result.data[userKeys.FULL_NAME],
      [userKeys.OFFER_EXPIRY_DATE]: offerExpiryDate,
      [userKeys.IS_EXPIRED]: parseInt(result.data[userKeys.IS_EXPIRED]) ? true : false,
      [userKeys.IS_COMPLETED]: parseInt(result.data[userKeys.IS_COMPLETED]) ? true : false,
      [userKeys.IS_USER_VALID]: result.data[userKeys.IS_USER_VALID],
      [userKeys.REDEMPTION_EMAIL]: result.data[userKeys.REDEMPTION_EMAIL],
      [userKeys.IS_GIFT_CARD_REDEEMED]: parseInt(result.data[userKeys.IS_GIFT_CARD_REDEEMED]) ? true : false,
      [userKeys.REDEEM_CODE_AVAILABLE]: parseInt(result.data[userKeys.REDEEM_CODE_AVAILABLE]) ? true : false,
      [userKeys.DM_CUSTOMER_ID]: token,
    });
  } catch (error) {
    const responseData = networkService.getErrorResponseData(error);

    if (responseData) {
      return Promise.reject({
        data: {
          [userKeys.IS_USER_VALID]: responseData[userKeys.IS_USER_VALID],
          [userKeys.IS_COMPLETED]: responseData[userKeys.IS_COMPLETED],
        },
      });
    }

    return Promise.reject(error);
  }
};

/**
 * Fetch the landing page templates from the backend.
 *
 * @param {string} isUserValidFlag
 */
const getLandingPageTemplate = async isUserValidFlag => {
  const userData = userService.getUserData();

  let url = `${apiEndPoint.pageTemplate}`;

  if (userData && isUserValidFlag !== isUserValid.DEFAULT_USER && isUserValidFlag !== isUserValid.INVALID_USER) {
    url = `${url}${userData[userKeys.DM_CUSTOMER_ID]}`;
  } else {
    url = `${url}${isUserValidFlag}`;
  }

  try {
    const result = await networkService.makeRequest(url, httpConstants.requestMethods.GET);

    const offerTemplate = _get(result, `data.${landingPageKeys.OFFERS}[0][${landingPageKeys.OFFER_KEY}]`, null);
    const offers = offerTemplate ? offerTemplate.split(landingPageKeys.OFFER_SPLIT_KEY) : [];

    const headers = _get(result, `data.${landingPageKeys.HEADER_BLOCK}[0]`, {});

    const titles = _get(result, `data.${landingPageKeys.TITLES}[0]`, {});

    return Promise.resolve({
      offers,
      headers,
      titles,
    });
  } catch (err) {
    return Promise.reject(errorMessage.FETCHING_PAGE_TEMPLATE);
  }
};

/**
 * Fetch the landing page testimonials from the backend.
 */
const getTestimonials = async () => {
  const url = apiEndPoint.getTestimonials;

  try {
    const result = await networkService.makeRequest(url, httpConstants.requestMethods.GET);

    const testimonials = _get(result, `data.items[0]`, {});

    return Promise.resolve(testimonials);
  } catch (err) {
    return Promise.reject(errorMessage.FETCHING_PAGE_TEMPLATE);
  }
};

/**
 * Collection of all the available services.
 */
const userService = {
  getUserData,
  setUserData,
  getFirstName,
  setSpecificUserData,
  getVerifiedUserData,
  setVerifiedUserData,
  validateCustomerToken,
  getLandingPageTemplate,
  getTestimonials,
};

export default userService;
