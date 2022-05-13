import * as Yup from 'yup';

import formService from '../../services/forms';
import { getCurrentYear } from '../../utils/general';
import { VALID_VIN, MAX_MILEAGE } from '../../constants/limit';
import applicationForm from '../../constants/forms/application';
import { genericFormValidationMessage } from '../../constants/message';

// Constants for easier access to the keys.
const vehicleForm = applicationForm.vehicle;
const displayText = vehicleForm.displayText;

Yup.addMethod(Yup.string, 'validateWithMaxLimit', formService.validateWithMaxLimit);
Yup.addMethod(Yup.string, 'validateMaxChars', formService.validateMaxChars);

// Schema for ther vehicle form
const vehicleFormSchema = Yup.object().shape({
  idVehicle: Yup.string().nullable(),
  trim: Yup.string().nullable(),
  year: Yup.string()
    .when('vin', {
      is: vin => !vin,
      then: Yup.string()
        .required(`${displayText.year} ${genericFormValidationMessage.IS_REQUIRED}`)
        .length(4, `${displayText.year} ${genericFormValidationMessage.MUST_BE_FOUR_DIGIT}`),
    })
    .test(
      `Verify year if value is present.`,
      `${displayText.year} ${genericFormValidationMessage.MUST_BE_FOUR_DIGIT}`,
      value => {
        if (value) {
          return value.length === 4;
        }

        return true;
      }
    )
    .test(
      `Verify if the year doesn't exceed current year.`,
      `${genericFormValidationMessage.CANNOT_EXCEED_CURRENT_YEAR}`,
      value => {
        if (value) {
          return value <= getCurrentYear();
        }

        return true;
      }
    ),

  make: Yup.string().when('vin', {
    is: vin => !vin,
    then: Yup.string()
      .validateMaxChars(32)
      .required(`${displayText.make} ${genericFormValidationMessage.IS_REQUIRED}`),
  }),

  model: Yup.string().when('vin', {
    is: vin => !vin,
    then: Yup.string()
      .validateMaxChars(64)
      .required(`${displayText.model} ${genericFormValidationMessage.IS_REQUIRED}`),
  }),

  // Used native function definition in order to access 'this.parent' [ Note: arrow function have lexical context ]
  // Used test in order to avoit cyclic dependency in Yup Schema Validation
  vin: Yup.string()
    .test('Verify year, make, model', `${displayText.vin} ${genericFormValidationMessage.IS_REQUIRED}`, function(
      value
    ) {
      const { year, make, model } = this.parent;

      if ((year && make && model) || value) {
        return true;
      }

      return false;
    })
    .test('Verify Vin', genericFormValidationMessage.INVALID_VIN, function(value) {
      if (value && value.length !== VALID_VIN) {
        return false;
      } else {
        return true;
      }
    }),

  mileage: Yup.string()
    .validateWithMaxLimit(MAX_MILEAGE)
    .required(`${displayText.mileage} ${genericFormValidationMessage.IS_REQUIRED}`),
});

export default vehicleFormSchema;
