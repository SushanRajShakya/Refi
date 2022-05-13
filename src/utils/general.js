import { CAR_LENDERS } from '../constants/texts/common';

/**
 * Unmask the string based on the masking character passed.
 *
 * @param {string} value
 * @param {RegExp} maskingCharacters
 */
export const unMaskString = (value, maskingCharacters) => {
  return value.replace(maskingCharacters, '');
};

/**
 * Get the current year.
 */
export const getCurrentYear = () => new Date().getFullYear();

/**
 * Used to disable scroll in the body while opening modal or showing spinners.
 */
export const disableBackgroundScroll = () => {
  const body = document.getElementById('app-body');

  body.style.overflow = 'hidden';
};

/**
 * Used to enable scroll in the body while closing modal or removing spinners.
 */
export const enableBackgroundScroll = () => {
  const body = document.getElementById('app-body');

  body.style.overflow = 'auto';
};

/**
 * Sets the document title for the provided name.
 *
 * @param {string} name
 */
export const setDocumentTitle = name => {
  document.title = `${name} - ${CAR_LENDERS}`;
};
