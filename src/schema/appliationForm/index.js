import * as Yup from 'yup';

import vehicleFormSchema from './vehicleForm';
import formService from '../../services/forms';
import applicantFormSchema from './applicantForm';
import { MAX_INCOME } from '../../constants/limit';
import employmentFormSchema from './employmentForm';

Yup.addMethod(Yup.string, 'validateWithMaxLimit', formService.validateWithMaxLimit);
Yup.addMethod(Yup.string, 'validateMaxChars', formService.validateMaxChars);

const applicationFormSchema = Yup.object().shape({
  applicant: applicantFormSchema,
  employment: Yup.array().of(employmentFormSchema),
  vehicle: vehicleFormSchema,
  totalOtherIncome: Yup.string().validateWithMaxLimit(MAX_INCOME),
  sourceOfOtherIncome: Yup.string().validateMaxChars(),
});

export default applicationFormSchema;
