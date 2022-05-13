import { mask } from '../mask';

const amazonGiftCardForm = {
  name: 'Amazon Gift Card Form',
  displayText: {
    // For form validation errors
    code: 'Code from mailer',
    email: 'Email address',
    phone: 'Phone number',
  },
  field: {
    code: {
      LABEL: 'Code from mailer',
      PLACEHOLDER: 'Enter code from mailer',
      MASK: mask.AMAZON_CODE,
      TEXT_TRANSFORM: 'uppercase',
    },
    email: {
      LABEL: 'Email where we send your gift card',
      PLACEHOLDER: 'example@abc.com',
      TYPE: 'text',
    },
    phone: {
      LABEL: 'Your phone number',
      PLACEHOLDER: 'XXX-XXX-XXXX',
      MASK: mask.PHONE,
    },
  },
  button: {
    SUBMIT: 'Redeem My Code',
  },
  initialValues: {
    code: '',
    email: '',
    phone: '',
  },
};

export default amazonGiftCardForm;
