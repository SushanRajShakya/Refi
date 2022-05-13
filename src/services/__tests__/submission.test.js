import _toString from 'lodash.tostring';
import { conformToMask } from 'react-text-mask';

import userService from '../user';
import networkService from '../network';
import toastUtils from '../../utils/toast';
import { mask } from '../../constants/mask';
import { routes } from '../../constants/routes';
import { userKeys } from '../../constants/keys/user';
import { errorMessage } from '../../constants/message';
import submissionFormService from '../forms/submission';
import { apiEndPoint } from '../../configs/apiEndpoint';
import { httpConstants } from '../../constants/network';
import submissionForm from '../../constants/forms/submission';
import { submissionFormKeys } from '../../constants/keys/submissionForm';

jest.mock('../user');
jest.mock('../network');
jest.mock('react-text-mask');
jest.mock('../../utils/toast');

describe('Service: submissionFormService', () => {
  const dmCustId = 'DM_CUST_123';

  describe('Function: handleSubmit', () => {
    const formikBag = {
      setSubmitting: jest.fn(),
      props: {
        history: [],
      },
    };

    const values = {
      primaryContact: submissionForm.primaryContact.PHONE,
    };

    beforeEach(() => {
      window._kmq = [];
      jest.resetAllMocks();
      formikBag.props.history = [];
      userService.getUserData.mockReturnValue(dmCustId);
      toastUtils.displayError.mockImplementation(jest.fn());
    });

    test('should call userService.getUserData once with specific parameters', () => {
      networkService.makeRequest.mockResolvedValue(true);

      submissionFormService.handleSubmit(values, formikBag);
      expect(userService.getUserData).toHaveBeenCalledTimes(1);
      expect(userService.getUserData).toHaveBeenLastCalledWith(userKeys.DM_CUSTOMER_ID);
    });

    test('should call networkService.makeRequest once with specific parameters', async () => {
      const url = apiEndPoint.savePrimaryContact;
      const postBody = {
        [userKeys.DM_CUSTOMER_ID]: dmCustId,
        [submissionFormKeys.PHONE]: 1,
        [submissionFormKeys.EMAIL]: 0,
      };
      networkService.makeRequest.mockResolvedValue(true);

      await submissionFormService.handleSubmit(values, formikBag);
      expect(networkService.makeRequest).toHaveBeenCalledTimes(1);
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(url, httpConstants.requestMethods.POST, postBody);
    });

    test('should push data into kissMetrics parameter in window when network request resolves', async () => {
      networkService.makeRequest.mockResolvedValue(true);
      await submissionFormService.handleSubmit(values, formikBag);

      expect(window._kmq).toHaveLength(1);
    });

    test('should not push data into kissMetrics parameter in window when network request throws and error', async () => {
      networkService.makeRequest.mockRejectedValue(false);
      await submissionFormService.handleSubmit(values, formikBag);

      expect(window._kmq).toHaveLength(0);
    });

    test('should push Application page route into router history in props when network request resolves', async () => {
      networkService.makeRequest.mockResolvedValue(true);
      await submissionFormService.handleSubmit(values, formikBag);

      expect(formikBag.props.history).toEqual(expect.arrayContaining([routes.APPLICATION]));
    });

    test('should not push Application page route into router history in props when network request throws an error', async () => {
      networkService.makeRequest.mockRejectedValue(false);
      await submissionFormService.handleSubmit(values, formikBag);

      expect(formikBag.props.history).toHaveLength(0);
    });

    test('should call toastUtils.displayError if network request throws an error', async () => {
      networkService.makeRequest.mockRejectedValue(false);
      await submissionFormService.handleSubmit(values, formikBag);

      expect(toastUtils.displayError).toHaveBeenCalledTimes(1);
    });

    test('should call toastUtils.displayError with specific parameter when network request throws an error', async () => {
      networkService.makeRequest.mockRejectedValue(false);
      await submissionFormService.handleSubmit(values, formikBag);

      expect(toastUtils.displayError).toHaveBeenLastCalledWith(errorMessage.submissionForm.SUBMITTING_APPLICATION_FORM);
    });

    test('should call setSubmitting once with specific arguments', async () => {
      networkService.makeRequest.mockResolvedValue(true);
      await submissionFormService.handleSubmit(values, formikBag);

      expect(formikBag.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikBag.setSubmitting).toHaveBeenLastCalledWith(false);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: getSubmissionFormValues', () => {
    const result = {
      data: {
        items: ['Data'],
      },
    };

    beforeEach(() => {
      jest.resetAllMocks();
      userService.getUserData.mockReturnValue(dmCustId);
      networkService.makeRequest.mockResolvedValue(result);

      submissionFormService.prepareSubmissionFormValues = jest
        .spyOn(submissionFormService, 'prepareSubmissionFormValues')
        .mockImplementation(value => value);
    });

    test('should call userService.getUserData once with specific parameter', () => {
      submissionFormService.getSubmissionFormValues();

      expect(userService.getUserData).toHaveBeenCalledTimes(1);
      expect(userService.getUserData).toHaveBeenLastCalledWith(userKeys.DM_CUSTOMER_ID);
    });

    test('should call networkService.makeRequest once with specific parameters', async () => {
      const url = `${apiEndPoint.getPrimaryContact}${dmCustId}${httpConstants.DEFAULT_LIMIT}`;

      await submissionFormService.getSubmissionFormValues();

      expect(networkService.makeRequest).toHaveBeenCalledTimes(1);
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(url, httpConstants.requestMethods.GET);
    });

    test('should call submissionFormService.prepareSubmissionFormValues with specific values if network resolves', async () => {
      await submissionFormService.getSubmissionFormValues();

      expect(submissionFormService.prepareSubmissionFormValues).toHaveBeenCalledTimes(1);
      expect(submissionFormService.prepareSubmissionFormValues).toHaveBeenLastCalledWith(result.data.items[0]);
    });

    test('should return a resolved promise with specific data from response data', async () => {
      await expect(submissionFormService.getSubmissionFormValues()).resolves.toBe(result.data.items[0]);
    });

    test('should call submissionFormService.prepareSubmissionFormValues if network request throws an error', async () => {
      networkService.makeRequest.mockRejectedValue(false);

      try {
        await submissionFormService.getSubmissionFormValues();
      } catch (err) {
        expect(submissionFormService.prepareSubmissionFormValues).not.toHaveBeenCalled();
      }
    });

    test('should return a rejected promise with specific error message if there are any exceptions', async () => {
      networkService.makeRequest.mockRejectedValue(false);

      await expect(submissionFormService.getSubmissionFormValues()).rejects.toBe(
        errorMessage.submissionForm.FETCHING_SUBMISSION_FORM
      );
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: prepareSubmissionFormValues', () => {
    const data = {
      [submissionFormKeys.PHONE]: '9999999999',
      [submissionFormKeys.PRIMARY_CONTACT]: 'Phone',
      [submissionFormKeys.EMAIL]: 'email@email.com',
    };

    const mockMaskData = {
      conformedValue: data[submissionFormKeys.PHONE],
    };

    beforeEach(() => {
      jest.resetAllMocks();
      conformToMask.mockReturnValue(mockMaskData);
    });

    test('should call conformToMask with specific parameters', () => {
      submissionFormService.prepareSubmissionFormValues(data);

      expect(conformToMask).toHaveBeenCalledTimes(1);
      expect(conformToMask).toHaveBeenLastCalledWith(_toString(data[submissionFormKeys.PHONE]), mask.PHONE);
    });

    test('should return specific object with specific values', () => {
      const result = {
        phone: data[submissionFormKeys.PHONE],
        primaryContact: data[submissionFormKeys.PRIMARY_CONTACT],
        email: data[submissionFormKeys.EMAIL],
      };

      expect(submissionFormService.prepareSubmissionFormValues(data)).toMatchObject(result);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });
});
