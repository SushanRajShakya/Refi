import 'jest-localstorage-mock';
import _join from 'lodash.join';

import userService from '../user';
import networkService from '../network';
import storageUtils from '../../utils/storage';
import { userKeys } from '../../constants/keys/user';
import { isUserValid } from '../../constants/general';
import { errorMessage } from '../../constants/message';
import { apiEndPoint } from '../../configs/apiEndpoint';
import { httpConstants } from '../../constants/network';
import { storageKeys } from '../../constants/keys/storage';
import { landingPageKeys } from '../../constants/keys/landingPage';

jest.mock('../network');
jest.mock('../../utils/storage');

describe('Service: userService', () => {
  describe('Function: getUserData', () => {
    const testData = {
      name: 'Test User',
      age: '25',
      gender: 'Male',
    };

    beforeAll(() => {
      jest.resetAllMocks();
      sessionStorage.setItem(storageKeys.USER, JSON.stringify(testData));
      storageUtils.getItemFromSessionStorage.mockImplementation((argument = null) => JSON.stringify(testData));
    });

    test('should call storageUtils.getItemFromSessionStorage once to fetch the user data', () => {
      userService.getUserData();

      expect(storageUtils.getItemFromSessionStorage).toHaveBeenCalledTimes(1);
    });

    test('should return specific user data based on the argument passed to it', () => {
      const output = userService.getUserData('name');

      expect(output).toBe(testData.name);
    });

    test('should return whole user data if null/undefined/no argument is passed to it', () => {
      const output = userService.getUserData();

      expect(output).toMatchObject(testData);
    });
  });

  describe('Function: setUserData', () => {
    const testData = {
      name: 'Test User',
      age: 25,
    };

    beforeEach(() => {
      jest.resetAllMocks();
      storageUtils.setItemToSessionStorage.mockImplementation((key, data) => sessionStorage.setItem(key, data));
    });

    test('should call stirageUtils,setItemToSessionStorage only once', () => {
      userService.setUserData(testData);

      expect(storageUtils.setItemToSessionStorage).toHaveBeenCalledTimes(1);
    });

    test('should call stirageUtils,setItemToSessionStorage with specific arguments', () => {
      userService.setUserData(testData);

      expect(storageUtils.setItemToSessionStorage).toHaveBeenLastCalledWith(storageKeys.USER, JSON.stringify(testData));
    });
  });

  describe('Function: getFirstName', () => {
    test('should return empty string if empty string is passed as argument', () => {
      const output = userService.getFirstName('');

      expect(output).toBe('');
    });

    test('should return the first name by splitting the full name', () => {
      expect(userService.getFirstName('Test Name')).toBe('Test');
      expect(userService.getFirstName('Sushan Raj Shakya')).toBe('Sushan');
      expect(userService.getFirstName('Leapfrog Technology')).toBe('Leapfrog');
    });
  });

  describe('Function: setSpecificUserData', () => {
    const testData = {
      name: 'Test User',
      job: 'Engineer',
      age: '25',
      gender: 'Male',
    };

    const key = 'name';
    const value = 'New Test User';

    beforeEach(() => {
      userService.getUserData = jest.spyOn(userService, 'getUserData').mockImplementation(() => testData);
      userService.setUserData = jest.spyOn(userService, 'setUserData').mockImplementation(data => data);
    });

    test('should call userService.getUserData only once', () => {
      userService.setSpecificUserData(key, value);

      expect(userService.getUserData).toHaveBeenCalledTimes(1);
    });

    test('should call userService.setUserData only once', () => {
      userService.setSpecificUserData(key, value);

      expect(userService.setUserData).toHaveBeenCalledTimes(1);
    });

    test('should call userService.setUserData with changed arguments arguments', () => {
      userService.setSpecificUserData(key, value);

      expect(userService.setUserData).toHaveBeenLastCalledWith({ ...testData, [key]: value });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: getVerifiedUserData', () => {
    const testData = {
      name: 'Test User',
      age: '25',
      gender: 'Male',
    };

    beforeAll(() => {
      jest.resetAllMocks();
      sessionStorage.setItem(storageKeys.VERIFIED_USER, JSON.stringify(testData));
      storageUtils.getItemFromSessionStorage.mockImplementation((argument = null) => JSON.stringify(testData));
    });

    test('should call storageUtils.getItemFromSessionStorage once to fetch the verified user data', () => {
      userService.getVerifiedUserData();

      expect(storageUtils.getItemFromSessionStorage).toHaveBeenCalledTimes(1);
    });

    test('should return specific verified user data based on the argument passed to it', () => {
      const output = userService.getVerifiedUserData('name');

      expect(output).toBe(testData.name);
    });

    test('should return whole verified user data if null/undefined/no argument is passed to it', () => {
      const output = userService.getVerifiedUserData();

      expect(output).toMatchObject(testData);
    });
  });

  describe('Function: setVerifiedUserData', () => {
    const testData = {
      name: 'Test User',
      age: 25,
    };

    beforeEach(() => {
      jest.resetAllMocks();
      storageUtils.setItemToSessionStorage.mockImplementation((key, data) => sessionStorage.setItem(key, data));
    });

    test('should call stirageUtils,setItemToSessionStorage only once', () => {
      userService.setVerifiedUserData(testData);

      expect(storageUtils.setItemToSessionStorage).toHaveBeenCalledTimes(1);
    });

    test('should call stirageUtils,setItemToSessionStorage with specific arguments', () => {
      userService.setVerifiedUserData(testData);

      expect(storageUtils.setItemToSessionStorage).toHaveBeenLastCalledWith(
        storageKeys.VERIFIED_USER,
        JSON.stringify(testData)
      );
    });
  });

  describe('Function: validateCustomerToken', () => {
    // Mock response data from the server
    const resp = {
      data: {
        [userKeys.OFFER_EXPIRY_DATE]: 'NOVEMBER 15th',
        [userKeys.FULL_NAME]: 'Test User',
        [userKeys.IS_EXPIRED]: 1,
        [userKeys.IS_COMPLETED]: 1,
        [userKeys.IS_USER_VALID]: 1,
        [userKeys.REDEMPTION_EMAIL]: 'test@email.com',
        [userKeys.IS_GIFT_CARD_REDEEMED]: 1,
        [userKeys.REDEEM_CODE_AVAILABLE]: 0,
      },
    };

    // Mock error response from the server
    const errorResp = {
      response: {
        data: {
          [userKeys.IS_USER_VALID]: false,
          [userKeys.IS_COMPLETED]: false,
        },
      },
    };

    const token = 'TOKEN_1234';

    const expectedOutput = {
      [userKeys.FULL_NAME]: 'Test User',
      [userKeys.OFFER_EXPIRY_DATE]: 'November 15th',
      [userKeys.IS_EXPIRED]: true,
      [userKeys.IS_COMPLETED]: true,
      [userKeys.IS_USER_VALID]: 1,
      [userKeys.REDEMPTION_EMAIL]: 'test@email.com',
      [userKeys.IS_GIFT_CARD_REDEEMED]: true,
      [userKeys.REDEEM_CODE_AVAILABLE]: false,
      [userKeys.DM_CUSTOMER_ID]: token,
    };

    beforeEach(() => {
      jest.resetAllMocks();
      window._kmq = [];
    });

    test('should call networkService.makeRequest only once with specific arguments', async () => {
      networkService.makeRequest.mockResolvedValue(resp);
      await userService.validateCustomerToken(token);
      const url = `${apiEndPoint.validateCustomerToken}${token}`;

      expect(networkService.makeRequest).toHaveBeenCalledTimes(1);
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(url, httpConstants.requestMethods.GET);
    });

    test('should push the token into _kmq property of window', async () => {
      networkService.makeRequest.mockResolvedValue(resp);
      await userService.validateCustomerToken(token);

      expect(window._kmq.length).toBe(1);
    });

    test('should resolve a prepared data object from the response data for the frontend to be used', async () => {
      networkService.makeRequest.mockResolvedValue(resp);

      const result = await userService.validateCustomerToken(token);
      expect(result).toMatchObject(expectedOutput);
    });

    test('should call networkService.getErrorResponseData with specific error response from networkService.makeRequest', async () => {
      networkService.makeRequest.mockRejectedValue(errorResp);
      networkService.getErrorResponseData.mockImplementation(() => null);

      try {
        await userService.validateCustomerToken(token);
      } catch (err) {
        expect(networkService.getErrorResponseData).toHaveBeenLastCalledWith(errorResp);
      }
    });

    test('should reject a promise and return specifc error based on the error response sent from the server', async () => {
      networkService.makeRequest.mockRejectedValue(errorResp);
      networkService.getErrorResponseData.mockImplementation(() => null);

      try {
        await userService.validateCustomerToken(token);
      } catch (err) {
        expect(err).toMatchObject(errorResp);
      }

      // CASE when error response consists of data
      networkService.makeRequest.mockRejectedValue(errorResp);
      networkService.getErrorResponseData.mockImplementation(err => err.response.data);

      try {
        await userService.validateCustomerToken(token);
      } catch (err) {
        expect(err).toMatchObject(errorResp.response);
      }
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: getLandingPageTemplate', () => {
    const testData = {
      name: 'Test User',
      job: 'Engineer',
      age: '25',
      gender: 'Male',
      [userKeys.DM_CUSTOMER_ID]: '$$$$',
    };

    const offerList = [
      'Take out cash up to <b>$400</b> now.',
      'Reduce your current APR to <b>17.56</b>%.',
      'Slash your auto loan payment by more than <b>$70</b> every month.',
    ];

    const offers = {
      [landingPageKeys.OFFER_KEY]: _join(offerList, landingPageKeys.OFFER_SPLIT_KEY),
    };

    const headers = {
      [landingPageKeys.HEADER]: 'You have been pre-selected for a special auto refinancing offer',
      [landingPageKeys.SUB_HEADER]: 'Put money back in your pocket',
    };

    const titles = {
      [landingPageKeys.TITLE]: 'REFINANCE YOUR AUTO LOAN WITH US TODAY.',
      [landingPageKeys.SUB_TITLE]:
        'Bipen, You are pre-approved to reduce your current rate, lower your payments, and even get a cash advance.',
    };

    const resp = {
      data: {
        [landingPageKeys.OFFERS]: [offers],
        [landingPageKeys.HEADER_BLOCK]: [headers],
        [landingPageKeys.TITLES]: [titles],
      },
    };

    const isUserValidFlag = 1;

    beforeEach(() => {
      jest.resetAllMocks();
      userService.getUserData = jest.spyOn(userService, 'getUserData').mockImplementation(() => testData);
    });

    test('should call userService.getUserData once to fetch the userData', async () => {
      networkService.makeRequest.mockImplementation(() => resp);

      await userService.getLandingPageTemplate(isUserValidFlag);
      expect(userService.getUserData).toHaveBeenCalledTimes(1);
    });

    test('should call networkService.makeRequest once', async () => {
      networkService.makeRequest.mockImplementation(() => resp);

      await userService.getLandingPageTemplate(isUserValidFlag);
      expect(networkService.makeRequest).toHaveBeenCalledTimes(1);
    });

    test('should call networkService.makeRequest once', async () => {
      networkService.makeRequest.mockImplementation(() => resp);

      await userService.getLandingPageTemplate(isUserValidFlag);
      expect(networkService.makeRequest).toHaveBeenCalledTimes(1);
    });

    test('should call networkService.makeRequest with specific url based on the isUserValidFlag value and userData', async () => {
      networkService.makeRequest.mockImplementation(() => resp);

      const reqType = httpConstants.requestMethods.GET;
      const url = apiEndPoint.pageTemplate;
      // Case when isUserValidFlag is for Valid Users
      await userService.getLandingPageTemplate(isUserValidFlag);
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(
        `${url}${testData[userKeys.DM_CUSTOMER_ID]}`,
        reqType
      );

      // Case when isUserValidFlag is for Invalid Users
      await userService.getLandingPageTemplate(isUserValid.INVALID_USER);
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(`${url}${isUserValid.INVALID_USER}`, reqType);

      // Case when isUserValidFlag is for Valid Users
      await userService.getLandingPageTemplate(isUserValid.DEFAULT_USER);
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(`${url}${isUserValid.DEFAULT_USER}`, reqType);

      // Case when userData is null/undefined
      userService.getUserData = jest.spyOn(userService, 'getUserData').mockImplementation(() => null);
      await userService.getLandingPageTemplate(isUserValid.DEFAULT_USER);
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(`${url}${isUserValid.DEFAULT_USER}`, reqType);
    });

    test('should prepare a specific data to resolve a promise from the response data when response is valid', () => {
      networkService.makeRequest.mockResolvedValue(resp);
      const expectedOutput = {
        offers: offerList,
        headers,
        titles,
      };
      expect(userService.getLandingPageTemplate(isUserValidFlag)).resolves.toMatchObject(expectedOutput);
    });

    test('should reject a promise when the server throws an error', () => {
      networkService.makeRequest.mockRejectedValue(false);

      expect(userService.getLandingPageTemplate(isUserValidFlag)).rejects.toBe(errorMessage.FETCHING_PAGE_TEMPLATE);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: getTestimonials', () => {
    const responseData = {
      data: {
        items: [
          {
            header: 'headers',
            body: 'body',
            footer: 'footer',
          },
        ],
      },
    };

    beforeEach(() => {
      jest.restoreAllMocks();
    });

    test('should call networkService.makeRequest with specific arguments', async () => {
      networkService.makeRequest.mockResolvedValue(responseData);
      const res = await userService.getTestimonials();
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(
        apiEndPoint.getTestimonials,
        httpConstants.requestMethods.GET
      );
    });

    test('should resolve promise and send testimonial data from networkService.makeRequest if it is resolved', () => {
      networkService.makeRequest.mockResolvedValue(responseData);
      expect(userService.getTestimonials()).resolves.toMatchObject(responseData.data.items[0]);
    });

    test('should reject promise and send specific error message if networkService.makeRequest is not resolved ', () => {
      networkService.makeRequest.mockRejectedValue(errorMessage.FETCHING_PAGE_TEMPLATE);
      expect(userService.getTestimonials()).rejects.toBe(errorMessage.FETCHING_PAGE_TEMPLATE);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });
});
