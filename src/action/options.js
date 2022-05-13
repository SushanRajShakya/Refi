import { STORE_STATE_OPTIONS } from './types/options';

export const storeStateOptions = options => ({
  type: STORE_STATE_OPTIONS,
  payload: options,
});
