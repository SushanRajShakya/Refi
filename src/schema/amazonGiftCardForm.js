import * as Yup from 'yup';

import { VALID_PHONE_NUM } from '../constants/limit';
import amazonGiftCardForm from '../constants/forms/amazonGiftCard';
import { genericFormValidationMessage } from '../constants/message';

const displayText = {
  ...amazonGiftCardForm.displayText,
};

const amazonGiftCardFormSchema = Yup.object().shape({
  code: Yup.string()
    .required(`${displayText.code} ${genericFormValidationMessage.IS_REQUIRED}`)
    .length(8, `${genericFormValidationMessage.INVALID_AMAZON_CODE}`),
  email: Yup.string()
    .required(`${displayText.email} ${genericFormValidationMessage.IS_REQUIRED}`)
    .email(genericFormValidationMessage.INVALID_EMAIL),
  phone: Yup.string()
    .required(`${displayText.phone} ${genericFormValidationMessage.IS_REQUIRED}`)
    .length(VALID_PHONE_NUM, `${genericFormValidationMessage.INVALID_PHONE_NUMBER}`),
});

export default amazonGiftCardFormSchema;
