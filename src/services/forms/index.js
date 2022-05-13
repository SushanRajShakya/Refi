import _toString from 'lodash.tostring';
import { conformToMask } from 'react-text-mask';

import { unMask } from '../../constants/mask';
import { unMaskString } from '../../utils/general';
import { DEFAULT_MAX_CHARS } from '../../constants/limit';
import { genericFormValidationMessage } from '../../constants/message';

/**
 * Yup test case for verifying whether user have input a value within the maximum limit.
 * Arrow function cannot be used here as it retains 'this' from the enclosed lexical context.
 *
 * @param {number} maxLimit
 */
const validateWithMaxLimit = function(maxLimit) {
  return this.test(
    'Tests if value is less than maximum limit',
    genericFormValidationMessage.EXCEEDS_MAX_LIMIT(maxLimit),
    function(value) {
      if (value) {
        const parsedValue = parseFloat(unMaskString(_toString(value), unMask.numbers)).toFixed(2);

        return parsedValue && maxLimit >= parsedValue;
      }

      return true;
    }
  );
};

/**
 * Yup test case for verifying whether user have input exceeds max number of characters.
 * Arrow function cannot be used here as it retains 'this' from the enclosed lexical context.
 *
 * @param {number} maxChars
 */
const validateMaxChars = function(maxChars = DEFAULT_MAX_CHARS) {
  return this.test(
    'Tests if the number of characters in the value is less than maximum limit',
    genericFormValidationMessage.EXCEEDS_MAX_CHARS(maxChars),
    function(value) {
      const numberOfChars = _toString(value).length;

      return maxChars >= numberOfChars;
    }
  );
};

/**
 * Apply the required mask only if there is a value or else return empty string ('').
 *
 * @param {any} value
 * @param {string} mask
 */
const applyMaskToValue = (value, mask) => {
  if (value) {
    const parsedValue = _toString(value);

    return conformToMask(parsedValue, mask).conformedValue;
  }

  return '';
};

const formService = {
  validateWithMaxLimit,
  validateMaxChars,
  applyMaskToValue,
};

export default formService;
