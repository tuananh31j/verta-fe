import { ORDER_ENDPOINT } from '~/constants/endPoint';
import { IServerResponse, Params } from '~/interfaces/api';
import { IOrderResponse } from '~/interfaces/order';
import instance from '~/utils/api/axiosInstance';

export const orderService = {
    async getAllOrder(params: Params) {
        const res = await instance.get<IServerResponse<IOrderResponse>>(ORDER_ENDPOINT.GET_ALL_ORDER, {
            params,
        });
        return res;
    },
};
