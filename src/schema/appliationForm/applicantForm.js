import * as Yup from 'yup';
import moment from 'moment';

import {
  VALID_PHONE_NUM,
  MIN_MONTH_HOUSING_HISTORY,
  VALID_ZIP_CODE,
  VALID_SSN,
  VALID_MONTH,
  VALID_DAY,
  YEAR_LIMIT,
  MAX_INCOME,
  MAX_CHARS_NAME,
} from '../../constants/limit';
import { unMask } from '../../constants/mask';
import formService from '../../services/forms';
import { unMaskString } from '../../utils/general';
import applicationForm from '../../constants/forms/application';
import applicationFormService from '../../services/forms/application';
import { genericFormValidationMessage } from '../../constants/message';

// Constants for easier access to the keys.
const applicantForm = applicationForm.applicant;
const displayText = applicantForm.displayText;

Yup.addMethod(Yup.string, 'requiredHousingHistory', applicationFormService.getTestRequiredForHousingHistory);
Yup.addMethod(Yup.string, 'validateWithMaxLimit', formService.validateWithMaxLimit);
Yup.addMethod(Yup.string, 'validateMaxChars', formService.validateMaxChars);

// Schema for ther employment form
const applicantFormSchema = Yup.object().shape({
  idApplicant: Yup.string().nullable(),
  applicantType: Yup.string().nullable(),
  firstName: Yup.string()
    .validateMaxChars(MAX_CHARS_NAME)
    .required(`${displayText.firstName} ${genericFormValidationMessage.IS_REQUIRED}`),
  middleName: Yup.string().validateMaxChars(MAX_CHARS_NAME),
  lastName: Yup.string()
    .validateMaxChars(MAX_CHARS_NAME)
    .required(`${displayText.lastName} ${genericFormValidationMessage.IS_REQUIRED}`),
  suffix: Yup.string().validateMaxChars(MAX_CHARS_NAME),
  phone: Yup.string()
    .length(VALID_PHONE_NUM, genericFormValidationMessage.INVALID_PHONE_NUMBER)
    .required(`${displayText.phone} ${genericFormValidationMessage.IS_REQUIRED}`),
  ssn: Yup.string()
    .length(VALID_SSN, genericFormValidationMessage.INVALID_SSN)
    .required(`${displayText.ssn} ${genericFormValidationMessage.IS_REQUIRED}`),
  dob: Yup.string()
    .test('DOB Validity', genericFormValidationMessage.INVALID_DOB, function(value) {
      return validateDob(value);
    })
    .required(`${displayText.dob} ${genericFormValidationMessage.IS_REQUIRED}`),
  email: Yup.string()
    .validateMaxChars(64)
    .required(`${displayText.email} ${genericFormValidationMessage.IS_REQUIRED}`)
    .email(genericFormValidationMessage.INVALID_EMAIL),
  address: Yup.string()
    .validateMaxChars()
    .required(`${displayText.address} ${genericFormValidationMessage.IS_REQUIRED}`),
  address2: Yup.string().validateMaxChars(),
  city: Yup.string()
    .validateMaxChars(64)
    .required(`${displayText.city} ${genericFormValidationMessage.IS_REQUIRED}`),
  state: Yup.string().required(`${displayText.state} ${genericFormValidationMessage.IS_REQUIRED}`),
  zip: Yup.string()
    .length(VALID_ZIP_CODE, genericFormValidationMessage.MUST_BE_FIVE_DIGIT)
    .required(`${displayText.zip} ${genericFormValidationMessage.IS_REQUIRED}`),
  residentialStatus: Yup.string().required(
    `${displayText.residentialStatus} ${genericFormValidationMessage.IS_REQUIRED}`
  ),
  rentMortgagePerMonth: Yup.string()
    .validateWithMaxLimit(MAX_INCOME)
    .required(`${displayText.rentMortgagePerMonth} ${genericFormValidationMessage.IS_REQUIRED}`),
  residenceYear: Yup.string(),
  residenceMonth: Yup.string().test(
    'Test Required',
    `${displayText.residenceMonth} ${genericFormValidationMessage.IS_REQUIRED}`,
    function(value) {
      const { residenceYear } = this.parent;

      if ((isNaN(parseInt(residenceYear)) || residenceYear === '0') && isNaN(parseInt(value))) {
        return false;
      }

      return true;
    }
  ),
  prevAddress: Yup.string()
    .validateMaxChars()
    .requiredHousingHistory('prevAddress', displayText),
  prevAddress2: Yup.string().validateMaxChars(),
  prevCity: Yup.string()
    .validateMaxChars(64)
    .requiredHousingHistory('prevCity', displayText),
  prevState: Yup.string().requiredHousingHistory('prevState', displayText),
  prevZip: Yup.string()
    .test('Verify Housing History', `${displayText.prevZip} ${genericFormValidationMessage.IS_REQUIRED}`, function(
      value
    ) {
      return applicationFormService.calculateHousingHistory(this.parent) >= MIN_MONTH_HOUSING_HISTORY || value;
    })
    .test('Verify ZIP', `${displayText.prevZip} ${genericFormValidationMessage.MUST_BE_FIVE_DIGIT}`, function(value) {
      if (applicationFormService.calculateHousingHistory(this.parent) < MIN_MONTH_HOUSING_HISTORY) {
        return value && value !== '' && value.length === VALID_ZIP_CODE;
      }

      return true;
    }),
  prevResidentialStatus: Yup.string().requiredHousingHistory('prevResidentialStatus', displayText),
  prevRentMortgagePerMonth: Yup.string()
    .validateWithMaxLimit(MAX_INCOME)
    .requiredHousingHistory('prevRentMortgagePerMonth', displayText),
  prevResidenceYear: Yup.string(),
  prevResidenceMonth: Yup.string()
    .test(
      'Validate Month',
      `${displayText.prevResidenceMonth} ${genericFormValidationMessage.CANNOT_BE_ZERO}`,
      function(value) {
        const { prevResidenceYear } = this.parent;

        if (value && value === '0') {
          return (
            applicationFormService.calculateHousingHistory(this.parent) >= MIN_MONTH_HOUSING_HISTORY ||
            prevResidenceYear > 0
          );
        }

        return true;
      }
    )
    .test('Test Required', `${displayText.prevResidenceMonth} ${genericFormValidationMessage.IS_REQUIRED}`, function(
      value
    ) {
      const { prevResidenceYear } = this.parent;

      if ((isNaN(parseInt(prevResidenceYear)) || prevResidenceYear === '0') && isNaN(parseInt(value))) {
        return applicationFormService.calculateHousingHistory(this.parent) >= MIN_MONTH_HOUSING_HISTORY;
      }

      return true;
    }),
});

/**
 * Validates Date of Birth to be a valid date.
 *
 * @param {string} value
 */
const validateDob = value => {
  const dob = unMaskString(value, unMask.numbers);

  const month = parseInt(dob.slice(0, 2));
  const day = parseInt(dob.slice(2, 4));
  const year = parseInt(dob.slice(4, 8));
  const currentYear = new Date().getFullYear();

  if (isNaN(month) || month > VALID_MONTH) {
    return false;
  }

  if (isNaN(day) || day > VALID_DAY) {
    return false;
  }

  if (isNaN(year) || year > currentYear || year < YEAR_LIMIT) {
    return false;
  }

  const momentDate = moment(value, 'MM/DD/YYYY', true);

  if (momentDate.isValid()) {
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1; // Since JAN = 0, FEB = 1 ... & so on.

    if (year === currentYear && (month > currentMonth || day > currentDay)) {
      return false;
    }

    return true;
  }

  return false;
};

export default applicantFormSchema;
