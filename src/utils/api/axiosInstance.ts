/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { Params } from 'react-router-dom';
import queryString from 'query-string';
import { envProcess } from '~/constants/env';
import { getAccessToken } from './apiHelpers';
const axiosOptions = {
    baseURL: envProcess.api,
    withCredentials: true,
    paramsSerializer: (params: Params) => queryString.stringify(params),
};
const instance = axios.create(axiosOptions);

instance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (config && config.headers && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    <T>(response: AxiosResponse<T>): T => response.data,
    (error) => Promise.reject(error.response.data as any)
);
export default instance;
