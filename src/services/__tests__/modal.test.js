import modalService from '../modal';
import swal from '@sweetalert/with-react';
import { disableBackgroundScroll, enableBackgroundScroll } from '../../utils/general';

jest.mock('../../utils/general');
jest.mock('@sweetalert/with-react');

describe('Service: modalService', () => {
  describe('Function: openModal', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('should call disableBackgroundScroll once in the beginning', async () => {
      swal.mockResolvedValue(true);
      await modalService.openModal({});
      expect(disableBackgroundScroll).toHaveBeenCalledTimes(1);
    });

    test('should call enableBackgroundScroll once the asynchronous task has been resolved', async () => {
      swal.mockResolvedValue(true);
      await modalService.openModal({});
      expect(enableBackgroundScroll).toHaveBeenCalledTimes(1);
    });

    test('should return the resolved promise with the value passed from the asynchronous task which has been resolved', async () => {
      swal.mockResolvedValue(true);
      const result = await modalService.openModal({});
      expect(result).toBeTruthy();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: closeModal', () => {
    test('should call swal.close once', () => {
      swal.close.mockImplementation(jest.fn());
      modalService.closeModal();
      expect(swal.close).toHaveBeenCalledTimes(1);
    });
  });
});
