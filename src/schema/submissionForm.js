import * as Yup from 'yup';

import { VALID_PHONE_NUM } from '../constants/limit';
import submissionForm from '../constants/forms/submission';
import { genericFormValidationMessage } from '../constants/message';

const displayText = {
  ...submissionForm.displayText,
};

const submissionFormSchema = Yup.object().shape({
  phone: Yup.string()
    .required(`${displayText.phone} ${genericFormValidationMessage.IS_REQUIRED}`)
    .length(VALID_PHONE_NUM, genericFormValidationMessage.INVALID_PHONE_NUMBER),
  email: Yup.string()
    .required(`${displayText.email} ${genericFormValidationMessage.IS_REQUIRED}`)
    .email(genericFormValidationMessage.INVALID_EMAIL),
  primaryContact: Yup.string().required(submissionForm.errors.ATLEAST_ONE),
});

export default submissionFormSchema;
