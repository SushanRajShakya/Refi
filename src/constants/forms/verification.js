import { mask } from '../mask';

const verificationForm = {
  name: 'Verification Form',
  displayText: {
    // For form validation errors
    ssn: 'SSN',
    dobMonth: 'Month',
    dobDay: 'Day',
  },
  field: {
    ssn: {
      LABEL: 'Social Security Number (SSN) *',
      PLACEHOLDER: 'Enter last 4 digits of your SSN',
      PRE_TEXT: 'XXX-XX-',
      MASK: mask.number.FOUR,
    },
    dob: {
      LABEL: 'Date of Birth *',
      POST_TEXT: '/ YYYY',
      month: {
        TYPE: 'text',
        PLACEHOLDER: 'MM',
        MASK: mask.MONTH_TWO_DIGITS,
      },
      day: {
        TYPE: 'text',
        PLACEHOLDER: 'DD',
        MASK: mask.DAY_TWO_DIGITS,
      },
    },
  },
  button: {
    NEXT: 'Next',
  },
  initialValues: {
    ssn: '',
    dobMonth: '',
    dobDay: '',
  },
};

export default verificationForm;
