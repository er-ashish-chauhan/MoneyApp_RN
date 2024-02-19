import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../utils/utility';

export const CONTENT_TYPE = 'application/json';
export const CONTENT_TYPE_FORMDATA = 'multipart/form-data';
const TIMEOUT = 50000;

// Create a base Axios instance with common headers
const axiosConfig = axios.create({
  timeout: TIMEOUT,
  headers: {
    'Content-Type': CONTENT_TYPE,
  },
  baseURL: API_BASE_URL
});

// Apply a response interceptor for handling authentication errors
axiosConfig.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  (async (error: {
    config: AxiosRequestConfig; response:
    AxiosResponse<{ Error: string | string[] }>;
  }) => {
    // console.log("Axios Error >>", error,
    //   JSON.stringify(error.config, null, 1));
    console.log("Axios response >>",
      JSON.stringify(error.response, null, 1));
    let failedRequest = error.config;
    // Check if the error status is 401 (Unauthorized)
    if (
      error.response && failedRequest
    ) {
      // Handle your logout logic here
      // const token = await getDataFromStorage(constants.USER_ACCESS_TOKEN);
      // failedRequest.headers['Authorization'] = 'Bearer ' + token;
      // return axios.request(failedRequest);
    }
    return Promise.reject(error);
  })
);

export default axiosConfig;
