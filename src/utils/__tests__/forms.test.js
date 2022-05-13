import _get from 'lodash.get';

import formUtils from '../forms';
import { textTransform } from '../../constants/general';

describe('Util: formUtils', () => {
  describe('Function: getInputWrapperClassName', () => {
    const value = 'Value';
    const emptyValue = '';
    const key = 'key';
    const touched = { key: true };
    const error = { key: true };
    const expectedOutput = {
      TEST_1: 'form-group',
      TEST_2: `form-group touched`,
      TEST_3: `form-group touched has-error`,
    };

    test(`should return '${expectedOutput.TEST_1}' if value is empty string '' and untouched`, () => {
      const obtainedOutput = formUtils.getInputWrapperClassName(emptyValue, {}, {}, key);
      expect(obtainedOutput).toBe(expectedOutput.TEST_1);
    });

    test(`should return '${expectedOutput.TEST_2}' if value is not empty and touched`, () => {
      const obtainedOutput = formUtils.getInputWrapperClassName(value, touched, {}, key);
      expect(obtainedOutput).toBe(expectedOutput.TEST_2);
    });

    test(`should return '${expectedOutput.TEST_3}' if value is not empty, touched and has an error `, () => {
      const obtainedOutput = formUtils.getInputWrapperClassName(value, touched, error, key);
      expect(obtainedOutput).toBe(expectedOutput.TEST_3);
    });
  });

  describe('Function: getTextTransformStyle', () => {
    const testData = {
      UPPERCASE: textTransform.UPPERCASE,
      LOWERCASE: textTransform.LOWERCASE,
      RANDOM_TEXT: 'Random Text',
      EMPTY_TEXT: '',
    };

    test(`should return ${textTransform.UPPERCASE} when type is ${testData.UPPERCASE}`, () => {
      const obtainedOutput = formUtils.getTextTransformStyle(testData.UPPERCASE);
      const expectedOutput = {
        textTransform: textTransform.UPPERCASE,
      };

      expect(obtainedOutput).toMatchObject(expectedOutput);
    });

    test(`should return ${textTransform.LOWERCASE} when type is ${testData.LOWERCASE}`, () => {
      const obtainedOutput = formUtils.getTextTransformStyle(testData.LOWERCASE);
      const expectedOutput = {
        textTransform: textTransform.LOWERCASE,
      };

      expect(obtainedOutput).toMatchObject(expectedOutput);
    });

    test(`should return ${textTransform.NONE} when type is ${testData.RANDOM_TEXT} or ''`, () => {
      let obtainedOutput = formUtils.getTextTransformStyle(testData.RANDOM_TEXT);
      const expectedOutput = {
        textTransform: textTransform.NONE,
      };

      expect(obtainedOutput).toMatchObject(expectedOutput);

      obtainedOutput = formUtils.getTextTransformStyle(testData.EMPTY_TEXT);

      expect(obtainedOutput).toMatchObject(expectedOutput);
    });
  });
});
