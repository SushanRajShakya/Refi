import { mask } from '../../mask';
import vehicleForm from './vehicle';
import applicantForm from './applicant';
import employmentForm from './employment';
import applicationFormService from '../../../services/forms/application';

const applicationForm = {
  name: 'Personal Information Form',

  displayText: {
    totalOtherIncome: 'Total Other Income',
    sourceOfOtherIncome: 'Source of Other Income',
  },

  field: {
    totalOtherIncome: {
      LABEL: 'Total Other Income per Month',
      MASK: mask.CURRENCY,
      PLACEHOLDER: 'Ex. $5000',
    },
    sourceOfOtherIncome: {
      LABEL: 'Source of Other Income',
      TYPE: 'text',
      PLACEHOLDER: 'Source of Other Income',
    },
  },

  applicant: applicantForm,
  employment: employmentForm,
  vehicle: vehicleForm,

  button: {
    SUBMIT: 'Submit',
    ADD_EMPLOYER: 'Add Additional Employer',
  },

  initialValues: {
    applicant: {
      ...applicantForm.initialValues,
    },
    employment: [applicationFormService.getEmploymentFormInitialValues()],
    totalOtherIncome: '',
    sourceOfOtherIncome: '',
    vehicle: {
      ...vehicleForm.initialValues,
    },
  },

  errors: {
    MIN_HOUSING_HISTORY: '* We need at least 12 months of housing history',
  },
};

export default applicationForm;
