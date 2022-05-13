import maskUtils from '../mask';

describe('Util: maskUtil', () => {
  describe('Function: currencyMask', () => {
    test('should return specific currency mask', () => {
      const value = maskUtils.currencyMask();
      const expectedOutput = ['$', /\d/];

      expect(value).toMatchObject(expectedOutput);
    });
  });
});
