/**
 * Clears the local and session storage from the browser.
 */
const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

const getItemFromSessionStorage = key => {
  return sessionStorage.getItem(key);
};

const setItemToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
};

const getItemFromLocalStorage = key => {
  return localStorage.getItem(key);
};

const setItemToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const storageUtils = {
  clearStorage,
  getItemFromLocalStorage,
  getItemFromSessionStorage,
  setItemToLocalStorage,
  setItemToSessionStorage,
};

export default storageUtils;
