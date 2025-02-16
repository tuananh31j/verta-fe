/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { Params } from 'react-router-dom';
import queryString from 'query-string';
import { envProcess } from '~/constants/env';
const axiosOptions = {
    baseURL: envProcess.api,
    withCredentials: true,
    paramsSerializer: (params: Params) => queryString.stringify(params),
};
const instance = axios.create(axiosOptions);

instance.interceptors.response.use(
    <T>(response: AxiosResponse<T>): T => response.data,
    (error) => Promise.reject(error.response.data as any)
);
export default instance;
