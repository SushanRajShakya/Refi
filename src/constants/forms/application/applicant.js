import { mask } from '../../mask';
import { applicantType } from '../../general';

// displayText property is used in the Form Validation error message display.
// field LABELs and displayText are different for few elements so had to seperate them out.

// Consists of all the form elements assosiated with applicant details.
const applicantForm = {
  displayText: {
    firstName: 'First Name',
    middleName: 'Middle Name',
    lastName: 'Last Name',
    suffix: 'Suffix',
    ssn: 'Social Security Number',
    dob: 'Birth Date',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    address2: 'Address 2',
    city: 'City',
    state: 'State',
    zip: 'Zip',
    residentialStatus: 'Residential Status',
    rentMortgagePerMonth: 'Rent/Mortgage Payment per Month',
    residenceYear: 'Year',
    residenceMonth: 'Month',
    prevAddress: 'Address',
    prevAddress2: 'Address 2',
    prevCity: 'City',
    prevState: 'State',
    prevZip: 'Zip',
    prevResidentialStatus: 'Residential Status',
    prevRentMortgagePerMonth: 'Rent/Mortgage Payment per Month',
    prevResidenceYear: 'Year',
    prevResidenceMonth: 'Month',
  },
  field: {
    firstName: {
      LABEL: 'First Name *',
      TYPE: 'text',
      PLACEHOLDER: 'First Name',
    },
    middleName: {
      LABEL: 'Middle Name',
      TYPE: 'text',
      PLACEHOLDER: 'Middle Name',
    },
    lastName: {
      LABEL: 'Last Name *',
      TYPE: 'text',
      PLACEHOLDER: 'Last Name',
    },
    suffix: {
      LABEL: 'Suffix',
      TYPE: 'text',
      PLACEHOLDER: 'Suffix',
    },
    phone: {
      LABEL: 'Phone *',
      MASK: mask.PHONE,
      PLACEHOLDER: 'Phone Number',
    },
    ssn: {
      LABEL: 'Social Security Number *',
      PLACEHOLDER: 'XXX-XX-XXXX',
    },
    dob: {
      LABEL: 'Birth Date *',
      MASK: mask.DOB,
      PLACEHOLDER: 'MM/DD/YYYY',
    },
    email: {
      LABEL: 'Email *',
      TYPE: 'text',
      PLACEHOLDER: 'Email',
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
    city: {
      LABEL: 'City *',
      TYPE: 'text',
      PLACEHOLDER: 'City',
    },
    state: {
      LABEL: 'State *',
      TYPE: 'text',
      PLACEHOLDER: 'State',
    },
    zip: {
      LABEL: 'ZIP *',
      MASK: mask.ZIP,
      PLACEHOLDER: 'ZIP',
    },
    residentialStatus: {
      LABEL: 'Residential Status *',
      TYPE: 'text',
      PLACEHOLDER: 'Type',
    },
    rentMortgagePerMonth: {
      LABEL: 'Rent/Mortgage Payment per Month *',
      MASK: mask.CURRENCY,
      PLACEHOLDER: 'Ex. $4,000.00',
    },
    residence: {
      LABEL: 'How long have you lived at this residence? *',
      year: {
        TYPE: 'text',
        PLACEHOLDER: 'Year',
      },
      month: {
        TYPE: 'text',
        PLACEHOLDER: 'Month',
      },
    },
    prevAddress: {
      LABEL: 'Address *',
      TYPE: 'text',
      PLACEHOLDER: 'Address',
    },
    prevAddress2: {
      LABEL: 'Address 2',
      TYPE: 'text',
      PLACEHOLDER: 'Address 2',
    },
    prevCity: {
      LABEL: 'City *',
      TYPE: 'text',
      PLACEHOLDER: 'City',
    },
    prevState: {
      LABEL: 'State *',
      TYPE: 'text',
      PLACEHOLDER: 'State',
    },
    prevZip: {
      LABEL: 'ZIP *',
      MASK: mask.ZIP,
      PLACEHOLDER: 'ZIP',
    },
    prevResidentialStatus: {
      LABEL: 'Residential Status *',
      TYPE: 'text',
      PLACEHOLDER: 'Type',
    },
    prevRentMortgagePerMonth: {
      LABEL: 'Rent/Mortgage Payment per Month *',
      MASK: mask.CURRENCY,
      PLACEHOLDER: 'Ex. $4,000.00',
    },
    prevResidence: {
      LABEL: 'How long have you lived at this residence? *',
      year: {
        TYPE: 'text',
        PLACEHOLDER: 'Year',
      },
      month: {
        TYPE: 'text',
        PLACEHOLDER: 'Month',
      },
    },
  },
  initialValues: {
    idApplicant: null,
    applicantType: applicantType.PRIMARY,
    ssn: '',
    dob: '',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    phone: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    residentialStatus: '',
    rentMortgagePerMonth: '',
    residenceYear: '',
    residenceMonth: '',
    prevAddress: '',
    prevAddress2: '',
    prevCity: '',
    prevState: '',
    prevZip: '',
    prevResidentialStatus: '',
    prevRentMortgagePerMonth: '',
    prevResidenceYear: '',
    prevResidenceMonth: '',
  },
};

export default applicantForm;
