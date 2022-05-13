import React from 'react';
import _generateUniqueId from 'uuid';

import userService from '../user';
import formService from '../forms';
import modalService from '../modal';
import networkService from '../network';
import toastUtils from '../../utils/toast';
import { mask } from '../../constants/mask';
import { unMaskString } from '../../utils/general';
import { userKeys } from '../../constants/keys/user';
import { errorMessage } from '../../constants/message';
import { apiEndPoint } from '../../configs/apiEndpoint';
import { httpConstants } from '../../constants/network';
import applicationFormService from '../forms/application';
import vehicleForm from '../../constants/forms/application/vehicle';
import applicantForm from '../../constants/forms/application/applicant';
import employmentForm from '../../constants/forms/application/employment';
import { applicationFormKeys } from '../../constants/keys/applicationForm';
import TermsAndConditions from '../../components/shared/termsAndConditions';

jest.mock('uuid');
jest.mock('../user');
jest.mock('../forms');
jest.mock('../modal');
jest.mock('../network');
jest.mock('../../utils/toast');
jest.mock('../../utils/general');

describe('Service: applicationFormService', () => {
  const uniqueId = 'UNIQ_123';

  describe('Function: handleSubmit', () => {
    const formikBag = {
      setSubmitting: jest.fn(),
      setStatus: jest.fn(),
      props: {
        setIsCompleted: jest.fn(),
        history: [],
      },
    };

    const values = 'Values';

    const modalData = {
      content: <TermsAndConditions />,
      buttons: {
        accept: {
          text: 'Agree and Continue',
          value: true,
        },
        decline: {
          text: 'I do not agree',
          value: false,
          className: 'btn-error',
        },
      },
      className: 'block-terms-and-cond',
    };

    beforeEach(() => {
      jest.resetAllMocks();
      window._kmq = [];
      formikBag.props.history = [];
      modalService.openModal.mockResolvedValue(true);
      toastUtils.displayError.mockImplementation(jest.fn());
      applicationFormService.prepareAdditionalEmployerData = jest
        .spyOn(applicationFormService, 'prepareAdditionalEmployerData')
        .mockReturnValue(true);
      applicationFormService.prepareApplicationFormSubmitData = jest
        .spyOn(applicationFormService, 'prepareApplicationFormSubmitData')
        .mockReturnValue(true);
      applicationFormService.saveUserApplicationData = jest
        .spyOn(applicationFormService, 'saveUserApplicationData')
        .mockResolvedValue(true);
    });

    test('should call modalService.openModal once with specific parameters', async () => {
      await applicationFormService.handleSubmit(values, formikBag);

      expect(modalService.openModal).toHaveBeenCalledTimes(1);
      expect(modalService.openModal).toHaveBeenLastCalledWith(modalData);
    });

    test('should call applicationFormService.prepareApplicationFormSubmitData once with specific parameter', async () => {
      await applicationFormService.handleSubmit(values, formikBag);

      expect(applicationFormService.prepareApplicationFormSubmitData).toHaveBeenCalledTimes(1);
      expect(applicationFormService.prepareApplicationFormSubmitData).toHaveBeenLastCalledWith(values);
    });

    test('should call applicationFormService.prepareAdditionalEmployerData once with specific parameter', async () => {
      await applicationFormService.handleSubmit(values, formikBag);

      expect(applicationFormService.prepareAdditionalEmployerData).toHaveBeenCalledTimes(1);
      expect(applicationFormService.prepareAdditionalEmployerData).toHaveBeenLastCalledWith(values);
    });

    test('should call applicationFormService.saveUserApplicationData once with specific parameter', async () => {
      await applicationFormService.handleSubmit(values, formikBag);

      expect(applicationFormService.saveUserApplicationData).toHaveBeenCalledTimes(1);
      expect(applicationFormService.saveUserApplicationData).toHaveBeenLastCalledWith(true, true);
    });

    test('should push kiss metrics data into kiss metrics variables if applicationFormService.saveUserApplication resolves', async () => {
      await applicationFormService.handleSubmit(values, formikBag);

      expect(window._kmq).toHaveLength(1);
    });

    test('should push route history to submission page if applicationFormService.saveUserApplication resolves', async () => {
      await applicationFormService.handleSubmit(values, formikBag);

      expect(formikBag.props.history).toHaveLength(1);
    });

    test('should call formikBag.props.setIsCompleted with argument as true boolean value, if applicationFormService.saveUserApplication resolves', async () => {
      await applicationFormService.handleSubmit(values, formikBag);

      expect(formikBag.props.setIsCompleted).toHaveBeenCalledTimes(1);
      expect(formikBag.props.setIsCompleted).toHaveBeenLastCalledWith(true);
    });

    test('should call formikBag.setStatus if network request throws an error', async () => {
      applicationFormService.saveUserApplicationData.mockRejectedValue(false);
      await applicationFormService.handleSubmit(values, formikBag);

      expect(formikBag.setStatus).toHaveBeenCalledTimes(1);
      expect(formikBag.setStatus).toHaveBeenLastCalledWith({
        submissionFailed: true,
      });
    });

    test('should call toastUtils.displayError if any error or exception occurs ', async () => {
      applicationFormService.saveUserApplicationData.mockRejectedValue(false);
      await applicationFormService.handleSubmit(values, formikBag);

      expect(toastUtils.displayError).toHaveBeenCalledTimes(1);
      expect(toastUtils.displayError).toHaveBeenLastCalledWith(errorMessage.applicationForm.SUBMITING_APPLICATION_FORM);
    });

    test('should call formikBag.setSubmitting once with false boolean argument', async () => {
      await applicationFormService.handleSubmit(values, formikBag);

      expect(formikBag.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikBag.setSubmitting).toHaveBeenLastCalledWith(false);
    });

    test('should not call applicationFormService.saveUserApplicationData if modalService.openModal return false or null', async () => {
      modalService.openModal.mockResolvedValue(false);

      await applicationFormService.handleSubmit(values, formikBag);
      expect(applicationFormService.saveUserApplicationData).not.toHaveBeenCalled();
    });

    test('should call formikBag.setSubmitting once if modalService.openModal return false or null', async () => {
      modalService.openModal.mockResolvedValue(false);

      await applicationFormService.handleSubmit(values, formikBag);
      expect(formikBag.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikBag.setSubmitting).toHaveBeenLastCalledWith(false);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: populateForm', () => {
    const income = 5000;
    const sourceOfOtherIncome = 'Others';
    const result = {
      employer: [
        {
          [applicationFormKeys.getApi.TOTAL_OTHER_INCOME]: income,
          [applicationFormKeys.getApi.SOURCE_OF_OTHER_INCOME]: sourceOfOtherIncome,
        },
      ],
      applicant: { value: 'applicant' },
      vehicle: { value: 'vehicle' },
    };

    beforeEach(() => {
      jest.resetAllMocks();
      applicationFormService.getUserApplicationData = jest
        .spyOn(applicationFormService, 'getUserApplicationData')
        .mockResolvedValue(result);
      applicationFormService.populateApplicantForm = jest
        .spyOn(applicationFormService, 'populateApplicantForm')
        .mockReturnValue(result.applicant);
      applicationFormService.populateEmploymentForm = jest
        .spyOn(applicationFormService, 'populateEmploymentForm')
        .mockReturnValue(result.employer);
      applicationFormService.populateVehicleForm = jest
        .spyOn(applicationFormService, 'populateVehicleForm')
        .mockReturnValue(result.vehicle);
      formService.applyMaskToValue.mockReturnValue(income);
    });

    test('should call applicationFormService.getUserApplicationData once', async () => {
      await applicationFormService.populateForm();

      expect(applicationFormService.getUserApplicationData).toHaveBeenCalledTimes(1);
    });

    test('should call formService.applyMastToValue once with specific arguments if employer is not an empty array', async () => {
      await applicationFormService.populateForm();

      expect(formService.applyMaskToValue).toHaveBeenCalledTimes(1);
      expect(formService.applyMaskToValue).toHaveBeenLastCalledWith(
        result.employer[0][applicationFormKeys.getApi.TOTAL_OTHER_INCOME],
        mask.CURRENCY
      );
    });

    test('should not call formService.applyMastToValue if employer is an empty array', async () => {
      applicationFormService.getUserApplicationData.mockResolvedValue({ ...result, employer: [] });
      await applicationFormService.populateForm();

      expect(formService.applyMaskToValue).not.toHaveBeenCalled();
    });

    test('should call applicationFormService.populateApplicantForm once with specific argument', async () => {
      await applicationFormService.populateForm();

      expect(applicationFormService.populateApplicantForm).toHaveBeenCalledTimes(1);
      expect(applicationFormService.populateApplicantForm).toHaveBeenLastCalledWith(result.applicant);
    });

    test('should call applicationFormService.populateEmploymentForm once with specific argument', async () => {
      await applicationFormService.populateForm();

      expect(applicationFormService.populateEmploymentForm).toHaveBeenCalledTimes(1);
      expect(applicationFormService.populateEmploymentForm).toHaveBeenLastCalledWith(result.employer);
    });

    test('should call applicationFormService.populateVehicleForm once with specific argument', async () => {
      await applicationFormService.populateForm();

      expect(applicationFormService.populateVehicleForm).toHaveBeenCalledTimes(1);
      expect(applicationFormService.populateVehicleForm).toHaveBeenLastCalledWith(result.vehicle);
    });

    test('should resolve a specifc data object', async () => {
      await expect(applicationFormService.populateForm()).resolves.toMatchObject({
        applicant: result.applicant,
        employment: result.employer,
        vehicle: result.vehicle,
        sourceOfOtherIncome,
        totalOtherIncome: income,
      });
    });

    test('should reject specific error object when exception occurs ', async () => {
      applicationFormService.getUserApplicationData.mockRejectedValue(false);

      await expect(applicationFormService.populateForm()).rejects.toMatchObject({
        error: errorMessage.applicationForm.FETCHING_APPLICATION_FORM,
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: getEmploymentFormInitialValues', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      _generateUniqueId.mockReturnValue(uniqueId);
    });

    test('should call _generateUniqueId from uuid library once', () => {
      applicationFormService.getEmploymentFormInitialValues();

      expect(_generateUniqueId).toHaveBeenCalledTimes(1);
    });

    test('should return initial values of employement form in personal information form', () => {
      expect(applicationFormService.getEmploymentFormInitialValues()).toMatchObject({
        ...employmentForm.initialValues,
        uniqueId,
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: populateApplicantForm', () => {
    const keys = applicationFormKeys.getApi.applicant;

    const applicantData = [
      {
        [keys.APPLICANT_ID]: 'ID_123',
        [keys.FIRST_NAME]: 'Sushan',
        [keys.MIDDLE_NAME]: 'Raj',
        [keys.LAST_NAME]: 'Shakya',
        [keys.PHONE]: '1234567891',
        [keys.RENT_MORTGAGE]: '1213',
        [keys.PREV_RENT_MORTGAGE]: '1213',
      },
    ];

    beforeEach(() => {
      jest.resetAllMocks();
      formService.applyMaskToValue.mockImplementation((value, mask) => value);
    });

    test('should return default initial values from the constants file if argument passed to it is an empty array', () => {
      const applicantData = [];

      expect(applicationFormService.populateApplicantForm(applicantData)).toMatchObject(applicantForm.initialValues);
    });

    test('should return a specific data object when given a valid argument', () => {
      const expectedResult = {
        idApplicant: applicantData[0][keys.APPLICANT_ID],
        applicantType: '',
        ssn: '',
        dob: '',
        firstName: applicantData[0][keys.FIRST_NAME],
        middleName: applicantData[0][keys.MIDDLE_NAME],
        lastName: applicantData[0][keys.LAST_NAME],
        suffix: '',
        phone: applicantData[0][keys.PHONE],
        email: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        residentialStatus: '',
        rentMortgagePerMonth: applicantData[0][keys.RENT_MORTGAGE],
        residenceYear: '',
        residenceMonth: '',
        prevAddress: '',
        prevAddress2: '',
        prevCity: '',
        prevState: '',
        prevZip: '',
        prevResidentialStatus: '',
        prevRentMortgagePerMonth: applicantData[0][keys.PREV_RENT_MORTGAGE],
        prevResidenceYear: '',
        prevResidenceMonth: '',
      };

      expect(applicationFormService.populateApplicantForm(applicantData)).toMatchObject(expectedResult);
    });

    test('should call formService.applyMaskToValue three times', () => {
      applicationFormService.populateApplicantForm(applicantData);

      expect(formService.applyMaskToValue).toHaveBeenCalledTimes(3);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: populateEmploymentForm', () => {
    const keys = applicationFormKeys.getApi.employment;

    beforeEach(() => {
      jest.resetAllMocks();
      _generateUniqueId.mockReturnValue(uniqueId);
      formService.applyMaskToValue.mockImplementation((value, mask) => value);
    });

    test('should call and return values from applicationFormService.getEmploymentFormInitialValues() if argument passed is an empty string', () => {
      const empData = [];
      applicationFormService.getEmploymentFormInitialValues = jest
        .spyOn(applicationFormService, 'getEmploymentFormInitialValues')
        .mockReturnValue(true);

      expect(applicationFormService.populateEmploymentForm(empData)).toEqual(expect.arrayContaining([true]));
    });

    test('should return a specific array of object with employment data based on the employment data passed to it', () => {
      const empData = [{ [keys.EMPLOYER_ID]: 'Emp_1', [keys.CONTACT_PHONE]: '1234567890', [keys.INCOME]: '123' }];

      const expectedResult = [
        {
          idEmployer: empData[0][keys.EMPLOYER_ID],
          uniqueId: uniqueId,
          employer: '',
          jobTitle: '',
          contactName: '',
          contactPhone: empData[0][keys.CONTACT_PHONE],
          income: empData[0][keys.INCOME],
          payPeriod: '',
          employmentType: '',
          address: '',
          address2: '',
          state: '',
          zip: '',
          city: '',
          workedYear: '',
          workedMonth: '',
        },
      ];

      expect(applicationFormService.populateEmploymentForm(empData)).toEqual(expect.arrayContaining(expectedResult));
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: populateVehicleForm', () => {
    const keys = applicationFormKeys.getApi.vehicle;

    test('should return initialValues from vehicleForm constants if argument is an empty array', () => {
      const vehicleData = [];

      expect(applicationFormService.populateVehicleForm(vehicleData)).toMatchObject(vehicleForm.initialValues);
    });

    test('should return specific object if argument consists of vehicle data', () => {
      const vehicleData = [
        {
          [keys.VEHICLE_ID]: 'VEH_123',
        },
      ];

      const expectedResult = {
        idVehicle: vehicleData[0][keys.VEHICLE_ID],
        trim: '',
        year: '',
        make: '',
        model: '',
        vin: '',
        mileage: '',
      };

      expect(applicationFormService.populateVehicleForm(vehicleData)).toMatchObject(expectedResult);
    });
  });

  describe('Function: prepareApplicationFormSubmitData', () => {
    const keys = applicationFormKeys.postApi.applicationForm;

    // Mock data
    const verifiedUserData = 'PROS_123';
    const dmCustId = 'DM_123';
    const totalOtherIncome = '123123';
    const sourceOfOtherIncome = 'Others';
    const values = {
      applicant: {
        idApplicant: '123123',
        applicantType: '',
        firstName: 'Test',
        middleName: '',
        lastName: 'User',
        suffix: '',
        phone: '1231123123',
        ssn: '',
        dob: '',
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
        prevAddress: '14 Grove Street',
        prevAddress2: '',
        prevCity: '',
        prevState: 'MA',
        prevZip: '',
        prevResidentialStatus: '',
        prevRentMortgagePerMonth: '',
        prevResidenceYear: '',
        prevResidenceMonth: '',
      },
      employment: [
        {
          idEmployer: '123123',
          employer: '',
          jobTitle: '',
          contactName: '',
          contactPhone: '1232131231',
          income: '',
          payPeriod: '',
          employmentType: '',
          address: '144 Massassoit Street',
          address2: '',
          city: '',
          state: '',
          zip: '01231',
          workedYear: '',
          workedMonth: '',
        },
      ],
      vehicle: {
        idVehicle: '123123',
        vin: '',
        year: '2000',
        make: '',
        model: 'Yamaha',
        trim: '',
        mileage: '15000',
      },
      totalOtherIncome,
      sourceOfOtherIncome,
    };

    beforeEach(() => {
      jest.resetAllMocks();
      userService.getUserData.mockReturnValue(dmCustId);
      userService.getVerifiedUserData.mockReturnValue(verifiedUserData);
      unMaskString.mockImplementation((value, mask) => value);
    });

    test('should call userService.getVerifiedUserData twice with specific arguments', () => {
      applicationFormService.prepareApplicationFormSubmitData(values);

      expect(userService.getVerifiedUserData).toHaveBeenCalledTimes(2);
      expect(userService.getVerifiedUserData).toHaveBeenCalledWith(userKeys.PROSPECT_ID);
      expect(userService.getVerifiedUserData).toHaveBeenCalledWith(userKeys.APPLICATION_ID);
    });

    test('should call userService.getUserData once with specific arguments', () => {
      applicationFormService.prepareApplicationFormSubmitData(values);

      expect(userService.getUserData).toHaveBeenCalledTimes(1);
      expect(userService.getUserData).toHaveBeenCalledWith(userKeys.DM_CUSTOMER_ID);
    });

    test('should call unMaskString 6 times', () => {
      applicationFormService.prepareApplicationFormSubmitData(values);

      expect(unMaskString).toHaveBeenCalledTimes(6);
    });

    test('should return a specific object if all the values are provided', () => {
      const result = applicationFormService.prepareApplicationFormSubmitData(values);

      const { applicant, employment, vehicle } = values;
      const expectedResult = {
        [keys.PROSPECT_ID]: verifiedUserData,
        [keys.DMCUSTOMER_ID]: dmCustId,
        [keys.APPLICATION_ID]: verifiedUserData,
        [keys.ID_APPLICANT]: applicant.idApplicant,
        [keys.APPLICANT_TYPE]: applicant.applicantType,
        [keys.FIRST_NAME]: applicant.firstName,
        [keys.MIDDLE_NAME]: applicant.middleName,
        [keys.LAST_NAME]: applicant.lastName,
        [keys.NAME_SUFFIX]: applicant.suffix,
        [keys.PHONE]: applicant.phone,
        [keys.SSN]: applicant.ssn,
        [keys.DOB]: applicant.dob,
        [keys.EMAIL]: applicant.email,
        [keys.ADDRESS]: applicant.address,
        [keys.ADDRESS2]: applicant.address2,
        [keys.CITY]: applicant.city,
        [keys.STATE]: applicant.state,
        [keys.ZIP]: applicant.zip,
        [keys.ADDRESS_TYPE]: applicant.residentialStatus,
        [keys.RENT_MORTGAGE]: applicant.rentMortgagePerMonth,
        [keys.RESIDENCE_YEARS]: applicant.residenceYear,
        [keys.RESIDENCE_MONTHS]: applicant.residenceMonth,
        [keys.PREV_ADDRESS]: applicant.prevAddress,
        [keys.PREV_ADDRESS2]: applicant.prevAddress2,
        [keys.PREV_CITY]: applicant.prevCity,
        [keys.PREV_STATE]: applicant.prevState,
        [keys.PREV_ZIP]: applicant.prevZip,
        [keys.PREV_ADDRESS_TYPE]: applicant.prevResidentialStatus,
        [keys.PREV_RENT_MORTGAGE]: applicant.prevRentMortgagePerMonth,
        [keys.PREV_RESIDENCE_YEARS]: applicant.prevResidenceYear,
        [keys.PREV_RESIDENCE_MONTHS]: applicant.prevResidenceMonth,
        [keys.ID_EMPLOYER]: employment[0].idEmployer,
        [keys.EMPLOYER]: employment[0].employer,
        [keys.JOB_TITLE]: employment[0].jobTitle,
        [keys.CONTACT_NAME]: employment[0].contactName,
        [keys.CONTACT_PHONE]: employment[0].contactPhone,
        [keys.INCOME]: employment[0].income,
        [keys.TOTAL_OTHER_INCOME]: values.totalOtherIncome,
        [keys.SOURCE_OF_OTHER_INCOME]: values.sourceOfOtherIncome,
        [keys.PAY_PERIOD]: employment[0].payPeriod,
        [keys.EMPLOYMENT_TYPE]: employment[0].employmentType,
        [keys.EMPLOYER_ADDRESS]: employment[0].address,
        [keys.EMPLOYER_ADDRESS2]: employment[0].address2,
        [keys.EMPLOYER_CITY]: employment[0].city,
        [keys.EMPLOYER_STATE]: employment[0].state,
        [keys.EMPLOYER_ZIP]: employment[0].zip,
        [keys.WORK_YEARS]: employment[0].workedYear,
        [keys.WORK_MONTHS]: employment[0].workedMonth,
        [keys.ID_VEHICLE]: vehicle.idVehicle,
        [keys.VIN]: vehicle.vin,
        [keys.YEAR]: vehicle.year,
        [keys.MAKE]: vehicle.make,
        [keys.MODEL]: vehicle.model,
        [keys.TRIM]: vehicle.trim,
        [keys.MILEAGE]: parseInt(vehicle.mileage),
      };

      expect(result).toMatchObject(expectedResult);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: prepareAdditionalEmployerData', () => {
    const values = {
      employment: [
        {},
        {
          idEmployer: 'ID_1213',
          employer: '',
          jobTitle: '',
          contactName: '',
          employmentType: '',
          contactPhone: '',
          income: '',
          payPeriod: '',
          address: '',
          address2: '',
          city: '',
          state: '',
          zip: '',
          workedYear: '',
          workedMonth: '',
        },
      ],
    };
    const verifiedUserData = 'DATA_1231';
    const dmCustId = 'ID_123';
    const keys = applicationFormKeys.postApi.saveEmployer;

    beforeEach(() => {
      jest.resetAllMocks();
      userService.getUserData.mockReturnValue(dmCustId);
      unMaskString.mockImplementation((value, mask) => value);
      userService.getVerifiedUserData.mockReturnValue(verifiedUserData);
    });

    test('should call userService.getVerifiedUserData twice with specific arguments', () => {
      applicationFormService.prepareAdditionalEmployerData(values);

      expect(userService.getVerifiedUserData).toHaveBeenCalledTimes(2);
      expect(userService.getVerifiedUserData).toHaveBeenCalledWith(userKeys.PROSPECT_ID);
      expect(userService.getVerifiedUserData).toHaveBeenCalledWith(userKeys.APPLICATION_ID);
    });

    test('should call userService.getUserData once with specific argument', () => {
      applicationFormService.prepareAdditionalEmployerData(values);

      expect(userService.getUserData).toHaveBeenCalledTimes(1);
      expect(userService.getUserData).toHaveBeenLastCalledWith(userKeys.DM_CUSTOMER_ID);
    });

    test('should return a specific array of object based on the argument passed', () => {
      const result = applicationFormService.prepareAdditionalEmployerData(values);
      const expectedResult = [
        {
          [keys.PROSPECT_ID]: verifiedUserData,
          [keys.DMCUSTOMER_ID]: dmCustId,
          [keys.APPLICATION_ID]: verifiedUserData,
          [keys.ID_EMPLOYER]: values.employment[1].idEmployer,
          [keys.EMPLOYER]: values.employment[1].employer,
          [keys.JOB_TITLE]: values.employment[1].jobTitle,
          [keys.CONTACT_NAME]: values.employment[1].contactName,
          [keys.EMPLOYMENT_TYPE]: values.employment[1].employmentType,
          [keys.CONTACT_PHONE]: values.employment[1].contactPhone,
          [keys.INCOME]: values.employment[1].income,
          [keys.PAY_PERIOD]: values.employment[1].payPeriod,
          [keys.ADDRESS]: values.employment[1].address,
          [keys.ADDRESS2]: values.employment[1].address2,
          [keys.CITY]: values.employment[1].city,
          [keys.STATE]: values.employment[1].state,
          [keys.ZIP]: values.employment[1].zip,
          [keys.WORK_YEARS]: values.employment[1].workedYear,
          [keys.WORK_MONTHS]: values.employment[1].workedMonth,
        },
      ];

      expect(result).toEqual(expect.arrayContaining(expectedResult));
    });

    test('should return an empty array if the argument was an array of length less than 2', () => {
      expect(applicationFormService.prepareAdditionalEmployerData({ employment: [{}] })).toHaveLength(0);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: calculateHousingHistory', () => {
    test('should return total months when residence year and month is passed as properties to it in an object', () => {
      const formData = {
        residenceYear: '2',
        residenceMonth: '5',
      };
      const expectedResult = 29;

      expect(applicationFormService.calculateHousingHistory(formData)).toBe(expectedResult);
    });

    test('should return only 11 when year is null and month 11 is passed as properties to it in an object', () => {
      const formData = {
        residenceMonth: '11',
        residenceYear: null,
      };

      expect(applicationFormService.calculateHousingHistory(formData)).toBe(parseInt(formData.residenceMonth));
    });

    test('should return 0 if an empty object is passed as an argument', () => {
      expect(applicationFormService.calculateHousingHistory({})).toBe(0);
    });
  });

  describe('Function: getTestRequiredForHousingHistory', () => {
    // Created a mock schema similar to Yup for Formik
    class MockYupSchemaClass {
      constructor(value, housingHistory) {
        this.value = value;
        this.parent = housingHistory;
      }

      // Mock test function requires three arguments name, message and a function for a test suite
      test = (name, message, func) => {
        class MockClass {
          constructor(value, parent, func) {
            this.value = value;
            this.parent = parent;
            this.func = func;
          }
        }

        const mockInstance = new MockClass(this.value, this.parent, func);

        return mockInstance.func(this.value);
      };

      getTestRequiredForHousingHistory = applicationFormService.getTestRequiredForHousingHistory;
    }

    const formField = 'Address';
    const displayText = 'Test Text';

    beforeEach(() => {
      jest.resetAllMocks();
      applicationFormService.calculateHousingHistory = jest
        .spyOn(applicationFormService, 'calculateHousingHistory')
        .mockImplementation(value => value);
    });

    test(`should return true if formFieldValue is not an empty string`, () => {
      const formFieldValue = 'Sushan';
      const housingHistory = 5; // Number of months stayed in the current residence
      const mockInstanceOfSchema = new MockYupSchemaClass(formFieldValue, housingHistory);

      expect(mockInstanceOfSchema.getTestRequiredForHousingHistory(formField, displayText)).toBeTruthy();
    });

    test(`should return true if housing history is more than 12 months`, () => {
      const formFieldValue = '';
      const housingHistory = 15; // Number of months stayed in the current residence
      const mockInstanceOfSchema = new MockYupSchemaClass(formFieldValue, housingHistory);

      expect(mockInstanceOfSchema.getTestRequiredForHousingHistory(formField, displayText)).toBeTruthy();
    });

    test(`should return false if housing history is less than 12 months and formFieldValue is an empty string`, () => {
      const formFieldValue = '';
      const housingHistory = 11; // Number of months stayed in the current residence
      const mockInstanceOfSchema = new MockYupSchemaClass(formFieldValue, housingHistory);

      expect(mockInstanceOfSchema.getTestRequiredForHousingHistory(formField, displayText)).toBeFalsy();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: removeEmployer', () => {
    const employerId = 'EMP_123';

    beforeEach(() => {
      jest.resetAllMocks();
      networkService.makeRequest.mockResolvedValue(true);
    });

    test('should call networkService.makeRequest once with specific arguments if argument passed to it is not empty', async () => {
      const expectedUrl = `${apiEndPoint.removeEmployer}${employerId}`;

      await applicationFormService.removeEmployer(employerId);

      expect(networkService.makeRequest).toHaveBeenCalledTimes(1);
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(expectedUrl, httpConstants.requestMethods.DELETE);
    });

    test('should not call networkService.makeRequest if argument passed to it is empty', async () => {
      await applicationFormService.removeEmployer(null);

      expect(networkService.makeRequest).not.toHaveBeenCalled();
    });

    test('should return Promise.resolve(true) when argument passed to it is empty', () => {
      expect(applicationFormService.removeEmployer(null)).resolves.toBeTruthy();
    });

    test('should return resolved promise as true if network response is true', () => {
      expect(applicationFormService.removeEmployer(employerId)).resolves.toBeTruthy();
    });

    test('should return rejected false if network response is false', async () => {
      networkService.makeRequest.mockRejectedValue(false);

      try {
        const result = await applicationFormService.removeEmployer(employerId);
      } catch (err) {
        expect(err).toBeFalsy();
      }
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: getUserApplicationData', () => {
    const dmCustId = 'CUS_123';
    const response = {
      data: {
        applicant: {
          id: 123,
        },
        employer: {
          id: 123,
        },
        vehicle: {
          id: 123,
        },
      },
    };

    beforeEach(() => {
      jest.resetAllMocks();
      userService.getUserData.mockReturnValue(dmCustId);
      networkService.makeRequest.mockResolvedValue(response);
    });

    test('should call userService.getUserData once to get dm_customer_id', () => {
      applicationFormService.getUserApplicationData();

      expect(userService.getUserData).toHaveBeenCalledTimes(1);
      expect(userService.getUserData).toHaveBeenLastCalledWith(userKeys.DM_CUSTOMER_ID);
    });

    test('should call networkService.makeRequest once with specific arguments', () => {
      const expectedUrl = `${apiEndPoint.getUserApplicationData}${dmCustId}`;

      applicationFormService.getUserApplicationData();

      expect(networkService.makeRequest).toHaveBeenCalledTimes(1);
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(expectedUrl, httpConstants.requestMethods.GET);
    });

    test('should return a resolved promise which should match specific object if network response is valid', () => {
      const expectedResult = {
        applicant: response.data.applicant,
        employer: response.data.employer,
        vehicle: response.data.vehicle,
        totalOtherIncome: '',
        sourceOfOtherIncome: '',
      };

      expect(applicationFormService.getUserApplicationData()).resolves.toMatchObject(expectedResult);
    });

    test('should return a resolved promise which should match specific object if network response is valid', () => {
      networkService.makeRequest.mockRejectedValue(false);

      const expectedError = {
        error: errorMessage.applicationForm.FETCHING_APPLICATION_FORM,
      };

      expect(applicationFormService.getUserApplicationData()).rejects.toMatchObject(expectedError);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: saveUserApplicationData', () => {
    const url = apiEndPoint.saveApplicationForm;
    const reqBody = {
      data: '123',
    };

    beforeEach(() => {
      jest.resetAllMocks();
      networkService.makeRequest.mockResolvedValue(true);
      applicationFormService.getHttpRequestForAdditionalEmployers = jest
        .spyOn(applicationFormService, 'getHttpRequestForAdditionalEmployers')
        .mockReturnValue([]);
    });

    test('should call networkRequest.makeRequest once with specific arguments', () => {
      applicationFormService.saveUserApplicationData(reqBody, []);

      expect(networkService.makeRequest).toHaveBeenCalledTimes(1);
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(url, httpConstants.requestMethods.POST, reqBody);
    });

    test('should call applicationFormService.getHttpRequestForAdditionalEmployers once with specific argument', () => {
      applicationFormService.saveUserApplicationData(reqBody, []);

      expect(applicationFormService.getHttpRequestForAdditionalEmployers).toHaveBeenCalledTimes(1);
      expect(applicationFormService.getHttpRequestForAdditionalEmployers).toHaveBeenLastCalledWith([]);
    });

    test('should return Promise.all resolved to true when network response is true', () => {
      expect(applicationFormService.saveUserApplicationData(reqBody, [])).resolves.toBeTruthy();
    });

    test('should return Promise.all of httpRequests rejected to false when network response is false', () => {
      networkService.makeRequest.mockRejectedValue(false);

      expect(applicationFormService.saveUserApplicationData(reqBody, [])).rejects.toBeFalsy();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: getHttpRequestForAdditionalEmployers', () => {
    const url = apiEndPoint.saveAdditionalEmployers;
    const empData = [1, 2, 3, 4];

    beforeEach(() => {
      jest.resetAllMocks();
      networkService.makeRequest.mockResolvedValue(true);
    });

    test('should call networkService.makeRequest 4 times if argument passed is an array of length 4', () => {
      applicationFormService.getHttpRequestForAdditionalEmployers(empData);

      expect(networkService.makeRequest).toHaveBeenCalledTimes(4);
    });

    test('should call networkService.makeRequest with specific arguments when called if argument passed is an empty array', () => {
      const singleEmpData = [1];
      applicationFormService.getHttpRequestForAdditionalEmployers(singleEmpData);

      expect(networkService.makeRequest).toHaveBeenLastCalledWith(url, httpConstants.requestMethods.POST, empData[0]);
    });

    test('should return an array of promise with length 4 if argument consists of 4 elements', () => {
      expect(applicationFormService.getHttpRequestForAdditionalEmployers(empData)).toHaveLength(4);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });
});
