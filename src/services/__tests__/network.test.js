import networkService from '../network';
import { error } from '../../constants/notification';
import { httpConstants } from '../../constants/network';
import PublicAxiosInstance from '../../interceptors/publicAxiosInstance';

jest.mock('../../interceptors/publicAxiosInstance');

describe('Service: networkService', () => {
  describe('Function: makeRequest', () => {
    const reqMethods = httpConstants.requestMethods;
    const url = 'url';
    const data = {};

    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('should call PublicAxiosInstance.post request when method argument is POST method', async () => {
      PublicAxiosInstance.post.mockResolvedValue(true);

      const result = await networkService.makeRequest(url, reqMethods.POST, data);
      expect(PublicAxiosInstance.post).toHaveBeenLastCalledWith(url, data);
    });

    test('should call PublicAxiosInstance.put request when method argument is PUT method', async () => {
      PublicAxiosInstance.put.mockResolvedValue(true);

      const result = await networkService.makeRequest(url, reqMethods.PUT, data);
      expect(PublicAxiosInstance.put).toHaveBeenLastCalledWith(url, data);
    });

    test('should call PublicAxiosInstance.delete request when method argument is POST method', async () => {
      PublicAxiosInstance.delete.mockResolvedValue(true);

      const result = await networkService.makeRequest(url, reqMethods.DELETE);
      expect(PublicAxiosInstance.delete).toHaveBeenLastCalledWith(url);
    });

    test('should call PublicAxiosInstance.get request when method argument is POST method', async () => {
      PublicAxiosInstance.get.mockResolvedValue(true);

      const result = await networkService.makeRequest(url, reqMethods.GET);
      expect(PublicAxiosInstance.get).toHaveBeenLastCalledWith(url, { params: { ...data } });
    });

    test('should include data object as an argument in the delete request made by PublicAxiosInstance.delete when data is not null', async () => {
      PublicAxiosInstance.delete.mockResolvedValue(true);

      const result = await networkService.makeRequest(url, reqMethods.DELETE, data);
      expect(PublicAxiosInstance.delete).toHaveBeenLastCalledWith(url, { data: { ...data } });
    });
    test('should not inlude data object as an argument in the delete request made by PublicAxiosInstance.delete when data is null', async () => {
      PublicAxiosInstance.delete.mockResolvedValue(true);

      const result = await networkService.makeRequest(url, reqMethods.DELETE);
      expect(PublicAxiosInstance.delete).toHaveBeenLastCalledWith(url);
    });

    test('should return a rejected promise with specific error message if the method argument passed to it is not a request method', async () => {
      expect(networkService.makeRequest(url, 'RANDOM_TEXT', data)).rejects.toBe(error.INVALID_REQUEST_METHOD);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: handleError', () => {
    test('should error when error has a response status other than 404 or undefined or null', () => {
      const error = {
        response: {
          status: 400,
        },
      };
      const result = networkService.handleError(error);
      expect(result).toMatchObject(error);
    });

    test(`should add '${httpConstants.responseTypes.notFound}' name to the error when error.response.status is 404`, () => {
      const error = {
        response: {
          status: 404,
        },
      };
      const result = networkService.handleError(error);
      expect(result).toMatchObject({ ...error, name: httpConstants.responseTypes.notFound });
    });

    test(`should add '${httpConstants.responseTypes.unauthorized}' name to the error when error.response is undefined or null`, () => {
      const result = networkService.handleError({});
      expect(result).toMatchObject({ name: httpConstants.responseTypes.unauthorized });
    });
  });

  describe('Function: getErrorResponseData', () => {
    const error = {
      response: {
        data: 'Error Code 400',
      },
    };

    test('should return data form path response.data in the error sent as an argument', () => {
      const result = networkService.getErrorResponseData(error);

      expect(result).toBe(error.response.data);
    });

    test('should return null if no data is available in the path response.data of the error argument passed to it', () => {
      const result = networkService.getErrorResponseData({});

      expect(result).toBeNull();
    });
  });
});
