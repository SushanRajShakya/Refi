import { toast } from 'react-toastify';
import { success, error, warning, info } from '../constants/notification';

// For more details on displaying toast notifications using react-toastify
// Please visit https://www.npmjs.com/package/react-toastify

const displaySuccess = (message = success.DEFAULT, config = {}) => {
  toast.success(message, config);
};

const displayError = (message = error.DEFAULT, config = {}) => {
  toast.error(message, config);
};

const displayWarning = (message = warning.DEFAULT, config = {}) => {
  toast.warn(message, config);
};

const displayInfo = (message = info.DEFAULT, config = {}) => {
  toast.info(message, config);
};

/**
 * Removes all the toast messages from the screen.
 */
const dismissAll = () => {
  toast.dismiss();
};

const toastUtils = {
  displaySuccess,
  displayError,
  displayInfo,
  displayWarning,
  dismissAll,
};

export default toastUtils;
