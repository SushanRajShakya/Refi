import { mask } from '../../mask';

// displayText property is used in the Form Validation error message display.
// field LABELs and displayText are different for few elements so had to seperate them out.

// Consists of all the form elements assosiated with employment details.
const employmentForm = {
  displayText: {
    employer: 'Employer',
    jobTitle: 'Job Title',
    contactName: 'Contact Name',
    contactPhone: 'Contact Phone',
    income: 'Income',
    payPeriod: 'Pay Period',
    employmentType: 'Employment Type',
    address: 'Address',
    address2: 'Address 2',
    state: 'State',
    zip: 'Zip',
    city: 'City',
    workedYear: 'Year',
    workedMonth: 'Month',
  },
  field: {
    employer: {
      LABEL: 'Employer *',
      TYPE: 'text',
      PLACEHOLDER: 'Employer',
    },
    jobTitle: {
      LABEL: 'Job Title *',
      TYPE: 'text',
      PLACEHOLDER: 'Job Title',
    },
    contactName: {
      LABEL: 'Contact Name *',
      TYPE: 'text',
      PLACEHOLDER: 'Contact Name',
    },
    contactPhone: {
      LABEL: 'Contact Phone *',
      MASK: mask.PHONE,
      PLACEHOLDER: 'Contact Phone',
    },
    income: {
      LABEL: 'Income *',
      MASK: mask.CURRENCY,
      PLACEHOLDER: 'Ex. $50,000.00',
    },
    payPeriod: {
      LABEL: 'Pay Period *',
      TYPE: 'text',
      PLACEHOLDER: 'Pay Period',
    },
    employmentType: {
      LABEL: 'Employement Type *',
      TYPE: 'text',
      PLACEHOLDER: 'Type',
    },
    address: {
      LABEL: 'Address *',
      TYPE: 'text',
      PLACEHOLDER: 'Address',
    },
    address2: {
      LABEL: 'Address 2',
      TYPE: 'text',
      PLACEHOLDER: 'Address 2',
    },
    state: {
      LABEL: 'State *',
      TYPE: 'text',
      PLACEHOLDER: 'State',
    },
    city: {
      LABEL: 'City *',
      TYPE: 'text',
      PLACEHOLDER: 'City',
    },
    zip: {
      LABEL: 'Zip *',
      MASK: mask.ZIP,
      PLACEHOLDER: 'Zip',
    },
    work: {
      LABEL: 'How long have you worked here? *',
      workedYear: {
        TYPE: 'text',
        PLACEHOLDER: 'Year',
      },
      workedMonth: {
        TYPE: 'text',
        PLACEHOLDER: 'Month',
      },
    },
  },
  initialValues: {
    idEmployer: null,
    uniqueId: '',
    employer: '',
    jobTitle: '',
    contactName: '',
    contactPhone: '',
    income: '',
    payPeriod: '',
    employmentType: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    workedYear: '',
    workedMonth: '',
  },
  button: {
    REMOVE_EMPLOYER: 'Remove Employer',
  },
};

export default employmentForm;
