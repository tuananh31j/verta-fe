import { ORDER_ENDPOINT } from '~/constants/endPoint';
import { IOrder, IOrderCreatePayload } from '~/interfaces/order';
import instance from '~/utils/api/axiosInstance';

export const orderService = {
    async createOrderCash(body: IOrderCreatePayload) {
        const { data } = await instance.post<IOrder>(`${ORDER_ENDPOINT.CREATEORDERCOD}`, body);
        return data;
    },
    async getDetailOrder(id: string) {
        const { data } = await instance.get<IOrder>(`${ORDER_ENDPOINT.MYORDER}/${id}`);
        return data;
    },
};
