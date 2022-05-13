import swal from '@sweetalert/with-react';

import { disableBackgroundScroll, enableBackgroundScroll } from '../utils/general';

/**
 * Opens a new modal or Replaces the current open modal based on the configuration passed to it.
 *
 * @param {object} config
 */
const openModal = config => {
  const { content, buttons = {}, className = '', closeOnClickOutside = true } = config;

  disableBackgroundScroll();

  return swal({
    content,
    buttons,
    className,
    closeOnClickOutside,
  }).then(res => {
    enableBackgroundScroll();

    return Promise.resolve(res);
  });
};

/**
 * Closes the currently open modal.
 */
const closeModal = () => {
  swal.close();
};

const modalService = {
  openModal,
  closeModal,
};

export default modalService;
