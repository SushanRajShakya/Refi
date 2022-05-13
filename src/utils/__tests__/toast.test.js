import toastUtils from '../toast';
import { toast } from 'react-toastify';

jest.mock('react-toastify');

describe('Util: toastUtils', () => {
  describe('Function: displaySuccess', () => {
    toast.success.mockImplementation(() => true);

    test('should call toast.success only once', () => {
      toastUtils.displaySuccess();

      expect(toast.success).toHaveBeenCalledTimes(1);
    });
  });

  describe('Function: displayError', () => {
    toast.error.mockImplementation(() => true);

    test('should call toast.error only once', () => {
      toastUtils.displayError();

      expect(toast.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('Function: displayInfo', () => {
    toast.info.mockImplementation(() => true);

    test('should call toast.info only once', () => {
      toastUtils.displayInfo();

      expect(toast.info).toHaveBeenCalledTimes(1);
    });
  });

  describe('Function: displayWarning', () => {
    toast.warning.mockImplementation(() => true);

    test('should call toast.warning only once', () => {
      toastUtils.displayWarning();

      expect(toast.warning).toHaveBeenCalledTimes(1);
    });
  });

  describe('Function: dismissAll', () => {
    toast.dismiss.mockImplementation(() => true);

    test('should call toast.dismiss only once', () => {
      toastUtils.dismissAll();

      expect(toast.dismiss).toHaveBeenCalledTimes(1);
    });
  });
});
