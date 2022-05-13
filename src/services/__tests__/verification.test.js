import userService from '../user';
import networkService from '../network';
import toastUtils from '../../utils/toast';
import { userKeys } from '../../constants/keys/user';
import { errorMessage } from '../../constants/message';
import { apiEndPoint } from '../../configs/apiEndpoint';
import { httpConstants } from '../../constants/network';
import verificationFormService from '../forms/verification';

jest.mock('../user');
jest.mock('../network');
jest.mock('../../utils/toast');

describe('Service: verificationFormService', () => {
  describe('Function: handleSubmit', () => {
    const values = {
      ssn: '1234',
      dobMonth: '11',
      dobDay: '25',
    };

    const dmCustId = 'DM123';

    const formikBag = {
      // These properties are required for the test cases
      props: {
        history: [],
      },
      setSubmitting: jest.fn(),
    };

    describe('Case: When network request resolves', () => {
      const result = {
        data: {
          [userKeys.APPLICATION_ID]: 'App123',
          [userKeys.PROSPECT_ID]: 'Prosp123',
        },
      };

      beforeEach(() => {
        jest.resetAllMocks();
        window._kmq = [];
        formikBag.props.history = [];
        userService.getUserData.mockReturnValue(dmCustId);
        toastUtils.dismissAll.mockImplementation(jest.fn());
        toastUtils.displayError.mockImplementation(jest.fn());
        networkService.makeRequest.mockResolvedValue(result);
        userService.setVerifiedUserData.mockImplementation(jest.fn());
      });

      test(`should call userService.getUserData once with ${userKeys.DM_CUSTOMER_ID} as argument`, async () => {
        await verificationFormService.handleSubmit(values, formikBag);

        expect(userService.getUserData).toHaveBeenCalledTimes(1);
        expect(userService.getUserData).toHaveBeenLastCalledWith(userKeys.DM_CUSTOMER_ID);
      });

      test('should call networkService.makeRequest with specific arguments', async () => {
        const url = `${apiEndPoint.validateSsnDob}${dmCustId}/${values.ssn}/${values.dobMonth}/${values.dobDay}`;

        await verificationFormService.handleSubmit(values, formikBag);

        expect(networkService.makeRequest).toHaveBeenCalledTimes(1);
        expect(networkService.makeRequest).toHaveBeenLastCalledWith(url, httpConstants.requestMethods.GET);
      });

      test('should call userService.setVerifiedUserData once with specific arguments', async () => {
        await verificationFormService.handleSubmit(values, formikBag);

        expect(userService.setVerifiedUserData).toHaveBeenCalledTimes(1);
        expect(userService.setVerifiedUserData).toHaveBeenLastCalledWith(result.data);
      });

      test('should push kissmetrics data into window._kmq', async () => {
        await verificationFormService.handleSubmit(values, formikBag);

        expect(window._kmq).toHaveLength(1);
      });

      test('should call toastUtils.dismissAll to remove all the toast notification after success', async () => {
        await verificationFormService.handleSubmit(values, formikBag);

        expect(toastUtils.dismissAll).toHaveBeenCalledTimes(1);
      });

      test('should change the route of the application to the personal information form page', async () => {
        await verificationFormService.handleSubmit(values, formikBag);

        expect(formikBag.props.history).toHaveLength(1);
      });

      test('should call setSubmitting once at the end', async () => {
        await verificationFormService.handleSubmit(values, formikBag);

        expect(formikBag.setSubmitting).toHaveBeenCalledTimes(1);
        expect(formikBag.setSubmitting).toHaveBeenLastCalledWith(false);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });
    });

    describe('Case: When network request throws an error', () => {
      const error = {
        response: {
          data: {
            message: 'Error Message',
          },
        },
      };

      beforeEach(() => {
        jest.resetAllMocks();
        window._kmq = [];
        formikBag.props.history = [];
        userService.getUserData.mockReturnValue(dmCustId);
        networkService.makeRequest.mockRejectedValue(error);
        toastUtils.dismissAll.mockImplementation(jest.fn());
        toastUtils.displayError.mockImplementation(jest.fn());
        userService.setVerifiedUserData.mockImplementation(jest.fn());
      });

      test('should push kissmetrics data into window._kmq', async () => {
        await verificationFormService.handleSubmit(values, formikBag);

        expect(window._kmq).toHaveLength(1);
      });

      test('should call toastUtils.displayError with specific arguments', async () => {
        const toastConfig = {
          autoClose: false,
        };
        await verificationFormService.handleSubmit(values, formikBag);

        expect(toastUtils.displayError).toHaveBeenCalledTimes(1);
        expect(toastUtils.displayError).toHaveBeenLastCalledWith(error.response.data.message, toastConfig);

        // Case for empty error response default message must be displayed
        networkService.makeRequest.mockRejectedValue({});
        await verificationFormService.handleSubmit(values, formikBag);

        expect(toastUtils.displayError).toHaveBeenLastCalledWith(errorMessage.VERIFYING_SSN_DOB, toastConfig);
      });

      test('should call setSubmitting once at the end', async () => {
        await verificationFormService.handleSubmit(values, formikBag);

        expect(formikBag.setSubmitting).toHaveBeenCalledTimes(1);
        expect(formikBag.setSubmitting).toHaveBeenLastCalledWith(false);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });
    });
  });
});
