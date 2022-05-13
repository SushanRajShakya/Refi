import { getCurrentYear } from '../utils/general';

export const genericFormValidationMessage = {
  IS_REQUIRED: 'is required.',
  MUST_BE_MONTH: 'Please enter a valid month.',
  MUST_BE_DAY: 'Please enter a valid day.',
  CANNOT_EXCEED_CURRENT_YEAR: `Please enter a valid year, no later than ${getCurrentYear()}.`,
  MUST_BE_TWO_DIGIT: 'must be a 2 digit number.',
  MUST_BE_FOUR_DIGIT: 'must be a 4 digit number.',
  CANNOT_BE_ZERO: 'cannot be 0',
  MUST_BE_FIVE_DIGIT: 'must be a 5 digit number.',
  MAX_CHAR_EXCEEDED: 'Maximum character exceeded.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE_NUMBER: 'Please enter a valid phone number',
  INVALID_SSN: 'Please enter a valid social security number',
  INVALID_DOB: 'Please enter a valid birth date',
  INVALID_VIN: 'Please enter a valid VIN, must be 17 alpha-numeric code',
  INVALID_AMAZON_CODE: 'Please enter a valid code, must be 8 alpha-numeric code',
  EXCEEDS_MAX_LIMIT: maxLimit => `Please enter a value which is less than or equal to ${maxLimit}`,
  EXCEEDS_MAX_CHARS: maxChars => `Exceeds maximum(${maxChars}) number of characters`,
};

export const errorMessage = {
  FETCHING_PAGE_TEMPLATE:
    'Error fetching page template, please try again using the URL provided by Car Lenders.',
  FETCHING_TESTIMONIALS: 'Error fetching testimonials, please reload the page.',
  INVALID_CUSTOMER_TOKEN: 'Invalid Customer Token.',
  VERIFYING_SSN_DOB: 'Error verifying SSN and Date of Birth, please try again later.',
  applicationForm: {
    FETCHING_APPLICATION_FORM: `Error fetching your personal information, please reload the page.`,
    SUBMITING_APPLICATION_FORM: 'Error submitting your personal information, please try again.',
    REMOVING_EMPLOYER: 'Error removing employer, please try again.',
  },
  FETCHING_STATE_OPTIONS: 'Error fetching the state options, please reload the page.',
  submissionForm: {
    FETCHING_SUBMISSION_FORM: 'Error fetching contact information, please reload the page.',
    SUBMITTING_APPLICATION_FORM: 'Error submitting contact information, please try again.',
  },
  amazonGiftCard: {
    VALIDATING_CODE: 'Error validating amazon gift card code, please try again.',
    FAILED_RESEND: 'Failed To Send Gift Code',
    UNPROCESSABLE_ENTITY: 'Oops! there is an issue connecting to Amazon. Please try again later.',
  },
};

export const successMessage = {
  VALIDATION_SUCCESS: firstName => `Awesome ${firstName}! Thank you for validating`,
  GIFT_CARD_SENT: 'Gift Card Sent',
};
