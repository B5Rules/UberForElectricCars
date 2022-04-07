import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_INSCRIERI_API,
  headers: {
    'Cache-Control': 'no-cache',
  },
};

axios.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line
  (error) => console.log(error),
);

const httpService = axios.create(axiosConfig);

export default httpService;
