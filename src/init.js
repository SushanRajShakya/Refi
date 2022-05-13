import logger from 'redux-logger';
import { toast } from 'react-toastify';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import config from './configs/config';
import { toastConfig } from './configs/toast';

const DEVELOPMENT = 'development';

/**
 * Configures react-toastify with custom default toast configurations.
 */
export const configureReactToastify = () => {
  toast.configure({
    ...toastConfig,
  });
};

/**
 * Returns the required composer for enhancers for REDUX store.
 * Uses composer with REDUX dev tools for development environment.
 *
 * @param {array} enhancers
 */
const getComposedEnhancers = enhancers => {
  if (config.NODE_ENV === DEVELOPMENT) {
    return composeWithDevTools(...enhancers);
  }

  return compose(...enhancers);
};

/**
 * Configures REDUX store with all the necessary middlewares, reducers and enhancers.
 *
 * @param {object} initialState
 */
export const configureStore = (initialState = {}) => {
  const middlewares = [];

  if (config.NODE_ENV === DEVELOPMENT) {
    middlewares.push(logger);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = getComposedEnhancers(enhancers);

  const store = createStore(rootReducer, initialState, composedEnhancers);

  return store;
};
