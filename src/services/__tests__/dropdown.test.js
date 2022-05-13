import networkService from '../network';
import dropdownService from '../dropdown';
import { errorMessage } from '../../constants/message';
import { httpConstants } from '../../constants/network';
import { apiEndPoint } from '../../configs/apiEndpoint';
import { DROPDOWN_OPTIONS_LIMIT } from '../../constants/general';
import { stateOptionKeys } from '../../constants/keys/dropdowns/state';

jest.mock('../network');

describe('Service: dropdownService', () => {
  describe('Function: getStateOptions', () => {
    const resp = {
      data: {
        items: [
          {
            [stateOptionKeys.VALUE]: 'State',
          },
        ],
      },
    };

    beforeEach(() => {
      jest.restoreAllMocks();
    });

    test('should call networkService.makeRequest with specific arguments', async () => {
      networkService.makeRequest.mockResolvedValue(resp);

      const url = `${apiEndPoint.stateOptions}?limit=${DROPDOWN_OPTIONS_LIMIT}`;
      await dropdownService.getStateOptions();
      expect(networkService.makeRequest).toHaveBeenLastCalledWith(url, httpConstants.requestMethods.GET);
    });

    test('should resolve stateOptions based on the response obtained from the server', async () => {
      networkService.makeRequest.mockResolvedValue(resp);

      const result = await dropdownService.getStateOptions();
      expect(result).toMatchObject([{ label: 'State', value: 'State' }]);
    });

    test('should reject an error message if server throws any error', async () => {
      networkService.makeRequest.mockRejectedValue({});

      expect(dropdownService.getStateOptions()).rejects.toBe(errorMessage.FETCHING_STATE_OPTIONS);
    });

    test('should reject an error message if server sends an empty state options list', async () => {
      networkService.makeRequest.mockResolvedValue({});

      expect(dropdownService.getStateOptions()).rejects.toBe(errorMessage.FETCHING_STATE_OPTIONS);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });
});
