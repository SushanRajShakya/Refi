import { unMask } from '../../constants/mask';
import { CAR_LENDERS } from '../../constants/texts/common';
import {
  unMaskString,
  getCurrentYear,
  disableBackgroundScroll,
  enableBackgroundScroll,
  setDocumentTitle,
} from '../general';

describe('Util: generalUtils', () => {
  describe('Function: unMaskString', () => {
    test('should return only numbers when value contains numbers and maskingCharacter contains numbers only regex', () => {
      const maskingCharacter = unMask.numbers;
      const expectedOutput = '9999999999';

      expect(unMaskString('999\u000099asd99999', maskingCharacter)).toBe(expectedOutput);
      expect(unMaskString('999----999****9999', maskingCharacter)).toBe(expectedOutput);
      expect(unMaskString('999^99!@#99999', maskingCharacter)).toBe(expectedOutput);
      expect(unMaskString('999%%999^&*9999', maskingCharacter)).toBe(expectedOutput);
    });
  });

  describe('Function: getCurrentYear', () => {
    test('should return current year', () => {
      expect(getCurrentYear()).toBe(new Date().getFullYear());
    });
  });

  describe('Function: disableBackgroundScroll & enableBackgroundScroll', () => {
    const body = document.getElementsByTagName('body')[0];
    body.id = 'app-body';

    test('should set overflow property of body as hidden', () => {
      disableBackgroundScroll();
      expect(body.style.overflow).toBe('hidden');
    });

    test('should set overflow property of body as auto', () => {
      enableBackgroundScroll();
      expect(body.style.overflow).toBe('auto');
    });
  });

  describe('Function: setDocumentTitle', () => {
    const name = 'Document Name';
    setDocumentTitle(name);
    test(`should set document title as '${name} - ${CAR_LENDERS}'`, () => {
      expect(document.title).toBe(`${name} - ${CAR_LENDERS}`);
    });
  });
});
