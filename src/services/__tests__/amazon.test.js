import React from 'react';

import userService from '../user';
import modalService from '../modal';
import amazonService from '../amazon';
import networkService from '../network';
import { unMask } from '../../constants/mask';
import { unMaskString } from '../../utils/general';
import { userKeys } from '../../constants/keys/user';
import { errorMessage } from '../../constants/message';
import { apiEndPoint } from '../../configs/apiEndpoint';
import { httpConstants } from '../../constants/network';
import { amazonKeys } from '../../constants/keys/amazon';
import RedeemedBlock from '../../components/amazonGiftCard/redeemedBlock';

jest.mock('../modal');
jest.mock('../user');
jest.mock('../network');
jest.mock('../../utils/general');

describe('Service: amazonService', () => {
  const dmCustId = 'DM123';

  describe('Function: handleSubmit', () => {
    const values = {
      code: 'SM123',
      email: 'test@email.com',
      phone: '222-222-2222',
    };

    const unMaskedPhone = '2222222222';

    const formikBag = {
      // These properties are required for the test cases
      props: {
        setIsGiftCardRedeemed: jest.fn(),
        setRedemptionEmail: jest.fn(),
        userData: {},
      },
      setSubmitting: jest.fn(),
      setStatus: jest.fn(),
    };

    describe('Case: When network response is valid', () => {
      beforeEach(() => {
        jest.resetAllMocks();
        window._kmq = [];
        unMaskString.mockImplementation(() => unMaskedPhone);
        userService.getUserData.mockImplementation(() => dmCustId);
        networkService.makeRequest.mockResolvedValue(true);
        modalService.openModal.mockImplementation(jest.fn());
      });

      test('should call userService.getUserData, unMaskString once to get user data and unmask certain values', () => {
        amazonService.handleSubmit(values, formikBag);

        expect(userService.getUserData).toHaveBeenCalledTimes(1);
        expect(unMaskString).toHaveBeenLastCalledWith(values.phone, unMask.numbers);
      });

      test('should have called networkService.makeRequest with specific parameters', () => {
        const reqBody = {
          [amazonKeys.DMCUSTOMER_ID]: dmCustId,
          [amazonKeys.CODE]: values.code.toUpperCase(),
          [amazonKeys.EMAIL]: values.email,
          [amazonKeys.PHONE]: unMaskedPhone,
        };

        amazonService.handleSubmit(values, formikBag);

        expect(networkService.makeRequest).toHaveBeenCalledTimes(1);
        expect(networkService.makeRequest).toHaveBeenLastCalledWith(
          apiEndPoint.validateAmazonCode,
          httpConstants.requestMethods.POST,
          reqBody
        );
      });

      test(`should call props.setIsGiftCardRedeemed and props.setRedemptionEmail with arguments true and ${values.email} if networkService resolves the promise and also push into global._kmq`, async () => {
        await amazonService.handleSubmit(values, formikBag);

        expect(window._kmq).toHaveLength(1);
        expect(formikBag.props.setIsGiftCardRedeemed).toHaveBeenCalledTimes(1);
        expect(formikBag.props.setIsGiftCardRedeemed).toHaveBeenCalledWith(true);
        expect(formikBag.props.setRedemptionEmail).toHaveBeenCalledTimes(1);
        expect(formikBag.props.setRedemptionEmail).toHaveBeenCalledWith(values.email);
      });

      test('should goto next modal after successfull submit', async () => {
        await amazonService.handleSubmit(values, formikBag);

        const updatedProps = {
          ...formikBag.props,
          userData: {
            ...formikBag.props.userData,
            isGiftCardRedeemed: true,
            redemptionEmail: values.email,
          },
        };

        expect(modalService.openModal).toHaveBeenCalledTimes(1);
        expect(modalService.openModal).toHaveBeenLastCalledWith({
          content: <RedeemedBlock {...updatedProps} />,
          className: 'block-amazon-modal',
        });
      });

      test('should call setSubmitting once with boolean value false as an argument', async () => {
        await amazonService.handleSubmit(values, formikBag);

        expect(formikBag.setSubmitting).toHaveBeenCalledTimes(1);
        expect(formikBag.setSubmitting).toHaveBeenLastCalledWith(false);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });
    });

    describe('Case: When network throws an error', () => {
      const error = {
        response: {
          data: {
            message: 'Error message',
          },
        },
      };

      const unprocessableEntityError = {
        response: {
          status: 422,
        },
      };

      beforeEach(() => {
        jest.resetAllMocks();
        window._kmq = [];
        unMaskString.mockImplementation(() => unMaskedPhone);
        userService.getUserData.mockImplementation(() => dmCustId);
        networkService.makeRequest.mockRejectedValue(false);
        modalService.openModal.mockImplementation(jest.fn());
      });

      test('should call setStatus with specific arguments ', async () => {
        await amazonService.handleSubmit(values, formikBag);

        expect(formikBag.setStatus).toHaveBeenCalledTimes(1);
        expect(formikBag.setStatus).toHaveBeenLastCalledWith({
          errorMessage: errorMessage.amazonGiftCard.VALIDATING_CODE,
        });

        // Change the error response and send a message in error data
        networkService.makeRequest.mockRejectedValue(error);
        await amazonService.handleSubmit(values, formikBag);

        expect(formikBag.setStatus).toHaveBeenLastCalledWith({
          errorMessage: error.response.data.message,
        });
      });

      test('should set message specific to UNPROCESSABLE Entity when error status code is 422', async () => {
        // Change the error response and send a message in error data
        networkService.makeRequest.mockRejectedValue(unprocessableEntityError);
        await amazonService.handleSubmit(values, formikBag);

        expect(formikBag.setStatus).toHaveBeenLastCalledWith({
          errorMessage: errorMessage.amazonGiftCard.UNPROCESSABLE_ENTITY,
        });
      });

      test('should push data into global._kmq for Kissmetrics analysis', async () => {
        await amazonService.handleSubmit(values, formikBag);

        expect(window._kmq).toHaveLength(1);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });
    });
  });

  describe('Function: resendGiftCode', () => {
    describe('Case: When network request resolves', () => {
      beforeEach(() => {
        jest.resetAllMocks();
        window._kmq = [];
        networkService.makeRequest.mockResolvedValue(true);
        userService.getUserData.mockImplementation(() => dmCustId);
      });

      test(`should call userService.getUserData once with ${userKeys.DM_CUSTOMER_ID} as argument`, async () => {
        await amazonService.resendGiftCode();

        expect(userService.getUserData).toHaveBeenCalledTimes(1);
        expect(userService.getUserData).toHaveBeenLastCalledWith(userKeys.DM_CUSTOMER_ID);
      });

      test('should call networkService.makeRequest once with specific arguments passed to it', async () => {
        const url = apiEndPoint.validateAmazonCode;
        const reqBody = {
          [amazonKeys.DMCUSTOMER_ID]: dmCustId,
        };
        await amazonService.resendGiftCode();

        expect(networkService.makeRequest).toHaveBeenCalledTimes(1);
        expect(networkService.makeRequest).toHaveBeenLastCalledWith(url, httpConstants.requestMethods.POST, reqBody);
      });

      test('should push Kiss Metrics Data into window._kmq', async () => {
        await amazonService.resendGiftCode();

        expect(window._kmq).toHaveLength(1);
      });

      test('should resolve true if successfull', () => {
        expect(amazonService.resendGiftCode()).resolves.toBeTruthy();
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });
    });

    describe('Case: When network request rejects', () => {
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
        networkService.makeRequest.mockRejectedValue(error);
        userService.getUserData.mockImplementation(() => dmCustId);
      });

      test('should push Kiss Metrics error data into window._kmq', async () => {
        try {
          const result = await amazonService.resendGiftCode();
        } catch (err) {
          expect(window._kmq).toHaveLength(1);
        }
      });

      test('should return specific error message based on the error response from the server', () => {
        expect(amazonService.resendGiftCode()).rejects.toBe(error.response.data.message);

        // Case when error response doesn't consist of specific message send default message
        networkService.makeRequest.mockRejectedValue({});
        expect(amazonService.resendGiftCode()).rejects.toBe(errorMessage.amazonGiftCard.FAILED_RESEND);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });
    });
  });
});
