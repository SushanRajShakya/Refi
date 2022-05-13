import { STORE_STATE_OPTIONS } from '../action/types/options';

const initialState = {
  states: [],
};

const optionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_STATE_OPTIONS:
      return { ...state, states: action.payload };
    default:
      return state;
  }
};

export default optionsReducer;
