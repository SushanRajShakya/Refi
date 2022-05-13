import _get from 'lodash.get';
import classNames from 'classnames';
import { textTransform } from '../constants/general';

/**
 * Returns the required class name for handling the CSS for errors and hints in form components.
 *
 * @param {string} value
 * @param {object} touched
 * @param {object} errors
 * @param {string} key
 */
const getInputWrapperClassName = (value, touched, errors, key) => {
  return classNames('form-group', {
    touched: value && value !== '',
    'has-error': touched && _get(touched, key) && errors && _get(errors, key),
  });
};

/**
 * Returns the style for text transform.
 *
 * @param {string} type
 */
const getTextTransformStyle = type => {
  const style = {};

  if (type === textTransform.UPPERCASE) {
    style.textTransform = textTransform.UPPERCASE;
  } else if (type === textTransform.LOWERCASE) {
    style.textTransform = textTransform.LOWERCASE;
  } else {
    style.textTransform = textTransform.NONE;
  }

  return style;
};

const formUtils = {
  getInputWrapperClassName,
  getTextTransformStyle,
};

export default formUtils;
