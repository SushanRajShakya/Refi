import _get from 'lodash.get';

import networkService from './network';
import { errorMessage } from '../constants/message';
import { apiEndPoint } from '../configs/apiEndpoint';
import { httpConstants } from '../constants/network';
import { DROPDOWN_OPTIONS_LIMIT } from '../constants/general';
import { stateOptionKeys } from '../constants/keys/dropdowns/state';

/**
 * Retreive all the state options from the backend.
 */
const getStateOptions = async () => {
  const url = `${apiEndPoint.stateOptions}?limit=${DROPDOWN_OPTIONS_LIMIT}`;

  try {
    const result = await networkService.makeRequest(url, httpConstants.requestMethods.GET);
    const data = _get(result, 'data.items', []);

    if (data.length) {
      const stateOptions = data.map(item => {
        return {
          label: item[stateOptionKeys.VALUE],
          value: item[stateOptionKeys.VALUE],
        };
      });

      return Promise.resolve(stateOptions);
    }

    return Promise.reject(errorMessage.FETCHING_STATE_OPTIONS);
  } catch (err) {
    return Promise.reject(errorMessage.FETCHING_STATE_OPTIONS);
  }
};

const dropdownService = {
  getStateOptions,
};

export default dropdownService;
