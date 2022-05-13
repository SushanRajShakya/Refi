import hocUtils from '../hoc';
import Dropdown from '../../components/shared/dropdown/Dropdown';

describe('Util: hocUtils', () => {
  describe('Function: getDisplayName', () => {
    test('should return display name of the Component', () => {
      const displayName = hocUtils.getDisplayName(Dropdown);
      expect(displayName).toBe('Dropdown');
    });

    test(`should return 'Component' as display name if there is no display name or name of the Component passed as an argument`, () => {
      const displayName = hocUtils.getDisplayName({});
      expect(displayName).toBe('Component');
    });
  });
});
