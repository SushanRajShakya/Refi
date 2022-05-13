import { footerText } from './footer';

export const submissionPageText = {
  DOCUMENT_TITLE: 'Thank You Page',
  TITLE: firstName => `${firstName} - Thank you for submitting your information.`,
  DESCRIPTION: 'We will contact you within 1 business day',
  QUESTION: 'What is the best way to reach you?',
  submittedBlock: {
    TITLE: firstName => `Thank you, ${firstName}!`,
    CONTACT: `Give us a call at ${footerText.PHONE} if you have any questions. We are here to help.`,
  },
};
