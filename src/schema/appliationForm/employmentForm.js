import * as Yup from 'yup';

import formService from '../../services/forms';
import { MAX_INCOME } from '../../constants/limit';
import applicationForm from '../../constants/forms/application';
import { genericFormValidationMessage } from '../../constants/message';

// Constants for easier access to the keys.
const employmentForm = applicationForm.employment;
const displayText = employmentForm.displayText;

Yup.addMethod(Yup.string, 'validateWithMaxLimit', formService.validateWithMaxLimit);
Yup.addMethod(Yup.string, 'validateMaxChars', formService.validateMaxChars);

// Schema for ther employment form
const employmentFormSchema = Yup.object().shape({
  idEmployer: Yup.string().nullable(),
  uniqueId: Yup.string(),
  employer: Yup.string()
    .validateMaxChars()
    .required(`${displayText.employer} ${genericFormValidationMessage.IS_REQUIRED}`),
  jobTitle: Yup.string()
    .validateMaxChars()
    .required(`${displayText.jobTitle} ${genericFormValidationMessage.IS_REQUIRED}`),
  contactName: Yup.string()
    .validateMaxChars()
    .required(`${displayText.contactName} ${genericFormValidationMessage.IS_REQUIRED}`),
  contactPhone: Yup.string()
    .required(`${displayText.contactPhone} ${genericFormValidationMessage.IS_REQUIRED}`)
    .length(12, genericFormValidationMessage.INVALID_PHONE_NUMBER),
  income: Yup.string()
    .validateWithMaxLimit(MAX_INCOME)
    .required(`${displayText.income} ${genericFormValidationMessage.IS_REQUIRED}`),
  payPeriod: Yup.string().required(`${displayText.payPeriod} ${genericFormValidationMessage.IS_REQUIRED}`),
  employmentType: Yup.string().required(`${displayText.employmentType} ${genericFormValidationMessage.IS_REQUIRED}`),
  address: Yup.string()
    .validateMaxChars()
    .required(`${displayText.address} ${genericFormValidationMessage.IS_REQUIRED}`),
  address2: Yup.string().validateMaxChars(),
  state: Yup.string().required(`${displayText.state} ${genericFormValidationMessage.IS_REQUIRED}`),
  city: Yup.string()
    .validateMaxChars(64)
    .required(`${displayText.city} ${genericFormValidationMessage.IS_REQUIRED}`),
  zip: Yup.string()
    .required(`${displayText.zip} ${genericFormValidationMessage.IS_REQUIRED}`)
    .length(5, genericFormValidationMessage.MUST_BE_FIVE_DIGIT),
  workedYear: Yup.string(),
  workedMonth: Yup.string()
    .test('Validate Month', `${displayText.workedMonth} ${genericFormValidationMessage.CANNOT_BE_ZERO}`, function(
      value
    ) {
      const { workedYear } = this.parent;

      if (value && value === '0') {
        if (isNaN(parseInt(workedYear)) || workedYear === '0') {
          return false;
        }

        return true;
      }

      return true;
    })
    .test('Test Required', `${displayText.workedMonth} ${genericFormValidationMessage.IS_REQUIRED}`, function(value) {
      const { workedYear } = this.parent;

      if ((isNaN(parseInt(workedYear)) || workedYear === '0') && isNaN(parseInt(value))) {
        return false;
      }

      return true;
    }),
});

export default employmentFormSchema;
