import React from 'react';
import _get from 'lodash.get';
import _generateUniqueId from 'uuid';
import _isEmpty from 'lodash.isempty';
import _toString from 'lodash.tostring';

import formService from './index';
import userService from '../user';
import modalService from '../modal';
import networkService from '../network';
import toastUtils from '../../utils/toast';
import { routes } from '../../constants/routes';
import { unMaskString } from '../../utils/general';
import { unMask, mask } from '../../constants/mask';
import { userKeys } from '../../constants/keys/user';
import { apiEndPoint } from '../../configs/apiEndpoint';
import { httpConstants } from '../../constants/network';
import { kissmetrics } from '../../constants/texts/common';
import { MIN_MONTH_HOUSING_HISTORY } from '../../constants/limit';
import vehicleForm from '../../constants/forms/application/vehicle';
import applicantForm from '../../constants/forms/application/applicant';
import employmentForm from '../../constants/forms/application/employment';
import { applicationFormKeys } from '../../constants/keys/applicationForm';
import TermsAndConditions from '../../components/shared/termsAndConditions';
import { genericFormValidationMessage, errorMessage } from '../../constants/message';

/**
 * Hanldes the submission of application form.
 *
 * @param {object} values
 * @param {object} formikBag
 */
const handleSubmit = async (values, formikBag) => {
  const { props, setSubmitting, setStatus } = formikBag;

  const result = await modalService.openModal({
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
  });

  if (result) {
    try {
      const applicationFormData = applicationFormService.prepareApplicationFormSubmitData(values);
      const additionalEmployeeData = applicationFormService.prepareAdditionalEmployerData(values);

      await applicationFormService.saveUserApplicationData(applicationFormData, additionalEmployeeData);

      window._kmq.push([
        'record',
        kissmetrics.CLICK_PERSONNEL_INFO,
        { Hostname: document.location.hostname, 'Visit Site': window.location.pathname + window.location.search },
      ]);
      props.setIsCompleted(true);

      props.history.push(routes.SUBMISSION);
    } catch (err) {
      setStatus({ submissionFailed: true });
      toastUtils.displayError(errorMessage.applicationForm.SUBMITING_APPLICATION_FORM);
    } finally {
      setSubmitting(false);
    }
  } else {
    setSubmitting(false);
  }
};

/**
 * Populate the application form with the data received from the backend.
 */
const populateForm = async () => {
  try {
    const result = await applicationFormService.getUserApplicationData();

    let totalOtherIncome = '';

    if (result.employer.length) {
      totalOtherIncome = formService.applyMaskToValue(
        _get(result, `employer[0][${applicationFormKeys.getApi.TOTAL_OTHER_INCOME}]`, null),
        mask.CURRENCY
      );
    }

    const applicationFormValues = {
      applicant: applicationFormService.populateApplicantForm(result.applicant),
      employment: applicationFormService.populateEmploymentForm(result.employer),
      vehicle: applicationFormService.populateVehicleForm(result.vehicle),
      sourceOfOtherIncome: _toString(
        _get(result, `employer[0][${applicationFormKeys.getApi.SOURCE_OF_OTHER_INCOME}]`, '')
      ),
      totalOtherIncome,
    };

    return Promise.resolve(applicationFormValues);
  } catch (err) {
    return Promise.reject({
      error: errorMessage.applicationForm.FETCHING_APPLICATION_FORM,
    });
  }
};

/**
 * Returns the initial values for an indivisual employer with unique id generated.
 * Unique id is required to pass as a key for react transition group.
 */
const getEmploymentFormInitialValues = () => ({
  ...employmentForm.initialValues,
  uniqueId: _generateUniqueId(),
});

/**
 * Populate applicant form values based on the form config for formik.
 *
 * @param {array} applicantData
 */
const populateApplicantForm = applicantData => {
  if (applicantData && applicantData.length) {
    const keys = applicationFormKeys.getApi.applicant;

    return {
      idApplicant: _toString(applicantData[0][keys.APPLICANT_ID]),
      applicantType: _toString(applicantData[0][keys.APPLICANT_TYPE]),
      ssn: '',
      dob: '',
      firstName: _toString(applicantData[0][keys.FIRST_NAME]),
      middleName: _toString(applicantData[0][keys.MIDDLE_NAME]),
      lastName: _toString(applicantData[0][keys.LAST_NAME]),
      suffix: _toString(applicantData[0][keys.SUFFIX]),
      phone: formService.applyMaskToValue(applicantData[0][keys.PHONE], mask.PHONE),
      email: _toString(applicantData[0][keys.EMAIL]),
      address: _toString(applicantData[0][keys.ADDRESS]),
      address2: _toString(applicantData[0][keys.ADDRESS_2]),
      city: _toString(applicantData[0][keys.CITY]),
      state: _toString(applicantData[0][keys.STATE]),
      zip: _toString(applicantData[0][keys.ZIP]),
      residentialStatus: _toString(applicantData[0][keys.TYPE]),
      rentMortgagePerMonth: formService.applyMaskToValue(applicantData[0][keys.RENT_MORTGAGE], mask.CURRENCY),
      residenceYear: _toString(applicantData[0][keys.RESIDENCE_YEAR]),
      residenceMonth: _toString(applicantData[0][keys.RESIDENCE_MONTH]),
      prevAddress: _toString(applicantData[0][keys.PREV_ADDRESS]),
      prevAddress2: _toString(applicantData[0][keys.PREV_ADDRESS_2]),
      prevCity: _toString(applicantData[0][keys.PREV_CITY]),
      prevState: _toString(applicantData[0][keys.PREV_STATE]),
      prevZip: _toString(applicantData[0][keys.PREV_ZIP]),
      prevResidentialStatus: _toString(applicantData[0][keys.PREV_TYPE]),
      prevRentMortgagePerMonth: formService.applyMaskToValue(applicantData[0][keys.PREV_RENT_MORTGAGE], mask.CURRENCY),
      prevResidenceYear: _toString(applicantData[0][keys.PREV_RESIDENCE_YEAR]),
      prevResidenceMonth: _toString(applicantData[0][keys.PREV_RESIDENCE_MONTH]),
    };
  } else {
    return applicantForm.initialValues;
  }
};

/**
 * Populate employee form values based on the form config for formik.
 *
 * @param {array} employmentData
 */
const populateEmploymentForm = employmentData => {
  if (employmentData && employmentData.length) {
    const keys = applicationFormKeys.getApi.employment;
    const employmentFormValues = [];

    employmentData.forEach(item => {
      employmentFormValues.push({
        idEmployer: _toString(item[keys.EMPLOYER_ID]),
        uniqueId: _generateUniqueId(),
        employer: _toString(item[keys.EMPLOYER]),
        jobTitle: _toString(item[keys.JOB_TITLE]),
        contactName: _toString(item[keys.CONTACT_NAME]),
        contactPhone: formService.applyMaskToValue(item[keys.CONTACT_PHONE], mask.PHONE),
        income: formService.applyMaskToValue(item[keys.INCOME], mask.CURRENCY),
        payPeriod: _toString(item[keys.PAY_PERIOD]),
        employmentType: _toString(item[keys.EMPLOYMENT_TYPE]),
        address: _toString(item[keys.ADDRESS]),
        address2: _toString(item[keys.ADDRESS_2]),
        state: _toString(item[keys.STATE]),
        zip: _toString(item[keys.ZIP]),
        city: _toString(item[keys.CITY]),
        workedYear: _toString(item[keys.WORKED_YEAR]),
        workedMonth: _toString(item[keys.WORKED_MONTH]),
      });
    });

    return employmentFormValues;
  } else {
    return [applicationFormService.getEmploymentFormInitialValues()];
  }
};

/**
 * Populate vehicle form values based on the form config for formik.
 *
 * @param {array} vehicleData
 */
const populateVehicleForm = vehicleData => {
  if (vehicleData && vehicleData.length) {
    const keys = applicationFormKeys.getApi.vehicle;

    return {
      idVehicle: _toString(vehicleData[0][keys.VEHICLE_ID]),
      trim: _toString(vehicleData[0][keys.TRIM]),
      year: _toString(vehicleData[0][keys.YEAR]),
      make: _toString(vehicleData[0][keys.MAKE]),
      model: _toString(vehicleData[0][keys.MODEL]),
      vin: _toString(vehicleData[0][keys.VIN]),
      mileage: _toString(vehicleData[0][keys.MILEAGE]),
    };
  } else {
    return vehicleForm.initialValues;
  }
};

/**
 * Maps the formik values object with the keys for POST request.
 * Prepare the POST body for submitting application form.
 *
 * @param {object} values
 */
const prepareApplicationFormSubmitData = values => {
  const { applicant, employment, vehicle } = values;
  const mainApplicationKeys = applicationFormKeys.postApi.applicationForm;

  return {
    [mainApplicationKeys.PROSPECT_ID]: userService.getVerifiedUserData(userKeys.PROSPECT_ID),
    [mainApplicationKeys.DMCUSTOMER_ID]: userService.getUserData(userKeys.DM_CUSTOMER_ID),
    [mainApplicationKeys.APPLICATION_ID]: userService.getVerifiedUserData(userKeys.APPLICATION_ID),
    [mainApplicationKeys.ID_APPLICANT]: applicant.idApplicant,
    [mainApplicationKeys.APPLICANT_TYPE]: applicant.applicantType.trim(),
    [mainApplicationKeys.FIRST_NAME]: applicant.firstName.trim(),
    [mainApplicationKeys.MIDDLE_NAME]: applicant.middleName.trim(),
    [mainApplicationKeys.LAST_NAME]: applicant.lastName.trim(),
    [mainApplicationKeys.NAME_SUFFIX]: applicant.suffix.trim(),
    [mainApplicationKeys.PHONE]: unMaskString(applicant.phone, unMask.numbers),
    [mainApplicationKeys.SSN]: applicant.ssn,
    [mainApplicationKeys.DOB]: applicant.dob,
    [mainApplicationKeys.EMAIL]: applicant.email.trim(),
    [mainApplicationKeys.ADDRESS]: applicant.address.trim(),
    [mainApplicationKeys.ADDRESS2]: applicant.address2.trim(),
    [mainApplicationKeys.CITY]: applicant.city.trim(),
    [mainApplicationKeys.STATE]: applicant.state.trim(),
    [mainApplicationKeys.ZIP]: applicant.zip.trim(),
    [mainApplicationKeys.ADDRESS_TYPE]: applicant.residentialStatus.trim(),
    [mainApplicationKeys.RENT_MORTGAGE]: unMaskString(applicant.rentMortgagePerMonth, unMask.numbers).trim(),
    [mainApplicationKeys.RESIDENCE_YEARS]: applicant.residenceYear.trim(),
    [mainApplicationKeys.RESIDENCE_MONTHS]: applicant.residenceMonth.trim(),
    [mainApplicationKeys.PREV_ADDRESS]: applicant.prevAddress.trim(),
    [mainApplicationKeys.PREV_ADDRESS2]: applicant.prevAddress2.trim(),
    [mainApplicationKeys.PREV_CITY]: applicant.prevCity.trim(),
    [mainApplicationKeys.PREV_STATE]: applicant.prevState.trim(),
    [mainApplicationKeys.PREV_ZIP]: applicant.prevZip.trim(),
    [mainApplicationKeys.PREV_ADDRESS_TYPE]: applicant.prevResidentialStatus.trim(),
    [mainApplicationKeys.PREV_RENT_MORTGAGE]: unMaskString(applicant.prevRentMortgagePerMonth, unMask.numbers).trim(),
    [mainApplicationKeys.PREV_RESIDENCE_YEARS]: applicant.prevResidenceYear.trim(),
    [mainApplicationKeys.PREV_RESIDENCE_MONTHS]: applicant.prevResidenceMonth.trim(),
    [mainApplicationKeys.ID_EMPLOYER]: employment[0].idEmployer,
    [mainApplicationKeys.EMPLOYER]: employment[0].employer.trim(),
    [mainApplicationKeys.JOB_TITLE]: employment[0].jobTitle.trim(),
    [mainApplicationKeys.CONTACT_NAME]: employment[0].contactName.trim(),
    [mainApplicationKeys.CONTACT_PHONE]: unMaskString(employment[0].contactPhone, unMask.numbers).trim(),
    [mainApplicationKeys.INCOME]: unMaskString(employment[0].income, unMask.numbers).trim(),
    [mainApplicationKeys.TOTAL_OTHER_INCOME]: unMaskString(values.totalOtherIncome, unMask.numbers).trim(),
    [mainApplicationKeys.SOURCE_OF_OTHER_INCOME]: values.sourceOfOtherIncome.trim(),
    [mainApplicationKeys.PAY_PERIOD]: employment[0].payPeriod.trim(),
    [mainApplicationKeys.EMPLOYMENT_TYPE]: employment[0].employmentType.trim(),
    [mainApplicationKeys.EMPLOYER_ADDRESS]: employment[0].address.trim(),
    [mainApplicationKeys.EMPLOYER_ADDRESS2]: employment[0].address2.trim(),
    [mainApplicationKeys.EMPLOYER_CITY]: employment[0].city.trim(),
    [mainApplicationKeys.EMPLOYER_STATE]: employment[0].state.trim(),
    [mainApplicationKeys.EMPLOYER_ZIP]: employment[0].zip.trim(),
    [mainApplicationKeys.WORK_YEARS]: employment[0].workedYear.trim(),
    [mainApplicationKeys.WORK_MONTHS]: employment[0].workedMonth.trim(),
    [mainApplicationKeys.ID_VEHICLE]: vehicle.idVehicle,
    [mainApplicationKeys.VIN]: vehicle.vin.toUpperCase().trim(),
    [mainApplicationKeys.YEAR]: vehicle.year.trim(),
    [mainApplicationKeys.MAKE]: vehicle.make.trim(),
    [mainApplicationKeys.MODEL]: vehicle.model.trim(),
    [mainApplicationKeys.TRIM]: vehicle.trim.trim(),
    [mainApplicationKeys.MILEAGE]: parseInt(vehicle.mileage.trim()),
  };
};

/**
 * Maps the formik values for the additional employee from the formik values object.
 * Prepare the POST body for additional employee in the application form submit.
 *
 * @param {object} values
 */
const prepareAdditionalEmployerData = values => {
  // As we have already added the first employee data in the application form body
  const data = values.employment.slice(1);
  const employerKeys = applicationFormKeys.postApi.saveEmployer;
  const employeeData = [];

  data.forEach(item => {
    employeeData.push({
      [employerKeys.PROSPECT_ID]: userService.getVerifiedUserData(userKeys.PROSPECT_ID),
      [employerKeys.DMCUSTOMER_ID]: userService.getUserData(userKeys.DM_CUSTOMER_ID),
      [employerKeys.APPLICATION_ID]: userService.getVerifiedUserData(userKeys.APPLICATION_ID),
      [employerKeys.ID_EMPLOYER]: item.idEmployer,
      [employerKeys.EMPLOYER]: item.employer.trim(),
      [employerKeys.JOB_TITLE]: item.jobTitle.trim(),
      [employerKeys.CONTACT_NAME]: item.contactName.trim(),
      [employerKeys.EMPLOYMENT_TYPE]: item.employmentType.trim(),
      [employerKeys.CONTACT_PHONE]: unMaskString(item.contactPhone, unMask.numbers).trim(),
      [employerKeys.INCOME]: unMaskString(item.income, unMask.numbers).trim(),
      [employerKeys.PAY_PERIOD]: item.payPeriod.trim(),
      [employerKeys.ADDRESS]: item.address.trim(),
      [employerKeys.ADDRESS2]: item.address2.trim(),
      [employerKeys.CITY]: item.city.trim(),
      [employerKeys.STATE]: item.state.trim(),
      [employerKeys.ZIP]: item.zip.trim(),
      [employerKeys.WORK_YEARS]: item.workedYear.trim(),
      [employerKeys.WORK_MONTHS]: item.workedMonth.trim(),
    });
  });

  return employeeData;
};

/**
 * Returns total months by converting year to month and adding the month of residence of the applicant.
 *
 * @param {object} formData
 */
const calculateHousingHistory = formData => {
  const { residenceYear, residenceMonth } = formData;

  const housingYear = parseInt(residenceYear);
  const housingMonth = parseInt(residenceMonth);
  let totalMonth = 0;

  if (housingYear) {
    // Conversion of years into months.
    totalMonth = totalMonth + housingYear * 12;
  }
  if (housingMonth) {
    totalMonth = totalMonth + housingMonth;
  }

  return totalMonth;
};

/**
 * Yup test case for verifying whether the field is required or not based on current residence year and month.
 * Arrow function cannot be used here as it retains 'this' from the enclosed lexical context.
 *
 * @param {string} formField
 * @param {object} displayText
 */
const getTestRequiredForHousingHistory = function(formField, displayText) {
  return this.test(
    'Verify Housing History for required validation',
    `${displayText[formField]} ${genericFormValidationMessage.IS_REQUIRED}`,
    function(value) {
      const { parent } = this;

      return applicationFormService.calculateHousingHistory(parent) >= MIN_MONTH_HOUSING_HISTORY || !_isEmpty(value);
    }
  );
};

/**
 * Calls the DELETE request and remove the employer from the users application form.
 *
 * @param {string} employerId
 */
const removeEmployer = employerId => {
  if (!_isEmpty(employerId)) {
    const url = `${apiEndPoint.removeEmployer}${employerId}`;

    return networkService.makeRequest(url, httpConstants.requestMethods.DELETE);
  }

  // Just remove the employer from frontend so no need to make HTTP request.
  return Promise.resolve(true);
};

/**
 * Get the application form values of the current user.
 */
const getUserApplicationData = async () => {
  const url = `${apiEndPoint.getUserApplicationData}${userService.getUserData(userKeys.DM_CUSTOMER_ID)}`;

  try {
    const result = await networkService.makeRequest(url, httpConstants.requestMethods.GET);
    const applicationFormData = {
      applicant: result.data.applicant,
      employer: result.data.employer,
      vehicle: result.data.vehicle,
      totalOtherIncome: result.data[applicationFormKeys.getApi.TOTAL_OTHER_INCOME] || '',
      sourceOfOtherIncome: result.data[applicationFormKeys.getApi.SOURCE_OF_OTHER_INCOME] || '',
    };

    return Promise.resolve(applicationFormData);
  } catch (err) {
    return Promise.reject({
      error: errorMessage.applicationForm.FETCHING_APPLICATION_FORM,
    });
  }
};

/**
 * Sends all the requests in a bulk and saves all the application form details in the backend.
 *
 * @param {object} applicationFormData
 * @param {object} additionalEmployerData
 */
const saveUserApplicationData = (applicationFormData, additionalEmployerData) => {
  const url = `${apiEndPoint.saveApplicationForm}`;
  const data = applicationFormData;

  let httpRequests = [networkService.makeRequest(url, httpConstants.requestMethods.POST, data)];

  httpRequests = [
    ...httpRequests,
    ...applicationFormService.getHttpRequestForAdditionalEmployers(additionalEmployerData),
  ];

  return Promise.all(httpRequests);
};

/**
 * Returns an array of promise for http POST request for additional employer data.
 *
 * @param {array} additionalEmployerData
 */
const getHttpRequestForAdditionalEmployers = additionalEmployerData => {
  const httpRequests = [];

  additionalEmployerData.forEach(item => {
    const url = `${apiEndPoint.saveAdditionalEmployers}`;
    const data = item;

    httpRequests.push(networkService.makeRequest(url, httpConstants.requestMethods.POST, data));
  });

  return httpRequests;
};

const applicationFormService = {
  calculateHousingHistory,
  handleSubmit,
  populateForm,
  prepareApplicationFormSubmitData,
  prepareAdditionalEmployerData,
  getTestRequiredForHousingHistory,
  removeEmployer,
  getUserApplicationData,
  saveUserApplicationData,
  getEmploymentFormInitialValues,
  populateApplicantForm,
  populateEmploymentForm,
  populateVehicleForm,
  getHttpRequestForAdditionalEmployers,
};

export default applicationFormService;
