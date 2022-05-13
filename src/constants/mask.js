import maskUtils from '../utils/mask';

// Mask has to be an array representing each character.
export const mask = {
  PHONE: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  SSN: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  ZIP: [/\d/, /\d/, /\d/, /\d/, /\d/],
  number: {
    FOUR: [/\d/, /\d/, /\d/, /\d/],
    SIX: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  },
  YEAR_FOUR_DIGITS: [/[1-2]/, /\d/, /\d/, /\d/],
  MONTH_TWO_DIGITS: [/[0-1]/, /\d/],
  DAY_TWO_DIGITS: [/[0-3]/, /\d/],
  VIN: [
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
  ],
  AMAZON_CODE: [
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
    /[a-zA-Z0-9]/,
  ],
  CURRENCY: maskUtils.currencyMask,
};

export const unMask = {
  numbers: /[^0-9.]/g,
};
