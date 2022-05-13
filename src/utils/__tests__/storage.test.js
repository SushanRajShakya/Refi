import 'jest-localstorage-mock';

import storageUtils from '../storage';

describe('Util: storageUtils', () => {
  beforeEach(() => {
    // Clear the storage for each test before they run so they don't affect one another
    jest.resetAllMocks();
  });

  describe('Function: clearStorage', () => {
    test('should clear localStorage and sessionStorage once', () => {
      storageUtils.clearStorage();

      expect(localStorage.clear).toHaveBeenCalledTimes(1);
      expect(sessionStorage.clear).toHaveBeenCalledTimes(1);
    });

    test('should clear localStorage and sessionStorage so that no item is left in both the storage areas', () => {
      storageUtils.clearStorage();

      const localStorageItems = Object.keys(localStorage);
      const sessionStorageItems = Object.keys(sessionStorage);

      expect(localStorageItems.length).toBe(0);
      expect(sessionStorageItems.length).toBe(0);
    });
  });

  describe('Function: getItemFromSessionStorage', () => {
    test('should call sessionStorage.getItem with the specific key sent as an argument only once', () => {
      const key = 'key';
      storageUtils.getItemFromSessionStorage(key);

      expect(sessionStorage.getItem).toHaveBeenLastCalledWith(key);
      expect(sessionStorage.getItem).toHaveBeenCalledTimes(1);
    });

    test('should not call functions of localStorage', () => {
      const key = 'key';
      storageUtils.getItemFromSessionStorage(key);

      expect(localStorage.getItem).not.toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(localStorage.clear).not.toHaveBeenCalled();
    });
  });

  describe('Function: setItemFromSessionStorage', () => {
    test('should call sessionStorage.setItem with key value pair of arguments only once', () => {
      const key = 'key';
      const value = 'value';
      storageUtils.setItemToSessionStorage(key, value);

      expect(sessionStorage.setItem).toHaveBeenLastCalledWith(key, value);
      expect(sessionStorage.setItem).toHaveBeenCalledTimes(1);
    });

    test('should not call functions of localStorage', () => {
      const key = 'key';
      const value = 'value';
      storageUtils.setItemToSessionStorage(key, value);

      expect(localStorage.getItem).not.toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(localStorage.clear).not.toHaveBeenCalled();
    });
  });

  describe('Function: getItemFromLocalStorage', () => {
    test('should call localStorage.getItem with the specific key sent as an argument only once', () => {
      const key = 'key';
      storageUtils.getItemFromLocalStorage(key);

      expect(localStorage.getItem).toHaveBeenLastCalledWith(key);
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    });

    test('should not call functions of sessionStorage', () => {
      const key = 'key';
      storageUtils.getItemFromLocalStorage(key);

      expect(sessionStorage.getItem).not.toHaveBeenCalled();
      expect(sessionStorage.setItem).not.toHaveBeenCalled();
      expect(sessionStorage.clear).not.toHaveBeenCalled();
    });
  });

  describe('Function: setItemFromLocalStorage', () => {
    test('should call localStorage.setItem with key value pair of arguments only once', () => {
      const key = 'key';
      const value = 'value';
      storageUtils.setItemToLocalStorage(key, value);

      expect(localStorage.setItem).toHaveBeenLastCalledWith(key, value);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    test('should not call functions of sessionStorage', () => {
      const key = 'key';
      const value = 'value';
      storageUtils.setItemToLocalStorage(key, value);

      expect(sessionStorage.getItem).not.toHaveBeenCalled();
      expect(sessionStorage.setItem).not.toHaveBeenCalled();
      expect(sessionStorage.clear).not.toHaveBeenCalled();
    });
  });
});
