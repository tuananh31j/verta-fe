import { ORDER_ENDPOINT } from '~/constants/endPoint';
import { Params } from '~/interfaces/api';
import instance from '~/utils/api/axiosInstance';
import {
    IOrder,
    IOrderCreatePayload,
    IOrderPayOsPayLoad,
    IOrderPayosReponse,
    IOrderResponse,
} from '~/interfaces/order';

export const orderService = {
    async getAllOrder(params: Params) {
        const res = await instance.get<IOrderResponse>(ORDER_ENDPOINT.MYORDER, {
            params,
        });
        return res.data;
    },
    async createOrderCash(body: IOrderCreatePayload) {
        const { data } = await instance.post<IOrder>(`${ORDER_ENDPOINT.CREATEORDERCOD}`, body);
        return data;
    },
    async createOrderCard(body: IOrderPayOsPayLoad) {
        const { data } = await instance.post<IOrderPayosReponse>(`${ORDER_ENDPOINT.CREATE_ORDER_PAYOS}`, body);
        return data;
    },

    async getDetailOrder(id: string) {
        const { data } = await instance.get<IOrder>(`${ORDER_ENDPOINT.MYORDER}/${id}`);
        return data;
    },
};
