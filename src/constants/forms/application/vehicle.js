import { textTransform } from '../../general';
import { mask } from '../../mask';

// displayText property is used in the Form Validation error message display.
// field LABELs and displayText are different for few elements so had to seperate them out.

// Consists of all the form elements assosiated with vehicle details.
const vehicleForm = {
  displayText: {
    year: 'Year',
    make: 'Make',
    model: 'Model',
    vin: 'VIN',
    mileage: 'Mileage',
  },
  field: {
    year: {
      LABEL: 'Year',
      MASK: mask.number.FOUR,
      PLACEHOLDER: 'Year',
    },
    make: {
      LABEL: 'Make',
      TYPE: 'text',
      PLACEHOLDER: 'Make',
    },
    model: {
      LABEL: 'Model',
      TYPE: 'text',
      PLACEHOLDER: 'Model',
    },
    vin: {
      LABEL: 'VIN',
      MASK: mask.VIN,
      PLACEHOLDER: 'VIN',
      TEXT_TRANSFORM: textTransform.UPPERCASE,
    },
    mileage: {
      LABEL: 'Mileage *',
      MASK: mask.number.SIX,
      PLACEHOLDER: 'Mileage',
    },
  },
  initialValues: {
    idVehicle: null,
    year: '',
    make: '',
    model: '',
    vin: '',
    trim: '',
    mileage: '',
  },
};

export default vehicleForm;
