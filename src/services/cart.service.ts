import { AxiosResponse } from 'axios';
import { CART_ENDPOINT } from '~/constants/endPoint';
import instance from '~/utils/api/axiosInstance';

export const cartService = {
    async getAllCart() {
        const res = await instance.get<ICartResponse>(CART_ENDPOINT.GET_ALL);
        console.log(res.data);
        return res.data;
    },
};
