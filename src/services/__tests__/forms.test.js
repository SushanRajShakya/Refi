import _toString from 'lodash.tostring';
import { conformToMask } from 'react-text-mask';

import formService from '../forms';
import { unMaskString } from '../../utils/general';
import { genericFormValidationMessage } from '../../constants/message';

jest.mock('react-text-mask');
jest.mock('../../utils/general');
jest.mock('../../constants/message');

describe('Service: formService', () => {
  describe('Function: validateWithMaxLimit', () => {
    const maxLimit = 20;
    const SPY = jest.spyOn(genericFormValidationMessage, 'EXCEEDS_MAX_LIMIT');

    // Created a mock schema similar to Yup for Formik
    class MockSchema {
      constructor(value) {
        this.value = value;
      }

      // Mock test function requires three arguments name, message and a function for a test suite
      test = (name, message, func) => func(this.value);

      validateWithMaxLimit = formService.validateWithMaxLimit;
    }

    beforeEach(() => {
      jest.resetAllMocks();
      SPY.mockImplementation(value => value);
      unMaskString.mockImplementation(value => value);
    });

    test('should create a test suite which returns true when supplied value is less than the max limit', () => {
      const value = 10;
      const mockInstance = new MockSchema(value);

      expect(mockInstance.validateWithMaxLimit(maxLimit)).toBeTruthy();
    });

    test('should create a test suite which returns false when supplied value is greater than the max limit', () => {
      const value = 30;
      const mockInstance = new MockSchema(value);

      expect(mockInstance.validateWithMaxLimit(maxLimit)).toBeFalsy();
    });

    test('should create a test suite which returns true when supplied value equals the max limit', () => {
      const value = 20;
      const mockInstance = new MockSchema(value);

      expect(mockInstance.validateWithMaxLimit(maxLimit)).toBeTruthy();
    });

    test('should create a test suite which returns true when supplied value is null', () => {
      const value = null;
      const mockInstance = new MockSchema(value);

      expect(mockInstance.validateWithMaxLimit(maxLimit)).toBeTruthy();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: validateMaxChars', () => {
    const maxChars = 10;
    const SPY = jest.spyOn(genericFormValidationMessage, 'EXCEEDS_MAX_CHARS');

    // Created a mock schema similar to Yup for Formik
    class MockSchema {
      constructor(value) {
        this.value = value;
      }

      // Mock test function requires three arguments name, message and a function for a test suite
      test = (name, message, func) => func(this.value);

      validateMaxChars = formService.validateMaxChars;
    }

    beforeEach(() => {
      jest.resetAllMocks();
      SPY.mockImplementation(value => value);
    });

    test('should create a test suite which returns true when supplied character length is less than the max limit', () => {
      const value = 'CarLender';
      const mockInstance = new MockSchema(value);

      expect(mockInstance.validateMaxChars(maxChars)).toBeTruthy();
    });

    test('should create a test suite which returns false when supplied character length is greater than the max limit', () => {
      const value = 'Car Lenders Car Lenders';
      const mockInstance = new MockSchema(value);

      expect(mockInstance.validateMaxChars(maxChars)).toBeFalsy();
    });

    test('should create a test suite which returns true when supplied character length equals the max limit', () => {
      const value = 'CarLenders';
      const mockInstance = new MockSchema(value);

      expect(mockInstance.validateMaxChars(maxChars)).toBeTruthy();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Function: applyMaskToValue', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      conformToMask.mockImplementation((parsedValue, mask) => {
        return {
          mask,
          conformedValue: parsedValue,
        };
      });
    });

    test('should call conformToMask from react-text-mask once and return the value returned by that function', () => {
      const value = 'Text';
      const mask = [/\d/];
      const result = formService.applyMaskToValue(value, mask);

      expect(conformToMask).toHaveBeenCalledTimes(1);
      expect(conformToMask).toHaveBeenLastCalledWith(value, mask);
      expect(result).toBe(value);
    });

    test('should return empty string if value is invalid', () => {
      const value = null;
      const mask = [/\d/];
      const result = formService.applyMaskToValue(value, mask);

      expect(result).toBe('');
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });
});
