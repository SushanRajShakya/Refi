import axios from 'axios';

import config from '../configs/config';
import networkUtils from '../services/network';

// Axios instance for making HTTP requests to ORDS Server.
const PublicAxiosInstance = axios.create({
  baseURL: config.API_BASE,
});

// HTTP Request Interceptor
PublicAxiosInstance.interceptors.request.use(
  config => {
    config.headers = { ...config.headers, Pragma: 'no-cache' };

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// HTTP Response Interceptor
PublicAxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const result = networkUtils.handleError(error);

    return Promise.reject(result);
  }
);

export default PublicAxiosInstance;
