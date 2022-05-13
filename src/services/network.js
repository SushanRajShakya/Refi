import _get from 'lodash.get';

import { error } from '../constants/notification';
import { httpConstants } from '../constants/network';
import PublicAxiosInstance from '../interceptors/publicAxiosInstance';

/**
 * Makes HTTP requests to the server using the Axios Interceptor.
 *
 * @param {string} url
 * @param {string} method
 * @param {object} data
 */
const makeRequest = (url, method, data = null) => {
  const requestMethods = httpConstants.requestMethods;

  switch (method) {
    case requestMethods.POST:
      return PublicAxiosInstance.post(url, data);
    case requestMethods.PUT:
      return PublicAxiosInstance.put(url, data);
    case requestMethods.DELETE:
      if (data) {
        return PublicAxiosInstance.delete(url, {
          data: { ...data },
        });
      }

      return PublicAxiosInstance.delete(url);
    case requestMethods.GET:
      return PublicAxiosInstance.get(url, {
        params: { ...data },
      });
    default:
      return Promise.reject(error.INVALID_REQUEST_METHOD);
  }
};

/**
 * Handle exceptions for API calls.
 *
 * @param {object} error
 */
const handleError = error => {
  const { response } = error;

  if (response === null || response === undefined) {
    error.name = httpConstants.responseTypes.unauthorized;

    return error;
  }

  if (response.status === 404) {
    error.name = httpConstants.responseTypes.notFound;

    return error;
  }

  return error;
};

/**
 * Returns response data of error.
 *
 * @param {object} error
 */
const getErrorResponseData = error => {
  const responseData = _get(error, 'response.data', null);

  return responseData;
};

const networkService = {
  makeRequest,
  handleError,
  getErrorResponseData,
};

export default networkService;
