import * as Yup from 'yup';

import { VALID_MONTH, VALID_DAY } from '../constants/limit';
import verificationForm from '../constants/forms/verification';
import { genericFormValidationMessage } from '../constants/message';

const displayText = {
  ...verificationForm.displayText,
};

const verificationFormSchema = Yup.object().shape({
  ssn: Yup.string()
    .required(`${displayText.ssn} ${genericFormValidationMessage.IS_REQUIRED}`)
    .length(4, `${displayText.ssn} ${genericFormValidationMessage.MUST_BE_FOUR_DIGIT}`),
  dobMonth: Yup.string()
    .required(`${displayText.dobMonth} ${genericFormValidationMessage.IS_REQUIRED}`)
    .test('Valid Month', `${genericFormValidationMessage.MUST_BE_MONTH}`, function(value) {
      // In case of when value is '0', numericValue is 0 which is false in an if statement so handles when user enters '00'
      const numericValue = parseInt(value);

      if (numericValue && numericValue <= VALID_MONTH) {
        return true;
      }

      return false;
    }),
  dobDay: Yup.string()
    .required(`${displayText.dobDay} ${genericFormValidationMessage.IS_REQUIRED}`)
    .test('Valid Day', `${genericFormValidationMessage.MUST_BE_DAY}`, function(value) {
      // In case of when value is '0', numericValue is 0 which is false in an if statement so handles when user enters '00'
      const numericValue = parseInt(value);

      if (numericValue && numericValue <= VALID_DAY) {
        return true;
      }

      return false;
    }),
});

export default verificationFormSchema;
