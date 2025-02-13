import axios from 'axios';
import { Params } from 'react-router-dom';
import queryString from 'query-string';
import { envProcess } from '~/constants/env';
const axiosOptions = {
    baseURL: envProcess.api,
    withCredentials: true,
    paramsSerializer: (params: Params) => queryString.stringify(params),
};
const instance = axios.create(axiosOptions);

export default instance;
