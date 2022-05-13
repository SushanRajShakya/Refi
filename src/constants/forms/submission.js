import { mask } from '../mask';

const submissionForm = {
  name: 'Submission Form',
  displayText: {
    // For form validation errors
    phone: 'Phone',
    email: 'Email',
  },
  field: {
    phone: {
      LABEL: 'Phone',
      PLACEHOLDER: 'XXX-XXX-XXXX',
      MASK: mask.PHONE,
    },
    email: {
      LABEL: 'Email',
      PLACEHOLDER: 'example@abc.com',
    },
  },
  button: {
    SUBMIT: 'Next',
  },
  initialValues: {
    phone: '',
    email: '',
    primaryContact: '',
  },

  errors: {
    ATLEAST_ONE: 'Please select either phone or email.',
  },

  primaryContact: {
    PHONE: 'PHONE',
    EMAIL: 'EMAIL',
  },
};

export default submissionForm;
